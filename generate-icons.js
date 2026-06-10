import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, 'public/icons');
mkdirSync(iconsDir, { recursive: true });

// Grace Fit icon — terracotta rounded square with serif "G"
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="110" fill="#C0714A"/>
  <rect x="30" y="30" width="452" height="452" rx="90" fill="#A85E3A" opacity="0.4"/>
  <text x="256" y="330"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="280"
    font-weight="700"
    text-anchor="middle"
    fill="white"
    opacity="0.95">G</text>
  <text x="256" y="420"
    font-family="Arial, Helvetica, sans-serif"
    font-size="68"
    font-weight="600"
    text-anchor="middle"
    fill="white"
    opacity="0.75"
    letter-spacing="12">FIT</text>
</svg>`;

const buf = Buffer.from(svg);

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(buf, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, name));
  console.log(`✓ Generated public/icons/${name}`);
}
