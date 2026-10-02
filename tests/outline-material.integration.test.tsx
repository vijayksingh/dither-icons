import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import baseline from '../docs/outline-audit/before.json';
import {DitherIcon} from '../src/index';

const raster=(svg:string)=>new Resvg(svg.replace(/<style>[\s\S]*?<\/style>/g,'')).render();
const exported=(name:string,size=112,color='#c7b5fa')=>renderToStaticMarkup(<DitherIcon name={name} texture="outline" animate={false} size={size} color={color}/>);

test('consumer SVG exports distinguish all 33 corrected outlines from the pre-fix renders',()=>{
 for(const [name,before] of Object.entries(baseline.icons)){
  const old=raster(before).pixels,now=raster(exported(name)).pixels;
  let oldInk=0,newInk=0,difference=0;
  for(let i=3;i<old.length;i+=4){oldInk+=old[i];newInk+=now[i];difference+=Math.abs(old[i]-now[i]);}
  assert.ok(difference/oldInk>.1,`${name}: material still indistinguishable`);
  assert.ok(newInk>0,`${name}: missing drawing`);
 }
});

test('exported stroke interiors remain transparent on any host background',()=>{
 // Interior points belong to the visible glyphs, not their SVG implementation.
 const cores:[string,number,number][]=[['arrow-left',16,12],['cpu',5.7,12],
  ['history',20,12],['trash',9.5,15],['code',12,12],['target',15,9],
  ['sign-out',4.5,12],['learning-rhythm',12,17.8]];
 for(const color of ['#c7b5fa','#3a2480'])for(const [name,x,y] of cores){
  const rendered=raster(exported(name,240,color));
  const alpha=rendered.pixels[(Math.floor(y*10)*240+Math.floor(x*10))*4+3];
  assert.equal(alpha,0,`${name}: core painted instead of transparent`);
 }
});
