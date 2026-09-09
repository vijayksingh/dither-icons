import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as library from '../src';
import { collection, componentName, filterIcons, reactCode } from '../demo/model';

test('homepage presents every accepted icon exactly once, using real named exports', () => {
  assert.equal(collection.length, library.definitions.length);
  assert.equal(new Set(collection.map(icon => icon.name)).size, library.definitions.length);
  for (const icon of collection) assert.ok(componentName(icon.name) in library, `${icon.name} has a copyable export`);
});

test('search combines semantic keywords, whitespace, and category filters', () => {
  assert.ok(filterIcons('  SAVE   preferences ', 'All icons').some(icon => icon.name === 'save-preferences'));
  assert.ok(filterIcons('logout', 'All icons').some(icon => icon.name === 'sign-out'));
  assert.equal(filterIcons('download', 'Files').length, 1);
  assert.equal(filterIcons('download', 'Communication').length, 0);
  assert.equal(filterIcons('a nonexistent icon', 'All icons').length, 0);
});

test('copied React example includes the chosen material, color, size, motion and accessible target', () => {
  const code = reactCode('save-preferences', 32, 'outline', '#315bc4', false);
  for (const token of ['SavePreferencesIcon', 'size={32}', 'texture="outline"', 'color="#315bc4"', 'animate={false}', 'className="di-trigger"', 'aria-label="Save Preferences"']) assert.ok(code.includes(token), token);
});
