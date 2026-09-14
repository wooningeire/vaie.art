use crate::convert_media::options::Options;
use crate::convert_media::output_paths::public_src_of;
use anyhow::{Context, Result};
use std::path::Path;

#[derive(Clone, Debug)]
pub struct GeneratedGalleryImageAsset {
    pub src: String,
    pub width: u32,
    pub height: u32,
}

pub fn read_generated_gallery_image_asset(
    output_file: &Path,
    options: &Options,
) -> Result<GeneratedGalleryImageAsset> {
    let is_video = output_file.extension().map(|e| e.to_string_lossy().to_lowercase()) == Some("mp4".to_string());
    
    let (width, height) = if is_video {
        let f = std::fs::File::open(output_file)?;
        let size = f.metadata()?.len();
        let reader = std::io::BufReader::new(f);
        let mp4 = mp4::Mp4Reader::read_header(reader, size)
            .with_context(|| format!("failed to read mp4 header for {}", output_file.display()))?;
        
        let track = mp4.tracks().values().find(|t| t.track_type().map_or(false, |tt| tt == mp4::TrackType::Video))
            .context("no video track found")?;
        
        (track.width() as u32, track.height() as u32)
    } else {
        image::image_dimensions(output_file)
            .with_context(|| format!("failed to read dimensions for {}", output_file.display()))?
    };

    Ok(GeneratedGalleryImageAsset {
        src: public_src_of(output_file, options)?,
        width,
        height,
    })
}
