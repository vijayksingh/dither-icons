import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as library from '../src';
import {styleForStudy} from '../src/choreography';
import {filterIcons} from '../demo/model';
import {SETS} from '../demo/MotionStudies';
import {readingFocus, READING_FOCUS_GEOMETRY as F, READING_FOCUS_TIMING as FT} from '../src/motions/reading-focus';
import {startAtText, START_AT_TEXT_GEOMETRY as S, START_AT_TEXT_TIMING as ST} from '../src/motions/start-at-text';
import {listen, LISTEN_GEOMETRY as L, LISTEN_TIMING as LT} from '../src/motions/listen';
import {readAloud, READ_ALOUD_GEOMETRY as R, READ_ALOUD_TIMING as RT} from '../src/motions/read-aloud';
import type {Study} from '../src/choreography';

const names = ['reading-focus', 'start-at-text', 'listen', 'read-aloud'];
const track = (study: Study, part: string) => study.tracks.find(t => t.part === part)!;
const darkThrough = (study: Study, part: string, time: number) => assert.ok(track(study, part).frames.filter(f => f.at <= time).every(f => f.opacity === 0), `${part} cannot answer before its cause`);

test('reader batch exposes exactly four additions in catalog, search and named exports', () => {
  assert.deepEqual(SETS['Cognimated reader'], names);
  assert.deepEqual(filterIcons('cognimated reader', 'All icons').map(d => d.name), names);
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

test('Reading Focus carries its window exactly one text line inside a stationary timer', () => {
  assert.ok(Math.abs(F.step - (F.lineY[1] - F.lineY[0])) < 1e-9);
  assert.ok(!readingFocus.tracks.some(t => /case|text|stem/.test(t.part)));
  const frames = track(readingFocus, 'reading-window').frames;
  assert.equal(frames.find(f => f.at === FT.arrive)!.transform, `translateY(${F.step}px)`);
  // Both bracket corners must clear the actual circular inner case, including strokes.
  const innerRadius = F.radius - F.caseWidth / 2;
  for (const offset of [0, F.step]) for (const x of [F.bracketLeft, F.bracketRight]) for (const y of [F.bracketTop, F.bracketBottom]) {
    assert.ok(Math.hypot(x - F.center[0], y + offset - F.center[1]) + F.bracketWidth / 2 < innerRadius);
  }
  darkThrough(readingFocus, 'reading-line-response', FT.arrive);
  darkThrough(readingFocus, 'reading-rim-response', FT.arrive);
  assert.notDeepEqual(readingFocus.tracks, library.studies['learning-rhythm'].tracks);
  assert.notDeepEqual(readingFocus.tracks, library.studies.gauge.tracks);
});

test('Start at Text seats the whole I-beam in the inter-word gap before revealing the entry word', () => {
  const caretHalfExtent = S.capHalfWidth + S.caretWidth / 2;
  assert.ok(S.destinationX - caretHalfExtent > S.words[0].end + S.textWidth / 2);
  assert.ok(S.destinationX + caretHalfExtent < S.words[1].x - S.textWidth / 2);
  assert.equal(track(startAtText, 'start-caret').frames.find(f => f.at === ST.place)!.transform, `translateX(${S.destinationX - S.caretX}px)`);
  darkThrough(startAtText, 'start-word-line', ST.place);
  darkThrough(startAtText, 'start-registration', ST.identify);
  assert.ok(ST.clear < ST.return, 'clear the chosen-word cue before returning the caret');
});

test('Listen emits sound only after text; its complete wave contours clear the viewBox', () => {
  assert.ok(track(listen, 'listen-near').frames.filter(f => f.at <= LT.phrase).every(f => f.transform === 'translateX(0px)'));
  assert.ok(track(listen, 'listen-far').frames.filter(f => f.at <= LT.farStart).every(f => f.transform === 'translateX(0px)'));
  assert.ok(LT.near < LT.farStart && LT.far < LT.front);
  assert.ok(L.farMaxX + L.farTravel + L.waveWidth / 2 < 24);
  assert.ok(L.frontMaxX + .45 + .65 / 2 < 24);
  darkThrough(listen, 'listen-front', LT.far);
  assert.ok(!listen.tracks.some(t => /page|cone/.test(t.part)));
});

test('Read Aloud receives input before responding at text and keeps the diaphragm inside the capsule', () => {
  darkThrough(readAloud, 'aloud-phrase-0', RT.relax);
  darkThrough(readAloud, 'aloud-phrase-1', RT.first);
  darkThrough(readAloud, 'aloud-registration', RT.second);
  assert.ok(RT.receive < RT.relax && RT.relax < RT.first);
  const innerHalfWidth = (R.capsuleRight - R.capsuleLeft - R.micWidth) / 2;
  const maxInkHalfWidth = R.diaphragmWidth * R.diaphragmPeak / 2 + .65 / 2;
  assert.ok(maxInkHalfWidth < innerHalfWidth, 'even the expanded diaphragm caps clear the capsule');
  assert.ok(!readAloud.tracks.some(t => /capsule|cradle|check|success/.test(t.part)));
  assert.ok(track(readAloud, 'aloud-input').frames.some(f => f.transform?.includes('translateX(-')));
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
