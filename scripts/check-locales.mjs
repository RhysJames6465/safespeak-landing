import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('src/i18n/locales');
const files = fs.readdirSync(dir).filter(name => name.endsWith('.json')).sort();
const schemas = files.map(name => [name, Object.keys(JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')))]);
const canonical = new Set(schemas.find(([name]) => name === 'en.json')[1]);
let failed = false;
for (const [name, keys] of schemas) {
  const actual = new Set(keys);
  const missing = [...canonical].filter(key => !actual.has(key));
  const unexpected = [...actual].filter(key => !canonical.has(key));
  if (missing.length || unexpected.length) { failed = true; console.error(`${name}: missing=${missing.join(',')} unexpected=${unexpected.join(',')}`); }
}
if (failed) process.exit(1);
console.log(`Locale schema valid: ${files.length} files, ${canonical.size} keys.`);
