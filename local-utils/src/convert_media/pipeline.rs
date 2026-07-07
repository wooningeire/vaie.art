use crate::convert_media::apng::{is_apng, write_animated_webp};
use crate::convert_media::config::Options;
use crate::convert_media::full_image::write_full_image;
use crate::convert_media::metadata::{
    write_generated_gallery_images, write_generated_media_assets,
};
use crate::convert_media::output_paths::{
    GalleryOutputPaths, MediaKind, StaticOutputPaths, gallery_output_paths_of, media_kind_of,
    output_name_of, static_output_paths_of,
};
use crate::convert_media::scan::{collect_image_files, should_regenerate};
use crate::convert_media::webp_output::write_still_webp;
use anyhow::Result;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum ConversionStatus {
    Converted,
    Skipped,
}

#[derive(Clone, Debug)]
pub struct GalleryConversionResult {
    pub status: ConversionStatus,
    pub file: PathBuf,
    pub output_paths: GalleryOutputPaths,
}

#[derive(Clone, Debug)]
pub struct StaticConversionResult {
    pub status: ConversionStatus,
    pub file: PathBuf,
    pub output_paths: StaticOutputPaths,
}

pub fn run() -> Result<()> {
    let options = Options::from_args(std::env::args().skip(1))?;

    run_with_options(&options)
}

fn run_with_options(options: &Options) -> Result<()> {
    let files = collect_image_files(options)?;
    let mut gallery_conversion_results = Vec::new();
    let mut static_conversion_results = Vec::new();
    let mut n_files_converted = 0;
    let mut n_files_skipped = 0;

    for file in files {
        let status = match media_kind_of(&file, options)? {
            MediaKind::Gallery => {
                let result = convert_gallery_image(&file, options)?;
                let status = result.status;

                gallery_conversion_results.push(result);
                status
            }
            MediaKind::Static => {
                let result = convert_static_image(&file, options)?;
                let status = result.status;

                static_conversion_results.push(result);
                status
            }
        };

        match status {
            ConversionStatus::Converted => n_files_converted += 1,
            ConversionStatus::Skipped => n_files_skipped += 1,
        }
    }

    write_generated_gallery_images(&gallery_conversion_results, options)?;
    write_generated_media_assets(&static_conversion_results, options)?;

    println!("finished :: {n_files_converted} converted, {n_files_skipped} skipped");

    Ok(())
}

fn convert_gallery_image(file: &Path, options: &Options) -> Result<GalleryConversionResult> {
    let output_name = output_name_of(file, options)?;
    let output_paths = gallery_output_paths_of(file, options)?;
    let targets = [
        output_paths.full.as_path(),
        output_paths.preview.as_path(),
        output_paths.thumb.as_path(),
    ];

    if !should_regenerate(file, &targets, options.force)? {
        return Ok(GalleryConversionResult {
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

    Ok(GalleryConversionResult {
        status: ConversionStatus::Converted,
        file: file.to_path_buf(),
        output_paths,
    })
}

fn convert_static_image(file: &Path, options: &Options) -> Result<StaticConversionResult> {
    let output_paths = static_output_paths_of(file, options)?;

    remove_obsolete_gallery_outputs(file, options)?;

    if !should_regenerate(file, &[output_paths.webp.as_path()], options.force)? {
        return Ok(StaticConversionResult {
            status: ConversionStatus::Skipped,
            file: file.to_path_buf(),
            output_paths,
        });
    }

    fs::create_dir_all(&output_paths.output_directory)?;

    if is_apng(file)? {
        write_animated_webp(
            file,
            &output_paths.webp,
            options.preview_size,
            options.preview_quality,
        )?;
    } else {
        write_still_webp(
            file,
            &output_paths.webp,
            options.preview_size,
            options.preview_quality,
        )?;
    }

    Ok(StaticConversionResult {
        status: ConversionStatus::Converted,
        file: file.to_path_buf(),
        output_paths,
    })
}

fn remove_obsolete_gallery_outputs(file: &Path, options: &Options) -> Result<()> {
    let output_paths = gallery_output_paths_of(file, options)?;
    let obsolete_paths = [output_paths.full, output_paths.preview, output_paths.thumb];

    for path in obsolete_paths {
        match fs::remove_file(path) {
            Ok(()) => {}
            Err(error) if error.kind() == std::io::ErrorKind::NotFound => {}
            Err(error) => return Err(error.into()),
        }
    }

    Ok(())
}
