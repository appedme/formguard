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
];

async function generateAssets() {
  // Generate square icons
  for (const asset of assets) {
    const outputPath = path.join(PUBLIC_DIR, asset.name);
    console.log(`Generating ${asset.name}...`);
    await sharp(SOURCE_SVG).resize(asset.size, asset.size).toFile(outputPath);
  }

  // Generate OG Image 1 (Brutal Marketing)
  console.log('Generating og-image-1.png...');
  const textSvg1 = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#111;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad1)" />
      
      <!-- Bordered Logo -->
      <rect x="100" y="100" width="120" height="120" stroke="white" stroke-width="4" fill="black" />
      <rect x="115" y="115" width="90" height="90" fill="white" />

      <!-- Title -->
      <text x="100" y="320" font-family="sans-serif" font-weight="900" font-size="96" fill="white">FormGuard</text>
      
      <!-- Subtitle -->
      <text x="100" y="420" font-family="monospace" font-size="32" fill="#888">EDGE-POWERED · AI-NATIVE · ZERO BACKEND</text>
      
      <!-- Tagline -->
      <text x="100" y="500" font-family="sans-serif" font-weight="bold" font-size="48" fill="#555">Stop building form backends.</text>
    </svg>
  `;

  await sharp(Buffer.from(textSvg1))
    .toFile(path.join(PUBLIC_DIR, 'og-image-1.png'));

  // Generate OG Image 2 (Minimal Slate)
  console.log('Generating og-image-2.png...');
  const textSvg2 = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="black" />
      
      <!-- Logo center top -->
      <rect x="540" y="100" width="120" height="120" stroke="white" stroke-width="2" fill="none" />
      <rect x="560" y="120" width="80" height="80" fill="white" />

      <text x="600" y="380" font-family="sans-serif" font-weight="900" font-size="84" fill="white" text-anchor="middle">FormGuard</text>
      <text x="600" y="460" font-family="monospace" font-size="28" fill="#aaa" text-anchor="middle">THE AI FORM ENDPOINT FOR BUILDERS</text>
    </svg>
  `;

  await sharp(Buffer.from(textSvg2))
    .toFile(path.join(PUBLIC_DIR, 'og-image-2.png'));

  console.log('All assets generated successfully!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
