#!/usr/bin/env node
// Verify all src/locales/*.json files have parity with en.json (no missing or extra keys).
// Also verify each non-en locale is registered in src/translations.js.

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const localesDir = path.join(repoRoot, 'src', 'locales');
const translationsFile = path.join(repoRoot, 'src', 'translations.js');

const baseline = 'en';
const baselinePath = path.join(localesDir, `${baseline}.json`);
const baselineKeys = new Set(Object.keys(JSON.parse(fs.readFileSync(baselinePath, 'utf8'))));

const localeFiles = fs.readdirSync(localesDir).filter((f) => f.endsWith('.json'));
const translationsSource = fs.readFileSync(translationsFile, 'utf8');

let errors = 0;

for (const file of localeFiles) {
  const locale = path.basename(file, '.json');
  const filePath = path.join(localesDir, file);
  const keys = new Set(Object.keys(JSON.parse(fs.readFileSync(filePath, 'utf8'))));

  if (locale === baseline) continue;

  const missing = [...baselineKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !baselineKeys.has(k));

  if (missing.length || extra.length) {
    errors++;
    console.error(`\nsrc/locales/${file}: parity mismatch vs ${baseline}.json`);
    if (missing.length) console.error(`  missing keys (${missing.length}): ${missing.join(', ')}`);
    if (extra.length) console.error(`  extra keys (${extra.length}): ${extra.join(', ')}`);
  }

  const importRegex = new RegExp(`import\\s+${locale}\\s+from\\s+['"]\\./locales/${locale}\\.json['"]`);
  const registryRegex = new RegExp(`LOCALES\\s*=\\s*\\{[^}]*\\b${locale}\\b`);
  if (!importRegex.test(translationsSource) || !registryRegex.test(translationsSource)) {
    errors++;
    console.error(`\nsrc/locales/${file}: not wired into src/translations.js`);
    console.error(`  add: import ${locale} from './locales/${locale}.json';`);
    console.error(`  add: LOCALES = { ..., ${locale} };`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} translation problem(s) found.`);
  process.exit(1);
}

console.log(`All ${localeFiles.length} locale file(s) match ${baseline}.json and are registered.`);
