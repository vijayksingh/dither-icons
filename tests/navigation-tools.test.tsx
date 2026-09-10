import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as library from '../src';
import {arrowLeft,BACK_ART,BACK_GEOMETRY,BACK_TIMING} from '../src/motions/arrow-left';
import {history,HISTORY_ART,HISTORY_GEOMETRY,HISTORY_TIMING,HISTORY_TIP} from '../src/motions/history';
import {panelLeftClose,PANEL_CLOSE_ART,PANEL_CLOSE_GEOMETRY,PANEL_CLOSE_TIMING} from '../src/motions/panel-left-close';
import {zoomOut,ZOOM_OUT_GEOMETRY,ZOOM_OUT_TIMING} from '../src/motions/zoom-out';
const value=(s:string)=>Number(s.match(/-?\d*\.?\d+/)![0]);

test('Back retains the full left contour, clears the viewBox, and registers only after arrival',()=>{
 const t=arrowLeft.tracks.find(t=>t.part==='back-arrow')!;
 for(const f of t.frames){const dx=value(f.transform!);assert.ok(BACK_GEOMETRY.tipX+dx-.95>0&&BACK_GEOMETRY.tailX+dx+.95<24);assert.match(f.transform!,/^translateX/);}
 const arrival=arrowLeft.tracks.find(t=>t.part==='back-arrival')!;
 assert.ok(arrival.frames.filter(f=>f.at<=BACK_TIMING.arrive).every(f=>f.opacity===0));
 assert.match(BACK_ART.arrow,/5 12h15/,'left tip and shaft start share one location');
 for(const texture of ['dither','solid','outline'] as const)assert.ok(renderToStaticMarkup(<library.ArrowLeftIcon texture={texture}/>).includes(`d="${BACK_ART.arrow}"`));
});

test('History rewinds geared hands inside a stationary ring and finishes light at its attached head',()=>{
 const minute=history.tracks.find(t=>t.part==='history-minute')!,hour=history.tracks.find(t=>t.part==='history-hour')!;
 for(const [i,frame] of minute.frames.entries()){
  assert.equal(frame.at,hour.frames[i].at);assert.equal(frame.easing,hour.frames[i].easing);
  assert.ok(Math.abs(value(frame.transform!)/HISTORY_GEOMETRY.hourRatio-value(hour.frames[i].transform!))<1e-9);
 }
 assert.equal(value(minute.frames.find(f=>f.at===HISTORY_TIMING.rewind)!.transform!),-90);
 const endpoint=HISTORY_ART.ring.match(/([\d.]+) ([\d.]+)$/)!.slice(1).map(Number);assert.deepEqual(endpoint,HISTORY_TIP);
 assert.ok(HISTORY_ART.head.includes(`L${HISTORY_TIP.join(' ')}`),'arrow head is attached to the actual circle endpoint');
 assert.ok(!history.tracks.some(t=>t.part==='history-ring'));
 assert.ok(history.tracks.find(t=>t.part==='history-recall')!.frames.filter(f=>f.at<=HISTORY_TIMING.reach).every(f=>f.opacity===0));
});

test('Collapse Panel hides full-size rows behind its frame and latches at the retained divider',()=>{
 const G=PANEL_CLOSE_GEOMETRY,T=PANEL_CLOSE_TIMING;
 const drawer=panelLeftClose.tracks.find(t=>t.part==='panel-drawer')!,divider=panelLeftClose.tracks.find(t=>t.part==='panel-divider')!;
 assert.deepEqual(drawer,{...divider,part:'panel-drawer'});
 assert.ok(drawer.frames.every(f=>/^translateX/.test(f.transform!)),'contents translate without distortion');
 const rowEnds=[...PANEL_CLOSE_ART.rows.matchAll(/M([\d.]+) [\d.]+h([\d.]+)/g)].map(m=>Number(m[1])+Number(m[2]));
 assert.ok(rowEnds.every(x=>x+G.travel+.275<G.left),'all row ink is hidden at closure');
 assert.ok(PANEL_CLOSE_ART.latch.includes(`M${Number((G.divider+G.travel).toFixed(2))} `));
 assert.ok(panelLeftClose.tracks.find(t=>t.part==='panel-latch')!.frames.filter(f=>f.at<=T.close).every(f=>f.opacity===0));
 const svg=renderToStaticMarkup(<library.PanelLeftCloseIcon/>);
 assert.match(svg,/<g clip-path="url\(#[^)]+\)"><g data-part="panel-drawer">/);
});

test('Zoom Out keeps its minus lens fixed and exposes context after the viewed region recedes',()=>{
 const G=ZOOM_OUT_GEOMETRY,T=ZOOM_OUT_TIMING;
 assert.ok(G.scale<1&&G.scale>.5);assert.ok(Math.SQRT2*G.fieldExtent+.3<G.radius);
 for(const [x,y] of G.points)assert.ok(Math.hypot(x-G.center[0],y-G.center[1])*1.04+.43<G.radius);
 assert.ok(zoomOut.tracks.every(t=>!/(lens|minus|handle)/.test(t.part)));
 for(let i=0;i<4;i++)assert.ok(zoomOut.tracks.find(t=>t.part===`zoom-context-${i}`)!.frames.filter(f=>f.at<=T.fit).every(f=>f.opacity===0));
 const pos=zoomOut.tracks.find(t=>t.part==='zoom-field-position')!,field=zoomOut.tracks.find(t=>t.part==='zoom-field')!;
 assert.equal(pos.frames.find(f=>f.at===T.clear)!.transform,`scale(${G.scale})`);assert.equal(field.frames.find(f=>f.at===T.clear)!.opacity,0,'original scale restores only after clearing');
});

test('New semantic exports and repeated stroke/clip definitions stay distinct',()=>{
 for(const [name,exportName,label] of [['arrow-left','ArrowLeftIcon','Back'],['history','HistoryIcon','History'],['panel-left-close','PanelLeftCloseIcon','Collapse Panel'],['zoom-out','ZoomOutIcon','Zoom Out']]){
  assert.ok(exportName in library);assert.equal(library.definitions.find(d=>d.name===name)!.label,label);
 }
 const svg=renderToStaticMarkup(<><library.HistoryIcon/><library.HistoryIcon/><library.PanelLeftCloseIcon/><library.PanelLeftCloseIcon/></>);
 const ids=[...svg.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const [,id] of svg.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id));
});
