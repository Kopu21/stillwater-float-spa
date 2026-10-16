const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('🚀 Building production distribution for Vercel/Static deployment...');

// 1. Ensure clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Copy all HTML files from root to dist
const files = fs.readdirSync(rootDir);
let htmlCount = 0;
for (const file of files) {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
    htmlCount++;
  }
}
console.log(`✓ Copied ${htmlCount} HTML pages to dist/`);

// 4. Copy assets directory
copyDir(path.join(rootDir, 'assets'), path.join(distDir, 'assets'));
const assetFiles = fs.existsSync(path.join(distDir, 'assets')) ? fs.readdirSync(path.join(distDir, 'assets')).length : 0;
console.log(`✓ Copied assets directory (${assetFiles} files) to dist/assets/`);

// 5. Copy css directory
copyDir(path.join(rootDir, 'css'), path.join(distDir, 'css'));
console.log('✓ Copied css directory to dist/css/');

// 6. Copy js directory
copyDir(path.join(rootDir, 'js'), path.join(distDir, 'js'));
console.log('✓ Copied js directory to dist/js/');

// 7. Copy public files (favicon.svg, icons.svg) directly to dist
if (fs.existsSync(path.join(rootDir, 'public'))) {
  const publicFiles = fs.readdirSync(path.join(rootDir, 'public'));
  for (const pf of publicFiles) {
    fs.copyFileSync(path.join(rootDir, 'public', pf), path.join(distDir, pf));
  }
  console.log(`✓ Copied ${publicFiles.length} public root files to dist/`);
}

console.log('✅ Build completed successfully! All pages and assets are packaged in dist/.');
