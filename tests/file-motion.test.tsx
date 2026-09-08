import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {folder} from '../src/motions/folder';
import {file,FILE_HINGE} from '../src/motions/file';
import {copy} from '../src/motions/copy';
import {trash,TRASH_CONTACT} from '../src/motions/trash';

test('file and copy moving surfaces occlude their backing without instance collisions',()=>{
 for(const [name,study,plane,mask] of [
  ['file',file,'fold','fold-occlusion'],['copy',copy,'duplicate','duplicate-occlusion'],
 ] as const){
  const visible=study.tracks.find(t=>t.part===plane)!;
  const occluder=study.tracks.find(t=>t.part===mask)!;
  assert.equal(visible.origin,occluder.origin,name+' origin');
  assert.deepEqual(visible.frames,occluder.frames,name+' interpolation');
  for(const texture of ['dither','solid','outline'] as const){
   const svg=renderToStaticMarkup(<><DitherIcon name={name} texture={texture}/><DitherIcon name={name} texture={texture}/></>);
   const masks=[...svg.matchAll(/<mask id="([^"]+-file-layers-[^"]+)"/g)].map(m=>m[1]);
   assert.equal(masks.length,2);assert.equal(new Set(masks).size,2);
   for(const id of masks)assert.ok(svg.includes(`mask="url(#${id})"`));
  }
 }
});

test('trash lid stays in contact with the receiving rim throughout compression',()=>{
 const {at,compressedAt,rimY,baseY,lidBottom}=TRASH_CONTACT;
 const lid=trash.tracks.find(t=>t.part==='lid')!;
 const bin=trash.tracks.find(t=>t.part==='bin')!;
 const atFrame=(track:typeof lid,time:number)=>track.frames.find(f=>f.at===time)!;
 const translate=(time:number)=>{
  const match=atFrame(lid,time).transform!.match(/^translateY\(([-\d.]+)px\) rotate\(0deg\)$/);
  assert.ok(match,'lid lies parallel to rim at both contact boundaries');return Number(match[1]);
 };
 const scale=(time:number)=>Number(atFrame(bin,time).transform!.match(/^scale\([-\d.]+,([-\d.]+)\)$/)![1]);
 assert.equal(atFrame(lid,at).easing,atFrame(bin,at).easing,'shared progress through compression');
 for(const fraction of [0,.1,.25,.5,.75,.9,1]){
  const y=translate(at)+(translate(compressedAt)-translate(at))*fraction;
  const sy=scale(at)+(scale(compressedAt)-scale(at))*fraction;
  assert.ok(Math.abs(lidBottom+y-(baseY-(baseY-rimY)*sy))<1e-9,'lid cannot float or penetrate');
 }
 assert.ok(bin.frames.filter(f=>f.at<=at).every(f=>f.transform==='scale(1,1)'), 'receiving bin waits for contact');
 for(const part of ['rim-light','impact-left','impact-right']){
  const frames=trash.tracks.find(t=>t.part===part)!.frames;
  assert.ok(frames.filter(f=>f.at<=at).every(f=>f.opacity===0),part+' cannot precede contact');
 }
});

test('folder occlusion stays registered to each physical sheet in React and exported tracks',()=>{
 for(const [plane,mask] of [['cover','cover-occlusion'],['rear-paper','rear-occlusion'],['front-paper','front-occlusion']]){
  const visible=folder.tracks.find(t=>t.part===plane)!;
  const occluder=folder.tracks.find(t=>t.part===mask)!;
  assert.equal(visible.origin,occluder.origin,plane+' origin');
  assert.deepEqual(visible.frames,occluder.frames,plane+' complete interpolation');
 }
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><DitherIcon name="folder" texture={texture}/><DitherIcon name="folder" texture={texture}/></>);
  const masks=[...svg.matchAll(/<mask id="([^"]+-file-layers-[^"]+)"/g)].map(m=>m[1]);
  assert.equal(masks.length,6);
  assert.equal(new Set(masks).size,6,'instances must not steal each other\'s moving cutouts');
  for(const id of masks)assert.ok(svg.includes(`mask="url(#${id})"`));
 }
});

test('both ends of the file crease stay fixed while the flap peels between keyframes',()=>{
 const frames=file.tracks.find(t=>t.part==='fold')!.frames;
 const rotate=([x,y]:number[],degrees:number)=>{
  const angle=degrees*Math.PI/180;
  return [x*Math.cos(angle)-y*Math.sin(angle),x*Math.sin(angle)+y*Math.cos(angle)];
 };
 for(let i=0;i<frames.length-1;i++)for(const fraction of [0,.2,.5,.8,1]){
  const parse=(text:string)=>{
   const m=text.match(/^rotate\(([-\d.]+)deg\) scaleY\(([-\d.]+)\) rotate\(([-\d.]+)deg\)$/)!;
   assert.ok(m,'crease uses an affine hinge');return m.slice(1).map(Number);
  };
  const a=parse(frames[i].transform!),b=parse(frames[i+1].transform!);
  const [outer,scale,inner]=a.map((v,n)=>v+(b[n]-v)*fraction);
  for(const [x,y] of [[14,2],[20,8]]){
   const local=rotate([x-FILE_HINGE.x,y-FILE_HINGE.y],inner);
   const p=rotate([local[0],local[1]*scale],outer);
   assert.ok(Math.abs(p[0]+FILE_HINGE.x-x)<1e-9,'crease x is anchored');
   assert.ok(Math.abs(p[1]+FILE_HINGE.y-y)<1e-9,'crease y is anchored');
  }
 }
});
