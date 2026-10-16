const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');

const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('blog-filter') || l.includes('blogCountBadge')) {
    console.log(`${i+1}: ${l}`);
  }
});
