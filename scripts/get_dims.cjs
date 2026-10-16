const fs = require('fs');

function getJpegDimensions(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) break;
    const marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    const len = buffer.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

const candidates = [
  'cand_float_tank_in_israel__galim_center.jpg',
  'cand_mandarin_oriental_london_spa_relaxation_room.jpg',
  'cand_float_isopod.jpg',
  'cand_float_lab_orange_sensory_deprivation_chamber.jpg',
  'cand_float_lab_green_sensory_deprivation_chamber.jpg',
  'cand_flotation_tank_irvine.jpg',
  'cand_quiet_please__float_tank_in_use___bakersfield__ca___dsc00471.jpg',
  'cand_adhoc_sensory.jpg',
  'dl_float_1.jpg',
  'dl_float_3.jpg',
  'dl_float_4.jpg',
  'dl_float_5.jpg',
  'dl_float_6.jpg'
];

for (const c of candidates) {
  if (fs.existsSync(c)) {
    const buf = fs.readFileSync(c);
    const dim = getJpegDimensions(buf);
    console.log(`${c}: ${dim ? `${dim.width}x${dim.height}` : 'unknown'}, ${Math.round(buf.length / 1024)} KB`);
  }
}
