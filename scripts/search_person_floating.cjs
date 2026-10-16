const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 StillwaterBot/1.0',
        'Referer': 'https://commons.wikimedia.org/'
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

async function searchCommons(q) {
  console.log(`\n--- Searching: ${q} ---`);
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=10&format=json`;
  const res = await fetchJson(searchUrl);
  if (res && res.query && res.query.search) {
    const titles = res.query.search.map(s => s.title);
    if (titles.length === 0) return;
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|mime&format=json`;
    const infoRes = await fetchJson(infoUrl);
    if (infoRes && infoRes.query && infoRes.query.pages) {
      for (const p of Object.values(infoRes.query.pages)) {
        const info = p.imageinfo && p.imageinfo[0];
        if (info && info.mime && info.mime.startsWith('image/')) {
          console.log(`- ${p.title} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB): ${info.url}`);
        }
      }
    }
  }
}

async function run() {
  await searchCommons('"sensory deprivation" floating');
  await searchCommons('"float tank" floating');
  await searchCommons('"flotation therapy"');
  await searchCommons('"floating" saltwater epsom');
}

run();
