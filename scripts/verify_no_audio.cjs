const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

let remaining = 0;
htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(root, f), 'utf8');
  if (content.includes('Calm Audio') || content.includes('audio-widget')) {
    console.log(`Remaining in ${f}`);
    remaining++;
  }
});

if (remaining === 0) {
  console.log('✅ ALL Calm Audio widgets successfully removed from all HTML pages!');
}
