import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {eye,EYE_TIMING,EYE_ART} from '../src/motions/eye';
import {sparkles,SPARKLES_TIMING,SPARKLES_GEOMETRY,SPARKLES_FIELD} from '../src/motions/sparkles';
import {sun,SUN_ART,SUN_TIMING} from '../src/motions/sun';
import {moon,MOON_ART,MOON_GEOMETRY,MOON_JOINTS,MOON_TIMING} from '../src/motions/moon';
import type {Study} from '../src/choreography';
const track=(s:Study,part:string)=>s.tracks.find(t=>t.part===part)!;
const hiddenThrough=(s:Study,part:string,time:number)=>assert.ok(track(s,part).frames.filter(f=>f.at<=time).every(f=>f.opacity===0));
const numbers=(s:string)=>s.match(/-?\d*\.?\d+/g)!.map(Number);

test('Eye closes its aperture over an untransformed iris, holds shut and reopens before its light',()=>{
 const lids=track(eye,'eye-lids'),aperture=track(eye,'eye-aperture');
 assert.deepEqual(lids, {...aperture,part:'eye-lids'},'lids and iris clipping use identical origins, transforms and easing');
 assert.equal(lids.frames.find(f=>f.at===EYE_TIMING.close)!.transform,'scaleY(0)');
 assert.equal(lids.frames.find(f=>f.at===EYE_TIMING.hold)!.transform,'scaleY(0)');
 assert.ok(EYE_TIMING.hold-EYE_TIMING.close>=60,'closed lid is a readable beat');
 assert.ok(EYE_TIMING.open-EYE_TIMING.hold>EYE_TIMING.close-EYE_TIMING.widen,'reopening takes longer than closure');
 hiddenThrough(eye,'eye-light',EYE_TIMING.open);
 assert.ok(eye.tracks.every(t=>!t.part.includes('iris')),'no transform flattens the iris');
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<DitherIcon name="eye" texture={texture}/>);
  assert.match(svg,/<clipPath id="[^"]+"><path data-part="eye-aperture"/,'clipPath uses a valid direct shape child, never a group');
  assert.ok(svg.includes(`d="${EYE_ART.aperture}"`));
  assert.match(svg,/<g clip-path="url\(#[^)]+\)"><(?:g>|circle)/,'untransformed iris is clipped independently from the lids');
 }
});

test('Sparkles fills all four surrounding directions with staggered glints while retaining three main stars',()=>{
 const G=SPARKLES_GEOMETRY;
 const main=track(sparkles,'spark-main'),satellite=track(sparkles,'spark-satellite');
 const sizes=(t:typeof main)=>t.frames.flatMap(f=>numbers(f.transform!));
 assert.ok(Math.min(...sizes(main))*G.mainRadius>Math.max(...sizes(satellite))*G.satelliteRadius*1.8);
 assert.ok(SPARKLES_FIELD.some(p=>p.x<4)&&SPARKLES_FIELD.some(p=>p.x>20)&&SPARKLES_FIELD.some(p=>p.y<5)&&SPARKLES_FIELD.some(p=>p.y>20),'glints surround the central star on every side');
 const peaks=SPARKLES_FIELD.map(({part,x,y,radius})=>{
  const t=track(sparkles,part),peak=t.frames.find(f=>f.opacity===1)!;
  assert.ok(t.frames.every(f=>f.transform!.startsWith('scale(')),'glints bloom in place without particle flight');
  assert.ok(x-radius*1.1>0&&x+radius*1.1<24&&y-radius*1.1>0&&y+radius*1.1<24);
  assert.ok(Math.hypot(x-12,y-12)>G.mainRadius*1.08+radius*1.1,'outer glints clear the dominant star');
  return peak.at;
 });
 assert.ok(peaks.every((p,i)=>i===0?p>SPARKLES_TIMING.flare:p>peaks[i-1]),'the peripheral field follows the central flare in order');
 assert.ok(peaks[0]+SPARKLES_TIMING.fade>peaks.at(-1)!,'the glints overlap as a field');
 const svg=renderToStaticMarkup(<DitherIcon name="sparkles"/>);
 for(const part of ['spark-main','spark-satellite','spark-companion'])assert.ok(svg.includes(`data-part="${part}">`),'three permanent stars remain visible');
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

test('Moon arcs join exactly and its star arrives clear of the crescent before twinkling',()=>{
 const G=MOON_GEOMETRY;
 for(const point of Object.values(MOON_JOINTS)){
  assert.ok(Math.abs(Math.hypot(point[0]-G.outer[0],point[1]-G.outer[1])-G.radius)<1e-8);
  assert.ok(Math.abs(Math.hypot(point[0]-G.cut[0],point[1]-G.cut[1])-G.cutRadius)<1e-8);
 }
 const flight=track(moon,'moon-flight'),star=track(moon,'moon-star'),tail=track(moon,'moon-tail');
 assert.equal(flight.frames.find(f=>f.at===MOON_TIMING.arrive)!.transform,'translate(0px,0px)');
 assert.ok(star.frames.find(f=>f.opacity===1)!.at>MOON_TIMING.arrive);
 assert.equal(tail.frames.find(f=>f.at===MOON_TIMING.arrive)!.opacity,0,'tail disappears as the star stops');
 hiddenThrough(moon,'moon-distant',MOON_TIMING.arrive);
 // Convert the arriving star to the raised crescent's local frame, then allow
 // its full circumscribed radius plus the outline half-width inside the cut.
 const angle=9*Math.PI/180,dx=G.star[0]-G.outer[0],dy=G.star[1]+.65-G.outer[1];
 const local=[G.outer[0]+dx*Math.cos(angle)-dy*Math.sin(angle),G.outer[1]+dx*Math.sin(angle)+dy*Math.cos(angle)];
 assert.ok(Math.hypot(local[0]-G.cut[0],local[1]-G.cut[1])+G.starRadius*1.12+.7<G.cutRadius,'twinkle clears the actual cut arc even in outline');
 const svg=renderToStaticMarkup(<DitherIcon name="moon" texture="solid"/>);
 assert.ok(svg.includes(`d="${MOON_ART.crescent}"`));
 assert.match(svg,/<g data-part="moon-flight"><g data-part="moon-tail"/,'tail shares the star flight');
 assert.ok(svg.indexOf('data-part="moon-flight"')<svg.indexOf('data-part="moon-star"'));
});
