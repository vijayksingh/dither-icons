import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon,definitions} from '../src/index';
import {studies,keyframesFor,styleForStudy} from '../src/choreography';

test('every timeline binds to real SVG parts, covers the full clock, and animates only transform or opacity',()=>{
 assert.deepEqual(Object.keys(studies).sort(),definitions.map(d=>d.name).sort(),'every catalog icon has authored motion');
 for(const [name,study] of Object.entries(studies))for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<DitherIcon name={name} texture={texture}/>);
  assert.equal(new Set(study.tracks.map(t=>t.part)).size,study.tracks.length);
  for(const track of study.tracks){
   assert.equal([...svg.matchAll(new RegExp(`<g\\b[^>]*data-part="${track.part}"[^>]*>`, 'g'))].length,1,`${name}: ${track.part} binds exactly once`);
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
test('every visible actor preserves opacity and returns without a snap; every accent ends hidden',()=>{
 for(const [name,study] of Object.entries(studies))for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<DitherIcon name={name} texture={texture}/>);
  for(const {part,frames} of study.tracks){
   const tag=svg.match(new RegExp(`<g\\b[^>]*data-part="${part}"[^>]*>`))![0];
   const restOpacity=Number(tag.match(/opacity="([.\d]+)"/)?.[1]??1);
   if(restOpacity===0){assert.equal(frames[0].opacity,0,`${name}.${part} starts hidden`);assert.equal(frames.at(-1)!.opacity,0,`${name}.${part} ends hidden`);}
   else{
    assert.equal(frames[0].transform,frames.at(-1)!.transform,`${name}.${part} returns without a snap`);
    assert.ok(frames.every(f=>f.opacity===undefined||f.opacity>=restOpacity),`${name}.${part} never disappears`);
   }
  }
 }
});
test('eye apertures are unique when multiple icons share a document',()=>{
 const svg=renderToStaticMarkup(<><DitherIcon name="eye"/><DitherIcon name="eye"/></>);
 const ids=[...svg.matchAll(/<clipPath id="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,2);assert.equal(new Set(ids).size,2);
 for(const id of ids)assert.ok(svg.includes(`clip-path="url(#${id})"`));
});
