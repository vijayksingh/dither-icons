import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {TENSOR_ART} from './motions/tensor';
import {NETWORK_ART} from './motions/network';
import {CHECKPOINT_ART} from './motions/checkpoint';
import {HINT_ART} from './motions/hint';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.6)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const circle=(x:number,y:number,r:number,w=1.4)=><circle cx={x} cy={y} r={r} fill="none" stroke="currentColor" strokeWidth={w}/>;

export function PlatformArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-platform';
 if(name==='tensor'){
  const face=(shape:string,grid:string,part:string)=><>
   {texture==='outline'?<>{draw(shape)}{line(grid,.5)}</>:<><defs><mask id={`${id}-${part}`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/><path d={grid} fill="none" stroke="black" strokeWidth=".4"/></mask></defs><g mask={`url(#${id}-${part})`}>{draw(shape)}</g></>}
  </>;
  return <>
   <defs><mask id={`${id}-slice`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/><g data-part="slice-occlusion"><path d={TENSOR_ART.silhouette} fill="black" stroke="black" strokeWidth=".25"/></g></mask></defs>
   <g mask={`url(#${id}-slice)`}>
    <g opacity=".65">{face(TENSOR_ART.top,TENSOR_ART.topGrid,'top-grid')}</g>
    <g opacity=".85">{face(TENSOR_ART.left,TENSOR_ART.leftGrid,'left-grid')}</g>
    <g opacity=".45">{face(TENSOR_ART.cut,TENSOR_ART.cutGrid,'cut-grid')}</g>
   </g>
   <g data-part="slice">
    <g opacity=".65">{face(TENSOR_ART.sliceTop,TENSOR_ART.sliceTopGrid,'slice-top-grid')}</g>
    <g opacity=".85">{face(TENSOR_ART.sliceLeft,TENSOR_ART.sliceLeftGrid,'slice-left-grid')}</g>
    {face(TENSOR_ART.face,TENSOR_ART.grid,'face-grid')}{accent('slice-edge',TENSOR_ART.edge,.6)}
   </g>
   {accent('slice-gap',TENSOR_ART.gap,.5)}
  </>;
 }
 if(name==='network')return <>
  <defs><mask id={`${id}-nodes`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
   <rect width="24" height="24" fill="white"/>
   {NETWORK_ART.nodes.map(n=><g key={n.part} data-part={n.part==='compute-node'?'compute-occlusion':n.part==='output-node'?'output-occlusion':undefined}><circle cx={n.x} cy={n.y} r={n.r-.05} fill="black"/></g>)}
  </mask></defs>
  <g mask={`url(#${id}-nodes)`}>{texture==='outline'?<>{line(NETWORK_ART.upperLine,1.4)}{line(NETWORK_ART.lowerLine,1.4)}{line(NETWORK_ART.outputLine,1.4)}</>:<>{draw(NETWORK_ART.upper)}{draw(NETWORK_ART.lower)}{draw(NETWORK_ART.output)}</>}</g>
  {NETWORK_ART.nodes.map(n=><g key={n.part} data-part={n.part}>{texture==='outline'?circle(n.x,n.y,n.r-.6):draw(NETWORK_ART.node(n.x,n.y,n.r))}</g>)}
  {accent('upper-signal',NETWORK_ART.upperTrace,.8)}{accent('lower-signal',NETWORK_ART.lowerTrace,.8)}
  {accent('output-signal',NETWORK_ART.outputTrace,.8)}{accent('output-echo',NETWORK_ART.echo,.55)}
 </>;
 if(name==='checkpoint')return <>
  <defs><mask id={`${id}-retainer`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/><g data-part="retainer-occlusion"><circle cx="12" cy="12" r="5.35" fill="black"/></g></mask></defs>
  <g mask={`url(#${id}-retainer)`}>{texture==='outline'?line('M12 2v6M12 16v6',1.4):draw(CHECKPOINT_ART.rail)}</g>
  <g data-part="retaining-ring">{texture==='outline'?circle(12,12,4.575):draw(CHECKPOINT_ART.ring)}</g>
  <g data-part="saved-state">{draw(CHECKPOINT_ART.state)}</g>
  {accent('capture-signal',CHECKPOINT_ART.signal,.75)}{accent('state-registration',CHECKPOINT_ART.corners,.55)}{accent('capture-marks',CHECKPOINT_ART.marks,.6)}
 </>;
 if(name==='hint')return <>
  <defs><clipPath id={`${id}-bulb`}><path d={HINT_ART.inside}/></clipPath></defs>
  {texture==='outline'?line(HINT_ART.outline,1.4):draw(HINT_ART.outer+HINT_ART.inside)}
  <g clipPath={`url(#${id}-bulb)`}>
   <g data-part="illumination" opacity="0">{draw(HINT_ART.glow)}</g>
   <g opacity=".5">{line(HINT_ART.filament,.65)}</g>
   {accent('stem-light',HINT_ART.stem,.8)}{accent('filament-light',HINT_ART.branches,.8)}
  </g>
  {texture==='outline'?line('M9.5 19.25h5M10.7 21.65h2.6',1.3):draw(HINT_ART.base)}
  {accent('idea-top',HINT_ART.topRay,.6)}{accent('idea-left',HINT_ART.leftRay,.6)}{accent('idea-right',HINT_ART.rightRay,.6)}
 </>;
 return null;
}
