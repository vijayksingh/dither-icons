import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {TokenizeIcon,EmbeddingLookupIcon,AttentionFocusIcon,BatchSamplingIcon,definitions} from '../src';
import type {Study,Track} from '../src/choreography';
import {tokenize,TOKEN_PIECES,TOKEN_ART} from '../src/motions/tokenize';
import {embeddingLookup,embeddingPoint,EMBEDDING_ART,EMBEDDING_CELLS} from '../src/motions/embedding-lookup';
import {attentionFocus,attentionPoint,ATTENTION_ART} from '../src/motions/attention-focus';
import {batchSampling,BATCH_GEOMETRY,BATCH_SELECTION,BATCH_SOURCE,BATCH_ART} from '../src/motions/batch-sampling';
const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;
const near=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} should equal ${b}`);
const numbers=(d:string)=>d.match(/-?(?:\d*\.)?\d+/g)!.map(Number);
const xy=(s:string)=>s.match(/translate\(([-\d.]+)px,([-\d.]+)px\)/)!.slice(1).map(Number);

test('data-flow semantic exports render all materials with isolated masks and attached grain',()=>{
 for(const [name,label,Icon] of [['tokenize','Tokenize',TokenizeIcon],['embedding-lookup','Embedding Lookup',EmbeddingLookupIcon],['attention-focus','Attention Focus',AttentionFocusIcon],['batch-sampling','Batch Sampling',BatchSamplingIcon]] as const){
  assert.equal(definitions.find(d=>d.name===name)?.label,label);
  for(const texture of ['dither','solid','outline'] as const){
   const svg=renderToStaticMarkup(<><Icon title={label} texture={texture} animate={false}/><Icon texture={texture}/></>);
   assert.ok(svg.includes(`aria-label="${label}"`));
   const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
   for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  }
 }
 const svg=renderToStaticMarkup(<BatchSamplingIcon texture="dither"/>);
 for(const p of BATCH_SELECTION)assert.ok(svg.includes(`M${p.x-1.25} ${p.y}a1.25`),'copies begin inside the grain field at actual source coordinates');
});

test('token boundaries precede separation and ordinal witnesses retain order with their own pieces',()=>{
 const svg=renderToStaticMarkup(<TokenizeIcon texture="outline"/>);
 TOKEN_PIECES.forEach((p,i)=>{
  const body=track(tokenize,`token-piece-${i}`),index=track(tokenize,`token-index-${i}`);
  const firstMove=body.frames.find(f=>f.transform!=='translateX(0px)');
  if(firstMove)for(let b=0;b<2;b++)assert.ok(peak(track(tokenize,`token-boundary-${b}`))<firstMove.at);
  assert.ok(peak(index)>body.frames[2].at,'indices follow the separated pieces');
  assert.ok(svg.indexOf(`data-part="token-index-${i}"`)>svg.indexOf(`data-part="token-piece-${i}"`));
  assert.ok(svg.includes(TOKEN_ART.content(p.x,p.w)),'source marks persist');
  if(i<2){const next=TOKEN_PIECES[i+1];for(let f=0;f<body.frames.length;f++){
   const offset=numbers(body.frames[f].transform!)[0],nextOffset=numbers(track(tokenize,`token-piece-${i+1}`).frames[f].transform!)[0];
   assert.ok(p.x+p.w+offset<next.x+nextOffset,'pieces never overlap or exchange order');
  }}
 });
});

test('embedding lookup retains matching source values and follows the drawn return route before readout',()=>{
 const svg=renderToStaticMarkup(<EmbeddingLookupIcon texture="solid"/>);
 EMBEDDING_CELLS.forEach((x,i)=>{for(const y of [8.5,20])assert.ok(svg.includes(EMBEDDING_ART.cell(x,y,EMBEDDING_ART.heights[1][i])));});
 assert.ok(!embeddingLookup.tracks.some(t=>/matrix|row/.test(t.part)),'lookup does not extract or deform a table row');
 const address=track(embeddingLookup,'embedding-address');near(5.8+numbers(address.frames[2].transform!)[0],numbers(EMBEDDING_ART.connector)[0]);
 const frames=track(embeddingLookup,'embedding-transfer').frames.filter(f=>f.opacity===.9);
 for(let i=0;i<3;i++)assert.ok(peak(track(embeddingLookup,`embedding-component-${i}`))<frames[0].at);
 // Parse the actual SVG M/H/Q/V/Q/H route independently of the motion helper.
 const n=numbers(EMBEDDING_ART.route),parts=[
  {w:3.1,p:(t:number)=>[n[0]+(n[2]-n[0])*t,n[1]]},
  {w:1.3,p:(t:number)=>[(1-t)**2*n[2]+2*(1-t)*t*n[3]+t*t*n[5],(1-t)**2*n[1]+2*(1-t)*t*n[4]+t*t*n[6]]},
  {w:9.9,p:(t:number)=>[n[5],n[6]+(n[7]-n[6])*t]},
  {w:1.3,p:(t:number)=>[(1-t)**2*n[5]+2*(1-t)*t*n[8]+t*t*n[10],(1-t)**2*n[7]+2*(1-t)*t*n[9]+t*t*n[11]]},
  {w:3.1,p:(t:number)=>[n[10]+(n[12]-n[10])*t,n[11]]},
 ];
 const drawn=(t:number)=>{let d=t*18.7;for(const p of parts){if(d<=p.w+1e-9)return p.p(Math.min(1,d/p.w));d-=p.w;}return [n[12],n[11]];};
 frames.forEach((f,i)=>{const t=(f.at-510)/290,p=xy(f.transform!),q=drawn(t);near(p[0]+17.7,q[0]);near(p[1]+8.5,q[1]);
  if(i){const a=xy(frames[i-1].transform!),mid=drawn(((frames[i-1].at+f.at)/2-510)/290);near((a[0]+p[0])/2+17.7,mid[0],.012);near((a[1]+p[1])/2+8.5,mid[1],.012);}
 });
 for(const t of [3.1/18.7,4.4/18.7,14.3/18.7,15.6/18.7])assert.ok(frames.some(f=>Math.abs((f.at-510)/290-t)<1e-8),'every carrier corner is explicitly sampled');
 near(embeddingPoint(1)[0],17.7);near(embeddingPoint(1)[1],20);
 for(const p of ['embedding-readout','embedding-edge','embedding-receive-upper','embedding-receive-lower'])assert.ok(peak(track(embeddingLookup,p))>frames.at(-1)!.at);
});

test('attention compares all three keys on the actual carriers before emphasizing a retained relation',()=>{
 const svg=renderToStaticMarkup(<AttentionFocusIcon/>),all=[0,1,2].map(i=>track(attentionFocus,`attention-trace-${i}`).frames.filter(f=>f.opacity===.8));
 for(let i=0;i<3;i++){
  assert.ok(svg.includes(ATTENTION_ART.routes[i]));assert.deepEqual(all[i].map(f=>f.at),all[0].map(f=>f.at));
  const n=numbers(ATTENTION_ART.routes[i]);
  all[i].forEach((f,j)=>{const t=j/(all[i].length-1),u=1-t,p=xy(f.transform!),drawn=i===1?[n[0]+(n[2]-n[0])*t,n[1]]:[0,1].map(k=>u**3*n[k]+3*u*u*t*n[k+2]+3*u*t*t*n[k+4]+t**3*n[k+6]);near(p[0]+7.6,drawn[0]);near(p[1]+12,drawn[1]);
   if(j){const a=attentionPoint(i,(j-1)/(all[i].length-1)),mid=attentionPoint(i,(j-.5)/(all[i].length-1));near((a[0]+drawn[0])/2,mid[0],.005);near((a[1]+drawn[1])/2,mid[1],.005);}
  });
  assert.ok(peak(track(attentionFocus,`attention-key-response-${i}`))>all[i].at(-1)!.at);
 }
 for(const p of ['attention-weight','attention-frame-upper','attention-frame-lower'])assert.ok(peak(track(attentionFocus,p))>peak(track(attentionFocus,'attention-key-response-1')));
 assert.ok(!attentionFocus.tracks.some(t=>/^attention-key-\d$|route/.test(t.part)),'all source keys and relationships remain present');
});

test('batch copies retain source data and meet the actual tray floor before their local and shared response',()=>{
 assert.equal(BATCH_SOURCE.length,6);assert.equal(BATCH_SELECTION.length,3);
 const filled=numbers(BATCH_ART.tray),outline=numbers(BATCH_ART.trayLine);
 near(BATCH_GEOMETRY.floor,filled[1]+filled[3]);near(BATCH_GEOMETRY.floor,outline[1]+outline[2]-.6);
 BATCH_SELECTION.forEach((p,i)=>{
  const copy=track(batchSampling,`batch-copy-${i}`);assert.deepEqual(copy,{...track(batchSampling,`batch-occlusion-${i}`),part:`batch-copy-${i}`});
  const contact=copy.frames.find(f=>Math.abs(p.y+numbers(f.transform!)[0]+BATCH_GEOMETRY.radius-BATCH_GEOMETRY.floor)<1e-8)!;
  assert.equal(contact.opacity,1);assert.ok(peak(track(batchSampling,`batch-seat-${i}`))>contact.at);
  assert.ok(peak(track(batchSampling,'batch-receipt'))>contact.at);
  for(const f of copy.frames)assert.ok(p.y+numbers(f.transform!)[0]+BATCH_GEOMETRY.radius<=BATCH_GEOMETRY.floor+1e-8,'sample never penetrates the receiving floor');
  const end=copy.frames.slice(-3);assert.equal(end[0].transform,end[1].transform,'copy fades in place');assert.equal(end[1].opacity,0);assert.equal(end[2].opacity,0);
 });
 assert.ok(!batchSampling.tracks.some(t=>t.part.startsWith('batch-source')),'original records are never removed');
});
