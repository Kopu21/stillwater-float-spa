const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'
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

async function getCategoryFiles(catName) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(catName)}&cmlimit=30&format=json`;
  const res = await fetchJson(url);
  if (!res || !res.query || !res.query.categorymembers) return [];
  return res.query.categorymembers.map(m => m.title);
}

async function run() {
  const cats = [
    'Category:Isolation tanks',
    'Category:Sensory deprivation',
    'Category:Spa lounges',
    'Category:Day spas',
    'Category:Spas in Germany',
    'Category:Spas in Switzerland',
    'Category:Sauna interiors',
    'Category:Changing rooms'
  ];

  for (const c of cats) {
    const files = await getCategoryFiles(c);
    console.log(`\n=== ${c} (${files.length} items) ===`);
    files.slice(0, 10).forEach(f => console.log(`  - ${f}`));
  }
}

run();
