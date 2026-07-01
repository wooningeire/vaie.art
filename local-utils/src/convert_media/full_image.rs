use anyhow::Result;
use image::codecs::jpeg::JpegEncoder;
use image::codecs::png::{CompressionType, FilterType as PngFilterType, PngEncoder};
use image::{ExtendedColorType, ImageEncoder, ImageReader};
use std::fs;
use std::fs::File;
use std::path::Path;

pub fn write_full_image(
    input_file: &Path,
    output_file: &Path,
    extension: &str,
    is_apng: bool,
) -> Result<()> {
    if is_apng {
        copy_file(input_file, output_file)?;
        return Ok(());
    }

    match extension {
        ".jpg" | ".jpeg" => write_full_jpeg(input_file, output_file),
        ".png" => write_full_png(input_file, output_file),
        _ => {
            copy_file(input_file, output_file)?;
            Ok(())
        }
    }
}

fn write_full_jpeg(input_file: &Path, output_file: &Path) -> Result<()> {
    create_parent_dir(output_file)?;

    let image = ImageReader::open(input_file)?.decode()?.to_rgb8();
    let file = File::create(output_file)?;
    let encoder = JpegEncoder::new_with_quality(file, 100);

    encoder.write_image(
        image.as_raw(),
        image.width(),
        image.height(),
        ExtendedColorType::Rgb8,
    )?;

    Ok(())
}

fn write_full_png(input_file: &Path, output_file: &Path) -> Result<()> {
    create_parent_dir(output_file)?;

    let image = ImageReader::open(input_file)?.decode()?.to_rgba8();
    let file = File::create(output_file)?;
    let encoder =
        PngEncoder::new_with_quality(file, CompressionType::Best, PngFilterType::Adaptive);

    encoder.write_image(
        image.as_raw(),
        image.width(),
        image.height(),
        ExtendedColorType::Rgba8,
    )?;

    Ok(())
}

fn copy_file(input_file: &Path, output_file: &Path) -> Result<()> {
    create_parent_dir(output_file)?;
    fs::copy(input_file, output_file)?;

    Ok(())
}

fn create_parent_dir(path: &Path) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }

    Ok(())
}
