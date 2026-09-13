import fs from 'node:fs';
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));
const critical = ['h1','heroIntro','sub','cta1','cta2','ask','how','sUrgentH','fUrgentH','sticky'];
let failed = false;
for (const locale of ['ar','zh','yue','vi','pa','hi','ne','el']) {
  const dict = JSON.parse(fs.readFileSync(`src/i18n/locales/${locale}.json`, 'utf8'));
  const same = Object.keys(en).filter(key => dict[key] === en[key]);
  const criticalSame = critical.filter(key => dict[key] === en[key]);
  console.log(`${locale}: ${same.length}/${Object.keys(en).length} identical; critical English: ${criticalSame.join(', ') || 'none'}`);
  if (same.length > Object.keys(en).length * 0.25 || criticalSame.length) failed = true;
}
if (failed) process.exit(1);
