import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {play} from '../src/motions/play';
import {pause,PAUSE_GEOMETRY,PAUSE_STOPS} from '../src/motions/pause';
import {volume,VOLUME_GEOMETRY} from '../src/motions/volume';
import {code,CODE_ART} from '../src/motions/code';

test('play keeps its complete contour inside the icon even with outline stroke and forward stretch',()=>{
 const track=play.tracks.find(t=>t.part==='triangle')!;
 const [ox,oy]=track.origin.split(' ').map(parseFloat);
 // Convex bounds include every path endpoint and Bezier control point.
 for(const frame of track.frames){
  const m=frame.transform!.match(/^translateX\(([-\d.]+)px\) scale\(([-\d.]+),([-\d.]+)\)$/)!;
  assert.ok(m);const [tx,sx,sy]=m.slice(1).map(Number);
  for(const x of [6.25,21.55])for(const y of [3.05,20.95]){
   const px=ox+(x-ox)*sx+tx,py=oy+(y-oy)*sy;
   assert.ok(px-.7>=0&&px+.7<=24&&py-.7>=0&&py+.7<=24,'contour plus outline remains in frame');
  }
 }
});

test('pause arrests both feet at the same plane, preserves the gap, and responds only after contact',()=>{
 let maximumHalfWidth=0;
 for(const stop of PAUSE_STOPS){
  const track=pause.tracks.find(t=>t.part===`bar-${stop.side}`)!;
  assert.equal(track.origin,`${stop.x}px ${PAUSE_GEOMETRY.bottom}px`);
  for(const frame of track.frames){
   const m=frame.transform!.match(/^translateY\(([-\d.]+)px\) scale\(([-\d.]+),([-\d.]+)\)$/)!;
   assert.ok(m);const [ty,sx]=m.slice(1).map(Number);
   maximumHalfWidth=Math.max(maximumHalfWidth,PAUSE_GEOMETRY.halfWidth*sx);
   if(frame.at>=stop.contact)assert.equal(ty,0,'compression never moves the foot below its stop');
  }
  for(const part of [`seat-${stop.side}`,`stop-${stop.side}`]){
   const frames=pause.tracks.find(t=>t.part===part)!.frames;
   assert.ok(frames.filter(f=>f.at<=stop.contact).every(f=>f.opacity===0));
   assert.ok(frames.some(f=>f.at>stop.contact&&f.opacity!>.7));
  }
 }
 assert.ok(PAUSE_GEOMETRY.rightX-PAUSE_GEOMETRY.leftX-maximumHalfWidth*2>4,'two bars remain distinct through compression');
 assert.ok(pause.duration-PAUSE_STOPS[1].rest>=300,'pause concludes in sustained stillness');
});

test('volume keeps its neck attached and its two wave bands separated throughout their travel',()=>{
 const cone=volume.tracks.find(t=>t.part==='cone')!;
 const [ox]=cone.origin.split(' ').map(parseFloat);
 assert.equal(ox,VOLUME_GEOMETRY.neckX);
 for(const frame of cone.frames){
  const sx=Number(frame.transform!.match(/^scaleX\(([-\d.]+)\)$/)![1]);
  for(const y of [9,15])assert.deepEqual([ox+(7-ox)*sx,y],[7,y]);
 }
 const bounds=(part:string,r:number,inner=false)=>volume.tracks.find(t=>t.part===part)!.frames.map(f=>{
  const m=f.transform!.match(/^translateX\(([-\d.]+)px\) scale\(([-\d.]+)\)$/)!;
  assert.ok(m);const [tx,s]=m.slice(1).map(Number);
  return r*s+(inner?-1:1)*Math.abs(tx);
 });
 // Conservative radial bounds across every authored extreme also bound all
 // interpolated poses because these easings do not overshoot their endpoints.
 const near=Math.max(...bounds('wave-near',VOLUME_GEOMETRY.nearRadius));
 const far=Math.min(...bounds('wave-far',VOLUME_GEOMETRY.farRadius-VOLUME_GEOMETRY.weight,true));
 assert.ok(far-near>.8,'persistent wave bands never merge');
 const peak=(part:string)=>volume.tracks.find(t=>t.part===part)!.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;
 assert.ok(peak('diaphragm-light')<peak('wave-light'));
 assert.ok(peak('wave-light')<peak('sound-front'),'distance determines the climax order');
});

test('code delimiters stay mirrored through identical timing and easing, including closure',()=>{
 const left=code.tracks.find(t=>t.part==='bracket-left')!;
 const right=code.tracks.find(t=>t.part==='bracket-right')!;
 assert.equal(left.frames.length,right.frames.length);
 left.frames.forEach((a,i)=>{
  const b=right.frames[i];assert.equal(a.at,b.at);assert.equal(a.easing,b.easing);
  const x=(t:string)=>Number(t.match(/^translateX\(([-\d.]+)px\)$/)![1]);
  assert.ok(Math.abs(x(a.transform!)+x(b.transform!))<1e-9);
 });
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><DitherIcon name="code" texture={texture}/><DitherIcon name="code" texture={texture}/></>);
  const ids=[...svg.matchAll(/<clipPath id="([^"]+)"><path d="([^"]+)"/g)];
  assert.equal(ids.length,2);assert.notEqual(ids[0][1],ids[1][1]);
  for(const id of ids){assert.equal(id[2],CODE_ART.slash);assert.ok(svg.includes(`clip-path="url(#${id[1]})"`));}
 }
});
