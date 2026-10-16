const fs = require('fs');
const path = require('path');

const p = 'C:\\Users\\koper\\.gemini\\antigravity\\scratch\\stillwater-float-spa\\standalone.html';
let content = fs.readFileSync(p, 'utf8');
content = content.replace(/zt=\(\)=>\{[\s\S]*?className:`fixed bottom-6 right-6 z-40`[\s\S]*?\}\)\}\)\},Bt=/g, 'zt=()=>null,Bt=');
fs.writeFileSync(p, content, 'utf8');
console.log('Updated standalone.html zt component to null');
