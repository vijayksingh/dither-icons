import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {book,BOOK_BINDING} from '../src/motions/book';
import {mail,MAIL_HINGE} from '../src/motions/mail';
import {send,SEND_HINGE} from '../src/motions/send';

test('moving paper occlusion shares its surface clock, and repeated instances keep independent apertures',()=>{
 for(const [study,plane,mask] of [
  [book,'turning-page','page-occlusion'],[mail,'flap','flap-occlusion'],
  [mail,'letter','letter-occlusion'],[mail,'letter','letter-rear-occlusion'],
 ] as const){
  const visible=study.tracks.find(t=>t.part===plane)!;
  const hidden=study.tracks.find(t=>t.part===mask)!;
  assert.equal(visible.origin,hidden.origin);assert.deepEqual(visible.frames,hidden.frames);
 }
 for(const name of ['book','mail','message'])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><DitherIcon name={name} texture={texture}/><DitherIcon name={name} texture={texture}/></>);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${name}/${texture} independent instances`);
  for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  if(name==='mail'){
   // Fixed front and rear half-planes meet exactly at the physical flap hinge.
   assert.match(svg,new RegExp(`<rect y="${MAIL_HINGE.y}" width="24" height="${24-MAIL_HINGE.y}"`));
   assert.match(svg,new RegExp(`<rect width="24" height="${MAIL_HINGE.y}"`));
  }
 }
});

test('book page keeps the full binding fixed and joins the receiving bed through its landing',()=>{
 const page=book.tracks.find(t=>t.part==='turning-page')!;
 const bed=book.tracks.find(t=>t.part==='left-bed')!;
 const parse=(t:string)=>{
  const m=t.match(/^scaleX\(([-\d.]+)\) skewY\(([-\d.]+)deg\)$/)!;
  assert.ok(m);return m.slice(1).map(Number);
 };
 const place=([x,y]:number[],[scale,skew]:number[])=>[
  BOOK_BINDING.x+(x-BOOK_BINDING.x)*scale,
  y+(x-BOOK_BINDING.x)*Math.tan(skew*Math.PI/180),
 ];
 const near=(a:number[],b:number[])=>a.forEach((v,i)=>assert.ok(Math.abs(v-b[i])<1e-9));
 for(let i=0;i<page.frames.length-1;i++)for(const f of [0,.2,.5,.8,1]){
  const a=parse(page.frames[i].transform!),b=parse(page.frames[i+1].transform!);
  const values=a.map((v,n)=>v+(b[n]-v)*f);
  for(const p of [[12,5],[12,21]])near(place(p,values),p);
 }
 const a=page.frames.find(f=>f.at===BOOK_BINDING.land)!;
 const b=page.frames.find(f=>f.at===BOOK_BINDING.compress)!;
 const c=bed.frames.find(f=>f.at===BOOK_BINDING.land)!;
 const d=bed.frames.find(f=>f.at===BOOK_BINDING.compress)!;
 assert.equal(a.easing,c.easing,'same progress through contact');
 const skew=(t:string)=>Number(t.match(/^skewY\(([-\d.]+)deg\)$/)![1]);
 for(const f of [0,.1,.3,.6,.9,1]){
  const start=parse(a.transform!),end=parse(b.transform!);
  const pageValues=start.map((v,n)=>v+(end[n]-v)*f);
  const bedSkew=skew(c.transform!)+(skew(d.transform!)-skew(c.transform!))*f;
  // Corresponding corners and curve control points of the mirrored leaves.
  for(const point of [[12,5],[15.1,3.35],[20.5,4],[20.5,19.5],[15.1,19],[12,21]]){
   near(place(point,pageValues),place([24-point[0],point[1]],[1,bedSkew]));
  }
 }
});

test('send wing flex preserves both keel endpoints between authored poses',()=>{
 const frames=send.tracks.find(t=>t.part==='lower-wing')!.frames;
 const rotate=([x,y]:number[],angle:number)=>{
  const t=angle*Math.PI/180;return [x*Math.cos(t)-y*Math.sin(t),x*Math.sin(t)+y*Math.cos(t)];
 };
 const parse=(text:string)=>{
  const m=text.match(/^rotate\(([-\d.]+)deg\) scaleY\(([-\d.]+)\) rotate\(([-\d.]+)deg\)$/)!;
  assert.ok(m);return m.slice(1).map(Number);
 };
 for(let i=0;i<frames.length-1;i++)for(const f of [0,.2,.5,.8,1]){
  const a=parse(frames[i].transform!),b=parse(frames[i+1].transform!);
  const [outer,scale,inner]=a.map((v,n)=>v+(b[n]-v)*f);
  for(const [x,y] of [[20,4],[10,14]]){
   const local=rotate([x-SEND_HINGE.x,y-SEND_HINGE.y],inner);
   const p=rotate([local[0],local[1]*scale],outer);
   assert.ok(Math.abs(p[0]+SEND_HINGE.x-x)<1e-9);
   assert.ok(Math.abs(p[1]+SEND_HINGE.y-y)<1e-9);
  }
 }
});
