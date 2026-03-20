const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public/frames');
const outputDir = path.join(__dirname, 'public/frames_4k');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
console.log(`Starting 4K upscale processing for ${files.length} frames...`);

(async () => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await sharp(path.join(inputDir, file))
      .resize(3840, 2160, { kernel: sharp.kernel.lanczos3 })
      .sharpen()
      .jpeg({ quality: 90 }) // Keep quality high
      .toFile(path.join(outputDir, file));
      
    if ((i + 1) % 50 === 0) {
      console.log(`Processed ${i + 1}/${files.length} frames...`);
    }
  }
  console.log('Done upscaling 300 frames to 4K (3840x2160).');
})();
