import {Resvg} from '@resvg/resvg-js';
import {readFileSync,writeFileSync} from 'node:fs';
const frames=JSON.parse(readFileSync(new URL('./browser/paused-svg.json',import.meta.url),'utf8')) as Record<string,{name:string;svg:string}[]>;
for(const [frame,icons] of Object.entries(frames)){
 const panels=icons.map(({name,svg},i)=>{
  for(const match of [...svg.matchAll(/\bid="([^"]+)"/g)])svg=svg.replaceAll(match[1],`${name}-${match[1]}`);
  return `<g transform="translate(${i%6*165} ${55+Math.floor(i/6)*132})"><text x="12" y="17" fill="#ccc" font-family="sans-serif" font-size="12">${name}</text><g transform="translate(32 27)">${svg}</g></g>`;
 }).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="990" height="850"><rect width="100%" height="100%" fill="#151518"/><text x="18" y="30" fill="#fff" font-size="20" font-family="sans-serif">Actual browser pose: ${Number(frame)*100}% · 33 corrected Outline icons</text>${panels}</svg>`;
 writeFileSync(new URL(`browser/pose-${Number(frame)*100}.png`,import.meta.url),new Resvg(svg,{font:{loadSystemFonts:true}}).render().asPng());
}
