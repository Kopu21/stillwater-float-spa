const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const files = fs.readdirSync(root);

console.log('Searching for audio / calm sound widgets in HTML/JS:');
files.forEach(f => {
  if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
    const content = fs.readFileSync(path.join(root, f), 'utf8');
    const terms = ['audio', 'sound', 'ambient', 'calm', 'music', 'player', 'floating', 'toast', 'notification'];
    terms.forEach(t => {
      const regex = new RegExp(`[a-zA-Z0-9_\-]*${t}[a-zA-Z0-9_\-]*`, 'gi');
      const matches = content.match(regex);
      if (matches && matches.length > 0) {
        const unique = [...new Set(matches.map(m => m.toLowerCase()))];
        const relevant = unique.filter(u => u.includes('audio') || u.includes('sound') || (u.includes('calm') && (u.includes('audio') || u.includes('widget') || u.includes('player'))));
        if (relevant.length > 0) {
          console.log(`${f}: ${relevant.join(', ')}`);
        }
      }
    });
  }
});
