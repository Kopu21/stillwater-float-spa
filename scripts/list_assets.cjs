const fs = require('fs');
const path = require('path');

const assetsDir = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa\\assets';
const files = fs.readdirSync(assetsDir);
console.log(`Total files in assets: ${files.length}`);
files.forEach(f => {
  const stat = fs.statSync(path.join(assetsDir, f));
  console.log(`${f} - ${Math.round(stat.size / 1024)} KB`);
});
