import fs from 'fs';
import path from 'path';

console.log('=== Verifying Stillwater Float Spa Multi-Page Website ===');

const pages = [
  'index.html',
  'services.html',
  'first-time-guide.html',
  'login.html',
  'dashboard.html',
  'css/style.css',
  'js/app.js'
];

let allExist = true;
for (const p of pages) {
  const full = path.resolve(p);
  if (fs.existsSync(full)) {
    const sz = fs.statSync(full).size;
    console.log(`✓ [PASS] File exists: ${p} (${sz} bytes)`);
  } else {
    console.error(`✗ [FAIL] Missing file: ${p}`);
    allExist = false;
  }
}

if (!allExist) {
  process.exit(1);
}

// Check contents
const indexHtml = fs.readFileSync('index.html', 'utf-8');
const servicesHtml = fs.readFileSync('services.html', 'utf-8');
const guideHtml = fs.readFileSync('first-time-guide.html', 'utf-8');
const loginHtml = fs.readFileSync('login.html', 'utf-8');
const dashHtml = fs.readFileSync('dashboard.html', 'utf-8');
const appJs = fs.readFileSync('js/app.js', 'utf-8');

const checks = [
  { name: 'Home page includes Float Benefits (spinal decompression, theta brainwaves, cortisol)', ok: indexHtml.includes('Spinal Decompression') && indexHtml.includes('Theta Brainwave') && indexHtml.includes('Cortisol Reduction') },
  { name: 'Home page includes Pod Simulator & Breathing guide', ok: indexHtml.includes('simWindow') && indexHtml.includes('breathePacer') },
  { name: 'Services page includes single float sessions & packages', ok: servicesHtml.includes('60-Minute Signature Sensory Float') && servicesHtml.includes('5-Session Deep Immersion Pack') },
  { name: 'First-time guide includes 4-stage preparation & checklist', ok: guideHtml.includes('Before You Arrive') && guideHtml.includes('checklistScore') && guideHtml.includes('Frequently Asked Questions') },
  { name: 'Login portal includes 1-click Demo Persona launcher', ok: loginHtml.includes('Elena Vance') && loginHtml.includes('loginDemo') },
  { name: 'Dashboard includes Package Usage Tracker with dial', ok: dashHtml.includes('dialCircle') && dashHtml.includes('Package Usage') && dashHtml.includes('Floats Left') },
  { name: 'Dashboard includes Float Session Time Slot Booking modal', ok: dashHtml.includes('Reserve Float Session Slot') && dashHtml.includes('modalSlot') },
  { name: 'Dashboard includes Post-Float Wellness Notes journal', ok: dashHtml.includes('Post-Float Wellness Diary') && dashHtml.includes('preStressScore') && dashHtml.includes('wellnessNotesList') },
  { name: 'app.js includes bookFloatSlot and addWellnessEntry logic', ok: appJs.includes('bookFloatSlot') && appJs.includes('addWellnessEntry') && appJs.includes('DEFAULT_USER') }
];

let passed = 0;
for (const c of checks) {
  if (c.ok) {
    console.log(`✓ [PASS] Requirement satisfied: ${c.name}`);
    passed++;
  } else {
    console.error(`✗ [FAIL] Requirement not found: ${c.name}`);
  }
}

console.log(`\nResult: ${passed}/${checks.length} tests passed successfully!`);
if (passed !== checks.length) process.exit(1);
