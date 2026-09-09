import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {LearningRhythmIcon,GradientCheckIcon,ExperimentCompareIcon,TrainingStepIcon,definitions} from '../src';
import type {Study,Track} from '../src/choreography';
import {learningRhythm,RHYTHM_GEOMETRY} from '../src/motions/learning-rhythm';
import {gradientCheck,gradientPose,gradientY,gradientChord,GRADIENT_POSES,GRADIENT_ART} from '../src/motions/gradient-check';
import {experimentCompare,comparePoint,COMPARE_GEOMETRY,COMPARE_ART} from '../src/motions/experiment-compare';
import {trainingStep,stepPoint,STEP_GEOMETRY,STEP_POSES,STEP_ART} from '../src/motions/training-step';
const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;
const xy=(s:string)=>s.match(/translate\(([-\d.]+)px,([-\d.]+)px\)/)!.slice(1).map(Number);
const pathNumbers=(d:string)=>d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
const cubicPath=(d:string,t:number)=>{const n=pathNumbers(d),u=1-t;return [0,1].map(i=>u**3*n[i]+3*u*u*t*n[i+2]+3*u*t*t*n[i+4]+t**3*n[i+6]);};
const near=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} should equal ${b}`);

test('practice icons have semantic exports, isolated masks and valid static grain coordinates',()=>{
 for(const [name,label,Icon] of [['learning-rhythm','Learning Rhythm',LearningRhythmIcon],['gradient-check','Gradient Check',GradientCheckIcon],['experiment-compare','Experiment Compare',ExperimentCompareIcon],['training-step','Training Step',TrainingStepIcon]] as const){
  assert.equal(definitions.find(d=>d.name===name)?.label,label);
  for(const texture of ['dither','solid','outline'] as const){
   const svg=renderToStaticMarkup(<><Icon title={label} texture={texture} animate={false}/><Icon texture={texture}/></>);
   assert.ok(svg.includes(`aria-label="${label}"`));
   const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
   for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  }
 }
 const gradient=renderToStaticMarkup(<GradientCheckIcon texture="dither" animate={false}/>);
 assert.match(gradient,/M4.75 16.56a1.25/,'left probe is drawn at its real rest point, entirely inside the grain field');
 assert.match(gradient,/M16.75 10.56a1.25/,'right probe has its own attached grain');
 const training=renderToStaticMarkup(<TrainingStepIcon texture="dither" animate={false}/>);
 const start=stepPoint(STEP_GEOMETRY.start);
 assert.ok(training.includes(`M${start[0]-1.3} ${start[1]}a1.3`),'parameter texture cannot be clipped around a zero-centered circle');
 assert.match(renderToStaticMarkup(<LearningRhythmIcon/>),/transform="rotate\(-12 12 17.8\)"/,'static export retains its resting attitude without JavaScript');
});

test('learning rhythm keeps a rigid weight and stem around the fixed pivot, and responds after reversal',()=>{
 const arm=track(learningRhythm,'rhythm-arm'),g=RHYTHM_GEOMETRY;
 assert.equal(arm.origin,'12px 17.8px');
 const far=arm.frames.find(f=>f.transform==='rotate(28deg)')!;
 for(const name of ['rhythm-glint','rhythm-beat-upper','rhythm-beat-lower'])assert.ok(peak(track(learningRhythm,name))>far.at);
 const rotate=(x:number,y:number,a:number)=>{const r=a*Math.PI/180;return [12+(x-12)*Math.cos(r)-(y-17.8)*Math.sin(r),17.8+(x-12)*Math.sin(r)+(y-17.8)*Math.cos(r)];};
 for(const f of arm.frames){const a=Number(f.transform!.match(/rotate\(([-\d.]+)deg\)/)![1])+g.rest;assert.deepEqual(rotate(12,17.8,a),[12,17.8]);
  for(const p of [[11.5,7.2],[12.5,7.2],[9.95,9.95],[14.05,11.75]]){const [x,y]=rotate(p[0],p[1],a);assert.ok(x>3&&x<21&&y>3&&y<21);}
 }
 assert.ok(!learningRhythm.tracks.some(t=>t.part==='case'));
});

test('centered gradient probes and their secant remain coupled between every authored frame',()=>{
 for(let i=0;i<2;i++)assert.deepEqual(track(gradientCheck,`gradient-probe-${i}`),{...track(gradientCheck,`gradient-knockout-${i}`),part:`gradient-probe-${i}`});
 const chord=(span:number,x:number,y:number)=>{const m=gradientChord(span).match(/matrix\(([^)]+)\)/)![1].split(',').map(Number);return [12+m[0]*(x-12),13.56+m[1]*(x-12)+(y-13.56)+m[5]];};
 for(let i=0;i<GRADIENT_POSES.length;i++){
  const span=GRADIENT_POSES[i].span,left=gradientPose(span,-1),right=gradientPose(span,1);
  near(12-left.x,right.x-12);near(left.y,gradientY(left.x));near(right.y,gradientY(right.x));
  const curve=pathNumbers(GRADIENT_ART.curve);for(const p of [left,right]){const t=(p.x-curve[0])/(curve[4]-curve[0]),u=1-t;near(p.y,u*u*curve[1]+2*u*t*curve[3]+t*t*curve[5]);}
  for(const side of [-1,1] as const){const p=gradientPose(span,side),rest=gradientPose(6,side),end=chord(span,rest.x,rest.y);near(end[0],p.x);near(end[1],p.y);}
  if(i)for(const t of [.25,.5,.75])for(const side of [-1,1] as const){
   const a=gradientPose(GRADIENT_POSES[i-1].span,side),b=gradientPose(span,side),x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;
   near(y,gradientY(x),.002);
   const rest=gradientPose(6,side),ca=chord(GRADIENT_POSES[i-1].span,rest.x,rest.y),cb=chord(span,rest.x,rest.y);near(ca[0]+(cb[0]-ca[0])*t,x);near(ca[1]+(cb[1]-ca[1])*t,y);
  }
 }
 const arrival=GRADIENT_POSES.find(p=>p.span===2.5)!.at;
 assert.ok(peak(track(gradientCheck,'gradient-center'))>arrival);
});

test('comparison samples both distinct curves in the same phase and answers only after both arrivals',()=>{
 const points=[0,1].map(i=>track(experimentCompare,`compare-point-${i}`).frames.filter(f=>(f.opacity??0)>0&&f.at<=820));
 assert.deepEqual(points[0].map(f=>f.at),points[1].map(f=>f.at));
 for(let i=0;i<points[0].length;i++){
  const t=i/(points[0].length-1);
  for(const side of [0,1]){const p=xy(points[side][i].transform!),expected=comparePoint(side,t);near(p[0],expected[0]);near(p[1],expected[1]);const drawn=cubicPath(COMPARE_ART.plots[side],t);near(p[0],drawn[0]);near(p[1],drawn[1]);near((p[0]-COMPARE_GEOMETRY.starts[side])/4.4,t);}
  if(i){for(const side of [0,1]){const a=comparePoint(side,(i-1)/(points[0].length-1)),b=comparePoint(side,t),mid=comparePoint(side,(i-.5)/(points[0].length-1));near((a[1]+b[1])/2,mid[1],.012);}}
 }
 assert.notEqual(comparePoint(0,.5)[1],comparePoint(1,.5)[1],'plots retain different data');
 for(const p of ['compare-response-0','compare-response-1','compare-receipt'])assert.ok(peak(track(experimentCompare,p))>820);
});

test('one training step follows the actual loss curve with an attached knockout and stops before the minimum',()=>{
 const point=track(trainingStep,'training-point');assert.deepEqual(point,{...track(trainingStep,'training-knockout'),part:'training-point'});
 const start=stepPoint(STEP_GEOMETRY.start);
 point.frames.forEach((f,i)=>{const offset=xy(f.transform!),expected=stepPoint(STEP_POSES[i].t);near(offset[0]+start[0],expected[0]);near(offset[1]+start[1],expected[1]);const drawn=cubicPath(STEP_ART.curve,STEP_POSES[i].t);near(expected[0],drawn[0]);near(expected[1],drawn[1]);});
 const end=stepPoint(STEP_GEOMETRY.end);assert.ok(end[0]<13.5&&end[1]<18,'new point stays on the slope, before the minimum');
 for(let i=1;i<STEP_POSES.length;i++){const a=stepPoint(STEP_POSES[i-1].t),b=stepPoint(STEP_POSES[i].t),mid=stepPoint((STEP_POSES[i-1].t+STEP_POSES[i].t)/2);near((a[0]+b[0])/2,mid[0],.005);near((a[1]+b[1])/2,mid[1],.005);}
 for(const p of ['training-ring','training-normal-upper','training-normal-lower'])assert.ok(peak(track(trainingStep,p))>720);
 assert.ok(!trainingStep.tracks.some(t=>t.part==='landscape'));
});
