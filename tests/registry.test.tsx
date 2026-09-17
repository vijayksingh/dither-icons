import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = JSON.parse(readFileSync(new URL('../registry.json', import.meta.url), 'utf8'));

test('shadcn registry declares a valid client adapter', () => {
  assert.equal(source.$schema, 'https://ui.shadcn.com/schema/registry.json');
  assert.equal(source.name, 'dither-icons');
  assert.equal(source.items.length, 1);
  const item = source.items[0];
  assert.equal(item.name, 'dither-icon');
  assert.equal(item.type, 'registry:ui');
  assert.deepEqual(item.dependencies, ['@unlocalhosted/dither-icons@^0.2.3']);
  assert.equal(item.files[0].path, 'registry/default/dither-icon.tsx');
  assert.match(readFileSync(new URL('../registry/default/dither-icon.tsx', import.meta.url), 'utf8'), /"use client"/);
});
