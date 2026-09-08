import type {ReactNode} from 'react';
import {ControlArtwork} from './ControlArtwork';
import {CorrespondenceArtwork} from './CorrespondenceArtwork';
import {FileArtwork} from './FileArtwork';
import {DirectionalArtwork} from './DirectionalArtwork';
import {ExtendedArtwork} from './ExtendedArtwork';
import {studies} from './choreography';

type Props={name:string;draw:(path:string)=>ReactNode;texture:'dither'|'solid'|'outline'};
const HEART='M12 20.5C9.4 18.4 3 13.8 3 8.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 9 1.4c0 5.4-6.4 10-9 12.1Z';
const Stroke=({d}: {d:string})=><path d={d} fill="none" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round"/>;
const Accent=({part,children}:{part:string;children:ReactNode})=><g data-part={part} opacity="0">{children}</g>;

export function CraftedArtwork({name,draw,texture}:Props){
 if(!studies[name])return null;
 if(['play','pause','volume','code'].includes(name))return <ControlArtwork name={name} draw={draw} texture={texture}/>;
 if(['book','mail','message','send'].includes(name))return <CorrespondenceArtwork name={name} draw={draw} texture={texture}/>;
 if(['folder','file','copy','trash'].includes(name))return <FileArtwork name={name} draw={draw} texture={texture}/>;
 if(['arrow-right','arrow-up','external-link','upload'].includes(name))return <DirectionalArtwork name={name} draw={draw} texture={texture}/>;
 if(!['bell','heart','download','layers'].includes(name))return <ExtendedArtwork name={name} draw={draw} texture={texture}/>;
 if(name==='bell')return <>
  <g data-part="shell">{draw('M5.5 17.5c1.5-1.7 1.5-3.5 1.5-7.5a5 5 0 0 1 10 0c0 4 0 5.8 1.5 7.5Z')}<path d="M10.8 4.8V4a1.2 1.2 0 0 1 2.4 0v.8" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".6"/></g>
  <g data-part="clapper">{draw('M10 19.3h4a2 2 0 0 1-4 0Z')}</g>
  <Accent part="ring-right"><Stroke d="M20 6q2 2 2 5M19.6 8.3q.8 1 .8 2.5"/></Accent>
  <Accent part="ring-left"><Stroke d="M4 6q-2 2-2 5M4.4 8.3q-.8 1-.8 2.5"/></Accent>
 </>;
 if(name==='heart')return <>
  <g data-part="heart">{draw(HEART)}<Accent part="heart-light"><Stroke d="M5.4 9a2.3 2.3 0 0 1 3.9-1.7"/></Accent></g>
  {[[3,4],[21,4],[2,15],[22,15]].map(([x,y],i)=><Accent key={i} part={`fleck-${i}`}><path d={`M${x-.7} ${y}h1.4M${x} ${y-.7}v1.4`} fill="none" stroke="currentColor" strokeWidth=".65"/></Accent>)}
 </>;
 if(name==='download')return <>
  <g data-part="tray">{draw('M3 16h2v4h14v-4h2v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z')}</g>
  <g data-part="arrow">{draw('M11 2h2v11.2l4.3-4.3 1.4 1.4L12 17l-6.7-6.7 1.4-1.4 4.3 4.3Z')}</g>
  <Accent part="receive-light"><path d="M6 19.25h12v.7H6Z"/></Accent>
  <Accent part="catch-0"><Stroke d="M1.3 17.7l1.2 1M1 20h1"/></Accent>
  <Accent part="catch-1"><Stroke d="M22.7 17.7l-1.2 1M23 20h-1"/></Accent>
 </>;
 return <>
  <Accent part="guides"><path d="M4 9v8M20 9v8M12 12v8" stroke="currentColor" strokeWidth=".5" strokeDasharray=".7 1.3"/></Accent>
  <g data-part="plane-bottom" opacity=".55">{draw('M3 15l9-4.5 9 4.5-9 4.5Z')}<path d="M3 15l9 4.5 9-4.5v1.2l-9 4.5-9-4.5Z" opacity=".3"/></g>
  <g data-part="plane-middle" opacity=".8">{draw('M3 11.5 12 7l9 4.5-9 4.5Z')}<path d="M3 11.5l9 4.5 9-4.5v1.2l-9 4.5-9-4.5Z" opacity=".3"/></g>
  <g data-part="plane-top">{draw('M3 8l9-4.5L21 8l-9 4.5Z')}<path d="M3 8l9 4.5L21 8v1.2l-9 4.5L3 9.2Z" opacity=".35"/><path d="M5 8l7-3.5L19 8" fill="none" stroke="currentColor" strokeWidth=".35" opacity=".55"/></g>
 </>;
}
