use image::codecs::png::PngDecoder;
use image::imageops::{FilterType, resize};
use image::{AnimationDecoder, Delay, ImageDecoder};
use std::env;
use std::error::Error;
use std::fs::File;
use std::io::{BufReader, Write};
use std::path::{Path, PathBuf};
use webp::{AnimEncoder, AnimFrame, WebPConfig};

type Result<T> = std::result::Result<T, Box<dyn Error>>;

struct Options {
    input: PathBuf,
    output: PathBuf,
    max_size: u32,
    quality: f32,
}

const USAGE: &str = "usage: animated-webp <input.apng> <output.webp> <max-size> <quality>";

fn main() -> Result<()> {
    let options = parse_options(env::args().skip(1).collect())?;
    convert_apng_to_animated_webp(&options)
}

fn parse_options(args: Vec<String>) -> Result<Options> {
    if args.len() != 4 {
        return Err(USAGE.into());
    }

    let max_size = args[2].parse::<u32>()?;
    let quality = args[3].parse::<f32>()?;

    if max_size == 0 {
        return Err("max-size must be greater than 0".into());
    }

    if !(0.0..=100.0).contains(&quality) {
        return Err("quality must be between 0 and 100".into());
    }

    Ok(Options {
        input: PathBuf::from(&args[0]),
        output: PathBuf::from(&args[1]),
        max_size,
        quality,
    })
}

fn convert_apng_to_animated_webp(options: &Options) -> Result<()> {
    let input = File::open(&options.input)?;
    let decoder = PngDecoder::new(BufReader::new(input))?;
    let source_size = decoder.dimensions();

    if !decoder.is_apng()? {
        return Err(format!("{} is not an APNG", options.input.display()).into());
    }

    let output_size = fit_inside(source_size, options.max_size);
    let apng = decoder.apng()?;
    let frames = apng.into_frames().collect_frames()?;
    let mut webp_config = WebPConfig::new().map_err(|_| "failed to create WebP config")?;

    webp_config.quality = options.quality;
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
        .map_err(|error| format!("WebP encode failed: {error:?}"))?;
    write_file(&options.output, &encoded)?;

    println!(
        "{} -> {} :: {} frames, {}x{}",
        options.input.display(),
        options.output.display(),
        resized_frames.len(),
        output_size.0,
        output_size.1,
    );

    Ok(())
}

fn delay_ms(delay: Delay) -> i32 {
    let (numerator, denominator) = delay.numer_denom_ms();

    if denominator == 0 {
        return 100;
    }

    let rounded = (u64::from(numerator) + u64::from(denominator / 2)) / u64::from(denominator);

    i32::try_from(rounded.max(1)).unwrap_or(i32::MAX)
}

fn fit_inside((width, height): (u32, u32), max_size: u32) -> (u32, u32) {
    if width <= max_size && height <= max_size {
        return (width, height);
    }

    if width >= height {
        let scaled_height = scale_dimension(height, max_size, width);

        return (max_size, scaled_height);
    }

    let scaled_width = scale_dimension(width, max_size, height);

    (scaled_width, max_size)
}

fn scale_dimension(value: u32, scaled_max: u32, source_max: u32) -> u32 {
    let scaled = (u64::from(value) * u64::from(scaled_max)) / u64::from(source_max);

    u32::try_from(scaled.max(1)).unwrap_or(u32::MAX)
}

fn write_file(path: &Path, bytes: &[u8]) -> Result<()> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
    }

    let mut file = File::create(path)?;
    file.write_all(bytes)?;

    Ok(())
}
