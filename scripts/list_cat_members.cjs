const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const categories = [
    'Category:Isolation_tanks',
    'Category:Sensory_deprivation'
  ];

  for (const cat of categories) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(cat)}&cmnamespace=6&cmlimit=50&format=json`;
    const res = await fetchJson(url);
    if (res && res.query && res.query.categorymembers) {
      console.log(`\n=== ${cat} (${res.query.categorymembers.length} files) ===`);
      res.query.categorymembers.forEach(m => console.log(`- ${m.title}`));
    }
  }
}

run();
