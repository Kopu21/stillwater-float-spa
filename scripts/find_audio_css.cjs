const fs = require('fs');
const path = require('path');

const css = fs.readFileSync('C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa\\css\\style.css', 'utf8');
const idx = css.indexOf('.audio-widget');
if (idx !== -1) {
  console.log(css.slice(idx, idx + 300));
} else {
  console.log('Not found in style.css');
}
