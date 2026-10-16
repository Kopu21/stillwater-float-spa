const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
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
  const candidates = [
    // 1. Preparation suite candidates
    {
      name: 'cand_prep_mandarin.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Mandarin_Oriental_London_Spa_Relaxation_Room.jpg'
    },
    {
      name: 'cand_prep_vdara.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/DSC33344%2C_Vdara_Hotel_and_Spa%2C_CityCenter%2C_Las_Vegas%2C_Nevada%2C_USA_%285002682574%29.jpg'
    },
    {
      name: 'cand_prep_hotel_spa.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Hotel_Margareta_Wellness_%26_Spa._-_Balatonf%C3%BCred%2C_Hungary.JPG'
    },
    // Unsplash luxury spa / dressing suite / bench / towels / robe
    {
      name: 'cand_prep_unsplash1.jpg',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'
    },
    {
      name: 'cand_prep_unsplash_dressing.jpg',
      url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80'
    },
    {
      name: 'cand_prep_spa_bench.jpg',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80'
    },
    // 2. Float tank effortless floating
    {
      name: 'cand_float_isopod.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Flotation_Tank_Isolation_Tank.jpg'
    },
    {
      name: 'cand_float_tank_open.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/I-sopod_Flotation_Tank.jpg'
    },
    // 3. Post-float reflection lounge
    {
      name: 'cand_lounge_amantaka.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Reception_lounge_of_the_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg'
    },
    {
      name: 'cand_lounge_unsplash_quiet.jpg',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
    },
    {
      name: 'cand_lounge_unsplash_chairs.jpg',
      url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80'
    },
    {
      name: 'cand_lounge_zen_sofas.jpg',
      url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  for (const c of candidates) {
    try {
      const sz = await download(c.url, c.name);
      console.log(`Downloaded ${c.name} (${Math.round(sz / 1024)} KB)`);
    } catch (e) {
      console.error(`Failed ${c.name}: ${e.message}`);
    }
  }
}

run();
