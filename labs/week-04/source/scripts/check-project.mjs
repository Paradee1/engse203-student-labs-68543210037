import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const requiredFiles = [
  'src/App.jsx',
  'src/components/AppHeader.jsx',
  'src/components/SummaryPanel.jsx',
  'src/components/RequestForm.jsx',
  'src/components/FilterBar.jsx',
  'src/components/RequestList.jsx',
  'src/components/RequestCard.jsx',
  'src/data/initialRequests.js',
];

const failures = [];

for (const file of requiredFiles) {
  try {
    await access(join(root, file));
  } catch {
    failures.push(`missing file: ${file}`);
  }
}

const sourceFiles = await Promise.all(
  requiredFiles
    .filter((file) => file.endsWith('.jsx'))
    .map((file) => readFile(join(root, file), 'utf8').catch(() => ''))
);

const source = sourceFiles.join('\n');

const checks = [
  ['controlled input', /value\s*=\s*\{|onChange\s*=\s*\{/],
  ['stable key', /key\s*=\s*\{/],
  ['immutable add', /\[\s*\.\.\.|setRequests/],
  ['conditional UI', /length\s*===\s*0|empty-state/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(source)) {
    failures.push(`missing pattern: ${name}`);
  }
}

if (failures.length > 0) {
  console.log('\nLAB 04 final check: NOT READY');
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exit(1);
}

console.log('\nLAB 04 final check: READY!');