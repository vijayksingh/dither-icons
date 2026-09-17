import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import * as library from '../src';
import {keyframesFor, styleForStudy, type Study} from '../src/choreography';
import {SETS} from '../demo/MotionStudies';
import {componentName, filterIcons} from '../demo/model';
import {SIMPLIFY_ART as SA, SIMPLIFY_GEOMETRY as SG, SIMPLIFY_TIMING as ST, simplify} from '../src/motions/simplify';
import {TIGHTEN_ART as TA, TIGHTEN_TIMING as TT, tighten} from '../src/motions/tighten';
import {VIVID_ART as VA, VIVID_TIMING as VT, vivid} from '../src/motions/vivid';
import {TRANSFORM_SCOPE_ART as XA, TRANSFORM_SCOPE_OPACITY as XO, TRANSFORM_SCOPE_TIMING as XT, transformScope} from '../src/motions/transform-scope';

const names = ['simplify', 'tighten', 'vivid', 'transform-scope'];
const textures = ['dither', 'solid', 'outline'] as const;
const track = (study: Study, part: string) => study.tracks.find(t => t.part === part)!;
const svg = (name: string, texture: library.Texture = 'solid') => renderToStaticMarkup(<library.DitherIcon name={name} texture={texture} size={48} animate={false}/>);

test('selection commands expose four named exports, a dedicated studio family, and source meanings', () => {
  assert.deepEqual(SETS['Cognimated selection commands'], names);
  const entries = [
    ['simplify', library.SimplifyIcon, 'simplify text'], ['tighten', library.TightenIcon, 'concise text'],
    ['vivid', library.VividIcon, 'vivid text'], ['transform-scope', library.TransformScopeIcon, 'whole article'],
  ] as const;
  for (const [name, Component, query] of entries) {
    assert.ok(filterIcons(query, 'All icons').some(icon => icon.name === name));
    assert.equal(library.definitions.filter(d => d.name === name).length, 1);
    assert.ok(componentName(name) in library);
    const named = renderToStaticMarkup(<Component title={name} animate={false} active/>);
    assert.ok(named.includes(`data-icon="${name}"`));
    assert.match(named, /role="img"/); assert.match(named, /data-active="false"/);
    assert.match(named, /data-animate="false"/); assert.ok(!named.includes('aria-hidden'));
    assert.match(renderToStaticMarkup(<Component/>), /aria-hidden="true"/);
  }
});

test('simplify gathers retained text before its clarity response', () => {
  const lines = ['simplify-line-0', 'simplify-line-1', 'simplify-line-2'].map(part => track(simplify, part));
  assert.ok(lines[2].frames.find(f => f.at === ST.gather)!.transform!.includes('-.72px'));
  assert.ok(lines[2].frames.find(f => f.at === ST.gather)!.transform!.includes('scaleX(.8)'));
  assert.ok(track(simplify, 'simplify-clarity').frames.filter(f => f.at <= ST.register).every(f => f.opacity === 0));
  assert.equal(track(simplify, 'simplify-spark').origin, `${SG.sparkX}px ${SG.sparkY}px`);
  assert.ok(ST.gather < ST.clarify && ST.clarify < ST.register && ST.register < ST.clear);
  assert.ok(simplify.tracks.every(t => t.frames[0].transform === t.frames.at(-1)!.transform));
});

test('tighten uses opposing clamps around a retained text block', () => {
  const left = track(tighten, 'tighten-left-clamp'), right = track(tighten, 'tighten-right-clamp');
  assert.equal(left.frames.find(f => f.at === TT.squeeze)!.transform, 'translateX(1.18px)');
  assert.equal(right.frames.find(f => f.at === TT.squeeze)!.transform, 'translateX(-1.18px)');
  assert.equal(track(tighten, 'tighten-text').frames.find(f => f.at === TT.squeeze)!.transform, 'scaleX(.9)');
  assert.ok(track(tighten, 'tighten-registration').frames.filter(f => f.at <= TT.seat).every(f => f.opacity === 0));
  for (const d of [...TA.text, ...TA.left, ...TA.right]) assert.ok(svg('tighten').includes(`d="${d}"`));
  assert.ok(TT.seat < TT.register && TT.register < TT.release);
});

test('vivid keeps one text-bound star and delays the plus response', () => {
  assert.ok(track(vivid, 'vivid-highlight').frames.filter(f => f.at <= VT.flare).every(f => f.opacity === 0));
  assert.ok(track(vivid, 'vivid-plus').frames.find(f => f.at === VT.plus)!.transform!.includes('1.06'));
  assert.ok(svg('vivid').includes(`d="${VA.plus}"`));
  assert.ok(!vivid.tracks.some(t => /satellite|companion|field/.test(t.part)));
  assert.ok(VT.flare < VT.underline && VT.underline < VT.plus && VT.plus < VT.clear);
});

test('transform scope preserves page and selection silhouettes while the handoff responds', () => {
  assert.equal(track(transformScope, 'scope-page').frames[0].opacity, XO.page);
  assert.equal(track(transformScope, 'scope-selection').frames[0].opacity, XO.selection);
  assert.ok(track(transformScope, 'scope-transfer').frames.filter(f => f.at < XT.handoff).every(f => f.opacity === 0));
  assert.ok(XT.handoff < XT.seat && XT.seat < XT.clear && XT.clear < XT.release);
  for (const d of [XA.page, XA.fold, ...XA.pageLines, ...XA.selection, ...XA.selectionLines]) assert.ok(svg('transform-scope').includes(`d="${d}"`));
  assert.equal(track(transformScope, 'scope-page').frames.at(-1)!.transform, 'scale(1)');
  assert.equal(track(transformScope, 'scope-selection').frames.at(-1)!.transform, 'scale(1)');
});

test('selection commands share finite React/SVG tracks, reduced motion, and valid material exports', () => {
  for (const name of names) {
    const study = library.studies[name], css = styleForStudy(name);
    assert.ok(study.duration > 0); assert.match(css, /prefers-reduced-motion:reduce/); assert.ok(!css.includes('infinite'));
    for (const t of study.tracks) {
      const native = keyframesFor(study, t);
      assert.equal(native[0].offset, 0); assert.equal(native.at(-1)!.offset, 1);
      assert.equal(t.frames[0].transform, t.frames.at(-1)!.transform);
      assert.equal(t.frames[0].opacity, t.frames.at(-1)!.opacity);
      assert.ok(css.includes(`di-${name}-${t.part}`));
      for (const f of native) assert.ok(Object.keys(f).every(k => ['offset', 'transform', 'opacity', 'easing'].includes(k)));
    }
    for (const texture of textures) {
      const markup = svg(name, texture);
      assert.ok(!markup.includes('NaN'));
      const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
      assert.equal(ids.length, new Set(ids).size);
      new Resvg(markup, {fitTo: {mode: 'width', value: 48}}).render();
    }
  }
});
