import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import * as library from '../src';
import { docs } from '../demo/content/docs';
import { agentPrompt } from '../demo/content/agent';
import { canonicalPath } from '../demo/routing';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const manifest = JSON.parse(read('public/icons.json'));

test('agent manifest resolves every exported icon and its actual motion', () => {
  assert.equal(manifest.count, library.definitions.length);
  assert.equal(manifest.icons.length, library.definitions.length);
  assert.equal(manifest.installation.publishedToNpm, false);
  assert.equal(new Set(manifest.icons.map((icon: { name: string }) => icon.name)).size, library.definitions.length);
  for (const icon of manifest.icons) {
    const definition = library.definitions.find(item => item.name === icon.name);
    assert.ok(definition, icon.name);
    assert.ok(icon.component in library, icon.component);
    assert.equal(icon.category, definition.category);
    assert.equal(icon.motion.durationMs, library.studies[icon.name].duration);
    assert.deepEqual(icon.motion.stages, library.studies[icon.name].stages);
    assert.equal(icon.page, `/icons/${icon.name}`);
  }
  assert.equal(read('icons.json'), read('public/icons.json'));
  assert.equal(read('AI.md'), read('public/AI.md'));
});

test('every downloadable guide contains the published sections and working local references', () => {
  const index = read('public/llms.txt');
  const full = read('public/llms-full.txt');
  for (const doc of docs) {
    const path = `/docs/${doc.slug || 'introduction'}.md`;
    const markdown = read(`public${path}`);
    assert.ok(index.includes(path), `${path} is discoverable`);
    for (const section of doc.sections) {
      assert.ok(markdown.includes(`## ${section.title}`));
      for (const block of section.blocks) if (block.type === 'code') assert.ok(markdown.includes(block.value));
    }
    assert.ok(full.includes(markdown.trim()), `${path} is in the complete guide`);
  }
  for (const [, path] of index.matchAll(/\]\((\/[^)]+)\)/g)) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${path} exists`);
  for (const icon of manifest.icons) assert.ok(full.includes(`| ${icon.name} | ${icon.component} |`));
});

test('agent instructions carry the selected component and host integration contract', () => {
  const prompt = agentPrompt('sign-out', 'outline', 24, 'https://icons.example');
  for (const token of ['SignOutIcon', 'texture="outline"', 'size={24}', 'color="currentColor"', 'aria-label="Sign Out"', 'di-trigger', 'https://icons.example/icons.json', 'reduced motion', 'existing application action and state', 'not published']) assert.ok(prompt.includes(token), token);
  assert.ok(!prompt.includes('SavePreferencesIcon'));
});

test('visual references preserve complete, unique SVG definitions and every real export label', () => {
  for (const file of ['textures.svg', 'icons.svg']) {
    const svg = read(`public/reference/${file}`);
    const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: unique IDs`);
    for (const [, id] of svg.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(id), `${file}: ${id} resolves`);
    assert.ok(svg.includes('viewBox='));
    assert.ok(!svg.includes('<style>'), `${file}: still visual reference`);
  }
  const sheet = read('public/reference/icons.svg');
  for (const icon of manifest.icons) assert.ok(sheet.includes(`>${icon.component}</text>`), icon.component);
});

test('existing links and normalized deep paths resolve to the intended pages', () => {
  assert.equal(canonicalPath('/', '#motion-studies'), '/motion');
  assert.equal(canonicalPath('/docs/ai/'), '/ai');
  assert.equal(canonicalPath('/icons/download/'), '/icons/download');
  assert.equal(canonicalPath('/', '#collection'), '/');
  assert.equal(canonicalPath('/docs/react', '#props'), '/docs/react');
});

test('serialized SVG contains actual motion and reduced-motion CSS, not an empty style element', () => {
  for (const icon of library.definitions) {
    const svg = renderToStaticMarkup(<library.DitherIcon name={icon.name} texture="solid" size={64} />);
    assert.ok(svg.includes(`@keyframes di-${icon.name}-`), `${icon.name}: authored tracks survive serialization`);
    assert.ok(svg.includes('@media(prefers-reduced-motion:reduce)'), `${icon.name}: stillness fallback survives`);
    assert.ok(!svg.includes('<style></style>'), icon.name);
  }
});
