#!/usr/bin/env -S deno run -A

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

type Options = {
    input: string,
    output: string,
    staticRoot: string,
    metadataOutput: string,
    displaySize: number,
    thumbSize: number,
    quality: number,
    thumbQuality: number,
    force: boolean,
};

type OutputPaths = {
    outputDirectory: string,
    display: string,
    thumb: string,
};

type ConversionResult = {
    status: "converted" | "skipped",
    file: string,
    outputPaths: OutputPaths,
};

type GeneratedGalleryImageAsset = {
    src: string,
    width: number,
    height: number,
};

type GeneratedGalleryImage = {
    display: GeneratedGalleryImageAsset,
    thumb: GeneratedGalleryImageAsset,
};

type GeneratedGalleryImageEntry = {
    key: string,
    image: GeneratedGalleryImage,
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
    staticRoot: "static/",
    metadataOutput: "src/lib/gallery-models/generatedGalleryImages.ts",
    displaySize: 1600,
    thumbSize: 480,
    quality: 90,
    thumbQuality: 60,
    force: false,
};

const outputPathsOf = (inputFile: string, options: Options): OutputPaths => {
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
};

const createSlugFromPathSegment = (value: string): string => {
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
};

const hasErrorCode = (error: unknown): error is Error & { code: string } => {
    return error instanceof Error && typeof (error as { code?: unknown }).code === "string";
};

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

const convertImage = async (file: string, options: Options): Promise<ConversionResult> => {
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

const toPosixPath = (value: string) => {
    return value.split(path.sep).join("/");
};

const publicSrcOf = (outputFile: string, options: Options) => {
    return `/${toPosixPath(path.relative(options.staticRoot, outputFile))}`;
};

const metadataKeyOf = (outputFile: string, options: Options) => {
    const relativePath = path.relative(options.output, outputFile);
    const parsed = path.parse(relativePath);

    return toPosixPath(path.join(parsed.dir, parsed.name));
};

const readGeneratedGalleryImageAsset = async (
    outputFile: string,
    options: Options,
): Promise<GeneratedGalleryImageAsset> => {
    const metadata = await sharp(outputFile).metadata();

    if (metadata.width == null || metadata.height == null) {
        throw new Error(`Missing image dimensions for ${outputFile}`);
    }

    return {
        src: publicSrcOf(outputFile, options),
        width: metadata.width,
        height: metadata.height,
    };
};

const readGeneratedGalleryImage = async (
    conversionResult: ConversionResult,
    options: Options,
): Promise<GeneratedGalleryImageEntry> => {
    const [display, thumb] = await Promise.all([
        readGeneratedGalleryImageAsset(conversionResult.outputPaths.display, options),
        readGeneratedGalleryImageAsset(conversionResult.outputPaths.thumb, options),
    ]);

    return {
        key: metadataKeyOf(conversionResult.outputPaths.display, options),
        image: {
            display,
            thumb,
        },
    };
};

const writeGeneratedGalleryImages = async (conversionResults: ConversionResult[], options: Options) => {
    const entries = await Promise.all(
        conversionResults.map((result) => readGeneratedGalleryImage(result, options)),
    );
    const sortedEntries = entries.sort((a, b) => a.key.localeCompare(b.key));
    const lines = [
        "import type { GeneratedGalleryImage } from \"./GalleryImage\";",
        "",
        "// Generated by media/convert-media.ts. Do not edit by hand.",
        "export const generatedGalleryImages = {",
    ];

    for (const { key, image } of sortedEntries) {
        lines.push(
            `    ${JSON.stringify(key)}: {`,
            "        display: {",
            `            src: ${JSON.stringify(image.display.src)},`,
            `            width: ${image.display.width},`,
            `            height: ${image.display.height},`,
            "        },",
            "        thumb: {",
            `            src: ${JSON.stringify(image.thumb.src)},`,
            `            width: ${image.thumb.width},`,
            `            height: ${image.thumb.height},`,
            "        },",
            "    },",
        );
    }

    lines.push(
        "} satisfies Record<string, GeneratedGalleryImage>;",
        "",
    );

    await mkdir(path.dirname(options.metadataOutput), { recursive: true });
    await writeFile(options.metadataOutput, lines.join("\n"));
};

const main = async () => {
    const convertImagePromises: Promise<ConversionResult>[] = [];

    const convertImagesInDirectory = async (directory: string) => {
        const entries = await readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                await convertImagesInDirectory(fullPath);
                continue;
            }

            if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
                convertImagePromises.push(convertImage(fullPath, constants));
            }
        }
    };

    await convertImagesInDirectory(constants.input);
    const conversionResults = await Promise.all(convertImagePromises);
    await writeGeneratedGalleryImages(conversionResults, constants);

    const nFilesConverted = conversionResults.filter((result) => result.status === "converted").length;
    const nFilesSkipped = conversionResults.filter((result) => result.status === "skipped").length;

    console.log(`finished :: ${nFilesConverted} converted, ${nFilesSkipped} skipped`);
};

try {
    await main();
} catch (error) {
    console.error(error instanceof Error ? error.message : error);
    Deno.exitCode = 1;
}
