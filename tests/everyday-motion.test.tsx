import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import {search,SEARCH_ART,SEARCH_TIMING} from '../src/motions/search';
import {home,HOME_ART,HOME_GEOMETRY,HOME_TIMING} from '../src/motions/home';
import {settings,SETTINGS_ART,SETTINGS_TIMING} from '../src/motions/settings';
import {user,USER_TIMING} from '../src/motions/user';

test('search has one joined outer contour and an aperture; optical response follows the tool arrival',()=>{
 assert.equal((SEARCH_ART.body.match(/M/g)||[]).length,2,'one outer contour plus one aperture prevents even-odd neck cancellation');
 assert.equal((SEARCH_ART.body.match(/Z/g)||[]).length,2);
 const tool=search.tracks.find(t=>t.part==='magnifier')!;
 assert.equal(tool.frames.find(f=>f.at===SEARCH_TIMING.arrive)!.transform,tool.frames.find(f=>f.at===SEARCH_TIMING.hold)!.transform);
 for(const part of ['focus-brackets','glass-reflection','lens-rim']){
  const frames=search.tracks.find(t=>t.part===part)!.frames;
  assert.ok(frames.filter(f=>f.at<=SEARCH_TIMING.arrive).every(f=>f.opacity===0),'the optics do not announce focus before the lens arrives');
 }
});

test('home preserves both hinge endpoints and keeps the moving knockout on the exact leaf clock',()=>{
 const door=home.tracks.find(t=>t.part==='home-door')!,occlusion=home.tracks.find(t=>t.part==='home-door-occlusion')!;
 assert.deepEqual(door.frames,occlusion.frames);
 assert.equal(door.origin,occlusion.origin);
 const [ox,oy]=door.origin.split(' ').map(parseFloat);
 const [drawnX,drawnY]=HOME_ART.door.match(/^M([\d.]+) ([\d.]+)/)!.slice(1).map(Number);
 assert.deepEqual([ox,oy],[drawnX,drawnY]);
 for(const frame of door.frames){
  const [,sx,skew]=frame.transform!.match(/^scaleX\(([\d.]+)\) skewY\(([-\d.]+)deg\)$/)!;
  for(const y of [drawnY,21]){
   const dx=drawnX-ox,dy=y-oy;
   assert.deepEqual([ox+dx*Number(sx),oy+dy+Math.tan(Number(skew)*Math.PI/180)*dx],[drawnX,y]);
  }
 }
 assert.equal(HOME_GEOMETRY.bottom,21);
 assert.equal(HOME_ART.threshold,'M9.65 21h4.7','the receiving light lies on the actual sill');
 assert.ok(home.tracks.find(t=>t.part==='welcome-spill')!.frames.filter(f=>f.at<=HOME_TIMING.threshold).every(f=>f.opacity===0));
});

test('settings tab reaches the drawn spring contact before the pawl and echoes respond',()=>{
 const [px,py]=SETTINGS_ART.tab.match(/L([\d.]+) ([\d.]+)/)!.slice(1).map(Number);
 const gear=settings.tracks.find(t=>t.part==='settings-gear')!;
 const angle=Number(gear.frames.find(f=>f.at===SETTINGS_TIMING.contact)!.transform!.match(/rotate\(([-\d.]+)deg\)/)![1])*Math.PI/180;
 const x=12+(px-12)*Math.cos(angle)-(py-12)*Math.sin(angle),y=12+(px-12)*Math.sin(angle)+(py-12)*Math.cos(angle);
 assert.ok(Math.hypot(x-12,y-9.05)<.00002,'tab and spring share a geometric contact, not just timing');
 assert.match(SETTINGS_ART.pawl,/12 9\.05Q/,'the spring passes through the contact');
 const pawl=settings.tracks.find(t=>t.part==='spring-pawl')!;
 assert.equal(pawl.origin,'12px 9.05px','compression leaves the contact fixed');
 assert.equal(gear.frames.find(f=>f.at===SETTINGS_TIMING.contact)!.transform,gear.frames.find(f=>f.at===SETTINGS_TIMING.hold)!.transform);
 for(const part of ['detent-light','detent-echo','gear-index'])assert.ok(settings.tracks.find(t=>t.part===part)!.frames.filter(f=>f.at<=SETTINGS_TIMING.contact).every(f=>f.opacity===0));
});

test('user retains neck clearance and a fixed base through the nod; greeting follows the reversal',()=>{
 let bottom=0;
 for(const frame of user.tracks.find(t=>t.part==='profile-head')!.frames){
  const [,tx,ty,degrees,sx,sy]=frame.transform!.match(/^translate\(([-\d.]+)px,([-\d.]+)px\) rotate\(([-\d.]+)deg\) scale\(([-\d.]+),([-\d.]+)\)$/)!;
  assert.ok(Math.abs(Number(tx))<.5);
  const angle=Number(degrees)*Math.PI/180;
  // Support function of the actual drawn ellipse, including rotation and outline.
  const centerY=11.35+(7.3-11.35)*Number(sy)*Math.cos(angle)+Number(ty);
  const radiusY=Math.hypot(3.65*Number(sx)*Math.sin(angle),4.05*Number(sy)*Math.cos(angle));
  bottom=Math.max(bottom,centerY+radiusY+.7);
 }
 const shoulders=user.tracks.find(t=>t.part==='profile-shoulders')!;
 assert.equal(shoulders.origin,'12px 21.2px');
 for(const frame of shoulders.frames){
  const sy=Number(frame.transform!.match(/^scale\([\d.]+,([\d.]+)\)$/)![1]);
  const top=21.2+(14.45-21.2)*sy-.7;
  assert.ok(top-bottom>.55,'head and shoulders never merge, including the outline stroke');
 }
 for(const part of ['greeting-0','greeting-1'])assert.ok(user.tracks.find(t=>t.part===part)!.frames.filter(f=>f.at<=USER_TIMING.rise).every(f=>f.opacity===0));
});

test('multiple everyday icons keep mask and clip references isolated in each texture',()=>{
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<>{['search','home','settings','user','search','home','settings','user'].map((name,i)=><DitherIcon key={i} name={name} texture={texture}/>)}</>);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const [,id] of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(id),`referenced definition ${id} exists`);
 }
});
