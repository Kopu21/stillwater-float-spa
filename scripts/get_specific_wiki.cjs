const https = require('https');
const fs = require('fs');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'StillwaterSpaApp/1.0 (test@example.com) Node/18'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

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

async function run() {
  const titles = [
    'File:Float tank in Israel- Galim center.JPG',
    'File:I-sopod Flotation Tank.jpg',
    'File:Quiet Please, Float Tank in Use - Bakersfield, CA - DSC00471.jpg',
    'File:Float Lab Orange Sensory Deprivation Chamber.jpg'
  ];

  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size&format=json`;
  const res = await fetchJson(url);
  if (!res || !res.query || !res.query.pages) {
    console.error('No pages found');
    return;
  }

  const pages = Object.values(res.query.pages);
  for (const p of pages) {
    const info = (p.imageinfo && p.imageinfo[0]) || {};
    if (info.url) {
      const cleanName = p.title.replace(/^File:/, '').replace(/[^a-zA-Z0-9_\.]/g, '_').toLowerCase();
      console.log(`Downloading ${p.title} (${Math.round(info.size / 1024)} KB)...`);
      try {
        const sz = await download(info.url, `cand_${cleanName}`);
        console.log(`Saved cand_${cleanName} (${Math.round(sz / 1024)} KB)`);
        await new Promise(r => setTimeout(r, 1200));
      } catch (e) {
        console.error(`Failed: ${e.message}`);
      }
    }
  }
}

run();
