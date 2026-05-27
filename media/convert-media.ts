#!/usr/bin/env -S deno run -A

import { mkdir, readdir, stat} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

type Options = {
    input: string;
    output: string;
    displaySize: number;
    thumbSize: number;
    quality: number;
    thumbQuality: number;
    force: boolean;
};

const imageExtensions = new Set<string>([
    ".avif",
    ".gif",
    ".jpg",
    ".jpeg",
    ".png",
    ".tif",
    ".tiff",
    ".webp",
]);

const constants: Options = {
    input: "media/",
    output: "static/media/",
    displaySize: 1600,
    thumbSize: 480,
    quality: 90,
    thumbQuality: 60,
    force: false,
};


function outputPathsOf(inputFile: string, options: Options) {
    const relativeInputPath = path.relative(options.input, inputFile);
    const parsed = path.parse(relativeInputPath);
    const relativeOutputDir = parsed.dir
        .split(path.sep)
        .filter(Boolean)
        .map(createSlugFromPathSegment)
        .join(path.sep);
    const basename = createSlugFromPathSegment(parsed.name);
    const outputDirectory = path.join(options.output, relativeOutputDir);

    return {
        outputDirectory,
        display: path.join(outputDirectory, `${basename}.webp`),
        thumb: path.join(outputDirectory, `${basename}.thumb.webp`),
    };
}

function createSlugFromPathSegment(value: string): string {
    const slug = value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    if (slug.length === 0) {
        return "image";
    }
    
    return slug;
}

const shouldRegenerate = async (source: string, targets: string[], force: boolean) => {
    if (force) {
        return true;
    }

    const sourceStat = await stat(source);

    for (const target of targets) {
        try {
            const targetStat = await stat(target);

            if (targetStat.mtimeMs < sourceStat.mtimeMs) {
                return true;
            }
        } catch (error) {
            if (hasErrorCode(error) && error.code === "ENOENT") {
                return true;
            }

            throw error;
        }
    }

    return false;
};


const convertImage = async (file: string, options: Options) => {
    const outputPaths = outputPathsOf(file, options);
    const targets = [outputPaths.display, outputPaths.thumb];

    if (!await shouldRegenerate(file, targets, options.force)) {
        return { status: "skipped", file, outputPaths };
    }

    await mkdir(outputPaths.outputDirectory, { recursive: true });

    await sharp(file)
        .rotate()
        .resize({
            width: options.displaySize,
            height: options.displaySize,
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({
            quality: options.quality,
            effort: 5,
        })
        .toFile(outputPaths.display);

    await sharp(file)
        .rotate()
        .resize({
            width: options.thumbSize,
            height: options.thumbSize,
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({
            quality: options.thumbQuality,
            effort: 5,
        })
        .toFile(outputPaths.thumb);

    return { status: "converted", file, outputPaths };
};

const main = async () => {
    let nFilesConverted = 0;
    let nFilesSkipped = 0;

    const convertImageTracked = async (file: string, options: Options) => {
        const result = await convertImage(file, options);

        switch (result.status) {
            case "converted":
                nFilesConverted += 1;
                break;

            case "skipped":
                nFilesSkipped += 1;
                break;
        }
    };


    
    const convertImagePromises: Promise<void>[] = [];

    const convertImagesInDirectory = async (directory: string) => {
        const entries = await readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                await convertImagesInDirectory(fullPath);
                continue;
            }

            if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
                convertImagePromises.push(convertImageTracked(fullPath, constants));
            }
        }
    };



    await convertImagesInDirectory(constants.input);
    await Promise.all(convertImagePromises);


    console.log(`finished :: ${nFilesConverted} converted, ${nFilesSkipped} skipped`);
}

function hasErrorCode(error: unknown): error is Error & { code: string } {
    return error instanceof Error && typeof (error as { code?: unknown }).code === "string";
}



try {
    await main();
}
catch (error) {
    console.error(error instanceof Error ? error.message : error);
    Deno.exitCode = 1;
}
