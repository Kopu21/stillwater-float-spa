const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

let removedCount = 0;

htmlFiles.forEach(f => {
  const p = path.join(root, f);
  let content = fs.readFileSync(p, 'utf8');
  
  // Regular expression to match the audio-widget block
  // e.g. <div class="audio-widget">...</div>
  const widgetRegex = /\s*<!--[^\n]*Audio[^\n]*-->\s*<div class="audio-widget">[\s\S]*?<\/div>/gi;
  const directRegex = /\s*<div class="audio-widget">[\s\S]*?<\/div>/gi;

  if (widgetRegex.test(content) || directRegex.test(content)) {
    content = content.replace(widgetRegex, '');
    content = content.replace(directRegex, '');
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Removed audio-widget from ${f}`);
    removedCount++;
  }
});

console.log(`Total HTML files updated: ${removedCount}`);

// Update style.css to hide/remove .audio-widget
const cssPath = path.join(root, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (css.includes('.audio-widget')) {
  css = css.replace(/\.audio-widget\s*\{[\s\S]*?\}/g, '.audio-widget { display: none !important; }');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Updated style.css: .audio-widget { display: none !important; }');
}
