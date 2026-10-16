const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa';
const assetsDir = path.join(root, 'assets');

// 1. Copy Image 1: Private Preparation Suite
const prepSrc = path.join(root, 'cand_float_tank_in_israel__galim_center.jpg');
const prepDst = path.join(assetsDir, 'guide-preparation-suite.jpg');
fs.copyFileSync(prepSrc, prepDst);
console.log(`Copied guide-preparation-suite.jpg (${Math.round(fs.statSync(prepDst).size / 1024)} KB)`);

// 2. Copy Image 2: Effortless Hydro-Buoyancy (Modern I-sopod float pod chamber)
const floatSrc = path.join(root, 'cand_float_isopod.jpg');
const floatDst = path.join(assetsDir, 'guide-floating-experience.jpg');
fs.copyFileSync(floatSrc, floatDst);
console.log(`Copied guide-floating-experience.jpg (${Math.round(fs.statSync(floatDst).size / 1024)} KB)`);

// 3. Copy Image 3: Post-Float Reflection Lounge
const loungeSrc = path.join(root, 'cand_mandarin_oriental_london_spa_relaxation_room.jpg');
const loungeDst = path.join(assetsDir, 'guide-post-float-integration.jpg');
fs.copyFileSync(loungeSrc, loungeDst);
console.log(`Copied guide-post-float-integration.jpg (${Math.round(fs.statSync(loungeDst).size / 1024)} KB)`);
