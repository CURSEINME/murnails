import sharp from 'sharp';

export async function optimizeImage(buffer: Buffer) {
  const processed = await sharp(buffer)
    .rotate()
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toBuffer();

  return processed;
}
