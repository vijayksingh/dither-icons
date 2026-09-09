import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {CodeRunIcon,TestSuiteIcon,MilestoneIcon,ConceptReviewIcon,definitions} from '../src';
import type {Study,Track} from '../src/choreography';
import {codeRun} from '../src/motions/code-run';
import {testSuite,SUITE_CASES,SUITE_GEOMETRY} from '../src/motions/test-suite';
import {milestone,MILESTONE_GEOMETRY} from '../src/motions/milestone';
import {conceptReview,reviewPoint,REVIEW_GEOMETRY} from '../src/motions/concept-review';
const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;

test('semantic workflow names and exports identify platform roles in every material',()=>{
 const cases=[['code-run','Code Run',CodeRunIcon],['test-suite','Test Suite',TestSuiteIcon],['milestone','Milestone',MilestoneIcon],['concept-review','Concept Review',ConceptReviewIcon]] as const;
 for(const [name,label,Icon] of cases){
  const definition=definitions.find(d=>d.name===name)!;
  assert.equal(definition.label,label);assert.ok(definition.keywords!.length>=4);
  for(const texture of ['dither','solid','outline'] as const){
   const svg=renderToStaticMarkup(<><Icon title={label} texture={texture} animate={false}/><Icon texture={texture}/></>);
   assert.ok(svg.includes(`role="img" aria-label="${label}"`));assert.match(svg,/data-animate="false"/);
   const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
   for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  }
 }
});
test('code run waits for source preparation and carries its knockout with the launch triangle',()=>{
 const launch=track(codeRun,'run-launch'),mask=track(codeRun,'run-occlusion');
 assert.deepEqual(launch,{...mask,part:'run-launch'});
 const sources=[0,1,2].map(i=>track(codeRun,`source-charge-${i}`));
 for(let i=1;i<sources.length;i++){
  assert.ok(sources[i].frames.filter(f=>f.at<=peak(sources[i-1])).every(f=>f.opacity===0));
 }
 const move=launch.frames.find(f=>f.transform!=='translateX(0px)')!.at;
 assert.ok(move>peak(sources[2]));assert.ok(peak(track(codeRun,'run-edge'))>move);
 assert.ok(!codeRun.tracks.some(t=>t.part==='frame'));
});
test('test suite contacts each actual chamber floor independently before the fixture response',()=>{
 let latestSeat=0;
 SUITE_CASES.forEach((c,i)=>{
  const specimen=track(testSuite,`case-${i}`),response=track(testSuite,`seat-light-${i}`);
  const positions=specimen.frames.map(f=>({at:f.at,y:c.startY+Number(f.transform!.match(/translateY\(([-\d.]+)px\)/)![1])}));
  for(const p of positions)assert.ok(p.y+SUITE_GEOMETRY.specimenRadius<=SUITE_GEOMETRY.floor+1e-10,'specimen cannot pass through the floor');
  const contacts=positions.filter(p=>Math.abs(p.y-SUITE_GEOMETRY.seat)<1e-10);
  assert.ok(contacts.length>=2);assert.ok(peak(response)>contacts[0].at);
  assert.ok(response.frames.filter(f=>f.at<=contacts[0].at).every(f=>f.opacity===0));
  latestSeat=Math.max(latestSeat,contacts[1].at);
  if(i)assert.ok(contacts[0].at>track(testSuite,`case-${i-1}`).frames.find(f=>Math.abs(SUITE_CASES[i-1].startY+Number(f.transform!.match(/translateY\(([-\d.]+)px\)/)![1])-SUITE_GEOMETRY.seat)<1e-10)!.at);
 });
 assert.ok(peak(track(testSuite,'suite-datum'))>latestSeat);
});
test('milestone keeps its full mast edge and the complete cloth seam attached under deformation',()=>{
 const root=track(milestone,'flag-root'),free=track(milestone,'flag-free'),g=MILESTONE_GEOMETRY;
 const transform=(x:number,y:number,origin:number,value:string)=>{const m=value.match(/skewY\(([-\d.]+)deg\) scaleX\(([-\d.]+)\)/)!;const dx=(x-origin)*Number(m[2]);return [origin+dx,y+Math.tan(Number(m[1])*Math.PI/180)*dx];};
 for(const frame of root.frames)for(const y of [5,8.5,12])assert.deepEqual(transform(g.mastX,y,g.mastX,frame.transform!),[g.mastX,y]);
 for(const a of root.frames)for(const b of free.frames)for(const y of [5.5,9,12.5]){
  const rootSeam=transform(g.seamX,y,g.mastX,a.transform!);
  const childSeam=transform(g.seamX,y,g.seamX,b.transform!);
  assert.deepEqual(transform(childSeam[0],childSeam[1],g.mastX,a.transform!),rootSeam);
 }
 const svg=renderToStaticMarkup(<MilestoneIcon/>);assert.match(svg,/<g data-part="flag-root">/);assert.match(svg,/<g data-part="flag-free">/);
});
test('concept review exposes the earlier reference before a signal returns along its actual carrier',()=>{
 const card=track(conceptReview,'review-card'),mask=track(conceptReview,'review-occlusion'),trace=track(conceptReview,'recall-trace');
 assert.deepEqual(card,{...mask,part:'review-card'});
 const opened=card.frames.find(f=>f.transform!=='translateX(0px) rotate(0deg)')!.at;
 const travel=trace.frames.filter(f=>(f.opacity??0)>0);
 assert.ok(travel[0].at>opened);
 const duration=travel.at(-1)!.at-travel[0].at;
 travel.forEach(f=>{const t=(f.at-travel[0].at)/duration,p=reviewPoint(t),[x,y]=f.transform!.match(/translate\(([-\d.]+)px,([-\d.]+)px\)/)!.slice(1).map(Number);assert.ok(Math.hypot(REVIEW_GEOMETRY.tail[0]+x-p[0],REVIEW_GEOMETRY.tail[1]+y-p[1])<1e-9);});
 for(let i=1;i<travel.length;i++){
  const a=reviewPoint((i-1)/(travel.length-1)),b=reviewPoint(i/(travel.length-1)),mid=reviewPoint((i-.5)/(travel.length-1));
  assert.ok(Math.hypot((a[0]+b[0])/2-mid[0],(a[1]+b[1])/2-mid[1])<.01,'interpolated trace stays on the carrier');
 }
 assert.ok(peak(track(conceptReview,'recall-line'))>travel.at(-1)!.at);
 const tip=reviewPoint(1);assert.ok(Math.hypot(tip[0]-REVIEW_GEOMETRY.tip[0],tip[1]-REVIEW_GEOMETRY.tip[1])<1e-10);
 const svg=renderToStaticMarkup(<ConceptReviewIcon texture="solid"/>);
 assert.match(svg,/H8.1M6.65 6.05 8.1 7.5 6.65 8.95/,'the neck reaches the exact arrowhead tip in one stroked path');
 assert.match(svg,/<mask id="[^"]+-return"/,'a stroked route requires a mask, not an SVG clipPath that ignores stroke');
});
