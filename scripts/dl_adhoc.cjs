const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
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
  const url = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Ad_hoc_sensory_deprivation.jpg';
  try {
    const sz = await download(url, 'cand_adhoc_sensory.jpg');
    console.log(`Saved cand_adhoc_sensory.jpg (${Math.round(sz / 1024)} KB)`);
  } catch (e) {
    console.error(e.message);
  }
}

run();
