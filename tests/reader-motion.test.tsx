import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import * as library from '../src';
import {styleForStudy} from '../src/choreography';
import {filterIcons} from '../demo/model';
import {SETS} from '../demo/MotionStudies';
import {readingFocus, READING_FOCUS_GEOMETRY as F, READING_FOCUS_TIMING as FT} from '../src/motions/reading-focus';
import {startAtText, START_AT_TEXT_GEOMETRY as S, START_AT_TEXT_TIMING as ST} from '../src/motions/start-at-text';
import {listen, LISTEN_GEOMETRY as L, LISTEN_TIMING as LT} from '../src/motions/listen';
import {readAloud, READ_ALOUD_GEOMETRY as R, READ_ALOUD_TIMING as RT} from '../src/motions/read-aloud';
import type {Study} from '../src/choreography';
import {READER_STYLE as INK, READER_OUTLINE as OUTLINE} from '../src/motions/reader-style';
import {LISTEN_ART} from '../src/motions/listen';

const names = ['reading-focus', 'start-at-text', 'listen', 'read-aloud'];
const track = (study: Study, part: string) => study.tracks.find(t => t.part === part)!;
const darkThrough = (study: Study, part: string, time: number) => assert.ok(track(study, part).frames.filter(f => f.at <= time).every(f => f.opacity === 0), `${part} cannot answer before its cause`);

test('reader batch exposes exactly four additions in catalog, search and named exports', () => {
  assert.deepEqual(SETS['Cognimated reader'], names);
  assert.deepEqual(filterIcons('cognimated reader', 'All icons').map(d => d.name), [...names, ...SETS['Cognimated reader controls']]);
  for (const [name, Component] of [
    ['reading-focus', library.ReadingFocusIcon], ['start-at-text', library.StartAtTextIcon],
    ['listen', library.ListenIcon], ['read-aloud', library.ReadAloudIcon],
  ] as const) {
    const svg = renderToStaticMarkup(<Component title={name} animate={false} active/>);
    assert.ok(svg.includes(`data-icon="${name}"`));
    assert.match(svg, /data-animate="false"/); assert.match(svg, /data-active="false"/);
    assert.match(svg, /role="img"/); assert.ok(!svg.includes('aria-hidden'));
  }
});

test('Reading Focus advances one margin-marker line inside its soft-square timer', () => {
  assert.ok(Math.abs(F.step - (F.lineY[1] - F.lineY[0])) < 1e-9);
  assert.ok(!readingFocus.tracks.some(t => /case|text|stem/.test(t.part)));
  const frames = track(readingFocus, 'reading-marker').frames;
  assert.equal(frames.find(f => f.at === FT.arrive)!.transform, `translateY(${F.step}px)`);
  // Marker sweep clears the case's left wall below its rounded upper corner.
  for (let i = 0; i <= 100; i++) {
    const top = F.markerTop + F.step * i / 100 - F.markerWidth / 2;
    const bottom = F.markerBottom + F.step * i / 100 + F.markerWidth / 2;
    assert.ok(top > F.caseTop + F.caseWidth / 2 && bottom < F.caseBottom - F.caseWidth / 2);
    assert.ok(F.markerX - F.markerWidth / 2 > F.caseLeft + F.caseWidth / 2);
    if (top < F.caseTop + F.cornerRadius) {
      const cx = F.caseLeft + F.cornerRadius, cy = F.caseTop + F.cornerRadius;
      assert.ok(Math.hypot(F.markerX - F.markerWidth / 2 - cx, top - cy) < F.cornerRadius - F.caseWidth / 2);
    }
  }
  assert.ok(F.markerX + F.markerWidth / 2 < F.lineX - F.textWidth / 2);
  darkThrough(readingFocus, 'reading-line-response', FT.arrive);
  assert.notDeepEqual(readingFocus.tracks, library.studies['learning-rhythm'].tracks);
  assert.notDeepEqual(readingFocus.tracks, library.studies.gauge.tracks);
});

test('Start at Text aligns its I-beam to a sentence and preserves the full text gutter during travel', () => {
  const caretHalfExtent = S.capHalfWidth + S.caretWidth / 2;
  assert.ok(S.caretX + caretHalfExtent < S.lineX - S.textWidth / 2);
  assert.equal((S.caretTop + S.caretBottom) / 2 + S.step, S.lineY[1]);
  assert.equal(S.lineY[1] - S.lineY[0], S.lineY[2] - S.lineY[1]);
  assert.ok(S.words.every(word => word.end - word.x >= 4), 'no isolated dot pretending to be a word');
  assert.equal(track(startAtText, 'start-caret').frames.find(f => f.at === ST.place)!.transform, `translateY(${S.step}px)`);
  darkThrough(startAtText, 'start-word-line', ST.place);
  assert.ok(ST.clear < ST.return, 'clear the chosen-word cue before returning the caret');
});

test('Listen emits sound only after text; its complete wave contours clear the viewBox', () => {
  assert.ok(track(listen, 'listen-near').frames.filter(f => f.at <= LT.phrase).every(f => f.transform === 'translateX(0px)'));
  assert.ok(track(listen, 'listen-far').frames.filter(f => f.at <= LT.farStart).every(f => f.transform === 'translateX(0px)'));
  assert.ok(LT.near < LT.farStart && LT.nearRest < LT.farRest);
  assert.ok(L.farMaxX + L.farTravel + L.waveWidth / 2 < 24);
  assert.ok(L.textX - L.textWidth / 2 > L.pageLeft + L.pageWidth / 2);
  assert.ok(L.textEnd + L.textWidth / 2 < L.pageRight - L.pageWidth / 2);
  darkThrough(listen, 'listen-source', LT.read);
  assert.ok(!listen.tracks.some(t => /page|cone/.test(t.part)));
});

test('Read Aloud receives input before responding at text and keeps the diaphragm inside the capsule', () => {
  darkThrough(readAloud, 'aloud-phrase-0', RT.relax);
  darkThrough(readAloud, 'aloud-phrase-1', RT.first);
  assert.ok(RT.receive < RT.relax && RT.relax < RT.first);
  const innerHalfWidth = (R.capsuleRight - R.capsuleLeft - R.micWidth) / 2;
  const maxInkHalfWidth = R.diaphragmWidth * R.diaphragmPeak / 2 + INK.response / 2;
  assert.ok(maxInkHalfWidth < innerHalfWidth, 'even the expanded diaphragm caps clear the capsule');
  assert.ok(!readAloud.tracks.some(t => /capsule|cradle|check|success/.test(t.part)));
  assert.ok(track(readAloud, 'aloud-input').frames.some(f => f.transform === `translateX(${R.inputTravel}px)`));
  assert.equal(R.micX, 12, 'microphone centered over the transcript, not detached to its right');
  assert.equal((R.words[0].x + R.words[1].x + R.words[1].width) / 2, R.micX);
  assert.ok(R.contextY - R.textWidth / 2 > R.responseY + INK.response / 2);
});

test('reader drawings use one explicit contour, prose and response hierarchy', () => {
  assert.deepEqual([F.caseWidth, F.markerWidth, S.caretWidth, L.pageWidth, L.waveWidth, R.micWidth], Array(6).fill(INK.contour));
  assert.deepEqual([F.textWidth, S.textWidth, L.textWidth, R.textWidth], Array(4).fill(INK.text));
  assert.ok(INK.response < INK.text && INK.text < INK.contour);
  for (const name of names) {
    const svg = renderToStaticMarkup(<library.DitherIcon name={name} texture="solid"/>);
    const widths = [...svg.matchAll(/stroke-width="([^"]+)"/g)].map(m => Number(m[1]));
    assert.ok(widths.every(width => [INK.contour, INK.text, INK.response].includes(width as 1 | 1.25 | 1.5)));
    assert.ok(!/reading-window|rim-response|start-registration|listen-front|aloud-registration/.test(svg));
  }
});

test('Listen wave bounds come from the actual cubic artwork, with clearance at all heights', () => {
  const curve = (path: string, t: number) => {
    const [x, y, ax, ay, bx, by, dx, dy] = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    const u = 1 - t;
    return [x + 3 * u * u * t * ax + 3 * u * t * t * bx + t * t * t * dx,
      y + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * dy];
  };
  for (let i = 0; i <= 100; i++) {
    const [x, y] = curve(LISTEN_ART.near, i / 100);
    let lo = 0, hi = 1;
    for (let n = 0; n < 40; n++) {
      const mid = (lo + hi) / 2;
      if (curve(LISTEN_ART.far, mid)[1] < y) lo = mid; else hi = mid;
    }
    const farX = curve(LISTEN_ART.far, (lo + hi) / 2)[0];
    assert.ok(farX - (x + L.nearTravel) > L.waveWidth, 'wave strokes cannot meet, even at worst relative travel');
    assert.ok(x <= L.nearMaxX && farX <= L.farMaxX);
  }
});

test('reader SVG exports share timing, static meaning, and unique masks across materials and repeated instances', () => {
  for (const texture of ['dither', 'solid', 'outline'] as const) {
    const svg = renderToStaticMarkup(<>{[...names, ...names].map((name, i) => <library.DitherIcon key={i} name={name} texture={texture}/>)}</>);
    const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const [, id] of svg.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(id), `${texture}: missing mask ${id}`);
    for (const name of names) {
      const css = styleForStudy(name);
      assert.match(css, /prefers-reduced-motion:reduce/);
      assert.match(css, /animation:none!important/);
      for (const t of library.studies[name].tracks) {
        assert.ok(css.includes(`di-${name}-${t.part}`));
        assert.equal(t.frames[0].transform, t.frames.at(-1)!.transform);
      }
    }
  }
});

test('Outline rasterizes as hollow transparent contours, not identical Solid or background overpaint', () => {
  const samples = [
    {name: 'reading-focus', core: [14, 5.5], edge: [14, 4.9]},
    {name: 'start-at-text', core: [4, 6.5], edge: [3.4, 6.5]},
    {name: 'listen', core: [18.5, 12], edge: [19.1, 12]},
    {name: 'read-aloud', core: [9, 7], edge: [8.4, 7]},
  ];
  const raster = (name: string, texture: library.Texture, size: number) => new Resvg(
    renderToStaticMarkup(<library.DitherIcon name={name} texture={texture} size={size} animate={false} style={{color: '#c09aff'}}/>),
  ).render().pixels;
  const alpha = (pixels: Buffer, point: number[]) => pixels[(Math.floor(point[1] * 8) * 192 + Math.floor(point[0] * 8)) * 4 + 3];
  const mass = (pixels: Buffer) => pixels.reduce((sum, value, i) => sum + (i % 4 === 3 ? value : 0), 0);
  assert.ok(INK.contour - 2 * OUTLINE.edge > 0, 'outline needs an open core');
  for (const {name, core, edge} of samples) {
    const solid = raster(name, 'solid', 192), outline = raster(name, 'outline', 192);
    assert.ok(alpha(solid, core) > 240, `${name}: solid spine carries ink`);
    assert.equal(alpha(outline, core), 0, `${name}: outline spine is actually transparent`);
    assert.ok(alpha(outline, edge) > 240, `${name}: contour edge stays visible`);
    for (const size of [16, 24, 48]) {
      const solidPixels = raster(name, 'solid', size), outlinePixels = raster(name, 'outline', size);
      assert.notDeepEqual(outlinePixels, solidPixels, `${name}/${size}: materials differ in rendered pixels`);
      assert.ok(mass(outlinePixels) > 0 && mass(outlinePixels) < mass(solidPixels), `${name}/${size}: outline retains ink at a lighter weight`);
    }
  }
});
