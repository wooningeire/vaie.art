use crate::convert_media::config::Options;
use crate::convert_media::slug::create_slug_from_path_segment;
use anyhow::{Context, Result};
use std::path::{Component, Path, PathBuf};

#[derive(Clone, Debug)]
pub struct OutputName {
    pub relative_output_dir: PathBuf,
    pub basename: String,
    pub extension: String,
}

#[derive(Clone, Debug)]
pub struct OutputPaths {
    pub output_directory: PathBuf,
    pub full: PathBuf,
    pub preview: PathBuf,
    pub thumb: PathBuf,
}

pub fn output_name_of(input_file: &Path, options: &Options) -> Result<OutputName> {
    let relative_input_path = input_file.strip_prefix(&options.input).with_context(|| {
        format!(
            "{} is not under {}",
            input_file.display(),
            options.input.display()
        )
    })?;
    let mut relative_output_dir = PathBuf::new();

    if let Some(parent) = relative_input_path.parent() {
        for component in parent.components() {
            if let Component::Normal(segment) = component {
                relative_output_dir.push(create_slug_from_path_segment(&segment.to_string_lossy()));
            }
        }
    }

    let basename = relative_input_path
        .file_stem()
        .map(|value| create_slug_from_path_segment(&value.to_string_lossy()))
        .context("input file has no basename")?;
    let extension = relative_input_path
        .extension()
        .map(|value| format!(".{}", value.to_string_lossy().to_lowercase()))
        .context("input file has no extension")?;

    Ok(OutputName {
        relative_output_dir,
        basename,
        extension,
    })
}

pub fn output_paths_of(input_file: &Path, options: &Options) -> Result<OutputPaths> {
    let output_name = output_name_of(input_file, options)?;
    let output_directory = options.output.join(&output_name.relative_output_dir);

    Ok(OutputPaths {
        full: output_directory.join(format!(
            "{}.full{}",
            output_name.basename, output_name.extension
        )),
        preview: output_directory.join(format!("{}.preview.webp", output_name.basename)),
        thumb: output_directory.join(format!("{}.thumb.webp", output_name.basename)),
        output_directory,
    })
}

pub fn metadata_key_of(input_file: &Path, options: &Options) -> Result<String> {
    let output_name = output_name_of(input_file, options)?;
    let key = output_name.relative_output_dir.join(output_name.basename);

    Ok(to_posix_path(&key))
}

pub fn public_src_of(output_file: &Path, options: &Options) -> Result<String> {
    let relative = output_file
        .strip_prefix(&options.static_root)
        .with_context(|| {
            format!(
                "{} is not under {}",
                output_file.display(),
                options.static_root.display()
            )
        })?;

    Ok(format!("/{}", to_posix_path(relative)))
}

pub fn to_posix_path(path: &Path) -> String {
    path.components()
        .filter_map(|component| match component {
            Component::Normal(value) => Some(value.to_string_lossy().to_string()),
            _ => None,
        })
        .collect::<Vec<_>>()
        .join("/")
}
