const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const p = path.join(root, 'standalone.html');
if (fs.existsSync(p)) {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/\s*<!--[^\n]*Audio[^\n]*-->\s*<div class="audio-widget">[\s\S]*?<\/div>/gi, '');
  content = content.replace(/\s*<div class="audio-widget">[\s\S]*?<\/div>/gi, '');
  fs.writeFileSync(p, content, 'utf8');
  console.log('Removed from standalone.html');
}
