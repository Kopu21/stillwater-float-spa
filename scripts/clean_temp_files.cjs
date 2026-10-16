const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const files = fs.readdirSync(root);
const tempFiles = files.filter(f => f.startsWith('cand_') || f.startsWith('dl_'));

tempFiles.forEach(f => {
  fs.unlinkSync(path.join(root, f));
});

console.log(`Cleaned up ${tempFiles.length} temporary download files.`);
