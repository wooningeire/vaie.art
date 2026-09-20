use anyhow::{Result, bail};
use std::path::PathBuf;

#[derive(Clone, Debug)]
pub struct Options {
    pub input: PathBuf,
    pub output: PathBuf,
    pub static_root: PathBuf,
    pub metadata_output: PathBuf,
    pub media_assets_output: PathBuf,
    pub preview_size: u32,
    pub thumb_size: u32,
    pub preview_quality: f32,
    pub thumb_quality: f32,
    pub force: bool,
}

impl Options {
    pub fn from_args(args: impl IntoIterator<Item = String>) -> Result<Self> {
        let mut force = false;

        for arg in args {
            match arg.as_str() {
                "--force" | "-f" => {
                    force = true;
                },
                _ => bail!("unknown convert-media option: {arg}"),
            }
        }

        Ok(Options {
            input: PathBuf::from("src/lib/works/entries-data"),
            output: PathBuf::from("static/media"),
            static_root: PathBuf::from("static"),
            metadata_output: PathBuf::from("src/lib/works/entries-data/generatedGalleryImages.ts"),
            media_assets_output: PathBuf::from("src/lib/works/entries-data/generatedMediaAssets.ts"),
            preview_size: 1600,
            thumb_size: 480,
            preview_quality: 90.0,
            thumb_quality: 60.0,
            force,
        })
    }
}
