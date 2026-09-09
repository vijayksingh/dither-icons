import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {SavePreferencesIcon,FileExplorerIcon,ExpandViewIcon,SignOutIcon,definitions} from '../src';
import type {Study,Track} from '../src/choreography';
import {savePreferences,SAVE_ART,SAVE_SHUTTER} from '../src/motions/save-preferences';
import {fileExplorer,EXPLORER_GEOMETRY} from '../src/motions/file-explorer';
import {expandView,EXPAND_CORNERS,EXPAND_ART} from '../src/motions/expand-view';
import {signOut,EXIT_DOOR,EXIT_ART} from '../src/motions/sign-out';
const track=(s:Study,p:string)=>s.tracks.find(t=>t.part===p)!;
const nums=(s:string)=>s.match(/-?(?:\d*\.)?\d+/g)!.map(Number);
const near=(a:number,b:number,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`${a} should equal ${b}`);
const peak=(t:Track)=>t.frames.reduce((a,b)=>(b.opacity??0)>(a.opacity??0)?b:a).at;

test('platform action exports have semantic labels and isolated masks in all materials',()=>{
 for(const [name,label,Icon] of [['save-preferences','Save Preferences',SavePreferencesIcon],['file-explorer','File Explorer',FileExplorerIcon],['expand-view','Expand View',ExpandViewIcon],['sign-out','Sign Out',SignOutIcon]] as const){
  assert.equal(definitions.find(d=>d.name===name)?.label,label);
  for(const texture of ['dither','solid','outline'] as const){
   const svg=renderToStaticMarkup(<><Icon texture={texture} title={label}/><Icon texture={texture} animate={false}/></>);
   assert.ok(svg.includes(`aria-label="${label}"`));
   const ids=[...svg.matchAll(/<(?:mask|clipPath) id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
   for(const ref of svg.matchAll(/(?:mask|clip-path)="url\(#([^)]+)\)"/g))assert.ok(ids.includes(ref[1]));
  }
 }
});

test('save shutter stays in its actual channel, writes before closure and never substitutes a success glyph',()=>{
 const shutter=track(savePreferences,'save-shutter'),body=nums(SAVE_ART.shutter),stop=nums(SAVE_ART.stop)[0]-.5,left=nums(SAVE_ART.channel)[0]+.3;
 near(SAVE_SHUTTER.stopFace,stop);near(body[0]+body[2],stop);
 for(const f of shutter.frames){const dx=nums(f.transform!)[0];assert.ok(body[0]+dx>left);assert.ok(body[0]+body[2]+dx<=stop+1e-8);}
 const open=shutter.frames.find(f=>f.transform===SAVE_SHUTTER.open)!.at;
 const close=shutter.frames.find(f=>f.at>open&&f.transform===SAVE_SHUTTER.rest)!.at;
 for(const p of ['save-write-0','save-write-1']){const at=peak(track(savePreferences,p));assert.ok(at>open&&at<close);}
 for(const p of ['save-stop','save-witness-upper','save-witness-lower'])assert.ok(peak(track(savePreferences,p))>close);
 assert.ok(!savePreferences.tracks.some(t=>/success|check|shell|label/.test(t.part)));
});

test('explorer branch endpoints, nodes, divider and source share continuous displacement',()=>{
 const nodes=track(fileExplorer,'explorer-nodes'),g=EXPLORER_GEOMETRY;
 for(const p of ['explorer-divider','explorer-code'])assert.deepEqual(track(fileExplorer,p).frames,nodes.frames);
 for(let branch=0;branch<3;branch++){
  const arm=track(fileExplorer,`explorer-branch-${branch}`);
  assert.deepEqual(arm.frames.map(f=>[f.at,f.easing]),nodes.frames.map(f=>[f.at,f.easing]));
  for(let i=0;i<nodes.frames.length;i++)for(const t of [0,.25,.5,.75,1]){
   const j=Math.max(0,i-1),dx=nums(nodes.frames[j].transform!)[0]*(1-t)+nums(nodes.frames[i].transform!)[0]*t;
   const sx=nums(arm.frames[j].transform!)[0]*(1-t)+nums(arm.frames[i].transform!)[0]*t;
   near(g.branchStart+(g.branchEnd-g.branchStart)*sx,g.branchEnd+dx);
   assert.ok(g.branchEnd+dx+.65<g.divider+dx-.4,'nodes retain clearance from the divider');
  }
 }
 const opened=nodes.frames.find(f=>nums(f.transform!)[0]===g.travel)!.at;
 for(const p of ['explorer-active','explorer-seat-top','explorer-seat-bottom'])assert.ok(peak(track(fileExplorer,p))>opened);
 const svg=renderToStaticMarkup(<FileExplorerIcon/>);assert.match(svg,/<rect x="4.4" y="8.3" width="15.2" height="10.6"/,'source clips to the actual editor interior');
});

test('expanded corners stay rigid, paired and bounded around unchanged content',()=>{
 const base=track(expandView,'expand-corner-0');
 EXPAND_CORNERS.forEach((c,i)=>{
  const corner=track(expandView,`expand-corner-${i}`);
  assert.deepEqual(corner.frames.map(f=>f.at),base.frames.map(f=>f.at));
  corner.frames.forEach((f,j)=>{const [dx,dy]=nums(f.transform!),[bx]=nums(base.frames[j].transform!);near(dx,-bx*c.x);near(dy,-bx*c.y);
   for(const [x,y] of [[5.3,5.3],[9.3,5.3],[5.3,9.3]]){const a=c.angle*Math.PI/180,X=12+(x-12)*Math.cos(a)-(y-12)*Math.sin(a)+dx,Y=12+(x-12)*Math.sin(a)+(y-12)*Math.cos(a)+dy;assert.ok(X>1&&X<23&&Y>1&&Y<23);}
  });
  assert.ok(peak(track(expandView,`expand-echo-${i}`))>580);
 });
 const svg=renderToStaticMarkup(<ExpandViewIcon/>);assert.ok(svg.includes(EXPAND_ART.content));assert.ok(!expandView.tracks.some(t=>/content/.test(t.part)));
});

test('sign-out leaf and knockout keep both hinge endpoints fixed, and arrow returns before closure',()=>{
 const leaf=track(signOut,'exit-leaf'),arrow=track(signOut,'exit-arrow');
 assert.deepEqual(leaf,{...track(signOut,'exit-occlusion'),part:'exit-leaf'});
 assert.equal(leaf.origin,EXIT_DOOR.origin);
 const point=(m:number[],x:number,y:number)=>[5.2+m[0]*(x-5.2)+m[2]*(y-12)+m[4],12+m[1]*(x-5.2)+m[3]*(y-12)+m[5]];
 leaf.frames.forEach((f,i)=>{const m=nums(f.transform!);for(const y of [5.2,18.8]){const p=point(m,5.2,y);near(p[0],5.2);near(p[1],y);}
  if(i){const a=nums(leaf.frames[i-1].transform!);for(const t of [.25,.5,.75])for(const y of [5.2,18.8]){const p=point(m.map((v,k)=>a[k]+(v-a[k])*t),5.2,y);near(p[0],5.2);near(p[1],y);}}
 });
 assert.ok(arrow.frames.every(f=>/^translateX/.test(f.transform!)&&f.opacity===undefined),'arrow never rotates or disappears');
 const far=arrow.frames.find(f=>f.transform==='translateX(2.1px)')!.at;
 assert.ok(leaf.frames.find(f=>f.transform===EXIT_DOOR.open)!.at<far);
 const arrowHome=arrow.frames.find(f=>f.at>far&&f.transform==='translateX(0px)')!.at;
 const lastOpen=leaf.frames.filter(f=>f.transform===EXIT_DOOR.open).at(-1)!.at;assert.ok(lastOpen>=arrowHome);
 for(const p of ['exit-witness-upper','exit-witness-lower'])assert.ok(peak(track(signOut,p))>far);
 const svg=renderToStaticMarkup(<SignOutIcon texture="solid"/>);assert.ok(svg.includes(EXIT_ART.leaf));assert.ok(svg.includes(EXIT_ART.arrow));
});
