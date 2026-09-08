import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {SigmaIcon,BugIcon,SlidersIcon,GraduationCapIcon} from '../src';
import type {Study,Track} from '../src/choreography';
import {sigma,SIGMA_TERMS,SIGMA_GEOMETRY} from '../src/motions/sigma';
import {bug,BUG_GEOMETRY} from '../src/motions/bug';
import {sliders,SLIDERS_GEOMETRY} from '../src/motions/sliders';
import {graduationCap,CAP_GEOMETRY} from '../src/motions/graduation-cap';
const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;
const translateX=(s:string)=>Number(s.match(/^translateX\(([-\d.]+)px\)$/)![1]);

test('four platform tool exports render accessible static variants with isolated clips and masks',()=>{
 for(const Icon of [SigmaIcon,BugIcon,SlidersIcon,GraduationCapIcon])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><Icon texture={texture} title="Platform tool" animate={false}/><Icon texture={texture}/></>);
  assert.match(svg,/role="img" aria-label="Platform tool"/);assert.match(svg,/data-animate="false"/);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
 }
});
test('sigma collects every term at one waist before its result travels down the operator',()=>{
 const trace=track(sigma,'sum-trace');
 for(const term of SIGMA_TERMS){
  const arrival=track(sigma,term.part).frames.find(f=>f.at===term.arrival)!;
  assert.match(arrival.transform!,/^translate\(0px,0px\)/);
  assert.ok(trace.frames.filter(f=>f.at<=term.arrival).every(f=>f.opacity===0),'no output before all operands arrive');
 }
 const [wx,wy]=SIGMA_GEOMETRY.waist;
 const traced=trace.frames.filter(f=>f.opacity&&f.opacity>0).map(f=>{
  const [dx,dy]=f.transform!.match(/translate\(([-\d.]+)px,([-\d.]+)px\)/)!.slice(1).map(Number);
  return [wx+dx,wy+dy];
 });
 const route=[SIGMA_GEOMETRY.waist,SIGMA_GEOMETRY.corner,SIGMA_GEOMETRY.result];
 assert.equal(traced.length,route.length);
 traced.forEach((p,i)=>assert.ok(Math.hypot(p[0]-route[i][0],p[1]-route[i][1])<1e-10));
 assert.ok(peak(track(sigma,'output-upper'))>peak(track(sigma,'sum-terminal')),'exterior output follows the terminal receipt');
 assert.ok(!sigma.tracks.some(t=>t.part==='operator'),'operator remains readable through computation');
});
test('bug opens a real seam around its fixed fault before locating it, without losing its shell',()=>{
 const left=track(bug,'shell-left'),right=track(bug,'shell-right');
 for(let i=0;i<left.frames.length;i++){
  const lx=translateX(left.frames[i].transform!),rx=translateX(right.frames[i].transform!);
  assert.equal(lx+rx,0,'both shell halves remain centered on the fixed fault');
  const gap=2*BUG_GEOMETRY.seamHalf+rx-lx;
  assert.ok(gap>=.76,'rest fault dot must fit between visible contours');
 }
 const opening=left.frames.find(f=>translateX(f.transform!)<0)!.at;
 assert.ok(track(bug,'fault-light').frames.filter(f=>f.at<=opening).every(f=>f.opacity===0));
 assert.ok(peak(track(bug,'fault-locator'))>peak(track(bug,'fault-light')));
 assert.ok(2*(BUG_GEOMETRY.seamHalf+BUG_GEOMETRY.travel)>2*(.93+.175),'light ring fits inside the open seam');
 const svg=renderToStaticMarkup(<BugIcon texture="outline"/>);
 assert.match(svg,/M10.8 9.5/);assert.match(svg,/M13.2 9.5/);
 assert.ok((13.2-.65)-(10.8+.65)>.76,'outline stroke must preserve the same fault clearance');
});
test('slider thumb, knockout and filled rail remain coincident at every interpolated position',()=>{
 const thumb=track(sliders,'slider-thumb'),mask=track(sliders,'slider-occlusion'),fill=track(sliders,'slider-fill'),g=SLIDERS_GEOMETRY;
 assert.deepEqual(thumb, {...mask,part:'slider-thumb'});
 for(let i=0;i<thumb.frames.length;i++){
  const a=thumb.frames[i],b=fill.frames[i],dx=translateX(a.transform!),scale=Number(b.transform!.match(/scaleX\(([^)]+)\)/)![1]);
  assert.equal(a.at,b.at);assert.equal(a.easing,b.easing);
  assert.ok(Math.abs(g.railStart+(g.middleX-g.railStart)*scale-(g.middleX+dx))<1e-10);
  assert.ok(g.middleX+dx-g.halfWidth>g.railStart&&g.middleX+dx+g.halfWidth<g.railEnd);
 }
 const register=peak(track(sliders,'thumb-light'));
 assert.equal(g.middleX+translateX(thumb.frames.find(f=>f.at===register)!.transform!),g.detentX);
 assert.ok(peak(track(sliders,'detent-upper'))>register);
 assert.ok(!sliders.tracks.some(t=>/top|bottom/.test(t.part)),'other variables stay fixed');
});
test('academic cap preserves its two attachment hinges and releases tassel energy after the board stops',()=>{
 const cap=track(graduationCap,'academic-cap'),cord=track(graduationCap,'tassel-cord'),tuft=track(graduationCap,'tassel-tuft');
 assert.equal(cord.origin,CAP_GEOMETRY.hinge.map(v=>`${v}px`).join(' '));
 assert.equal(tuft.origin,CAP_GEOMETRY.tuft.map(v=>`${v}px`).join(' '));
 const home=cap.frames.find(f=>f.at>140&&f.transform===cap.frames[0].transform)!.at;
 assert.ok(peak(track(graduationCap,'tassel-catch'))>home);
 assert.ok(cord.frames.some(f=>f.at>home&&f.transform!=='rotate(0deg)'));
 const svg=renderToStaticMarkup(<GraduationCapIcon texture="solid"/>);
 assert.match(svg,/<g data-part="academic-cap">/);
 assert.match(svg,/<g data-part="tassel-cord"><path d="M20 9.4v6.9"[^>]+><\/path>|<g data-part="tassel-cord"><path d="M20 9.4v6.9"[^>]+\/>/);
 assert.match(svg,/<g data-part="tassel-tuft">/);
 // Nested rotation about each physical hinge leaves that connection stationary.
 for(const t of [cord,tuft])for(const f of t.frames){
  const angle=Number(f.transform!.match(/rotate\(([-\d.]+)deg\)/)![1]);
  assert.ok(Math.abs(angle)<=11,'attachment motion remains restrained');
 }
});
