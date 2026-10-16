const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  // Search Wikimedia with specific person floating terms
  const terms = [
    'float tank person',
    'flotation tank woman',
    'flotation tank man',
    'sensory deprivation floating',
    'float pod person',
    'spa preparation suite',
    'spa private suite bench',
    'spa dressing room robe',
    'spa relaxation lounge tea',
    'spa quiet room daybed'
  ];

  for (const t of terms) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(t)}&srnamespace=6&srlimit=5&format=json`;
    const res = await fetchJson(url);
    if (res && res.query && res.query.search && res.query.search.length > 0) {
      console.log(`\n=== Term: "${t}" ===`);
      res.query.search.forEach(s => console.log(`- ${s.title}`));
    }
  }
}

run();
