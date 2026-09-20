import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import * as library from '../src';
import {keyframesFor, styleForStudy, type Study} from '../src/choreography';
import {SETS} from '../demo/MotionStudies';
import {componentName, filterIcons} from '../demo/model';
import {SIMPLIFY_ART as SA, SIMPLIFY_TIMING as ST, simplify} from '../src/motions/simplify';
import {TIGHTEN_ART as TA, TIGHTEN_TIMING as TT, TIGHTEN_WORD_POSES as TP, tighten} from '../src/motions/tighten';
import {VIVID_ART as VA, VIVID_GEOMETRY as VG, VIVID_TIMING as VT, vivid} from '../src/motions/vivid';
import {TRANSFORM_SCOPE_ART as XA, TRANSFORM_SCOPE_CORNERS as XC, TRANSFORM_SCOPE_OPACITY as XO, TRANSFORM_SCOPE_TIMING as XT, transformScope} from '../src/motions/transform-scope';

const names = ['simplify', 'tighten', 'vivid', 'transform-scope'];
const textures = ['dither', 'solid', 'outline'] as const;
const track = (study: Study, part: string) => study.tracks.find(t => t.part === part)!;
const svg = (name: string, texture: library.Texture = 'solid') => renderToStaticMarkup(<library.DitherIcon name={name} texture={texture} size={48} animate={false}/>);

test('selection commands expose four stable exports, a dedicated studio family, and source meanings', () => {
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

test('simplify folds subordinate branches into a stable meaning spine', () => {
  const upper = track(simplify, 'simplify-branch-upper'), lower = track(simplify, 'simplify-branch-lower');
  assert.match(upper.frames.find(f => f.at === ST.upperFold)!.transform!, /rotate\(24deg\)/);
  assert.match(lower.frames.find(f => f.at === ST.lowerFold)!.transform!, /rotate\(-24deg\)/);
  assert.equal(track(simplify, 'simplify-spine').frames.find(f => f.at === ST.spineSettle)!.transform, 'scaleX(1.035)');
  assert.equal(upper.origin, '6.2px 8px');
  assert.equal(lower.origin, '6.2px 16px');
  for (const d of [SA.spine, ...SA.main, ...SA.upper, ...SA.lower]) assert.ok(svg('simplify').includes(`d="${d}"`));
  assert.ok(!simplify.tracks.some(t => /spark|clarity|underline/.test(t.part)));
  assert.ok(ST.upperFold < ST.lowerFold && ST.lowerFold < ST.spineSettle && ST.spineSettle < ST.hold);
});

test('tighten compresses real ordered word units between bounded edges', () => {
  assert.equal(TA.words.length, 8); assert.equal(TP.length, TA.words.length);
  assert.equal(track(tighten, 'tighten-bound-left').frames.find(f => f.at === TT.compress)!.transform, 'translateX(.65px)');
  assert.equal(track(tighten, 'tighten-bound-right').frames.find(f => f.at === TT.compress)!.transform, 'translateX(-1.9px)');
  for (let i = 0; i < TA.words.length; i++) {
    const compressed = track(tighten, `tighten-word-${i}`).frames.find(f => f.at === TT.compress)!;
    assert.match(compressed.transform!, /scaleX\((?:\.7|\.8|\.82|\.88|\.9)/);
    assert.match(compressed.transform!, /translate\([^,]+px,0px\)/, `word ${i} stays on its baseline`);
    assert.equal(track(tighten, `tighten-word-${i}`).origin, [
      '4px 8px', '7.1px 8px', '9.5px 8px', '13.5px 8px', '17px 8px', '4px 14px', '8.3px 14px', '11.4px 14px',
    ][i]);
  }
  for (const d of [...TA.bounds, ...TA.words]) assert.ok(svg('tighten').includes(`d="${d}"`));
  assert.ok(!tighten.tracks.some(t => /clamp|registration|underline|arrow/.test(t.part)));
  assert.ok(TT.compress < TT.seat && TT.seat < TT.hold && TT.hold < TT.release);
});

test('vivid grows one attached ink flourish from the focus word', () => {
  const focus = track(vivid, 'vivid-focus-word'), ink = track(vivid, 'vivid-ink-accent');
  assert.equal(focus.frames.find(f => f.at === VT.focus)!.transform, 'translate(0px,-.3px) scale(1.06,1.5)');
  assert.equal(ink.frames.find(f => f.at === VT.inkStart)!.opacity, 0);
  assert.equal(ink.frames.find(f => f.at === VT.inkPeak)!.opacity, .92);
  assert.equal(ink.origin, `${VG.inkX}px ${VG.inkY}px`);
  assert.ok(VA.accent.startsWith(`M${VG.inkX} ${VG.inkY}`), 'the swash starts on the focus word end');
  for (const d of [...VA.context, VA.focus, VA.accent]) assert.ok(svg('vivid').includes(`d="${d}"`));
  assert.ok(!vivid.tracks.some(t => /spark|plus|underline|highlight/.test(t.part)));
  assert.ok(VT.focus < VT.inkStart && VT.inkStart < VT.inkPeak && VT.inkPeak < VT.clear && VT.clear < VT.release);
});

test('transform scope travels the selection lens corners to the retained page boundary', () => {
  const n = (value: number) => Number(value.toFixed(2));
  for (const {key, x, y, dx, dy} of XC) {
    const corner = track(transformScope, `scope-corner-${key}`);
    assert.equal(corner.origin, `${x}px ${y}px`);
    assert.equal(corner.frames.find(f => f.at === XT.expand)!.transform, `translate(${n(dx * .96)}px,${n(dy * .96)}px) scale(1)`);
    assert.equal(corner.frames.find(f => f.at === XT.seat)!.transform, `translate(${dx}px,${dy}px) scale(1.1)`);
    assert.equal(corner.frames[0].transform, 'translate(0px,0px) scale(1)');
    assert.equal(corner.frames.at(-1)!.transform, 'translate(0px,0px) scale(1)');
  }
  assert.match(svg('transform-scope'), new RegExp(`data-part="scope-lens"[^>]*opacity="${XO.lens}"`));
  for (const d of [XA.page, XA.fold, ...XA.content, ...XA.selection]) assert.ok(svg('transform-scope').includes(`d="${d}"`));
  assert.ok(!transformScope.tracks.some(t => /transfer|arrow|chevron/.test(t.part)));
  assert.ok(XT.expand < XT.seat && XT.seat < XT.hold && XT.hold < XT.contract);
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
