use crate::convert_media::config::Options;
use anyhow::Result;
use std::fs;
use std::path::{Path, PathBuf};

const IMAGE_EXTENSIONS: &[&str] = &[
    ".avif", ".gif", ".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp",
];

pub fn collect_image_files(options: &Options) -> Result<Vec<PathBuf>> {
    let mut files = Vec::new();

    collect_image_files_in_directory(&options.input, &mut files)?;
    files.sort();

    Ok(files)
}

pub fn should_regenerate(source: &Path, targets: &[&Path], force: bool) -> Result<bool> {
    if force {
        return Ok(true);
    }

    let source_modified = fs::metadata(source)?.modified()?;

    for target in targets {
        match fs::metadata(target) {
            Ok(metadata) => {
                if metadata.modified()? < source_modified {
                    return Ok(true);
                }
            }
            Err(error) if error.kind() == std::io::ErrorKind::NotFound => return Ok(true),
            Err(error) => return Err(error.into()),
        }
    }

    Ok(false)
}

fn collect_image_files_in_directory(directory: &Path, files: &mut Vec<PathBuf>) -> Result<()> {
    let mut entries = fs::read_dir(directory)?.collect::<std::io::Result<Vec<_>>>()?;

    entries.sort_by_key(|entry| entry.path());

    for entry in entries {
        let path = entry.path();
        let file_type = entry.file_type()?;

        if file_type.is_dir() {
            collect_image_files_in_directory(&path, files)?;
            continue;
        }

        if file_type.is_file() && is_image_file(&path) {
            files.push(path);
        }
    }

    Ok(())
}

fn is_image_file(path: &Path) -> bool {
    let Some(extension) = path.extension() else {
        return false;
    };
    let extension = format!(".{}", extension.to_string_lossy().to_lowercase());

    IMAGE_EXTENSIONS.contains(&extension.as_str())
}
