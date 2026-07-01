use anyhow::{Result, anyhow};
use image::imageops::{FilterType, resize};
use image::{ImageReader, RgbaImage};
use std::fs;
use std::path::Path;
use webp::{Encoder, WebPConfig};

pub fn write_still_webp(
    input_file: &Path,
    output_file: &Path,
    max_size: u32,
    quality: f32,
) -> Result<()> {
    let image = ImageReader::open(input_file)?.decode()?.to_rgba8();
    let image = resize_to_fit(image, max_size);
    let encoded = encode_rgba_webp(image.as_raw(), image.width(), image.height(), quality)?;

    write_bytes(output_file, &encoded)
}

pub fn encode_rgba_webp(bytes: &[u8], width: u32, height: u32, quality: f32) -> Result<Vec<u8>> {
    let mut config = WebPConfig::new().map_err(|_| anyhow!("failed to create WebP config"))?;

    config.quality = quality;
    config.method = 5;
    config.alpha_quality = 100;
    config.thread_level = 1;

    let encoder = Encoder::from_rgba(bytes, width, height);
    let encoded = encoder
        .encode_advanced(&config)
        .map_err(|error| anyhow!("WebP encode failed: {error:?}"))?;

    Ok(encoded.to_vec())
}

pub fn fit_inside((width, height): (u32, u32), max_size: u32) -> (u32, u32) {
    if width <= max_size && height <= max_size {
        return (width, height);
    }

    if width >= height {
        return (max_size, scale_dimension(height, max_size, width));
    }

    (scale_dimension(width, max_size, height), max_size)
}

pub fn write_bytes(path: &Path, bytes: &[u8]) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }

    fs::write(path, bytes)?;

    Ok(())
}

fn resize_to_fit(image: RgbaImage, max_size: u32) -> RgbaImage {
    let output_size = fit_inside((image.width(), image.height()), max_size);

    if output_size == (image.width(), image.height()) {
        return image;
    }

    resize(&image, output_size.0, output_size.1, FilterType::Lanczos3)
}

fn scale_dimension(value: u32, scaled_max: u32, source_max: u32) -> u32 {
    let scaled = (u64::from(value) * u64::from(scaled_max)) / u64::from(source_max);

    u32::try_from(scaled.max(1)).unwrap_or(u32::MAX)
}
