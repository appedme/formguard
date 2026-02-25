const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SOURCE_SVG = path.join(PUBLIC_DIR, 'favicon.svg');

if (!fs.existsSync(SOURCE_SVG)) {
  console.error('favicon.svg not found in public directory.');
  process.exit(1);
}

const assets = [
  { name: 'favicon.png', size: 32 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'og-image-1.png', width: 1200, height: 630, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } },
  { name: 'og-image-2.png', width: 1200, height: 630, fit: 'cover', background: { r: 10, g: 10, b: 10, alpha: 1 } }
];

async function generateAssets() {
  for (const asset of assets) {
    const outputPath = path.join(PUBLIC_DIR, asset.name);
    console.log(`Generating ${asset.name}...`);
    
    let pipeline = sharp(SOURCE_SVG);
    
    if (asset.width && asset.height) {
      pipeline = pipeline.resize(asset.width, asset.height, {
        fit: asset.fit || 'cover',
        background: asset.background || { r: 0, g: 0, b: 0, alpha: 0 }
      });
    } else {
      pipeline = pipeline.resize(asset.size, asset.size);
    }

    await pipeline.toFile(outputPath);
  }
  console.log('All assets generated successfully!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
