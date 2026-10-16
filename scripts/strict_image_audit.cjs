const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const assetsDir = path.join(root, 'assets');

console.log('=== STRICT IMAGE UNIQUENESS & INTEGRITY AUDIT ===');
const jpgs = fs.readdirSync(assetsDir).filter(f => f.endsWith('.jpg'));
console.log(`Found ${jpgs.length} JPG images in assets:`);

const hashes = new Map();
let duplicateFound = false;

jpgs.forEach(f => {
  const p = path.join(assetsDir, f);
  const sz = fs.statSync(p).size;
  const h = getHash(p);
  console.log(`- ${f.padEnd(35)} : ${Math.round(sz / 1024).toString().padStart(5)} KB | hash: ${h.slice(0, 12)}...`);
  if (hashes.has(h)) {
    console.error(`❌ DUPLICATE DETECTED: ${f} and ${hashes.get(h)} have identical hash!`);
    duplicateFound = true;
  } else {
    hashes.set(h, f);
  }
});

if (!duplicateFound) {
  console.log(`\n✅ ZERO DUPLICATES! All ${jpgs.length} images are cryptographically distinct.`);
}

// Check usage across all HTML files
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const usageCount = {};
jpgs.forEach(f => usageCount[`assets/${f}`] = 0);

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(path.join(root, hf), 'utf8');
  jpgs.forEach(f => {
    const term = `assets/${f}`;
    const count = (content.match(new RegExp(term, 'g')) || []).length;
    usageCount[term] += count;
  });
});

console.log('\n=== USAGE COUNTS ACROSS ALL HTML PAGES ===');
let usageErrors = 0;
for (const [img, count] of Object.entries(usageCount)) {
  if (count === 1) {
    console.log(`✅ ${img.padEnd(42)} : exactly 1 usage`);
  } else {
    console.error(`❌ ${img.padEnd(42)} : ${count} usages (MUST BE 1)`);
    usageErrors++;
  }
}

if (usageErrors === 0) {
  console.log('\n✅ PERFECT 1:1 UNIQUE MAPPING! Every image is assigned to exactly one place.');
} else {
  console.error(`\n❌ Found ${usageErrors} usage irregularities.`);
}
