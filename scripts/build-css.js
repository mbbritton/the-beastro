const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

const inputFile = path.join(__dirname, '..', 'style.css');
const outputDir = path.join(__dirname, '..', 'dist');
const outputFile = path.join(outputDir, 'style.min.css');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const css = fs.readFileSync(inputFile, 'utf8');

postcss([cssnano({ preset: 'default' })])
  .process(css, { from: inputFile, to: outputFile })
  .then(result => {
    fs.writeFileSync(outputFile, result.css);
    if (result.map) {
      fs.writeFileSync(outputFile + '.map', result.map.toString());
    }
    const original = Buffer.byteLength(css);
    const minified = Buffer.byteLength(result.css);
    const saving = (((original - minified) / original) * 100).toFixed(1);
    console.log(`✓ CSS minified: ${original}B → ${minified}B (${saving}% smaller)`);
  })
  .catch(err => {
    console.error('CSS build failed:', err);
    process.exit(1);
  });
