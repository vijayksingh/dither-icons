import React from 'react';
import {createRoot} from 'react-dom/client';
import {DitherIcon,studies,type Texture} from '../../src/index';
import baseline from './before.json';
const root=createRoot(document.getElementById('root')!);
const material=document.getElementById('material') as HTMLSelectElement;
const size=document.getElementById('size') as HTMLSelectElement;
const frame=document.getElementById('frame') as HTMLSelectElement;
const motion=document.getElementById('motion') as HTMLInputElement;
function before(name:string,svg:string){
 for(const match of [...svg.matchAll(/\bid="([^"]+)"/g)])svg=svg.replaceAll(match[1],`before-${name}-${match[1]}`);
 svg=svg.replace('color="#c7b5fa"',document.body.classList.contains('light')?'color="#4a2992"':'color="#c7b5fa"');
 return svg.replace('width="112"','width="'+size.value+'"').replace('height="112"','height="'+size.value+'"');
}
function render(){
 root.render(<>{Object.entries(baseline.icons).map(([name,svg])=><article className="card" key={name}><h3>{name}</h3><div className="pair"><div><div aria-hidden="true" dangerouslySetInnerHTML={{__html:before(name,svg)}}/><p>Before Outline</p></div><div><button className="di-trigger" aria-label={`Replay ${name}`}><DitherIcon name={name} texture={material.value as Texture} size={Number(size.value)} animate={motion.checked} progress={frame.value==='play'?undefined:Number(frame.value)} data-study-duration={studies[name].duration} data-study-tracks={studies[name].tracks.length}/></button><p>Current {material.value}</p></div></div></article>)}</>);
}
for(const control of [material,size,frame,motion])control.addEventListener('change',render);
document.getElementById('theme')!.addEventListener('click',()=>{document.body.classList.toggle('light');document.getElementById('theme')!.textContent=document.body.classList.contains('light')?'Dark background':'Light background';render();});
render();
