import {useId,type ReactNode} from 'react';
import {definitions} from './shapes';
export type Draw=(path:string)=>ReactNode;
const stroke=(d:string,width=.7)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,children:ReactNode)=><g data-part={part} opacity="0">{children}</g>;
/** Parts are named for their physical role; timeline tracks bind to these names. */
export function ExtendedArtwork({name,draw,texture}:{name:string;draw:Draw;texture:'dither'|'solid'|'outline'}){
 const apertureId=useId().replace(/:/g,'')+'-aperture';
 const definition=definitions.find(d=>d.name===name)!;
 const shape=(index:number)=>{const part=definition.parts[index];return <g transform={part.transform}>{draw(part.path!)}</g>};
 switch(name){
  case 'folder':return <>{texture==='solid'?draw(definition.parts[0].path!+'M4 9h16v8H4Z'):shape(0)}<g data-part="paper" opacity=".7">{draw('M6 9h12v9H6Z')}<path d="M8 11h8" stroke="currentColor" strokeWidth=".4"/></g><g data-part="cover">{shape(1)}</g></>;
  case 'file':return <><g data-part="page">{shape(0)}{accent('content-light',stroke('M8 13h8M8 16h5',.65))}</g><g data-part="fold">{shape(1)}</g></>;
  case 'copy':return <><g data-part="source">{shape(0)}</g>{accent('registration',stroke('M5.5 8V5.5H8',.55))}<g data-part="duplicate">{shape(1)}</g></>;
  case 'trash':return <><g data-part="bin">{shape(0)}{accent('rim-light',stroke('M6 8.5h12',.5))}</g><g data-part="lid">{shape(1)}</g></>;
  case 'book':return <><g data-part="left-leaf">{draw('M3 3h5q3 0 4 2v17q-1-2-4-2H3Z')}</g><g data-part="right-leaf">{draw('M12 5q1-2 4-2h5v17h-5q-3 0-4 2Z')}{accent('page-light',stroke('M15 7h3M15 10h3M15 13h2',.5))}</g><path d="M12 5v16" stroke="currentColor" strokeWidth=".7" opacity=".5"/></>;
  case 'mail':return <>{accent('letter',draw('M6 5h12v8H6Z'))}{draw('M3 5h18v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z'+(texture==='solid'?'M3 5l9 8 9-8v.65l-9 8-9-8ZM5.2 18.2l4-4 .45.45-4 4ZM18.8 18.2l-4-4-.45.45 4 4Z':''))}{texture!=='solid'&&<g opacity=".5">{stroke('M4.5 18l5-5M19.5 18l-5-5',.6)}</g>}<g data-part="flap">{shape(1)}</g></>;
  case 'message':if(texture==='solid')return <><defs><mask id={apertureId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/>{[['dot-left',6],['dot-center',11],['dot-right',16]].map(([part,x])=><g data-part={part} key={part}><rect x={x} y="9" width="2" height="2" fill="black"/></g>)}</mask></defs><g mask={`url(#${apertureId})`}>{shape(0)}</g></>;return <>{shape(0)}<g data-part="dot-left">{draw('M6 9h2v2H6Z')}</g><g data-part="dot-center">{draw('M11 9h2v2h-2Z')}</g><g data-part="dot-right">{draw('M16 9h2v2h-2Z')}</g></>;
  case 'send':return <><g data-part="plane">{shape(0)}{accent('crease-light',stroke('M10.2 13.2l5.5-5.5',.5))}</g>{accent('wake',stroke('M3 15.5l-1 1M5.5 18l-1 1',.55))}</>;
  case 'play':return <><g data-part="triangle">{shape(0)}</g>{accent('start-light',stroke('M2.5 12h2.3'))}</>;
  case 'pause':return <><g data-part="bar-left">{draw('M5 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z')}</g><g data-part="bar-right">{draw('M14 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1Z')}</g>{accent('seats',stroke('M6 22h3M15 22h3',.5))}</>;
  case 'volume':return <><g data-part="speaker">{shape(0)}</g><g data-part="wave-near">{draw('M15.5 9a4 4 0 0 1 0 6l-1.2-1.6a2 2 0 0 0 0-2.8Z')}</g><g data-part="wave-far">{draw('M17 6a8 8 0 0 1 0 12l-1.2-1.6a6 6 0 0 0 0-8.8Z')}{accent('sound-light',stroke('M18.3 8.2q2 3.8 0 7.6',.45))}</g></>;
  case 'code':return <><g data-part="bracket-left">{shape(0)}</g><g data-part="bracket-right">{shape(1)}</g><g data-part="slash">{shape(2)}{accent('syntax-light',stroke('M12.1 11l.7-3.3',.55))}</g></>;
  case 'terminal':return <>{shape(0)}<g data-part="prompt">{shape(1)}</g><g data-part="cursor">{shape(2)}</g>{accent('line-light',stroke('M11.5 10.5h5.5',.55))}</>;
  case 'cpu':return <>{shape(0)}{accent('input',stroke('M2.5 8H7l2.5 2.5',.75))}<g data-part="die">{shape(1)}{accent('die-light',stroke('M10 13v-3h3',.7))}</g>{accent('output',stroke('M14.5 13.5L17 16h4.5',.75))}</>;
  case 'chart':return <>{shape(0)}<g data-part="bar-small">{shape(1)}{accent('cap-small',stroke('M6.4 12.5h2.2',.7))}</g><g data-part="bar-medium">{shape(2)}{accent('cap-medium',stroke('M12.4 7.5h2.2',.7))}</g><g data-part="bar-tall">{shape(3)}{accent('cap-tall',stroke('M18.4 3.5h2.2',.7))}</g></>;
  case 'search':return <g data-part="magnifier">{shape(0)}{shape(1)}{accent('lens-light',stroke('M5.2 10.5a5.3 5.3 0 0 1 5.3-5.3',.7))}</g>;
  case 'home':return <>{shape(0)}{accent('interior-light',draw('M10.5 15.5h3V21h-3Z'))}<g data-part="door">{shape(1)}</g></>;
  case 'settings':return <><g data-part="gear">{shape(0)}</g>{accent('detent',stroke('M12 8.5v1.6',.75))}</>;
  case 'check':return <g data-part="check">{shape(0)}{accent('affirm-light',stroke('M10 15l1.4-1.4',.85))}</g>;
  case 'close':return <><g data-part="diagonal-down">{draw('M5.3 4 20 18.7 18.7 20 4 5.3Z')}</g><g data-part="diagonal-up">{draw('M18.7 4 20 5.3 5.3 20 4 18.7Z')}</g></>;
  case 'plus':return <><g data-part="horizontal">{draw('M3 11h18v2H3Z')}</g><g data-part="vertical">{draw('M11 3h2v18h-2Z')}</g>{accent('tip-light',stroke('M20.5 11.5v1M11.5 3.5h1',.5))}</>;
  case 'user':return <><g data-part="shoulders">{shape(1)}</g><g data-part="head">{shape(0)}</g></>;
  case 'lock':return <><g data-part="shackle">{shape(0)}</g>{shape(1)}{accent('seat-light',stroke('M6.5 10h1M16.5 10h1',.7))}{accent('body-light',stroke('M7 13h2',.6))}</>;
  case 'eye':return <><defs><clipPath id={apertureId}><path d="M3.7 12Q12 1.8 20.3 12Q12 22.2 3.7 12Z"/></clipPath></defs>{shape(0)}<g clipPath={`url(#${apertureId})`}><g data-part="pupil">{shape(1)}{accent('attention-light',stroke('M10.3 10.3a2.4 2.4 0 0 1 2-1',.55))}</g></g></>;
  case 'sparkles':return <><g data-part="star">{shape(0)}{accent('star-light',stroke('M12 8v8',.55))}</g><g data-part="satellite">{shape(1)}</g></>;
  case 'sun':return <>{draw('M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10Z')}<g data-part="rays-cardinal">{draw('M11 1h2v3h-2ZM11 20h2v3h-2ZM1 11h3v2H1ZM20 11h3v2h-3Z')}</g><g data-part="rays-diagonal">{draw('M3.5 5l1.5-1.5L7 5.5 5.5 7ZM17 18.5l1.5-1.5 2 2-1.5 1.5ZM17 5.5l2-2L20.5 5l-2 2ZM3.5 19l2-2L7 18.5l-2 2Z')}</g>{accent('warmth',stroke('M8.5 12a3.5 3.5 0 0 1 3.5-3.5',.7))}</>;
  case 'moon':return <g data-part="crescent">{shape(0)}{accent('rim-light',stroke('M11.4 12.9q2.7 4.4 7.3 3.5',.6))}</g>;
  case 'bolt':return <>{shape(0)}{accent('charge',stroke('M13.4 4.5l-2 4',.8))}{accent('conduct',stroke('M10.8 11.5h4.4',.8))}{accent('discharge',stroke('M12.5 15l-2 3.8',.65))}</>;
  default:return null;
 }
}
