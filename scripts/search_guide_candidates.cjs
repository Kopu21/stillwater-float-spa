const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function searchCommons(term) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&srnamespace=6&srlimit=8&format=json`;
  const res = await fetchJson(url);
  if (!res || !res.query || !res.query.search) return [];
  const titles = res.query.search.map(s => s.title);
  
  if (titles.length === 0) return [];
  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const infoRes = await fetchJson(infoUrl);
  if (!infoRes || !infoRes.query || !infoRes.query.pages) return [];
  
  const pages = Object.values(infoRes.query.pages);
  return pages.map(p => {
    const info = (p.imageinfo && p.imageinfo[0]) || {};
    return {
      title: p.title,
      url: info.url,
      size: info.size,
      mime: info.mime
    };
  }).filter(i => i.url && i.mime && i.mime.startsWith('image/'));
}

async function run() {
  const terms = ['sensory deprivation tank', 'flotation tank', 'spa relaxation room', 'spa lounge interior', 'wellness center changing room', 'sauna rest lounge'];
  for (const t of terms) {
    const results = await searchCommons(t);
    console.log(`\nResults for "${t}":`);
    results.forEach(r => console.log(`- ${r.title} (${Math.round(r.size/1024)} KB) -> ${r.url}`));
  }
}

run();
