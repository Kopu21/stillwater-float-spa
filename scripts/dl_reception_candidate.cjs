const https = require('https');
const fs = require('fs');
const path = require('path');

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
  const url = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Reception_lounge_of_the_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg';
  const dest = path.join(__dirname, '..', 'cand_spa_reception.jpg');
  console.log('Downloading Amantaka spa reception lounge...');
  const sz = await download(url, dest);
  console.log(`Saved cand_spa_reception.jpg: ${Math.round(sz / 1024)} KB`);
}

run().catch(e => console.error('Error:', e.message));
