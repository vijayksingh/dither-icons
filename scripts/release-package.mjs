import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const command = process.argv[2];
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const integrity = file => `sha512-${createHash('sha512').update(readFileSync(file)).digest('base64')}`;
const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`;

async function registry(path = '') {
  const response = await fetch(path ? `${registryUrl}/${path}` : registryUrl, { signal: AbortSignal.timeout(20_000) });
  if (response.status === 404) return null;
  assert.equal(response.status, 200, `Registry check failed: HTTP ${response.status}`);
  return response.json();
}

if (command === 'validate') {
  const tag = process.env.RELEASE_TAG;
  assert.match(tag || '', /^v\d+\.\d+\.\d+$/, 'Release tags must be stable SemVer: vX.Y.Z');
  assert.equal(tag, `v${pkg.version}`, 'Tag and package version differ');
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  assert.equal(lock.version, pkg.version, 'Lockfile version differs');
  assert.equal(lock.packages[''].version, pkg.version, 'Lockfile root version differs');
  assert.equal(pkg.repository.url, 'git+https://github.com/vijayksingh/dither-icons.git');
  assert.equal(git('rev-list', '-n', '1', tag), git('rev-parse', 'HEAD'), 'Checkout is not the release tag');
  execFileSync('git', ['merge-base', '--is-ancestor', 'HEAD', 'origin/main']);
  console.log(`Validated ${tag} at ${git('rev-parse', 'HEAD')}`);
} else if (command === 'prepare') {
  const [pack] = JSON.parse(execFileSync('npm', ['pack', '--ignore-scripts', '--json'], { encoding: 'utf8' }));
  const expected = ['AI.md', 'LICENSE', 'README.md', 'dist/index.d.ts', 'dist/index.js', 'icons.json', 'package.json'];
  assert.deepEqual(pack.files.map(file => file.path).sort(), expected.sort(), 'Unexpected package contents');
  mkdirSync('release', { recursive: true });
  copyFileSync(pack.filename, 'release/package.tgz');
  const metadata = { name: pkg.name, version: pkg.version, commit: git('rev-parse', 'HEAD'), integrity: integrity('release/package.tgz') };
  writeFileSync('release/package.json', JSON.stringify(metadata, null, 2) + '\n');
  writeFileSync('site-dist/release.json', JSON.stringify(metadata, null, 2) + '\n');
  writeFileSync('release/notes.md', `Release ${pkg.version}\n\n- Source: ${metadata.commit}\n- npm: https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}\n- Website: https://dithered.dev\n\nPackage, declarations, clean consumer installation, and public website checks are required by the release workflow.\n`);
  console.log(`Prepared ${pkg.name}@${pkg.version}: ${pack.files.length} files, ${pack.size} bytes`);
} else if (command === 'publish' || command === 'verify') {
  const artifact = JSON.parse(readFileSync('release/package.json', 'utf8'));
  assert.equal(artifact.name, pkg.name);
  assert.equal(artifact.version, pkg.version);
  assert.equal(artifact.commit, git('rev-parse', 'HEAD'), 'Artifact belongs to another commit');
  assert.equal(artifact.integrity, integrity('release/package.tgz'), 'Artifact integrity mismatch');
  const latest = await registry('latest');
  if (latest) {
    const left = pkg.version.split('.').map(Number);
    const right = latest.version.split('.').map(Number);
    const difference = left.map((part, index) => part - right[index]).find(part => part !== 0) || 0;
    assert.ok(difference >= 0, `Refusing to replace newer latest release ${latest.version}`);
  }
  let published = await registry(pkg.version);
  if (!published && command === 'publish') {
    execFileSync('npm', ['publish', 'release/package.tgz', '--access', 'public', '--tag', 'latest', '--ignore-scripts'], { stdio: 'inherit' });
  }
  // The version endpoint can become available before the package metadata used
  // by npm install. Wait for both the version and latest in that public index.
  let manifest;
  for (let attempt = 0; attempt < 36; attempt++) {
    manifest = await registry();
    published = manifest?.versions?.[pkg.version];
    if (published && manifest['dist-tags']?.latest === pkg.version) break;
    if (attempt === 0) console.log('Waiting for public npm metadata propagation...');
    await setTimeout(5000);
  }
  assert.ok(published, 'Package is not visible in the public registry');
  assert.equal(published.dist.integrity, artifact.integrity, 'Published version differs from this artifact; never overwrite or retag it');
  assert.equal(manifest['dist-tags']?.latest, pkg.version, 'npm latest does not point to this release');
  console.log(`Verified ${pkg.name}@${pkg.version} and latest, with matching package integrity`);
} else {
  throw new Error('Usage: node scripts/release-package.mjs validate|prepare|publish|verify');
}
