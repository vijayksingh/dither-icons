import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {PathIcon,FlaskIcon,TargetIcon,RetryIcon} from '../src';
import {path,PATH_ART} from '../src/motions/path';
import {target} from '../src/motions/target';
import {FLASK_ART} from '../src/motions/flask';

test('platform icons expose named components in every material with static accessibility',()=>{
 for(const Icon of [PathIcon,FlaskIcon,TargetIcon,RetryIcon])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<Icon texture={texture} title="Explore" animate={false}/>);
  assert.match(svg,/role="img"/);assert.match(svg,/aria-label="Explore"/);
  assert.match(svg,/data-crafted="true"/);assert.match(svg,/data-animate="false"/);
 }
});
test('path light stays on its curved carrier and arrives at each receiving node boundary',()=>{
 for(const [part,d,pivot,first,last,angle] of [
  ['route-first',PATH_ART.firstLight,[9.5,16.5],[5,19],[12,12],71],
  ['route-second',PATH_ART.secondLight,[14.5,7.5],[12,12],[19,5],-71],
 ] as const){
  const track=path.tracks.find(t=>t.part===part)!;
  assert.equal(track.origin,`${pivot[0]}px ${pivot[1]}px`);
  const points=d.match(/^M([\d.-]+) ([\d.-]+)A[\d. ]+ ([\d.-]+) ([\d.-]+)$/)!;
  assert.ok(points);const [x,y,ex,ey]=points.slice(1).map(Number);
  assert.ok(Math.abs(Math.hypot(x-first[0],y-first[1])-2.5)<1e-4);
  const a=angle*Math.PI/180;
  const end=[pivot[0]+(ex-pivot[0])*Math.cos(a)-(ey-pivot[1])*Math.sin(a),pivot[1]+(ex-pivot[0])*Math.sin(a)+(ey-pivot[1])*Math.cos(a)];
  assert.ok(Math.abs(Math.hypot(end[0]-last[0],end[1]-last[1])-2.5)<1e-4);
  for(const f of track.frames){const degrees=Number(f.transform!.match(/rotate\(([-\d.]+)deg\)/)![1]);assert.ok(Math.abs(degrees)<=Math.abs(angle));}
 }
 const second=path.tracks.find(t=>t.part==='route-second')!.frames.find(f=>f.opacity!>0)!.at;
 const middle=path.tracks.find(t=>t.part==='middle-node')!.frames.find(f=>f.transform==='scale(1.1)')!.at;
 assert.ok(second>middle,'signal is passed after middle milestone receives it');
});
test('target occlusion follows the full dart and the receiving ring waits for contact',()=>{
 const dart=target.tracks.find(t=>t.part==='dart')!,mask=target.tracks.find(t=>t.part==='dart-occlusion')!;
 assert.deepEqual(dart, {...mask,part:'dart'});
 const contact=dart.frames.find(f=>f.at>0&&f.transform==='translate(0px,0px)')!.at;
 const ring=target.tracks.find(t=>t.part==='inner-ring')!;
 assert.ok(ring.frames.filter(f=>f.at<=contact).every(f=>f.transform==='scale(1)'));
 for(const f of dart.frames){const m=f.transform!.match(/translate\(([-\d.]+)px,([-\d.]+)px\)/)!;assert.ok(Math.abs(Number(m[1])+Number(m[2]))<1e-9,'point stays on shaft axis');}
});
test('flask chamber, dart occlusion, and retry joint stay isolated between repeated instances',()=>{
 for(const Icon of [FlaskIcon,TargetIcon,RetryIcon])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><Icon texture={texture}/><Icon texture={texture}/></>);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  if(Icon===FlaskIcon){assert.ok(svg.includes(`<path d="${FLASK_ART.inside}"`));assert.match(svg,/<g clip-path="url\(#[^)]+\)"><g data-part="liquid">/);}
 }
});
