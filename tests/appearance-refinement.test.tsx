import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {eye,EYE_TIMING,EYE_IRIS,EYE_ART} from '../src/motions/eye';
import {sparkles,SPARKLES_TIMING,SPARKLES_GEOMETRY} from '../src/motions/sparkles';
import {sun,SUN_ART,SUN_TIMING} from '../src/motions/sun';
import {moon,MOON_ART,MOON_GEOMETRY,MOON_JOINTS,MOON_TIMING} from '../src/motions/moon';
import type {Study} from '../src/choreography';
const track=(s:Study,part:string)=>s.tracks.find(t=>t.part===part)!;
const hiddenThrough=(s:Study,part:string,time:number)=>assert.ok(track(s,part).frames.filter(f=>f.at<=time).every(f=>f.opacity===0));
const numbers=(s:string)=>s.match(/-?\d*\.?\d+/g)!.map(Number);

test('Eye separates finding, focus and acknowledgment while clipping the complete moving iris',()=>{
 const iris=track(eye,'eye-iris'),gaze=track(eye,'eye-gaze');
 assert.ok(iris.frames.filter(f=>f.at<=EYE_TIMING.arrive).every(f=>f.transform==='scale(1)'),'focus waits until the gaze arrives');
 assert.equal(gaze.frames.find(f=>f.at===EYE_TIMING.arrive)!.transform,gaze.frames.find(f=>f.at===EYE_TIMING.hold)!.transform,'subject is held rather than scanned past');
 hiddenThrough(eye,'eye-answer',EYE_TIMING.focus);
 assert.ok(EYE_IRIS.focused>.8&&EYE_IRIS.focused<1);
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<DitherIcon name="eye" texture={texture}/>);
  assert.ok(svg.includes(`d="${EYE_ART.aperture}"`));
  assert.match(svg,/<g clip-path="url\(#[^)]+\)"><g data-part="eye-gaze"><g data-part="eye-iris">/,'iris and its focus stay under the same fixed aperture');
 }
});

test('Sparkles keeps two fixed centers and a dominant star; each echo waits for its own arrival',()=>{
 const main=track(sparkles,'spark-main'),satellite=track(sparkles,'spark-satellite');
 assert.equal(main.origin,SPARKLES_GEOMETRY.main.map(n=>n+'px').join(' '));
 assert.equal(satellite.origin,SPARKLES_GEOMETRY.satellite.map(n=>n+'px').join(' '));
 const sizes=(t:typeof main)=>t.frames.flatMap(f=>numbers(f.transform!));
 assert.ok(Math.min(...sizes(main))*SPARKLES_GEOMETRY.mainRadius>Math.max(...sizes(satellite))*SPARKLES_GEOMETRY.satelliteRadius*2,'secondary can never compete with the main star');
 for(const t of [main,satellite])assert.ok(t.frames.every(f=>f.transform!.startsWith('scale(')),'star axes never tumble');
 assert.ok(SPARKLES_TIMING.catch>SPARKLES_TIMING.flash);
 hiddenThrough(sparkles,'spark-tips',SPARKLES_TIMING.flare);
 hiddenThrough(sparkles,'spark-echo',SPARKLES_TIMING.catch);
});

test('Sun propagation reaches the drawn ray before it moves; all eight rays remain radial and in bounds',()=>{
 const [,rayStart,rayLength]=numbers(SUN_ART.rayLine);
 // The actual filled capsule specifies its half-width in the first arc.
 const halfWidth=Number(SUN_ART.ray.match(/a(\d*\.?\d+)/)![1]);
 const svg=renderToStaticMarkup(<DitherIcon name="sun" texture="solid"/>);
 const radius=Number(svg.match(/data-part="sun-wave"[^>]*><circle[^>]*r="([\d.]+)"/)![1]);
 const wave=track(sun,'sun-wave').frames.find(f=>f.at===SUN_TIMING.reach)!;
 assert.ok(Math.abs(radius*numbers(wave.transform!)[0]-(12-rayStart-rayLength-halfWidth))<1e-8,'wave reaches the actual rounded inner end');
 for(let i=0;i<8;i++){
  const ray=track(sun,`sun-ray-${i}`);
  const start=i%2?SUN_TIMING.follow:SUN_TIMING.reach;
  assert.ok(ray.frames.filter(f=>f.at<=start).every(f=>f.transform==='translateY(0px)'));
  for(const frame of ray.frames){
   assert.match(frame.transform!,/^translateY\([-\d.]+px\)$/);
   const outward=-numbers(frame.transform!)[0];
   assert.ok(rayStart-halfWidth-outward>.5,'rounded outside end stays within the viewBox');
  }
  assert.ok(svg.includes(`transform="rotate(${i*45} 12 12)"><g data-part="sun-ray-${i}"`));
 }
 hiddenThrough(sun,'sun-tips',SUN_TIMING.cardinal);
});

test('Moon arcs join on both circles and the rim light follows the same cut circle',()=>{
 const G=MOON_GEOMETRY;
 for(const point of Object.values(MOON_JOINTS)){
  assert.ok(Math.abs(Math.hypot(point[0]-G.outer[0],point[1]-G.outer[1])-G.radius)<1e-8);
  assert.ok(Math.abs(Math.hypot(point[0]-G.cut[0],point[1]-G.cut[1])-G.cutRadius)<1e-8);
 }
 const n=numbers(MOON_ART.trace),start=n.slice(0,2),end=n.slice(-2);
 for(const point of [start,end])assert.ok(Math.abs(Math.hypot(point[0]-G.cut[0],point[1]-G.cut[1])-G.cutRadius)<1e-8);
 assert.equal(track(moon,'moon-rim').origin,G.cut.map(n=>n+'px').join(' '));
 assert.ok(track(moon,'moon-rim').frames.every(f=>/^rotate\([-\d.]+deg\)$/.test(f.transform!)));
 hiddenThrough(moon,'moon-rim',MOON_TIMING.incline);
 hiddenThrough(moon,'moon-glint',MOON_TIMING.arrive);
 const svg=renderToStaticMarkup(<DitherIcon name="moon" texture="solid"/>);
 assert.ok(svg.indexOf('data-part="moon-crescent"')<svg.indexOf('data-part="moon-rim"'));
});
