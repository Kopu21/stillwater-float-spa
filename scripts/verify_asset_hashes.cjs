const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const assetsDir = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa\\assets';
const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.jpg'));

const hashes = new Map();
let duplicate = false;

files.forEach(f => {
  const p = path.join(assetsDir, f);
  const h = getHash(p);
  if (hashes.has(h)) {
    console.error(`DUPLICATE: ${f} matches ${hashes.get(h)}`);
    duplicate = true;
  } else {
    hashes.set(h, f);
  }
});

if (!duplicate) {
  console.log(`ALL ${files.length} ASSETS HAVE UNIQUE HASHES! Zero duplicates.`);
}
