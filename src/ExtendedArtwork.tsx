import {type ReactNode} from 'react';
import {definitions} from './shapes';
export type Draw=(path:string)=>ReactNode;
const stroke=(d:string,width=.7)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,children:ReactNode)=><g data-part={part} opacity="0">{children}</g>;
/** Parts are named for their physical role; timeline tracks bind to these names. */
export function ExtendedArtwork({name,draw,texture}:{name:string;draw:Draw;texture:'dither'|'solid'|'outline'}){
 const definition=definitions.find(d=>d.name===name)!;
 const shape=(index:number)=>{const part=definition.parts[index];return <g transform={part.transform}>{draw(part.path!)}</g>};
 switch(name){
  case 'terminal':return <>{shape(0)}<g data-part="prompt">{shape(1)}</g><g data-part="cursor">{shape(2)}</g>{accent('line-light',stroke('M11.5 10.5h5.5',.55))}</>;
  case 'cpu':return <>{shape(0)}{accent('input',stroke('M2.5 8H7l2.5 2.5',.75))}<g data-part="die">{shape(1)}{accent('die-light',stroke('M10 13v-3h3',.7))}</g>{accent('output',stroke('M14.5 13.5L17 16h4.5',.75))}</>;
  case 'chart':return <>{shape(0)}<g data-part="bar-small">{shape(1)}{accent('cap-small',stroke('M6.4 12.5h2.2',.7))}</g><g data-part="bar-medium">{shape(2)}{accent('cap-medium',stroke('M12.4 7.5h2.2',.7))}</g><g data-part="bar-tall">{shape(3)}{accent('cap-tall',stroke('M18.4 3.5h2.2',.7))}</g></>;
  case 'bolt':return <>{shape(0)}{accent('charge',stroke('M13.4 4.5l-2 4',.8))}{accent('conduct',stroke('M10.8 11.5h4.4',.8))}{accent('discharge',stroke('M12.5 15l-2 3.8',.65))}</>;
  default:return null;
 }
}
