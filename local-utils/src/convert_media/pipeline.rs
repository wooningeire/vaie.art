use crate::convert_media::apng::{is_apng, write_animated_webp};
use crate::convert_media::config::Options;
use crate::convert_media::full_image::write_full_image;
use crate::convert_media::metadata::write_generated_gallery_images;
use crate::convert_media::output_paths::{OutputPaths, output_name_of, output_paths_of};
use crate::convert_media::scan::{collect_image_files, should_regenerate};
use crate::convert_media::webp_output::write_still_webp;
use anyhow::Result;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ConversionStatus {
    Converted,
    Skipped,
}

#[derive(Clone, Debug)]
pub struct ConversionResult {
    pub status: ConversionStatus,
    pub file: PathBuf,
    pub output_paths: OutputPaths,
}

pub fn run() -> Result<()> {
    let options = Options::from_args(std::env::args().skip(1))?;

    run_with_options(&options)
}

fn run_with_options(options: &Options) -> Result<()> {
    let files = collect_image_files(options)?;
    let mut conversion_results = Vec::with_capacity(files.len());

    for file in files {
        conversion_results.push(convert_image(&file, options)?);
    }

    write_generated_gallery_images(&conversion_results, options)?;

    let n_files_converted = conversion_results
        .iter()
        .filter(|result| result.status == ConversionStatus::Converted)
        .count();
    let n_files_skipped = conversion_results
        .iter()
        .filter(|result| result.status == ConversionStatus::Skipped)
        .count();

    println!("finished :: {n_files_converted} converted, {n_files_skipped} skipped");

    Ok(())
}

fn convert_image(file: &Path, options: &Options) -> Result<ConversionResult> {
    let output_name = output_name_of(file, options)?;
    let output_paths = output_paths_of(file, options)?;
    let targets = [
        output_paths.full.as_path(),
        output_paths.preview.as_path(),
        output_paths.thumb.as_path(),
    ];

    if !should_regenerate(file, &targets, options.force)? {
        return Ok(ConversionResult {
            status: ConversionStatus::Skipped,
            file: file.to_path_buf(),
            output_paths,
        });
    }

    fs::create_dir_all(&output_paths.output_directory)?;

    let is_apng = is_apng(file)?;

    write_full_image(file, &output_paths.full, &output_name.extension, is_apng)?;

    if is_apng {
        write_animated_webp(
            file,
            &output_paths.preview,
            options.preview_size,
            options.preview_quality,
        )?;
        write_animated_webp(
            file,
            &output_paths.thumb,
            options.thumb_size,
            options.thumb_quality,
        )?;
    } else {
        write_still_webp(
            file,
            &output_paths.preview,
            options.preview_size,
            options.preview_quality,
        )?;
        write_still_webp(
            file,
            &output_paths.thumb,
            options.thumb_size,
            options.thumb_quality,
        )?;
    }

    Ok(ConversionResult {
        status: ConversionStatus::Converted,
        file: file.to_path_buf(),
        output_paths,
    })
}
