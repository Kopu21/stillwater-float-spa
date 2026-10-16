const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8093;
const CDP_PORT = 9250;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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
    await runTests();
  } catch (err) {
    console.error('Test run failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});

async function runTests() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(resolve => setTimeout(resolve, 1500));

  let targets;
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      targets = await res.json();
      if (targets && targets.length > 0) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  if (!targets || targets.length === 0) {
    throw new Error('Could not connect to Chrome DevTools Protocol');
  }

  // CRITICAL: Filter for type === 'page' to avoid extension background pages
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) {
    throw new Error('No page target found among targets');
  }

  const wsUrl = pageTarget.webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let messageId = 1;
  const pendingRequests = new Map();
  const eventListeners = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingRequests.has(data.id)) {
      const { resolve, reject } = pendingRequests.get(data.id);
      pendingRequests.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    } else if (data.method) {
      for (const listener of eventListeners) {
        listener(data);
      }
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  function navigateAndWait(url) {
    return new Promise((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, 4000);

      const listener = (data) => {
        if (data.method === 'Page.loadEventFired' && !resolved) {
          resolved = true;
          clearTimeout(timeout);
          setTimeout(resolve, 250);
        }
      };

      eventListeners.push(listener);
      send('Page.navigate', { url }).catch(reject);
    });
  }

  const viewports = [
    { name: 'Ultra-Compact Phone', width: 320, height: 600 },
    { name: 'Mandatory Compact Phone', width: 360, height: 640 },
    { name: 'Standard Phone (iPhone)', width: 375, height: 667 },
    { name: 'Large Phone', width: 425, height: 800 },
    { name: 'Portrait Tablet (iPad)', width: 768, height: 1024 },
    { name: 'Landscape Tablet / Small Laptop', width: 1024, height: 768 },
    { name: 'Desktop Display', width: 1440, height: 900 }
  ];

  const testPages = [
    'index.html',
    'home-2.html',
    'services.html',
    'about.html',
    'first-time-guide.html',
    'blog.html',
    'contact.html',
    'login.html',
    'dashboard.html',
    'article-theta-neurochemistry.html'
  ];

  console.log('\n======================================================');
  console.log('   CROSS-VIEWPORT RESPONSIVE & LAYOUT VERIFICATION');
  console.log('======================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const page of testPages) {
    console.log(`\n📄 Testing Page: ${page}`);

    await navigateAndWait(`http://127.0.0.1:${PORT}/${page}`);

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width <= 768
      });

      await new Promise(r => setTimeout(r, 120));

      // 1. Evaluate horizontal overflow
      const evalOverflow = await send('Runtime.evaluate', {
        expression: `(() => {
          try {
            const docEl = document.documentElement;
            const body = document.body;
            const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
            const clientWidth = docEl.clientWidth;
            const overflowX = scrollWidth - clientWidth;
            
            const overflowingElements = [];
            const all = document.querySelectorAll('*');
            for (let el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > clientWidth + 2) {
                overflowingElements.push({
                  tag: el.tagName,
                  class: (el.className && typeof el.className === 'string') ? el.className.slice(0, 30) : '',
                  right: Math.round(rect.right),
                  excess: Math.round(rect.right - clientWidth)
                });
              }
            }
            return {
              scrollWidth,
              clientWidth,
              overflowX,
              overflowingElements: overflowingElements.slice(0, 3)
            };
          } catch (e) {
            return { error: e.message };
          }
        })()`,
        returnByValue: true
      });

      totalTests++;
      const res = evalOverflow.result.value;
      if (res && res.overflowX <= 2) {
        console.log(`  ✅ [${vp.width}px - ${vp.name}]: Zero horizontal overflow (scrollWidth: ${res.scrollWidth}px, clientWidth: ${res.clientWidth}px)`);
        passedTests++;
      } else {
        console.error(`  ❌ [${vp.width}px - ${vp.name}]: OVERFLOW: +${res.overflowX}px! Elements:`, res ? res.overflowingElements : 'unknown');
        failedTests++;
      }

      // 2. Header fit check (on full layout pages)
      if (page !== 'login.html') {
        const evalHeader = await send('Runtime.evaluate', {
          expression: `(() => {
            try {
              const header = document.querySelector('.navbar-main');
              if (!header) return null;
              const hRect = header.getBoundingClientRect();
              const actions = document.querySelector('.nav-actions');
              const aRect = actions ? actions.getBoundingClientRect() : null;
              const logo = document.querySelector('.brand-logo');
              const lRect = logo ? logo.getBoundingClientRect() : null;
              const cta = document.querySelector('.nav-actions .btn-book-primary');
              const ctaVisible = cta ? window.getComputedStyle(cta).display !== 'none' : false;
              const hamburger = document.querySelector('.mobile-toggle');
              const hamburgerVisible = hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false;

              return {
                headerRight: Math.round(hRect.right),
                viewportWidth: window.innerWidth,
                actionsRight: aRect ? Math.round(aRect.right) : 0,
                ctaVisible,
                hamburgerVisible
              };
            } catch (e) {
              return { error: e.message };
            }
          })()`,
          returnByValue: true
        });

        totalTests++;
        const hRes = evalHeader.result.value;
        if (hRes && hRes.actionsRight <= hRes.viewportWidth + 2) {
          console.log(`     ↳ Header fits cleanly: actionsRight=${hRes.actionsRight}px <= viewport=${hRes.viewportWidth}px (CTA: ${hRes.ctaVisible ? 'shown' : 'hidden'}, MenuToggle: ${hRes.hamburgerVisible ? 'shown' : 'hidden'})`);
          passedTests++;
        } else if (hRes) {
          console.error(`     ↳ ❌ Header clipped: actionsRight=${hRes.actionsRight}px > viewport=${hRes.viewportWidth}px`);
          failedTests++;
        }
      }
    }

    // 3. Test Silent Theme & Direction Toggling on this page
    const evalToggles = await send('Runtime.evaluate', {
      expression: `(() => {
        try {
          let toastFired = false;
          if (typeof window.showToast === 'function') {
            const oldToast = window.showToast;
            window.showToast = function() {
              toastFired = true;
              oldToast.apply(this, arguments);
            };
          }

          const toggleThemeFn = window.toggleTheme || (typeof toggleTheme === 'function' ? toggleTheme : null);
          const toggleDirFn = window.toggleDirection || (typeof toggleDirection === 'function' ? toggleDirection : null);

          const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          if (toggleThemeFn) toggleThemeFn();
          const themeAfter1 = document.documentElement.getAttribute('data-theme') || 'dark';
          const toastAfterTheme = toastFired;

          const initialDir = document.documentElement.getAttribute('dir') || 'ltr';
          if (toggleDirFn) toggleDirFn();
          const dirAfter1 = document.documentElement.getAttribute('dir') || 'ltr';
          const toastAfterDir = toastFired;

          // Restore original state
          if (toggleThemeFn) toggleThemeFn();
          if (toggleDirFn) toggleDirFn();

          return {
            hasToggleTheme: !!toggleThemeFn,
            hasToggleDirection: !!toggleDirFn,
            initialTheme,
            themeAfter1,
            toastAfterTheme,
            initialDir,
            dirAfter1,
            toastAfterDir
          };
        } catch (e) {
          return { error: e.message };
        }
      })()`,
      returnByValue: true
    });

    totalTests += 2;
    const tRes = evalToggles.result.value;
    if (tRes && !tRes.error && !tRes.toastAfterTheme && tRes.themeAfter1 !== tRes.initialTheme) {
      console.log(`  ✅ Silent theme switch: ${tRes.initialTheme} -> ${tRes.themeAfter1} with ZERO notifications`);
      passedTests++;
    } else {
      console.error(`  ❌ Theme switch check failed:`, tRes);
      failedTests++;
    }

    if (tRes && !tRes.error && !tRes.toastAfterDir && tRes.dirAfter1 !== tRes.initialDir) {
      console.log(`  ✅ Silent direction switch: ${tRes.initialDir} -> ${tRes.dirAfter1} with ZERO notifications`);
      passedTests++;
    } else {
      console.error(`  ❌ Direction switch check failed:`, tRes);
      failedTests++;
    }
  }

  console.log('\n======================================================');
  console.log(`TOTAL AUDIT CHECKS: ${totalTests}`);
  console.log(`PASSED: ${passedTests}`);
  console.log(`FAILED: ${failedTests}`);
  console.log('======================================================\n');

  chromeProcess.kill();
  process.exit(failedTests === 0 ? 0 : 1);
}
