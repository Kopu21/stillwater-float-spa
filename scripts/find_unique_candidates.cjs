const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const dir = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const assetsDir = path.join(dir, 'assets');

const assetHashes = new Set();
fs.readdirSync(assetsDir).forEach(f => {
  if (f.endsWith('.jpg') || f.endsWith('.png')) {
    assetHashes.add(getHash(path.join(assetsDir, f)));
  }
});

const candidates = fs.readdirSync(dir).filter(f => f.startsWith('cand_') || f.startsWith('dl_'));
const uniqueCandidates = [];

candidates.forEach(f => {
  const p = path.join(dir, f);
  const h = getHash(p);
  const sz = fs.statSync(p).size;
  if (!assetHashes.has(h)) {
    uniqueCandidates.push({ file: f, sizeKB: Math.round(sz / 1024) });
  }
});

console.log('Unique candidates not in assets:');
console.log(JSON.stringify(uniqueCandidates, null, 2));
