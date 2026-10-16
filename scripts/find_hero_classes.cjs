const fs = require('fs');

const css = fs.readFileSync('C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa\\css\\style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('.hero-section') || l.includes('.section-bg') || l.includes('hero-bg')) {
    console.log(`${i+1}: ${l}`);
  }
});
