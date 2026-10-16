import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const htmlPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Find css and js in assets
const assetsDir = path.join(distDir, 'assets');
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (cssFile && jsFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

  // Replace link rel="stylesheet" with inline <style>
  html = html.replace(/<link rel="stylesheet"[^>]*>/, `<style>${cssContent}</style>`);

  // Replace script type="module" with standard inline script
  html = html.replace(/<script type="module"[^>]*><\/script>/, `<script>${jsContent}</script>`);

  fs.writeFileSync(path.join(distDir, 'standalone.html'), html);
  // Also put a copy directly in the root folder so user can double click it directly in stillwater-float-spa/
  fs.writeFileSync(path.resolve('./standalone.html'), html);
  console.log('Successfully generated standalone.html (works with double-click over file:// without any server!)');
} else {
  console.error('Could not find assets in dist/assets');
}
