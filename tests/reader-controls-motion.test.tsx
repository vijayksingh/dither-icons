import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import * as library from '../src';
import {keyframesFor, styleForStudy, type Study} from '../src/choreography';
import {SETS} from '../demo/MotionStudies';
import {filterIcons} from '../demo/model';
import {sharePage, socialMetadata} from '../demo/content/social';
import {READER_CONTROLS_STYLE as INK} from '../src/motions/reader-controls-style';
import {dragHandle, dragTransform, DRAG_HANDLE_POSES as DP, DRAG_HANDLE_ART as DA, DRAG_HANDLE_GEOMETRY as D, DRAG_HANDLE_TIMING as DT} from '../src/motions/drag-handle';
import {skipBlock, SKIP_BLOCK_ART as SA, SKIP_BLOCK_GEOMETRY as S, SKIP_BLOCK_TIMING as ST} from '../src/motions/skip-block';
import {collapseRail, COLLAPSE_RAIL_ART as CA, COLLAPSE_RAIL_GEOMETRY as C, COLLAPSE_RAIL_TIMING as CT} from '../src/motions/collapse-rail';
import {headphones, HEADPHONES_ART as HA, HEADPHONES_GEOMETRY as H, HEADPHONES_TIMING as HT} from '../src/motions/headphones';

const names = ['drag-handle', 'skip-block', 'collapse-rail', 'headphones'];
const textures = ['dither', 'solid', 'outline'] as const;
const track = (study: Study, part: string) => study.tracks.find(t => t.part === part)!;
const darkThrough = (study: Study, part: string, time: number) => {
  assert.ok(track(study, part).frames.filter(f => f.at <= time).every(f => f.opacity === 0), `${part}: response must follow its cause`);
};
const svgFor = (name: string, texture: library.Texture = 'solid', size = 48) => renderToStaticMarkup(<library.DitherIcon name={name} texture={texture} size={size} animate={false}/>);

test('reader controls expose exactly four named additions, a separate studio family, and searchable meanings', () => {
  assert.deepEqual(SETS['Cognimated reader controls'], names);
  assert.deepEqual(SETS['Cognimated reader'], ['reading-focus', 'start-at-text', 'listen', 'read-aloud']);
  const entries = [
    ['drag-handle', library.DragHandleIcon, 'reposition'], ['skip-block', library.SkipBlockIcon, 'bypass'],
    ['collapse-rail', library.CollapseRailIcon, 'floating rail'], ['headphones', library.HeadphonesIcon, 'audio output'],
  ] as const;
  for (const [name, Component, query] of entries) {
    assert.ok(filterIcons(query, 'All icons').some(icon => icon.name === name));
    assert.equal(library.definitions.filter(d => d.name === name).length, 1);
    const named = renderToStaticMarkup(<Component title={name} animate={false} active/>);
    assert.ok(named.includes(`data-icon="${name}"`));
    assert.match(named, /role="img"/);
    assert.match(named, /data-active="false"/);
    assert.match(named, /data-animate="false"/);
    assert.ok(!named.includes('aria-hidden'));
    assert.match(renderToStaticMarkup(<Component/>), /aria-hidden="true"/);
  }
});

test('Drag Handle picks up a rigid body, trails the pull and dissipates release momentum', () => {
  const grip = track(dragHandle, 'drag-grip'), contact = track(dragHandle, 'drag-contact');
  assert.equal(grip.frames.find(f => f.at === DT.carry)!.transform, dragTransform(DP.carried));
  assert.equal(grip.origin, `${D.pivotX}px ${D.pivotY}px`);
  assert.equal(D.pivotY, D.ribY[0], 'the body hangs below the caught upper rib');
  assert.deepEqual(track(dragHandle, 'drag-grip-cut').frames, grip.frames, 'reference occlusion follows the whole rigid body');
  assert.equal(track(dragHandle, 'drag-grip-cut').origin, grip.origin);
  assert.equal(grip.frames.find(f => f.at === DT.grasp)!.transform, dragTransform(DP.rest), 'grasp precedes the body taking up load');
  assert.ok(DP.load.y > 0 && DP.lifted.y < 0);
  assert.ok(DP.carried.angle > 0 && DP.braking.angle < 0, 'body trails acceleration and swings through deceleration');
  assert.ok(DP.braking.x > DP.placed.x, 'release has bounded lateral overshoot');
  assert.ok(DP.landed.angle < 0 && DP.rebound.angle > 0 && DP.placed.angle === 0);
  assert.ok(Math.abs(DP.rebound.angle) < Math.abs(DP.landed.angle), 'landing dissipates rather than repeating a wiggle');
  assert.ok(DP.returning.angle < 0, 'opposite pull reverses the inertial lean');
  assert.ok(Math.abs(DP.homeRebound.angle) < Math.abs(DP.homeLand.angle));
  assert.ok(!dragHandle.tracks.some(t => /rib|registration/.test(t.part)), 'ribs do not drift and the reference stays still');
  darkThrough(dragHandle, 'drag-contact', DT.grasp);
  assert.ok(contact.frames.find(f => f.at === DT.land)!.opacity! > contact.frames.find(f => f.at === DT.lift)!.opacity!, 'contact is tighter and darker than suspension');
  assert.deepEqual(contact.frames.map(f => [f.at, f.easing]), grip.frames.map(f => [f.at, f.easing]), 'footprint shares the body clock and easing');
  const markup = svgFor('drag-handle');
  const gripStart = markup.indexOf('<g data-part="drag-grip"');
  assert.ok(markup.indexOf(`d="${DA.registration}"`) < gripStart);
  for (const rib of DA.ribs) assert.ok(markup.indexOf(`d="${rib}"`) > gripStart, 'ribs rendered inside moving grip');
  assert.ok(markup.indexOf('<g data-part="drag-grasp"') > gripStart);
  // Sample actual composed transforms between every pose, including stroke
  // caps. Every easing stays within its endpoints; test the complete sweep.
  const parse = (value: string) => value.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  for (let n = 1; n < grip.frames.length; n++) {
    const a = parse(grip.frames[n - 1].transform!), b = parse(grip.frames[n].transform!);
    for (let i = 0; i <= 100; i++) {
      const [dx, dy, degrees] = a.map((v, j) => v + (b[j] - v) * i / 100);
      const angle = degrees * Math.PI / 180;
      for (const x of [D.left, D.right]) for (const y of [D.top, D.bottom]) {
        const px = D.pivotX + dx + (x - D.pivotX) * Math.cos(angle) - (y - D.pivotY) * Math.sin(angle);
        const py = D.pivotY + dy + (x - D.pivotX) * Math.sin(angle) + (y - D.pivotY) * Math.cos(angle);
        assert.ok(px > D.contour / 2 && px < 24 - D.contour / 2);
        assert.ok(py > D.contour / 2 && py < 24 - D.contour / 2);
      }
    }
  }
  assert.ok(D.ribStart > D.left + D.contour && D.ribEnd < D.right - D.contour);
});

test('Skip Block passes a whole retained chunk through an empty gutter before cueing the receiving block', () => {
  const currentY = Number(SA.current.match(/^M[\d.]+ ([\d.]+)/)![1]);
  const nextY = Number(SA.next.match(/^M[\d.]+ ([\d.]+)/)![1]);
  assert.equal(S.step, nextY - currentY, 'travel derived from actual drawn text baselines');
  const frames = track(skipBlock, 'skip-marker').frames;
  assert.equal(frames.find(f => f.at === ST.withdraw)!.transform, `translate(${S.gutterTravel}px, 0px)`);
  assert.equal(frames.find(f => f.at === ST.bypass)!.transform, `translate(${S.gutterTravel}px, ${S.step}px)`);
  assert.equal(frames.find(f => f.at === ST.arrive)!.transform, `translate(0px, ${S.step}px)`);
  assert.ok(S.markerX + S.cap + S.contour / 2 < S.textX - .625, 'bracket never crosses the prose');
  assert.equal((SA.bypass.match(/M/g) ?? []).length, 1, 'one connected arrow outline, no overlaid arrowhead');
  assert.ok(SA.bypass.endsWith('Z'), 'filled arrow contour closes without crossing a stroke joint');
  assert.ok(S.arrowTipX + INK.outlineEdge / 2 < S.markerX + S.gutterTravel - S.contour / 2);
  assert.ok(S.markerBottom + S.step + S.contour / 2 < 24);
  darkThrough(skipBlock, 'skip-next-line', ST.arrive);
  assert.ok(!skipBlock.tracks.some(t => /current|next-block|bypass/.test(t.part)));
  const markup = svgFor('skip-block');
  assert.ok(markup.includes(`d="${SA.current}"`) && markup.includes(`d="${SA.next}"`));
});

test('Collapse Rail retains a fixed top tab and prose while full-size controls pass behind a fixed clip', () => {
  const markup = svgFor('collapse-rail');
  assert.match(markup, /clipPathUnits="userSpaceOnUse"/);
  assert.match(markup, /<g clip-path="url\(#[^)]+\)"><g data-part="rail-body">/);
  assert.ok(markup.includes(`d="${CA.cap}"`));
  for (const line of CA.lines) assert.ok(markup.includes(`d="${line}"`));
  assert.ok(!collapseRail.tracks.some(t => /cap|prose|text/.test(t.part)));
  assert.ok(track(collapseRail, 'rail-body').frames.every(f => /^translateY\(/.test(f.transform!)), 'controls retract without shrinking');
  assert.equal(track(collapseRail, 'rail-body').frames.find(f => f.at === CT.dock)!.transform, `translateY(${C.travel}px)`);
  assert.ok(C.bottom + C.travel + C.contour / 2 <= C.clip.y, 'entire trailing contour docks above clip');
  assert.ok(C.textEnd + .625 < C.left - C.contour / 2, 'rail never overlaps reading surface');
  darkThrough(collapseRail, 'rail-seam', CT.dock);
  assert.notDeepEqual(collapseRail.tracks, library.studies['panel-left-close'].tracks);
});

test('Headphones seat around drawn attachment points; paired drivers remain inside their moving cups', () => {
  assert.match(HA.arch, /^M4 12.*16 0v1$/);
  assert.ok(HA.left.startsWith(`M${H.leftPivot} ${H.pivotY}`));
  assert.ok(HA.right.startsWith(`M${H.rightPivot} ${H.pivotY}`));
  assert.ok(!headphones.tracks.some(t => /arch|page|wave/.test(t.part)));
  for (const [i, cup] of H.cups.entries()) {
    const cupTrack = track(headphones, `headphones-${cup.side}-cup`);
    const cutTrack = track(headphones, `headphones-${cup.side}-cut`);
    assert.deepEqual(cutTrack.frames, cupTrack.frames, 'band knockout must follow its actual receiving cup');
    assert.equal(cutTrack.origin, cupTrack.origin);
    assert.equal(cupTrack.origin, `${cup.pivotX}px ${H.pivotY}px`);
    assert.equal(cupTrack.frames.find(f => f.at === HT.seat)!.transform, `rotate(${cup.direction * H.seatAngle}deg)`);
    assert.equal(track(headphones, `headphones-${cup.side}-driver`).frames.find(f => f.at === (i === 0 ? HT.left : HT.right))!.transform, `scaleY(${H.driverExpansion})`);
    darkThrough(headphones, `headphones-${cup.side}-response`, HT.seat);
  }
  const expandedHalf = (H.driverBottom - H.driverTop) * H.driverExpansion / 2 + .5;
  assert.ok(H.driverY - expandedHalf > 12 + H.contour / 2);
  assert.ok(H.driverY + expandedHalf < 20 - H.contour / 2);
  // Full earcup bounds around the exact suspension pivots remain in the viewBox.
  for (const cup of H.cups) for (let i = 0; i <= 100; i++) {
    const angle = cup.direction * H.seatAngle * i / 100 * Math.PI / 180;
    const bounds = cup.side === 'left' ? [3, 7.5] : [16.5, 21];
    for (const x of bounds) for (const y of [12, 20]) {
      const dx = x - cup.pivotX, dy = y - H.pivotY;
      const px = cup.pivotX + dx * Math.cos(angle) - dy * Math.sin(angle);
      const py = H.pivotY + dx * Math.sin(angle) + dy * Math.cos(angle);
      assert.ok(px > H.contour / 2 && px < 24 - H.contour / 2);
      assert.ok(py > H.contour / 2 && py < 24 - H.contour / 2);
    }
  }
});

test('React and SVG share neutral tracks, finite playback and a motion-free reduced preference', () => {
  for (const name of names) {
    const study = library.studies[name], css = styleForStudy(name);
    assert.match(css, /prefers-reduced-motion:reduce/);
    assert.match(css, /animation:none!important/);
    assert.ok(!css.includes('infinite'));
    for (const t of study.tracks) {
      const frames = keyframesFor(study, t);
      assert.equal(frames[0].offset, 0);
      assert.equal(frames.at(-1)!.offset, 1);
      assert.equal(t.frames[0].transform, t.frames.at(-1)!.transform);
      assert.equal(t.frames[0].opacity, t.frames.at(-1)!.opacity);
      assert.ok(css.includes(`di-${name}-${t.part}`));
      for (const f of frames) assert.ok(Object.keys(f).every(k => ['offset', 'easing', 'transform', 'opacity'].includes(k)));
    }
  }
  for (const texture of textures) {
    const markup = renderToStaticMarkup(<>{[...names, ...names].map((name, i) => <library.DitherIcon name={name} texture={texture} key={i}/>)}</>);
    const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, 'repeated instances cannot share mask or clip ids');
    for (const [, id] of markup.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(id), `${texture}: missing ${id}`);
  }
});

test('new silhouettes rasterize distinctly at compact sizes and Outline has transparent contour cores', () => {
  const cache = new Map<string, Buffer>();
  const raster = (name: string, texture: library.Texture, size: number) => {
    const key = `${name}/${texture}/${size}`;
    if (!cache.has(key)) cache.set(key, new Resvg(svgFor(name, texture, size), {font: {loadSystemFonts: false}}).render().pixels);
    return cache.get(key)!;
  };
  const mass = (pixels: Buffer) => pixels.reduce((sum, value, i) => sum + (i % 4 === 3 ? value : 0), 0);
  const cores = [[16, 12], [S.markerX, 7.5], [21, 6], [12, 3]];
  for (const [i, name] of names.entries()) {
    const [x, y] = cores[i], alphaIndex = (Math.floor(y * 8) * 192 + Math.floor(x * 8)) * 4 + 3;
    assert.ok(raster(name, 'solid', 192)[alphaIndex] > 240, `${name}: solid contour spine`);
    assert.equal(raster(name, 'outline', 192)[alphaIndex], 0, `${name}: true transparent outline core`);
    for (const size of [16, 24, 48]) {
      const solid = raster(name, 'solid', size), outline = raster(name, 'outline', size);
      assert.ok(mass(outline) > 0 && mass(outline) < mass(solid));
      assert.ok(mass(raster(name, 'dither', size)) > 0);
      for (const other of [...names.filter(n => n !== name), 'panel-left-close', 'volume', 'listen']) {
        assert.notDeepEqual(solid, raster(other, 'solid', size), `${name}/${other}: must have distinct static drawings`);
      }
    }
  }
});

test('screenshot regressions: centered grip, lighter solid bands and no outline lines through receiving joints', () => {
  assert.equal((D.left + D.right) / 2, 12);
  assert.equal((D.top + D.bottom) / 2, 12);
  assert.equal((D.ribStart + D.ribEnd) / 2, 12);
  assert.equal((DA.registration.match(/M/g) ?? []).length, 4, 'balanced registration corners');
  assert.ok(INK.solidContour <= 1.1 && INK.text <= 1, 'solid bands and text lighter than rejected 1.5/1.25');
  const alpha = (name: string, x: number, y: number) => {
    const pixels = new Resvg(svgFor(name, 'outline', 192), {font: {loadSystemFonts: false}}).render().pixels;
    return pixels[(Math.floor(y * 8) * 192 + Math.floor(x * 8)) * 4 + 3];
  };
  assert.equal(alpha('headphones', 4.5, 12), 0, 'headband cannot cross the cup transparent core');
  assert.equal(alpha('collapse-rail', 16.5, 8), 0, 'retracting rail cannot cross the cap transparent core');
});

test('generated manifest, agent reference and share metadata agree with the four public names and timings', () => {
  const local = JSON.parse(readFileSync('icons.json', 'utf8'));
  const served = JSON.parse(readFileSync('public/icons.json', 'utf8'));
  const guide = readFileSync('public/llms-full.txt', 'utf8');
  assert.deepEqual(local, served);
  assert.equal(local.count, library.definitions.length);
  for (const name of names) {
    const entry = local.icons.find((icon: {name: string}) => icon.name === name);
    assert.ok(entry && entry.component in library);
    assert.equal(entry.motion.durationMs, library.studies[name].duration);
    assert.equal(entry.motion.caption, library.studies[name].caption);
    assert.ok(guide.includes(`| ${name} | ${entry.component} |`));
    const page = socialMetadata(sharePage(`/icons/${name}`));
    assert.ok(page.includes(`https://dithered.dev/icons/${name}`));
    assert.ok(page.includes(`/og/icon-${name}.png`));
  }
});
