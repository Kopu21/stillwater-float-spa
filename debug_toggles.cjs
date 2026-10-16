const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8098;
const CDP_PORT = 9248;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath.replace(/^\/+/, ''));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  try {
    const cp = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${CDP_PORT}`,
      'about:blank'
    ]);

    await new Promise(r => setTimeout(r, 1200));

    const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Found page target:', pageTarget.id, pageTarget.url);

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Runtime.enable');

    console.log(`Navigating to http://127.0.0.1:${PORT}/index.html`);
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });

    await new Promise(r => setTimeout(r, 1200));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          toggleThemeType: typeof window.toggleTheme,
          toggleDirType: typeof window.toggleDirection,
          themeAttr: document.documentElement.getAttribute('data-theme'),
          dirAttr: document.documentElement.getAttribute('dir')
        };
      })()`,
      returnByValue: true
    });

    console.log('Eval Result:', evalRes.result.value);

    // Call toggleTheme and toggleDirection
    const toggleRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const initialTheme = document.documentElement.getAttribute('data-theme');
        window.toggleTheme();
        const themeAfter = document.documentElement.getAttribute('data-theme');
        
        const initialDir = document.documentElement.getAttribute('dir');
        window.toggleDirection();
        const dirAfter = document.documentElement.getAttribute('dir');

        return {
          initialTheme,
          themeAfter,
          initialDir,
          dirAfter
        };
      })()`,
      returnByValue: true
    });

    console.log('Toggle Test Result:', toggleRes.result.value);

    cp.kill();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    server.close();
  }
});
