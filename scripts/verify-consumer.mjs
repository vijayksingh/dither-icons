import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const target = process.argv[2];
if (!target) throw new Error('Supply a tarball path or an exact registry package version');
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const version = name => `${name}@${lock.packages[`node_modules/${name}`].version}`;
const folder = mkdtempSync(join(tmpdir(), 'dither-consumer-'));
const run = (program, args) => execFileSync(program, args, { cwd: folder, stdio: 'inherit' });
try {
  writeFileSync(join(folder, 'package.json'), '{"private":true,"type":"module"}\n');
  const spec = target.endsWith('.tgz') ? resolve(target) : target;
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', spec,
    ...['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript'].map(version)]);
  writeFileSync(join(folder, 'check.mjs'), `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DitherIcon, DownloadIcon, definitions } from '@unlocalhosted/dither-icons';
assert.ok(definitions.length >= 68);
for (const icon of definitions) {
  const svg = renderToStaticMarkup(createElement(DitherIcon, { name: icon.name, animate: false }));
  assert.ok(svg.includes('data-icon="' + icon.name + '"'), icon.name);
}
assert.match(renderToStaticMarkup(createElement(DownloadIcon, { title: 'Download', animate: false })), /<svg/);
console.log('Clean consumer: named exports and all ' + definitions.length + ' icon renders passed');
`);
  writeFileSync(join(folder, 'check.tsx'), `import { DownloadIcon, DitherIcon } from '@unlocalhosted/dither-icons';\nexport const example = <><DownloadIcon size={48} texture="dither" /><DitherIcon name="download" animate={false} /></>;\n`);
  run(process.execPath, ['check.mjs']);
  run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit', '--strict', '--jsx', 'react-jsx', '--module', 'NodeNext', '--target', 'ES2022', 'check.tsx']);
  console.log('Clean consumer: public TypeScript declarations passed');
} finally {
  rmSync(folder, { recursive: true, force: true });
}
