const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://commons.wikimedia.org/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

async function run() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  
  // 1. Blog Hero: A tranquil, deep neuroscience / float REST stillness water atmosphere
  // Unsplash: calm dark deep water ripples reflecting subtle light (ideal for "The Science of Stillness & REST")
  const blogUrl = 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80';
  
  // 2. First-Time Guide Hero: Serene, welcoming luxury spa sanctuary entrance / threshold (ideal for "Your Maiden Voyage Into Stillness")
  // Unsplash: luxury serene spa sanctuary interior with warm soft lighting
  const guideUrl = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80';
  
  // 3. Services Hero: Luxurious hydrotherapy thermal pool and float suite atmosphere (ideal for "Therapeutic Sanctuary Menu")
  // Wikimedia Commons: Hotel Margareta Wellness & Spa thermal pool or Unsplash luxury spa hydro-pool
  const servicesUrl = 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80';

  console.log('Downloading hero backgrounds...');
  
  const bSz = await download(blogUrl, path.join(assetsDir, 'hero-blog-bg.jpg'));
  console.log(`Saved hero-blog-bg.jpg: ${Math.round(bSz / 1024)} KB`);

  const gSz = await download(guideUrl, path.join(assetsDir, 'hero-guide-bg.jpg'));
  console.log(`Saved hero-guide-bg.jpg: ${Math.round(gSz / 1024)} KB`);

  const sSz = await download(servicesUrl, path.join(assetsDir, 'hero-services-bg.jpg'));
  console.log(`Saved hero-services-bg.jpg: ${Math.round(sSz / 1024)} KB`);
}

run().catch(e => console.error('Error:', e.message));
