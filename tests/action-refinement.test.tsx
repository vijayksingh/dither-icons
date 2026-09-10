import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {check,CHECK_ART,CHECK_TIMING} from '../src/motions/check';
import {close,CLOSE_TIMING} from '../src/motions/close';
import {plus,PLUS_TIMING} from '../src/motions/plus';
import {lock,LOCK_ART,LOCK_TIMING} from '../src/motions/lock';
import type {Study} from '../src/choreography';

const track=(study:Study,part:string)=>study.tracks.find(t=>t.part===part)!;
const hiddenThrough=(study:Study,part:string,time:number)=>assert.ok(track(study,part).frames.filter(f=>f.at<=time).every(f=>f.opacity===0),`${part} waits for its cause`);

test('check trace stays on the drawn ascending stroke and reaches its tip before the response',()=>{
 const points=CHECK_ART.centerline.match(/[\d.]+/g)!.map(Number);
 const [, ,vx,vy,tx,ty]=points;
 assert.equal(track(check,'check-stroke').origin,`${vx}px ${vy}px`,'the drawn vertex is the rotation pivot');
 const [x,y,dx,dy]=CHECK_ART.trace.match(/-?[\d.]+/g)!.map(Number);
 for(const frame of track(check,'check-trace').frames){
  const [mx,my]=frame.transform!.match(/-?[\d.]+/g)!.map(Number);
  for(const [px,py] of [[x+mx,y+my],[x+dx+mx,y+dy+my]]){
   const along=((px-vx)*(tx-vx)+(py-vy)*(ty-vy))/((tx-vx)**2+(ty-vy)**2);
   assert.ok(along>=0&&along<=1.00001);
   assert.ok(Math.abs((px-vx)*(ty-vy)-(py-vy)*(tx-vx))<.00001);
  }
 }
 const arrived=track(check,'check-trace').frames.find(f=>f.at===CHECK_TIMING.arrive)!;
 const [mx,my]=arrived.transform!.match(/-?[\d.]+/g)!.map(Number);
 assert.ok(Math.hypot(x+dx+mx-tx,y+dy+my-ty)<.00001);
 hiddenThrough(check,'check-trace',CHECK_TIMING.seat);
 hiddenThrough(check,'check-tip',CHECK_TIMING.arrive);
});

test('crossings retain matching moving knockouts and constant symbol angles',()=>{
 for(const [study,visible,knockout] of [[close,'close-up','close-occlusion'],[plus,'plus-above','plus-occlusion']] as const){
  assert.deepEqual(track(study,visible).frames,track(study,knockout).frames);
  assert.equal(track(study,visible).origin,track(study,knockout).origin);
  for(const part of study===close?['close-up','close-down']:['plus-above','plus-across']){
   assert.equal(track(study,part).origin,'12px 12px');
   for(const frame of track(study,part).frames){
    assert.match(frame.transform!,/^scaleX\([\d.]+\)$/,'no rotation or detached center');
    assert.ok(Number(frame.transform!.match(/[\d.]+/)![0])>=.9);
   }
  }
 }
 hiddenThrough(close,'cross-response',CLOSE_TIMING.meet);
 hiddenThrough(plus,'across-tips',PLUS_TIMING.across);
 hiddenThrough(plus,'above-tips',PLUS_TIMING.above);
 assert.ok(PLUS_TIMING.acrossEcho<PLUS_TIMING.above,'first axis responds before the second arrives');
});

test('lock keeps the drawn shackle feet anchored beneath the fixed housing',()=>{
 const [,left,feet]=LOCK_ART.shackleLine.match(/^M([\d.]+) ([\d.]+)/)!;
 const [,bodyY]=LOCK_ART.body.match(/^M[\d.]+ ([\d.]+)/)!;
 const shackle=track(lock,'lock-shackle');
 assert.equal(shackle.origin,`12px ${feet}px`);
 assert.ok(Number(feet)>Number(bodyY),'feet stay behind the receiving housing');
 for(const frame of shackle.frames){
  assert.match(frame.transform!,/^scaleY\([\d.]+\)$/);
  const scale=Number(frame.transform!.match(/[\d.]+/)![0]);
  for(const x of [Number(left),24-Number(left)])assert.deepEqual([x,Number(feet)+(Number(feet)-Number(feet))*scale],[x,Number(feet)]);
 }
 assert.equal(shackle.frames.find(f=>f.at===LOCK_TIMING.tension)!.transform,shackle.frames.find(f=>f.at===LOCK_TIMING.hold)!.transform);
 hiddenThrough(lock,'lock-seats',LOCK_TIMING.tension);
 hiddenThrough(lock,'lock-response',LOCK_TIMING.light);
});

test('multiple action instances preserve isolated, resolvable artwork masks in all materials',()=>{
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<>{['check','close','plus','lock','close','plus','lock'].map((name,i)=><DitherIcon key={i} name={name} texture={texture}/>)}</>);
  const ids=[...svg.matchAll(/<mask id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const [,id] of svg.matchAll(/mask="url\(#([^)]+)\)"/g))assert.ok(ids.includes(id));
 }
});
