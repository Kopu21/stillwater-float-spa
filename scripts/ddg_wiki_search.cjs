const https = require('https');

function ddgSearch(query) {
  return new Promise((resolve) => {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const matches = [...data.matchAll(/class="result__url"[^>]*>([^<]+)<\/a>/g)].map(m => m[1].trim());
        const titles = [...data.matchAll(/class="result__title"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({
          href: m[1],
          text: m[2].replace(/<[^>]+>/g, '').trim()
        }));
        resolve(titles);
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const q1 = await ddgSearch('"isolation tank" site:commons.wikimedia.org/wiki/File:');
  console.log('=== Float Tank Files ===');
  q1.slice(0, 8).forEach(r => console.log(`- ${r.text} -> ${r.href}`));

  const q2 = await ddgSearch('"relaxation room" "spa" site:commons.wikimedia.org/wiki/File:');
  console.log('\n=== Spa Relaxation Room Files ===');
  q2.slice(0, 8).forEach(r => console.log(`- ${r.text} -> ${r.href}`));

  const q3 = await ddgSearch('"spa" "changing room" OR "dressing room" site:commons.wikimedia.org/wiki/File:');
  console.log('\n=== Spa Changing / Dressing Room Files ===');
  q3.slice(0, 8).forEach(r => console.log(`- ${r.text} -> ${r.href}`));
}

run();
