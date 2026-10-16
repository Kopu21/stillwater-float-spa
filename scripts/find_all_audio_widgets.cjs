const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(root, f), 'utf8');
  if (content.includes('audio-widget') || content.includes('Calm Audio') || content.includes('audioToggleBtn')) {
    console.log(`Found in ${f}`);
    const idx = content.indexOf('audio-widget');
    if (idx !== -1) {
      console.log(content.slice(idx - 50, idx + 350));
      console.log('------------------------------------');
    }
  }
});
