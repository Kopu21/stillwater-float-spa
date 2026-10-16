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
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Sensory_deprivation&gcmnamespace=6&gcmlimit=50&prop=imageinfo&iiprop=url|size&format=json`;
  const res = await fetchJson(url);
  if (!res || !res.query || !res.query.pages) {
    console.log('No pages');
    return;
  }
  const pages = Object.values(res.query.pages);
  console.log(`Found ${pages.length} files in Category:Sensory_deprivation:`);
  pages.forEach(p => {
    const info = (p.imageinfo && p.imageinfo[0]) || {};
    console.log(`- ${p.title} (${Math.round(info.size / 1024)} KB) -> ${info.url}`);
  });
}

run();
