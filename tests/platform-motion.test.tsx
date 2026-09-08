import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {TensorIcon,NetworkIcon,CheckpointIcon,HintIcon} from '../src';
import type {Study,Track} from '../src/choreography';
import {tensor,TENSOR_ART} from '../src/motions/tensor';
import {network,NETWORK_ART} from '../src/motions/network';
import {checkpoint} from '../src/motions/checkpoint';
import {hint,HINT_ART} from '../src/motions/hint';

const track=(study:Study,part:string)=>study.tracks.find(t=>t.part===part)!;
const paired=(study:Study,visible:string,occluder:string)=>{
 const a=track(study,visible),b=track(study,occluder);
 assert.ok(a&&b);assert.equal(a.origin,b.origin);assert.deepEqual(a.frames,b.frames);
};
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;

test('platform learning exports render accessible, isolated artwork in every material',()=>{
 for(const Icon of [TensorIcon,NetworkIcon,CheckpointIcon,HintIcon])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><Icon texture={texture} title="Explore" animate={false}/><Icon texture={texture}/></>);
  assert.match(svg,/role="img" aria-label="Explore"/);assert.match(svg,/data-animate="false"/);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,'repeated icons must not share mask IDs');
  for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
 }
});

test('tensor extraction preserves cell order and stays inside the viewBox including outline',()=>{
 paired(tensor,'slice','slice-occlusion');
 const corners=[[16.5,5.05],[21,7.3],[21,16.7],[12,21.2],[7.5,18.95],[7.5,9.55]];
 for(const f of track(tensor,'slice').frames){
  const m=f.transform!.match(/^translate\(([-\d.]+)px,([-\d.]+)px\)$/)!;
  assert.ok(m,'a slice translates as one rigid grid; no cell scaling or rotation');
  const [dx,dy]=m.slice(1).map(Number);
  assert.ok(Math.abs(dy-dx/2)<1e-9,'extraction follows the isometric projection axis');
  for(const [x,y] of corners)assert.ok(x+dx-.7>=0&&x+dx+.7<=24&&y+dy-.7>=0&&y+dy+.7<=24);
 }
 const svg=renderToStaticMarkup(<TensorIcon texture="solid"/>);
 assert.match(svg,/<mask id="[^"]+-slice-top-grid" maskUnits="userSpaceOnUse"/);
 const moving=svg.slice(svg.indexOf('<g data-part="slice">'),svg.indexOf('<g data-part="slice-edge"'));
 for(const face of [TENSOR_ART.sliceTop,TENSOR_ART.sliceLeft,TENSOR_ART.face])assert.ok(moving.includes(`d="${face}"`),'the extracted slice carries its top, side, and front together');
});

test('network signals stay on their edges and both inputs arrive before combination',()=>{
 paired(network,'compute-node','compute-occlusion');paired(network,'output-node','output-occlusion');
 let finalArrival=0;
 for(const [part,sign] of [['upper-signal',1],['lower-signal',-1]] as const){
  const signal=track(network,part);
  const translations=signal.frames.map(f=>{
   const [dx,dy]=f.transform!.match(/^translate\(([-\d.]+)px,([-\d.]+)px\)$/)!.slice(1).map(Number);
   assert.ok(Math.abs(dy-sign*dx*5/8)<1e-9,'light cannot depart from its fixed diagonal');
   return {dx,at:f.at};
  });
  finalArrival=Math.max(finalArrival,translations.find(f=>f.dx===Math.max(...translations.map(p=>p.dx)))!.at);
 }
 const hub=track(network,'compute-node');
 assert.ok(hub.frames.filter(f=>f.at<=finalArrival).every(f=>f.transform==='scale(1)'));
 const combine=hub.frames.find(f=>f.transform!=='scale(1)')!.at;
 assert.ok(peak(track(network,'output-signal'))>combine);
 for(const node of NETWORK_ART.nodes.filter(n=>n.part.startsWith('input-')))assert.ok(!network.tracks.some(t=>t.part===node.part),'source nodes are stable references');
});

test('checkpoint captures once and keeps the state seated while its retainer responds',()=>{
 paired(checkpoint,'retaining-ring','retainer-occlusion');
 const state=track(checkpoint,'saved-state');
 const contact=state.frames.find(f=>f.at>0&&f.transform===state.frames[0].transform)!.at;
 assert.ok(state.frames.filter(f=>f.at>=contact).every(f=>f.transform===state.frames[0].transform),'a captured state must not bounce away');
 const ring=track(checkpoint,'retaining-ring');
 assert.ok(ring.frames.filter(f=>f.at<=contact).every(f=>f.transform==='scale(1)'));
 assert.ok(peak(track(checkpoint,'state-registration'))>contact);
 assert.ok(peak(track(checkpoint,'capture-marks'))>peak(track(checkpoint,'state-registration')));
});

test('hint illumination stays inside fixed glass and conducts before the outward response',()=>{
 const order=['stem-light','filament-light','illumination','idea-top','idea-left'].map(p=>peak(track(hint,p)));
 assert.ok(order.every((t,i)=>i===0||t>order[i-1]));
 assert.ok(hint.tracks.every(t=>t.frames.every(f=>typeof f.opacity==='number')),'only light responds; no whole-bulb bounce');
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<HintIcon texture={texture}/>);
  assert.ok(svg.includes(`<path d="${HINT_ART.inside}"`));
  assert.match(svg,/<g clip-path="url\(#[^)]+\)"><g data-part="illumination"/);
  assert.match(svg,/<g data-part="filament-light" opacity="0">[^]*?<\/g><\/g>/);
 }
});
