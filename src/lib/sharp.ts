import sharp from 'sharp';

export async function optimizeImage(buffer: Buffer) {
  const processed = await sharp(buffer)
    .rotate() // auto-fix orientation from EXIF
    .resize({
      width: 1200, // limit max width
      withoutEnlargement: true,
    })
    .webp({ quality: 80 }) // convert to WebP for best compression
    .toBuffer();

  return processed;
}
