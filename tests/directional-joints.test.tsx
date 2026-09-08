import {test} from 'node:test';
import assert from 'node:assert/strict';
import {studies} from '../src/choreography';
import {RIGHT_SHAFT} from '../src/motions/arrowRight';
import {UP_STEM} from '../src/motions/arrowUp';
import {LINK_SHAFT} from '../src/motions/externalLink';
import {UPLOAD_STEM} from '../src/motions/upload';

const value=(transform:string,fn:string)=>Number(transform.match(new RegExp(`${fn}\\(([-\\d.e+]+)`))?.[1]??0);
const near=(a:number,b:number,message:string)=>assert.ok(Math.abs(a-b)<1e-9,`${message}: ${a} vs ${b}`);

test('directional heads remain attached to their shafts throughout interpolation',()=>{
 for(const name of ['arrow-right','arrow-up','external-link','upload']){
  const study=studies[name];
  const head=study.tracks.find(t=>['head','corner'].includes(t.part))!;
  const shaft=study.tracks.find(t=>['shaft','stem'].includes(t.part))!;
  assert.deepEqual(head.frames.map(f=>[f.at,f.easing]),shaft.frames.map(f=>[f.at,f.easing]),`${name}: one clock and easing at the shared edge`);
  for(let i=0;i<head.frames.length-1;i++)for(const fraction of [0,.17,.5,.89,1]){
   // Any eased progress is a number in this interval. Compare physical endpoints,
   // including the external link's fixed diagonal coordinate frame.
   const interpolate=(part:typeof head,fn:string)=>{
    const a=value(part.frames[i].transform!,fn),b=value(part.frames[i+1].transform!,fn);
    return a+(b-a)*fraction;
   };
   if(name==='arrow-right'){
    const {tail,joint}=RIGHT_SHAFT;
    near(tail+(joint-tail)*interpolate(shaft,'scaleX'),joint+interpolate(head,'translateX'),name);
   } else if(name==='external-link'){
    const {tailX,tailY,jointX,jointY}=LINK_SHAFT;
    const travel=interpolate(shaft,'translateX')/Math.SQRT2;
    const scale=interpolate(shaft,'scaleX');
    near(tailX+travel+(jointX-tailX)*scale,jointX+interpolate(head,'translate'),name+' x');
    near(tailY-travel+(jointY-tailY)*scale,jointY-interpolate(head,'translate'),name+' y');
   } else {
    const {joint,foot}=name==='arrow-up'?UP_STEM:UPLOAD_STEM;
    near(foot+interpolate(shaft,'translateY')+(joint-foot)*interpolate(shaft,'scaleY'),joint+interpolate(head,'translateY'),name);
   }
  }
 }
});
