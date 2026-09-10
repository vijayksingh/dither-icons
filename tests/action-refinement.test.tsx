import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon,UnlockIcon} from '../src';
import {unlock,UNLOCK_GEOMETRY,UNLOCK_REST_TRANSFORM,UNLOCK_TIMING} from '../src/motions/unlock';
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

test('crossings keep their knockout on the moving stroke clock; finishes wait for their own cause',()=>{
 for(const [study,visible,knockout] of [[close,'close-up','close-occlusion'],[plus,'plus-above','plus-occlusion']] as const){
  assert.deepEqual(track(study,visible).frames,track(study,knockout).frames);
  assert.equal(track(study,visible).origin,track(study,knockout).origin);
  for(const frame of track(study,visible).frames)assert.match(frame.transform!,/^translateX\([-\d.]+px\)$/,'stroke slides on its existing axis; it does not rotate into another symbol');
 }
 hiddenThrough(close,'cross-finish',CLOSE_TIMING.cross);
 assert.ok(CLOSE_TIMING.mark<CLOSE_TIMING.cross);
 for(const part of ['plus-wave-left','plus-wave-right'])hiddenThrough(plus,part,PLUS_TIMING.register);
 hiddenThrough(plus,'addition-finish',PLUS_TIMING.arrive);
 const receiver=track(plus,'plus-across');
 assert.equal(receiver.frames.find(f=>f.at===PLUS_TIMING.receive)!.transform,receiver.frames[0].transform,'crossbar waits for the approaching stroke');
 for(const at of [PLUS_TIMING.register,PLUS_TIMING.flow]){
  const stemY=Number(track(plus,'plus-above').frames.find(f=>f.at===at)!.transform!.match(/-?[\d.]+/)![0]);
  const barY=Number(receiver.frames.find(f=>f.at===at)!.transform!.match(/-?[\d.]+/)![0]);
  assert.equal(stemY,barY,'after registration both strokes share the same vertical press and release');
 }
});

test('UnlockIcon is open at rest and keeps a clear free end throughout its motion',()=>{
 assert.equal(UNLOCK_REST_TRANSFORM,'rotate(18 16.4 11.3)');
 const {pivot,free,restAngle}=UNLOCK_GEOMETRY;
 for(const frame of track(unlock,'unlock-shackle').frames){
  const angle=(restAngle+Number(frame.transform!.match(/-?[\d.]+/)![0]))*Math.PI/180;
  const freeY=pivot[1]+(free[0]-pivot[0])*Math.sin(angle);
  // Include the full shackle thickness: even its lower edge clears the housing.
  assert.ok(freeY+Math.sin(angle)<10.3-1,'a real gap remains above the housing');
 }
 assert.equal(track(unlock,'unlock-shackle').origin,`${pivot[0]}px ${pivot[1]}px`);
 hiddenThrough(unlock,'unlock-end',UNLOCK_TIMING.release);
 hiddenThrough(unlock,'unlock-gap',UNLOCK_TIMING.light);
 const svg=renderToStaticMarkup(<UnlockIcon texture="solid"/>);
 assert.match(svg,/data-icon="unlock"/);
 assert.ok(svg.includes(`transform="${UNLOCK_REST_TRANSFORM}"`),'open pose is SVG geometry, not a runtime-only transform');
});

test('lock rattles rigidly while both drawn feet stay captured by the fixed housing',()=>{
 const [,left,feet]=LOCK_ART.shackleLine.match(/^M([\d.]+) ([\d.]+)/)!;
 const [,flatLeft,bodyTop,flatWidth,radius]=LOCK_ART.body.match(/^M([\d.]+) ([\d.]+)h([\d.]+)a([\d.]+)/)!;
 const shackle=track(lock,'lock-shackle');
 assert.equal(shackle.origin,`12px ${feet}px`);
 const shifts=shackle.frames.map(frame=>{
  assert.match(frame.transform!,/^translate\([-\d.]+px, [-\d.]+px\)$/,'metal moves rigidly, with no stretch or tilt');
  const [dx,dy]=frame.transform!.match(/-?[\d.]+/g)!.map(Number);
  // Include the full two-unit foot width and the housing's rounded shoulders.
  for(const center of [Number(left),24-Number(left)])for(const edge of [-1,1]){
   const x=center+edge+dx;
   const beyond=Math.max(Number(flatLeft)-x,x-Number(flatLeft)-Number(flatWidth),0);
   assert.ok(beyond<Number(radius));
   const top=Number(bodyTop)+Number(radius)-Math.sqrt(Number(radius)**2-beyond**2);
   assert.ok(Number(feet)+dy>top+.4,'both feet remain visibly inserted at every reversal');
  }
  return {at:frame.at,dx,dy};
 });
 const reversals=shifts.filter(f=>f.dx!==0);
 assert.ok(reversals.length>=4,'a short rattle, not a single directional nudge');
 for(let i=1;i<reversals.length;i++){
  assert.ok(reversals[i].dx*reversals[i-1].dx<0,'direction alternates');
  assert.ok(Math.abs(reversals[i].dx)<Math.abs(reversals[i-1].dx),'resistance dissipates travel');
 }
 assert.equal(shackle.frames.find(f=>f.at===LOCK_TIMING.stop)!.transform,shackle.frames.find(f=>f.at===LOCK_TIMING.hold)!.transform,'a firm stop is followed by sustained stillness');
 hiddenThrough(lock,'lock-seats',LOCK_TIMING.stop);
 hiddenThrough(lock,'lock-response',LOCK_TIMING.light);
});

test('multiple action instances preserve isolated, resolvable artwork masks in all materials',()=>{
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<>{['check','close','plus','lock','unlock','close','plus','unlock'].map((name,i)=><DitherIcon key={i} name={name} texture={texture}/>)}</>);
  const ids=[...svg.matchAll(/<mask id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const [,id] of svg.matchAll(/mask="url\(#([^)]+)\)"/g))assert.ok(ids.includes(id));
 }
});
