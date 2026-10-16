const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'StillwaterBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const queries = [
    'floatarium',
    'float tank',
    'flotation REST',
    'sensory isolation',
    'dead sea floating person',
    'salt water floating back'
  ];

  for (const q of queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=8&format=json`;
    const res = await fetchJson(url);
    if (res && res.query && res.query.search) {
      console.log(`\n=== "${q}" ===`);
      res.query.search.forEach(s => console.log(`- ${s.title}`));
    }
  }
}

run();
