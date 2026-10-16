import fs from 'fs';
import path from 'path';

console.log('--- Verifying Stillwater Float & Sensory Spa ---');

const baseDir = path.resolve('.');
const filesToCheck = [
  'src/data/mockData.js',
  'src/context/SpaContext.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/PodSimulator.jsx',
  'src/components/AmbientAudio.jsx',
  'src/components/BookingModal.jsx',
  'src/pages/Home.jsx',
  'src/pages/Services.jsx',
  'src/pages/FirstTimeGuide.jsx',
  'src/pages/LoginModal.jsx',
  'src/pages/Dashboard.jsx',
  'src/App.jsx',
  'dist/index.html'
];

let allExist = true;
for (const file of filesToCheck) {
  const fullPath = path.join(baseDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${file}`);
    allExist = false;
  } else {
    console.log(`✓ Found: ${file} (${fs.statSync(fullPath).size} bytes)`);
  }
}

if (!allExist) {
  process.exit(1);
}

// Check key requirements in source files
const dashboardContent = fs.readFileSync(path.join(baseDir, 'src/pages/Dashboard.jsx'), 'utf-8');
const homeContent = fs.readFileSync(path.join(baseDir, 'src/pages/Home.jsx'), 'utf-8');
const servicesContent = fs.readFileSync(path.join(baseDir, 'src/pages/Services.jsx'), 'utf-8');
const guideContent = fs.readFileSync(path.join(baseDir, 'src/pages/FirstTimeGuide.jsx'), 'utf-8');
const loginContent = fs.readFileSync(path.join(baseDir, 'src/pages/LoginModal.jsx'), 'utf-8');
const bookingContent = fs.readFileSync(path.join(baseDir, 'src/components/BookingModal.jsx'), 'utf-8');
const mockDataContent = fs.readFileSync(path.join(baseDir, 'src/data/mockData.js'), 'utf-8');

const assertions = [
  { name: 'Dashboard includes package usage tracker', check: dashboardContent.includes('Active Package Tracker') && dashboardContent.includes('remainingSessions') },
  { name: 'Dashboard includes time slot booking trigger', check: dashboardContent.includes('setIsBookingModalOpen') },
  { name: 'Dashboard includes post-float wellness notes', check: dashboardContent.includes('Post-Float Wellness Diary') && dashboardContent.includes('preStressScore') },
  { name: 'Home page renders float benefits from data', check: homeContent.includes('FLOAT_BENEFITS') && mockDataContent.includes('Zero-Gravity Spinal Decompression') },
  { name: 'Home page includes pod simulator', check: homeContent.includes('PodSimulator') },
  { name: 'Services page renders float sessions & packages', check: servicesContent.includes('SERVICES.map') && mockDataContent.includes('Signature Sensory Float') && mockDataContent.includes('Deep Immersion Pack') },
  { name: 'First-Time Guide includes timeline & checklist', check: guideContent.includes('Your First Float Journey') && guideContent.includes('Preparation Checklist') },
  { name: 'Login modal includes member authentication', check: loginContent.includes('Member Sanctuary Portal') && loginContent.includes('Elena Vance') },
  { name: 'Booking modal supports slot selection & pods', check: bookingContent.includes('Reserve Your Sanctuary Time Slot') && bookingContent.includes('POD_TYPES') }
];

let passedCount = 0;
for (const a of assertions) {
  if (a.check) {
    console.log(`✓ Assertion passed: ${a.name}`);
    passedCount++;
  } else {
    console.error(`✗ Assertion failed: ${a.name}`);
  }
}

if (passedCount === assertions.length) {
  console.log(`\nAll ${passedCount}/${assertions.length} criteria successfully verified!`);
} else {
  console.error(`\nFailed: ${assertions.length - passedCount} criteria failed.`);
  process.exit(1);
}
