const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
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

async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
  const res = await fetchJson(url);
  if (!res || !res.results) return [];
  return res.results.map(r => ({
    id: r.id,
    desc: r.description || r.alt_description,
    url: r.urls && (r.urls.regular || r.urls.small)
  }));
}

async function run() {
  const q1 = await searchUnsplash('luxury spa changing room bench');
  console.log('=== luxury spa changing room bench ===');
  q1.forEach(r => console.log(`- [${r.id}] ${r.desc} -> ${r.url}`));

  const q2 = await searchUnsplash('spa relaxation lounge');
  console.log('\n=== spa relaxation lounge ===');
  q2.forEach(r => console.log(`- [${r.id}] ${r.desc} -> ${r.url}`));

  const q3 = await searchUnsplash('person floating water calm');
  console.log('\n=== person floating water calm ===');
  q3.forEach(r => console.log(`- [${r.id}] ${r.desc} -> ${r.url}`));
}

run();
