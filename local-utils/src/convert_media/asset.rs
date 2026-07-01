use crate::convert_media::config::Options;
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
    let (width, height) = image::image_dimensions(output_file)
        .with_context(|| format!("failed to read dimensions for {}", output_file.display()))?;

    Ok(GeneratedGalleryImageAsset {
        src: public_src_of(output_file, options)?,
        width,
        height,
    })
}
