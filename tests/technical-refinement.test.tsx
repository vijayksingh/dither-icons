import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon} from '../src';
import type {Study} from '../src/choreography';
import {terminal,TERMINAL_GEOMETRY,TERMINAL_TIMING} from '../src/motions/terminal';
import {cpu,CPU_GEOMETRY,CPU_TIMING} from '../src/motions/cpu';
import {chart,CHART_GEOMETRY,CHART_POINTS,CHART_TIMING} from '../src/motions/chart';
import {bolt,BOLT_GEOMETRY,BOLT_CONTACT,BOLT_TIMING} from '../src/motions/bolt';
const track=(study:Study,part:string)=>study.tracks.find(t=>t.part===part)!;
const numbers=(s:string)=>s.match(/-?\d*\.?\d+/g)!.map(Number);
const hiddenThrough=(s:Study,part:string,time:number)=>assert.ok(track(s,part).frames.filter(f=>f.at<=time).every(f=>f.opacity===0));

test('Terminal submits a readable command and writes its reply behind the returned cursor',()=>{
 const G=TERMINAL_GEOMETRY,T=TERMINAL_TIMING;
 assert.ok(T.submit-T.second>=100,'input holds before Return');
 const svg=renderToStaticMarkup(<DitherIcon name="terminal" texture="solid"/>);
 assert.match(svg,/<g data-part="terminal-history">[\s\S]*data-part="terminal-first"[\s\S]*data-part="terminal-second"/);
 assert.ok(!track(terminal,'terminal-history').frames.some(f=>f.at<=T.submit&&f.transform!=='translateY(0px)'));
 const cursor=track(terminal,'terminal-cursor');
 for(const f of cursor.frames){const [x,y]=numbers(f.transform!);assert.ok(G.cursorX+x>3.4&&G.cursorX+x+G.cursorWidth<G.innerRight);assert.ok(G.cursorY+y>5&&G.cursorY+y<19);}
 const reply=track(terminal,'terminal-response');hiddenThrough(terminal,'terminal-response',T.submit);
 for(const time of [T.newline,T.reply]){
  const cur=cursor.frames.find(f=>f.at===time)!,line=reply.frames.find(f=>f.at===time)!;
  assert.ok(Math.abs(G.cursorX+numbers(cur.transform!)[0]-(G.responseX+G.responseLength*numbers(line.transform!)[0]))<1e-9);
  assert.equal(G.cursorY+numbers(cur.transform!)[1],G.responseY);
 }
 assert.equal(cursor.frames.find(f=>f.at===T.newline)!.easing,reply.frames.find(f=>f.at===T.newline)!.easing,'matching interpolation keeps the writing tip connected');
 assert.equal(reply.frames.find(f=>f.at===T.clear)!.opacity,0,'text clears before cursor recovery');
});

test('CPU loads through its drawn orthogonal circuit before gathering four cells into an output',()=>{
 const G=CPU_GEOMETRY,T=CPU_TIMING;
 const svg=renderToStaticMarkup(<DitherIcon name="cpu" texture="solid"/>);
 for(const [i,y] of G.lanes.entries()){
  const input=track(cpu,`cpu-input-${i}`),turn=input.frames.find(f=>f.at===T.turn+i*T.inputStagger)!,enter=input.frames.find(f=>f.at===T.enter+i*T.inputStagger)!;
  const [x0,y0]=numbers(turn.transform!),[x1,y1]=numbers(enter.transform!);
  assert.equal(x0,x1);assert.equal(y0,y);
  assert.ok(svg.includes(`d="M6.4 ${y}H${x0}V${y1}H${G.coreEdge}"`),'motion follows the actual drawn trace, including its corner');
 }
 const lastInput=Math.max(...G.lanes.map((_,i)=>T.receive+i*T.inputStagger));
 for(let i=0;i<G.cells.length;i++)hiddenThrough(cpu,`cpu-cell-${i}`,lastInput);
 const lastCell=Math.max(...G.cells.map((_,i)=>T.clock+i*T.cellStagger));
 hiddenThrough(cpu,'cpu-output',lastCell);
 hiddenThrough(cpu,'cpu-answer',T.emit);
 assert.equal(track(cpu,'cpu-output').frames.find(f=>f.at===T.emit)!.transform,`translateX(${24-G.pinOuter}px) scaleX(1)`);
 assert.ok(cpu.tracks.every(t=>!/(package|pin|core)/.test(t.part)),'processing never bounces the hardware');
});

test('Chart measures unchanged heights and keeps its reading slit attached through the complete scan',()=>{
 const G=CHART_GEOMETRY;
 for(const [part,copy] of [['chart-ruler-position','chart-ruler-mask-position'],['chart-ruler','chart-ruler-mask']])assert.deepEqual(track(chart,part),{...track(chart,copy),part});
 const svg=renderToStaticMarkup(<DitherIcon name="chart" texture="solid"/>);
 for(let i=0;i<3;i++){
  assert.equal(CHART_POINTS[i][1],G.bars[i].top-G.capOffset);
  assert.ok(svg.includes(`V${G.baseline}h-${G.bars[i].width}`),'drawn bar ends at the common baseline');
  const arrival=[CHART_TIMING.first,CHART_TIMING.second,CHART_TIMING.third][i];
  hiddenThrough(chart,`chart-mark-${i}`,arrival);
  const y=numbers(track(chart,'chart-ruler-position').frames.find(f=>f.at===arrival)!.transform!)[0];
  assert.ok(Math.abs(G.baseline+y-CHART_POINTS[i][1])<1e-9);
 }
 assert.ok(chart.tracks.every(t=>!t.part.startsWith('chart-bar')),'no data height or order is animated');
 hiddenThrough(chart,'chart-resolve',CHART_TIMING.third);
});

test('Bolt releases faster than it gathers and branches at the actual extended point',()=>{
 const T=BOLT_TIMING,G=BOLT_GEOMETRY;
 assert.ok(T.strike-T.hold<T.gather/2,'strike is a distinct fast release');
 assert.equal(BOLT_CONTACT[0],G.tip[0]);
 assert.equal(BOLT_CONTACT[1],G.source[1]+(G.tip[1]-G.source[1])*G.strikeScale);
 assert.equal(track(bolt,'bolt-body').frames.find(f=>f.at===T.strike)!.transform,`scaleY(${G.strikeScale})`);
 assert.equal(track(bolt,'bolt-body').frames.find(f=>f.at===T.release)!.transform,`scaleY(${G.strikeScale})`,'body holds contact through the response peak');
 assert.deepEqual(track(bolt,'bolt-charge'),{...track(bolt,'bolt-aperture'),part:'bolt-charge'});
 for(let i=0;i<3;i++){hiddenThrough(bolt,`bolt-discharge-${i}`,T.strike);assert.equal(track(bolt,`bolt-discharge-${i}`).origin,BOLT_CONTACT.map(n=>`${n}px`).join(' '));}
 const svg=renderToStaticMarkup(<DitherIcon name="bolt" texture="solid"/>);
 assert.match(svg,/<g data-part="bolt-aperture" opacity="0"><circle/,'there is no permanent channel in the resting silhouette');
 assert.match(svg,/<g data-part="bolt-body"><g mask=/,'grain, cutout and charge belong to the same source-anchored bolt');
});

test('Repeated Chart and Bolt instances keep masks and body clips isolated in every material',()=>{
 for(const texture of ['dither','solid','outline'] as const){
  const svg=renderToStaticMarkup(<><DitherIcon name="chart" texture={texture}/><DitherIcon name="chart" texture={texture}/><DitherIcon name="bolt" texture={texture}/><DitherIcon name="bolt" texture={texture}/></>);
  const ids=[...svg.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const [,id] of svg.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id));
 }
});
