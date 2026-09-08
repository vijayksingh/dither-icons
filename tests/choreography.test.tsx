import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src/index';
import {studies,keyframesFor,styleForStudy} from '../src/choreography';

test('every timeline binds to real SVG parts, covers the full clock, and animates only transform or opacity',()=>{
 for(const [name,study] of Object.entries(studies)){
  const svg=renderToStaticMarkup(<DitherIcon name={name}/>);
  assert.equal(new Set(study.tracks.map(t=>t.part)).size,study.tracks.length);
  for(const track of study.tracks){
   assert.ok(svg.includes(`data-part="${track.part}"`),`${name}: ${track.part}`);
   const frames=keyframesFor(study,track);assert.equal(frames[0].offset,0);assert.equal(frames.at(-1)!.offset,1);
   for(let i=1;i<frames.length;i++)assert.ok(frames[i].offset!>frames[i-1].offset!,`${name}: ordered ${track.part}`);
   for(const frame of frames)assert.ok(Object.keys(frame).every(key=>['offset','transform','opacity','easing'].includes(key)));
  }
 }
});
test('download remains a download at every beat',()=>{
 const arrow=studies.download.tracks.find(t=>t.part==='arrow')!;
 assert.ok(arrow.frames.every(frame=>frame.opacity===undefined||frame.opacity===1));
 assert.ok(!studies.download.tracks.some(t=>t.part==='confirm'));
 const svg=renderToStaticMarkup(<DitherIcon name="download"/>);assert.match(svg,/data-part="arrow"/);assert.match(svg,/data-part="tray"/);
});
test('standalone SVG carries the same choreography and reduced-motion fallback without runtime-only controls leaking to DOM',()=>{
 for(const name of Object.keys(studies)){
  const css=styleForStudy(name);assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/not\(\[data-motion-runtime=true\]\)/);
  const svg=renderToStaticMarkup(<DitherIcon name={name} replayKey={2} speed={.5} progress={.3}/>);
  assert.ok(!svg.includes('replayKey='));assert.ok(!svg.includes('progress='));assert.ok(!svg.includes('speed='));
 }
});
test('all visible identity parts return to their initial transform',()=>{
 const resting:Record<string,string[]>={bell:['shell','clapper'],heart:['heart'],download:['arrow','tray'],layers:['plane-top','plane-middle','plane-bottom']};
 for(const [name,parts] of Object.entries(resting))for(const part of parts){const frames=studies[name].tracks.find(t=>t.part===part)!.frames;assert.equal(frames[0].transform,frames.at(-1)!.transform,`${name}.${part} returns without a snap`);}
});
