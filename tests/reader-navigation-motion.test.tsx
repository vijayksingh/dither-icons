import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import * as library from '../src';
import {keyframesFor, styleForStudy, type Study} from '../src/choreography';
import {SETS} from '../demo/MotionStudies';
import {componentName, filterIcons} from '../demo/model';
import {READING_PACE_ART as PA, READING_PACE_GEOMETRY as P, READING_PACE_TIMING as PT, readingPace} from '../src/motions/reading-pace';
import {READER_PATH_ART as RA, READER_PATH_GEOMETRY as R, READER_PATH_TIMING as RT, readerPath} from '../src/motions/reader-path';
import {PREVIOUS_WORD_ART as BA, PREVIOUS_WORD_TIMING as BT, PREVIOUS_WORD_POSES as BP, previousWord} from '../src/motions/previous-word';
import {NEXT_WORD_ART as NA, NEXT_WORD_TIMING as NT, NEXT_WORD_POSES as NP, nextWord} from '../src/motions/next-word';
import {WORD_SEEK_GEOMETRY as W} from '../src/motions/word-seek-geometry';
import {READER_CONTROLS_STYLE as INK} from '../src/motions/reader-controls-style';

const names = ['reading-pace', 'reader-path', 'previous-word', 'next-word'];
const textures = ['dither', 'solid', 'outline'] as const;
const track = (s: Study, part: string) => s.tracks.find(t => t.part === part)!;
const at = (s: Study, part: string, time: number) => track(s, part).frames.find(f => f.at === time)!;
const darkThrough = (s: Study, part: string, time: number) => assert.ok(track(s, part).frames.filter(f => f.at <= time).every(f => f.opacity === 0), `${part}: response follows its cause`);
const svg = (name: string, texture: library.Texture = 'solid', size = 48) => renderToStaticMarkup(<library.DitherIcon name={name} texture={texture} size={size} animate={false}/>);
const numbers = (s: string) => s.match(/-?(?:\d*\.)?\d+/g)!.map(Number);

test('four named reader exports have distinct meanings and a dedicated studio set', () => {
  assert.deepEqual(SETS['Cognimated pace and navigation'], names);
  assert.deepEqual(SETS['Cognimated reader controls'], ['drag-handle', 'skip-block', 'collapse-rail', 'headphones']);
  const exports = [library.ReadingPaceIcon, library.ReaderPathIcon, library.PreviousWordIcon, library.NextWordIcon];
  const queries = ['words per minute', 'skip detours', 'one word backward', 'one word forward'];
  for (const [i, name] of names.entries()) {
    const Component = exports[i];
    assert.ok(filterIcons(queries[i], 'All icons').some(d => d.name === name));
    assert.equal(library.definitions.filter(d => d.name === name).length, 1);
    assert.ok(componentName(name) in library);
    const named = renderToStaticMarkup(<Component title={name} animate={false} active/>);
    assert.ok(named.includes(`data-icon="${name}"`));
    assert.match(named, /role="img"/); assert.match(named, /data-active="false"/);
    assert.match(named, /data-animate="false"/); assert.ok(!named.includes('aria-hidden'));
    assert.match(renderToStaticMarkup(<Component/>), /aria-hidden="true"/);
  }
});

test('Reading Pace seats on a real detent before word cadence responds; rail mask follows the thumb', () => {
  const thumb = track(readingPace, 'pace-thumb'), cut = track(readingPace, 'pace-thumb-cut');
  assert.deepEqual(thumb.frames, cut.frames); assert.equal(thumb.origin, cut.origin);
  assert.equal(P.targetX, P.thumbX + P.step);
  assert.ok(P.detents.includes(P.targetX));
  assert.ok(PA.detents.includes(`M${P.targetX} 16v2`), 'target comes from drawn detents');
  assert.equal(at(readingPace, 'pace-thumb', PT.seat).transform, `translateX(${P.step}px)`);
  assert.ok(!readingPace.tracks.some(t => /needle|rail$|context|text/.test(t.part)));
  darkThrough(readingPace, 'pace-detent', PT.seat);
  darkThrough(readingPace, 'pace-word-0', PT.first);
  darkThrough(readingPace, 'pace-word-1', PT.second);
  assert.ok(PT.seat < PT.detent && PT.detent < PT.first && PT.firstOut < PT.second);
  for (const f of thumb.frames) {
    const [dx] = numbers(f.transform!);
    assert.ok(P.thumbLeft + dx - INK.contour / 2 > 0);
    assert.ok(P.thumbRight + dx + INK.contour / 2 < 24);
  }
  for (const d of PA.words) assert.ok(svg('reading-pace').includes(`d="${d}"`));
  assert.notDeepEqual(readingPace.tracks, library.studies.gauge.tracks);
});

test('Reader Path hinges into the main column before downstream response, retaining its detour and aside', () => {
  const gate = track(readerPath, 'reader-route-gate'), cut = track(readerPath, 'reader-route-cut');
  assert.deepEqual(gate.frames, cut.frames); assert.equal(gate.origin, cut.origin);
  assert.equal(gate.origin, `${R.spineX}px ${R.hingeY}px`);
  assert.equal(RA.tongue, `M${R.spineX} ${R.hingeY}h${R.tongueLength}`);
  assert.equal(at(readerPath, 'reader-route-gate', RT.seat).transform, 'rotate(90deg)');
  const endpoint = [R.spineX + R.tongueLength * Math.cos(Math.PI / 2), R.hingeY + R.tongueLength];
  assert.ok(Math.abs(endpoint[0] - R.spineX) < 1e-10);
  assert.ok(RA.junction.startsWith(`M${R.spineX} ${endpoint[1]}`), 'light starts at the actual seated gate endpoint');
  darkThrough(readerPath, 'reader-route-junction', RT.seat);
  darkThrough(readerPath, 'reader-route-prose', RT.junction);
  assert.ok(!readerPath.tracks.some(t => /aside|detour|spine$/.test(t.part)), 'source content and routes are never removed or animated');
  const markup = svg('reader-path');
  for (const d of [RA.spine + RA.detour, RA.aside, ...RA.main]) assert.ok(markup.includes(`d="${d}"`));
  assert.notDeepEqual(readerPath.tracks, library.studies.path.tracks);
  // Sweep the actual drawn tongue about its retained start, including caps.
  for (let deg = R.takeUp; deg <= R.tongueAngle; deg += .25) {
    const a = deg * Math.PI / 180;
    const x = R.spineX + R.tongueLength * Math.cos(a), y = R.hingeY + R.tongueLength * Math.sin(a);
    assert.ok(x > INK.contour / 2 && x < 24 - INK.contour / 2);
    assert.ok(y > INK.contour / 2 && y < 24 - INK.contour / 2);
  }
});

test('Previous and Next Word select exactly one adjacent word; fixed arrow direction and text survive', () => {
  for (const [name, study, art, timing, poses, destination, response] of [
    ['previous-word', previousWord, BA, BT, BP, 0, 'previous-word-recall'],
    ['next-word', nextWord, NA, NT, NP, 2, 'next-word-identify'],
  ] as const) {
    const [dx, dy] = numbers(poses.seated);
    assert.equal(Math.abs(dx), W.step); assert.equal(dy, 0);
    assert.equal(W.centers[1] + dx, W.centers[destination]);
    assert.equal((W.cursorLeft + W.cursorRight) / 2 + dx, W.centers[destination]);
    assert.equal(at(study, `${name}-selector`, timing.seat).transform, poses.seated);
    assert.equal(art.response, `M${W.centers[destination] - W.wordWidth / 2} ${W.responseY}h${W.wordWidth}`);
    darkThrough(study, response, timing.seat);
    assert.ok(timing.clear < timing.return, 'reading response clears before preview reset');
    assert.ok(!study.tracks.some(t => /arrow|context|text/.test(t.part)), 'word seek does not become a moving generic arrow');
    const markup = svg(name);
    for (const d of [art.context, art.arrow, ...art.words]) assert.ok(markup.includes(`d="${d}"`));
    // All segment easings are monotone, so these interpolated bounds cover the sweep.
    const frames = track(study, `${name}-selector`).frames;
    for (let n = 1; n < frames.length; n++) for (let i = 0; i <= 100; i++) {
      const a = numbers(frames[n - 1].transform!), b = numbers(frames[n].transform!);
      const [x, y] = a.map((v, j) => v + (b[j] - v) * i / 100);
      assert.ok(W.cursorLeft + x > INK.contour / 2 && W.cursorRight + x < 24 - INK.contour / 2);
      assert.ok(W.cursorTop + y - INK.contour / 2 > W.wordY + INK.text / 2,
        'selector never crosses retained text during its sweep');
      assert.ok(W.cursorBottom + y + INK.contour / 2 < 16, 'selector stays above the fixed direction arrow');
    }
    assert.ok(Math.hypot((W.centers[1] - W.wordWidth / 2) - W.cursorLeft, W.responseY - W.cursorTop) > (INK.contour + INK.response) / 2,
      'seated cursor caps remain separate from the target underline');
  }
  assert.notDeepEqual(previousWord.tracks, nextWord.tracks, 'pair shares anatomy, not an aliased timeline');
  assert.notEqual(BT.settle, NT.settle, 'recall gets its own reading hold');
  assert.ok(BA.arrow.includes('h-7') && NA.arrow.includes('h7'));
});

test('all new shapes rasterize at compact sizes and remain distinct from generic counterparts', () => {
  const cache = new Map<string, Buffer>();
  const raster = (name: string, texture: library.Texture, size: number) => {
    const key = `${name}/${texture}/${size}`;
    if (!cache.has(key)) cache.set(key, new Resvg(svg(name, texture, size), {font: {loadSystemFonts: false}}).render().pixels);
    return cache.get(key)!;
  };
  const mass = (p: Buffer) => p.reduce((s, v, i) => s + (i % 4 === 3 ? v : 0), 0);
  for (const [i, name] of names.entries()) for (const size of [16, 24, 48]) {
    for (const texture of textures) assert.ok(mass(raster(name, texture, size)) > 0);
    assert.ok(mass(raster(name, 'outline', size)) < mass(raster(name, 'solid', size)));
    assert.notDeepEqual(raster(name, 'solid', size), raster(['gauge', 'path', 'arrow-left', 'arrow-right'][i], 'solid', size));
    for (const other of names.filter(n => n !== name)) assert.notDeepEqual(raster(name, 'solid', size), raster(other, 'solid', size));
  }
});

test('Outline cores stay transparent at resting and moving mechanical joints', () => {
  const alpha = (markup: string, x: number, y: number) => {
    const pixels = new Resvg(markup, {font: {loadSystemFonts: false}}).render().pixels;
    return pixels[(Math.floor(y * 8) * 192 + Math.floor(x * 8)) * 4 + 3];
  };
  for (const [name, x, y] of [['reading-pace', 12, 13.8], ['reader-path', 8, 7], ['previous-word', 12, 13.5], ['next-word', 12, 13.5]] as const) {
    assert.equal(alpha(svg(name, 'outline', 192), x, y), 0, `${name}: hollow core`);
    assert.ok(alpha(svg(name, 'solid', 192), x, y) > 240, `${name}: thin solid spine`);
  }
  // Render authored mechanical endpoints as SVG transforms, not a CSS/WAAPI emulator.
  let gate = svg('reader-path', 'outline', 192).replace(/<style>[\s\S]*?<\/style>/g, '');
  for (const part of ['reader-route-gate', 'reader-route-cut']) gate = gate.replace(`data-part="${part}"`, `data-part="${part}" transform="rotate(90 ${R.spineX} ${R.hingeY})"`);
  assert.equal(alpha(gate, R.spineX, 10), 0, 'fixed route cannot cross the seated gate core');
  let pace = svg('reading-pace', 'outline', 192).replace(/<style>[\s\S]*?<\/style>/g, '');
  for (const part of ['pace-thumb', 'pace-thumb-cut']) pace = pace.replace(`data-part="${part}"`, `data-part="${part}" transform="translate(${P.step} 0)"`);
  assert.equal(alpha(pace, P.targetX, P.railY), 0, 'rail and detent cannot cross the moving thumb interior');
  assert.ok(INK.solidContour <= 1.1 && INK.text <= 1);
});

test('new timelines share React/SVG frames, neutral return, stillness and unique material IDs', () => {
  for (const name of names) {
    const study = library.studies[name], css = styleForStudy(name);
    assert.match(css, /prefers-reduced-motion:reduce/); assert.match(css, /animation:none!important/);
    assert.ok(!css.includes('infinite'));
    for (const t of study.tracks) {
      const native = keyframesFor(study, t);
      assert.equal(native[0].offset, 0); assert.equal(native.at(-1)!.offset, 1);
      assert.equal(t.frames[0].transform, t.frames.at(-1)!.transform);
      assert.equal(t.frames[0].opacity, t.frames.at(-1)!.opacity);
      assert.ok(css.includes(`di-${name}-${t.part}`));
      for (const f of native) assert.ok(Object.keys(f).every(k => ['offset', 'transform', 'opacity', 'easing'].includes(k)));
    }
  }
  for (const texture of textures) {
    const markup = renderToStaticMarkup(<>{[...names, ...names].map((name, i) => <library.DitherIcon name={name} texture={texture} key={i}/>)}</>);
    const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const [, id] of markup.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(id));
  }
});

test('generated manifest and agent guide expose all four actual exports and current timings', () => {
  const local = JSON.parse(readFileSync('icons.json', 'utf8'));
  assert.deepEqual(local, JSON.parse(readFileSync('public/icons.json', 'utf8')));
  assert.equal(local.count, library.definitions.length);
  const guide = readFileSync('public/llms-full.txt', 'utf8');
  for (const name of names) {
    const entry = local.icons.find((icon: {name: string}) => icon.name === name);
    assert.ok(entry && entry.component in library);
    assert.equal(entry.motion.durationMs, library.studies[name].duration);
    assert.equal(entry.motion.caption, library.studies[name].caption);
    assert.ok(guide.includes(`| ${name} | ${componentName(name)} |`));
  }
});
