const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://commons.wikimedia.org/'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://commons.wikimedia.org/',
        'Accept': 'image/*,*/*'
      }
    };
    https.get(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

async function searchAndDownload(query, prefix) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=6&format=json`;
  const res = await fetchJson(searchUrl);
  if (!res || !res.query || !res.query.search) return [];
  const titles = res.query.search.map(s => s.title);
  if (titles.length === 0) return [];
  
  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const infoRes = await fetchJson(infoUrl);
  if (!infoRes || !infoRes.query || !infoRes.query.pages) return [];

  const pages = Object.values(infoRes.query.pages);
  let idx = 0;
  for (const p of pages) {
    const info = (p.imageinfo && p.imageinfo[0]) || {};
    if (info.url && info.mime && info.mime.startsWith('image/') && info.size > 50000) {
      idx++;
      const filename = `${prefix}_${idx}.jpg`;
      try {
        console.log(`Downloading ${p.title} -> ${filename}...`);
        const sz = await download(info.url, filename);
        console.log(`Saved ${filename} (${Math.round(sz / 1024)} KB)`);
        await new Promise(r => setTimeout(r, 1200));
      } catch (e) {
        console.error(`Failed ${filename}: ${e.message}`);
      }
    }
  }
}

async function run() {
  console.log('Searching 1: Preparation Suite / Spa Dressing Room / Towels Bench...');
  await searchAndDownload('spa changing room interior', 'dl_prep');
  await searchAndDownload('sauna relaxation room bench', 'dl_prep_bench');

  console.log('Searching 2: Floatation Tank / Sensory Deprivation...');
  await searchAndDownload('flotation tank', 'dl_float');
  await searchAndDownload('isolation tank', 'dl_iso');

  console.log('Searching 3: Post-Float Reflection Lounge / Spa quiet room...');
  await searchAndDownload('spa relaxation room', 'dl_lounge');
  await searchAndDownload('spa quiet lounge', 'dl_quiet');
}

run();
