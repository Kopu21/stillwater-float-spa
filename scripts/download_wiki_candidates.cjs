const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'StillwaterSpaApp/1.0 (https://stillwaterspa.example.com; spa@example.com) Node/18'
      }
    };
    
    https.get(options, (res) => {
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
  const list = [
    {
      name: 'cand_lounge_mandarin.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Mandarin_Oriental_London_Spa_Relaxation_Room.jpg'
    },
    {
      name: 'cand_float_rest.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Floatation_REST.jpg'
    },
    {
      name: 'cand_lounge_amantaka.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Reception_lounge_of_the_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg'
    },
    {
      name: 'cand_float_irvine.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flotation_Tank%2C_Irvine_Pilot_House.JPG'
    }
  ];

  for (const item of list) {
    try {
      console.log(`Downloading ${item.name}...`);
      const sz = await download(item.url, item.name);
      console.log(`Success: ${item.name} (${Math.round(sz / 1024)} KB)`);
      // polite delay
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
}

run();
