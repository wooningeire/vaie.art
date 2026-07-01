use crate::convert_media::webp_output::{fit_inside, write_bytes};
use anyhow::{Context, Result, anyhow};
use image::codecs::png::PngDecoder;
use image::imageops::{FilterType, resize};
use image::{AnimationDecoder, Delay, ImageDecoder};
use std::fs::File;
use std::io::BufReader;
use std::path::Path;
use webp::{AnimEncoder, AnimFrame, WebPConfig};

pub fn is_apng(input_file: &Path) -> Result<bool> {
    if input_file
        .extension()
        .map(|extension| extension.to_string_lossy().to_lowercase() != "png")
        .unwrap_or(true)
    {
        return Ok(false);
    }

    let input = File::open(input_file)?;
    let decoder = PngDecoder::new(BufReader::new(input))?;

    decoder
        .is_apng()
        .with_context(|| format!("failed to inspect APNG chunks in {}", input_file.display()))
}

pub fn write_animated_webp(
    input_file: &Path,
    output_file: &Path,
    max_size: u32,
    quality: f32,
) -> Result<()> {
    let input = File::open(input_file)?;
    let decoder = PngDecoder::new(BufReader::new(input))?;
    let source_size = decoder.dimensions();
    let output_size = fit_inside(source_size, max_size);
    let frames = decoder.apng()?.into_frames().collect_frames()?;
    let mut webp_config = WebPConfig::new().map_err(|_| anyhow!("failed to create WebP config"))?;

    webp_config.quality = quality;
    webp_config.method = 5;
    webp_config.alpha_quality = 100;
    webp_config.thread_level = 1;

    let mut encoder = AnimEncoder::new(output_size.0, output_size.1, &webp_config);
    encoder.set_loop_count(0);

    let mut resized_frames = Vec::with_capacity(frames.len());
    let mut frame_timestamps = Vec::with_capacity(frames.len());
    let mut next_timestamp = 0;

    for frame in frames {
        let delay_ms = delay_ms(frame.delay());
        let resized_frame = resize(
            frame.buffer(),
            output_size.0,
            output_size.1,
            FilterType::Lanczos3,
        );

        resized_frames.push(resized_frame.into_raw());
        frame_timestamps.push(next_timestamp);
        next_timestamp += delay_ms;
    }

    for (frame_bytes, timestamp) in resized_frames.iter().zip(frame_timestamps) {
        encoder.add_frame(AnimFrame::from_rgba(
            frame_bytes,
            output_size.0,
            output_size.1,
            timestamp,
        ));
    }

    let encoded = encoder
        .try_encode()
        .map_err(|error| anyhow!("animated WebP encode failed: {error:?}"))?;

    write_bytes(output_file, &encoded)
}

fn delay_ms(delay: Delay) -> i32 {
    let (numerator, denominator) = delay.numer_denom_ms();

    if denominator == 0 {
        return 100;
    }

    let rounded = (u64::from(numerator) + u64::from(denominator / 2)) / u64::from(denominator);

    i32::try_from(rounded.max(1)).unwrap_or(i32::MAX)
}
