import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {TOKEN_ART,TOKEN_PIECES} from './motions/tokenize';
import {EMBEDDING_ART,EMBEDDING_CELLS,EMBEDDING_ROWS} from './motions/embedding-lookup';
import {ATTENTION_ART,ATTENTION_KEYS} from './motions/attention-focus';
import {BATCH_ART,BATCH_SOURCE,BATCH_SELECTION,BATCH_GEOMETRY} from './motions/batch-sampling';
type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const disc=(x:number,y:number,r:number)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${r*2} 0a${r} ${r} 0 1 0 ${-r*2} 0Z`;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};
export function DataFlowArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-dataflow';
 if(name==='tokenize')return <>
  <defs>{TOKEN_PIECES.map((p,i)=><mask id={`${id}-text-${i}`} key={i} {...MASK}>{field}<path d={TOKEN_ART.content(p.x,p.w)} fill="none" stroke="black" strokeWidth=".75" strokeLinecap="round"/></mask>)}</defs>
  <g opacity=".35">{line(TOKEN_ART.source,.75)}</g>{accent('token-reading',TOKEN_ART.source,.85)}
  {TOKEN_ART.boundaries.map((x,i)=><g key={i}>{accent(`token-boundary-${i}`,`M${x} 5.4v11.4`,.6)}</g>)}
  {TOKEN_PIECES.map((p,i)=><g key={i} data-part={`token-piece-${i}`}>
   {texture==='outline'?<>{line(TOKEN_ART.outline(p.x,p.w),1.3)}{line(TOKEN_ART.content(p.x,p.w),.75)}</>:<g mask={`url(#${id}-text-${i})`}>{draw(TOKEN_ART.tile(p.x,p.w))}</g>}
   <g data-part={`token-index-${i}`} opacity="0">{Array.from({length:i+1},(_,j)=><circle key={j} cx={p.x+p.w/2+(j-i/2)*1.4} cy="18.8" r=".35"/>)}</g>
  </g>)}
 </>;
 if(name==='embedding-lookup')return <>
  <defs>
   <mask id={`${id}-address`} {...MASK}>{field}<circle cx="3.8" cy="8.5" r=".35" fill="black"/></mask>
   <mask id={`${id}-return`} {...MASK}><path d={EMBEDDING_ART.route} fill="none" stroke="white" strokeWidth=".85" strokeLinecap="round"/></mask>
  </defs>
  <g opacity=".65">{line(EMBEDDING_ART.matrix,1)}{line(EMBEDDING_ART.outputBracket,1)}{line(EMBEDDING_ART.connector,.6)}</g>
  <g opacity=".25">{line(EMBEDDING_ART.route,.6)}</g>
  <g data-part="embedding-address">{texture==='outline'?<>{line(EMBEDDING_ART.token,1)}<circle cx="3.8" cy="8.5" r=".3"/></>:<g mask={`url(#${id}-address)`}>{draw(EMBEDDING_ART.token)}</g>}</g>
  {EMBEDDING_ROWS.map((y,row)=><g key={row}>{EMBEDDING_CELLS.map((x,i)=><g key={i}>
   <g opacity={row===1?.8:.38}>{texture==='outline'?line(`M${x+.4} ${y}h1.8`,EMBEDDING_ART.heights[row][i]*.65):draw(EMBEDDING_ART.cell(x,y,EMBEDDING_ART.heights[row][i]))}</g>
   {row===1&&<g data-part={`embedding-component-${i}`} opacity="0">{line(`M${x+.5} ${y}h1.6`,.7)}</g>}
  </g>)}</g>)}
  <g opacity=".55">{EMBEDDING_CELLS.map((x,i)=><g key={i}>{texture==='outline'?line(`M${x+.4} 20h1.8`,EMBEDDING_ART.heights[1][i]*.65):draw(EMBEDDING_ART.cell(x,20,EMBEDDING_ART.heights[1][i]))}</g>)}</g>
  <g data-part="embedding-readout" opacity="0">{EMBEDDING_CELLS.map((x,i)=><g key={i}>{line(`M${x+.5} 20h1.6`,.7)}</g>)}</g>
  <g mask={`url(#${id}-return)`}><g data-part="embedding-transfer" opacity="0"><circle cx="17.7" cy="8.5" r="1.15"/></g></g>
  {accent('embedding-edge',EMBEDDING_ART.outputEdge,.6)}{accent('embedding-receive-upper',EMBEDDING_ART.upper,.55)}{accent('embedding-receive-lower',EMBEDDING_ART.lower,.55)}
 </>;
 if(name==='attention-focus')return <>
  <defs>{ATTENTION_ART.routes.map((d,i)=><mask key={i} id={`${id}-attention-${i}`} {...MASK}><path d={d} fill="none" stroke="white" strokeWidth=".85" strokeLinecap="round"/></mask>)}</defs>
  <g opacity=".32">{ATTENTION_ART.routes.map((d,i)=><g key={i}>{line(d,.65)}</g>)}</g>
  {texture==='outline'?<circle cx="4.8" cy="12" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.2"/>:draw(ATTENTION_ART.lens)}
  <g data-part="attention-pupil"><circle cx="4.8" cy="12" r=".65"/></g>
  {ATTENTION_KEYS.map((key,i)=><g key={i}>
   <g opacity=".65">{texture==='outline'?line(ATTENTION_ART.key(key.y),1):draw(ATTENTION_ART.key(key.y))}</g>
   <g mask={`url(#${id}-attention-${i})`}><g data-part={`attention-trace-${i}`} opacity="0"><circle cx="7.6" cy="12" r=".9"/></g></g>
   <g data-part={`attention-key-response-${i}`} opacity="0">{line(`M17.6 ${key.y}h1.6`,.65)}</g>
  </g>)}
  {accent('attention-weight',ATTENTION_ART.routes[1],1)}{accent('attention-frame-upper',ATTENTION_ART.frameUpper,.65)}{accent('attention-frame-lower',ATTENTION_ART.frameLower,.65)}
 </>;
 if(name==='batch-sampling')return <>
  <defs><mask id={`${id}-source`} {...MASK}>{field}{BATCH_SELECTION.map((p,i)=><g key={i} data-part={`batch-occlusion-${i}`} opacity="0"><circle cx={p.x} cy={p.y} r={BATCH_GEOMETRY.radius+.2} fill="black"/></g>)}</mask></defs>
  <g mask={`url(#${id}-source)`}>
   <g opacity=".55">{line(BATCH_ART.source,1)}</g>
   {BATCH_SOURCE.map((p,i)=><g key={i} opacity=".55">{texture==='outline'?<circle cx={p.x} cy={p.y} r=".9" fill="none" stroke="currentColor" strokeWidth=".7"/>:draw(disc(p.x,p.y,1.25))}</g>)}
   {BATCH_SELECTION.map((p,i)=><g key={i} data-part={`batch-mark-${i}`} opacity="0"><circle cx={p.x} cy={p.y} r="1.85" fill="none" stroke="currentColor" strokeWidth=".5"/></g>)}
  </g>
  {texture==='outline'?line(BATCH_ART.trayLine,1.2):draw(BATCH_ART.tray)}
  {BATCH_SELECTION.map((p,i)=><g key={i}>
   <g data-part={`batch-copy-${i}`} opacity="0">{texture==='outline'?<circle cx={p.x} cy={p.y} r=".9" fill="none" stroke="currentColor" strokeWidth=".7"/>:draw(disc(p.x,p.y,BATCH_GEOMETRY.radius))}</g>
   {accent(`batch-seat-${i}`,`M${p.x-1} 22.2q1 .3 2 0`,.6)}
  </g>)}
  {accent('batch-receipt',BATCH_ART.receipt,.55)}
 </>;
 return null;
}
