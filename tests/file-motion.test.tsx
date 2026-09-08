import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {folder} from '../src/motions/folder';
import {file,FILE_HINGE} from '../src/motions/file';

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
