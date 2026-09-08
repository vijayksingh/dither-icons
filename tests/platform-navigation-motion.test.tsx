import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {WorkspaceIcon,GaugeIcon,OrbitIcon,LifebuoyIcon} from '../src';
import type {Study,Track} from '../src/choreography';
import {workspace} from '../src/motions/workspace';
import {gauge,GAUGE_GEOMETRY} from '../src/motions/gauge';
import {orbit,orbitPoint,ORBIT_GEOMETRY} from '../src/motions/orbit';
import {lifebuoy,LIFEBUOY_GEOMETRY} from '../src/motions/lifebuoy';

const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;
test('platform navigation exports render named static icons with isolated masks in every material',()=>{
 for(const Icon of [WorkspaceIcon,GaugeIcon,OrbitIcon,LifebuoyIcon])for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><Icon texture={texture} title="Navigate" animate={false}/><Icon texture={texture}/></>);
  assert.match(svg,/role="img" aria-label="Navigate"/);assert.match(svg,/data-animate="false"/);
  const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
 }
});
test('workspace creates room before source lines respond and keeps its file tree clear',()=>{
 const divider=track(workspace,'divider');
 for(const f of divider.frames){
  const x=Number(f.transform!.match(/^translateX\(([-\d.]+)px\)$/)![1]);
  assert.ok(8.95+x-(6.8+.4)>=.5,'divider must not crowd the file tree');
 }
 const opened=divider.frames.find(f=>f.transform==='translateX(-1.2px)')!.at;
 for(const part of ['source-first','source-second']){
  const t=track(workspace,part);
  assert.ok(t.frames.filter(f=>f.at<=opened).every(f=>f.transform==='scaleX(1)'));
 }
 assert.ok(!workspace.tracks.some(t=>/frame|tree|toolbar/.test(t.part)),'stable frame and source tree define the working surface');
 assert.ok(peak(track(workspace,'editor-caret'))>opened);
});
test('gauge registers against a fixed tick and keeps the entire needle inside its dial',()=>{
 const needle=track(gauge,'needle');
 assert.equal(needle.origin,`${GAUGE_GEOMETRY.x}px ${GAUGE_GEOMETRY.y}px`);
 for(const f of needle.frames){
  const angle=GAUGE_GEOMETRY.angle+Number(f.transform!.match(/^rotate\(([-\d.]+)deg\)$/)![1]);
  assert.ok(angle>240&&angle<330,'needle stays within the calibrated arc');
  assert.ok(GAUGE_GEOMETRY.needleLength+.7<GAUGE_GEOMETRY.radius-.825);
 }
 const registered=peak(track(gauge,'reading-tick'));
 assert.equal(needle.frames.find(f=>f.at===registered)!.transform,'rotate(0deg)');
 assert.ok(peak(track(gauge,'reading-echo'))>registered,'exterior echo follows actual registration');
 assert.ok(!gauge.tracks.some(t=>/rim|scale|hub/.test(t.part)));
});
test('orbit maintains one elliptical trajectory across front, rear, occlusion, and interpolation',()=>{
 const front=track(orbit,'satellite-front');
 for(const p of ['satellite-rear','satellite-occlusion']){
  const t=track(orbit,p);assert.equal(front.origin,t.origin);assert.deepEqual(front.frames,t.frames);
 }
 const g=ORBIT_GEOMETRY,[sx,sy]=orbitPoint(g.startAngle),tilt=g.tilt*Math.PI/180;
 const points=front.frames.map(f=>{
  const [dx,dy,scale]=f.transform!.match(/^translate\(([-\d.]+)px,([-\d.]+)px\) scale\(([-\d.]+)\)$/)!.slice(1).map(Number);
  const x=sx+dx-g.x,y=sy+dy-g.y;
  assert.ok(Math.abs((x/g.rx)**2+(y/g.ry)**2-1)<.00002,'sample must lie on the actual ellipse');
  const px=g.x+x*Math.cos(tilt)-y*Math.sin(tilt),py=g.y+x*Math.sin(tilt)+y*Math.cos(tilt),r=(g.satelliteRadius+.7)*scale;
  assert.ok(px-r>0&&px+r<24&&py-r>0&&py+r<24,'outline satellite stays in the icon');
  return {x,y};
 });
 for(let i=1;i<points.length;i++){
  const x=(points[i].x+points[i-1].x)/2,y=(points[i].y+points[i-1].y)/2;
  const deficit=1-Math.sqrt((x/g.rx)**2+(y/g.ry)**2);
  assert.ok(deficit*g.rx<.03,'linear native interpolation must stay within .03 units of the carrier');
 }
 assert.deepEqual(points[0],points.at(-1));
});
test('lifebuoy meets its receiving line before ring contact and outward ripples',()=>{
 const g=LIFEBUOY_GEOMETRY,buoy=track(lifebuoy,'buoy');
 const contact=buoy.frames.find(f=>f.transform!.startsWith('translateY(1.1px)'))!.at;
 const pose=buoy.frames.find(f=>f.at===contact)!;
 const y=Number(pose.transform!.match(/translateY\(([-\d.]+)px\)/)![1]);
 assert.equal(g.y+g.radius+y,g.contactY,'bottom of the circular ring meets the waterline');
 for(const p of ['buoy-contact','ripple-left','ripple-right','echo-left','echo-right']){
  const t=track(lifebuoy,p);
  assert.ok(t.frames.filter(f=>f.at<=contact).every(f=>f.opacity===0),'no contact effect before contact');
 }
 assert.ok(peak(track(lifebuoy,'ripple-left'))>peak(track(lifebuoy,'buoy-contact')));
 const svg=renderToStaticMarkup(<LifebuoyIcon texture="dither"/>);
 assert.match(svg,/<g data-part="buoy"><g mask="url\(#[^)]+\)" opacity=".62">/);
 assert.ok(g.innerRadius>4,'the rescue aperture remains open throughout rigid motion');
});
