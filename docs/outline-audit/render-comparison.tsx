import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import {readFileSync, writeFileSync} from 'node:fs';
import {DitherIcon} from '../../src/index';
const baseline=JSON.parse(readFileSync(new URL('./before.json',import.meta.url),'utf8')) as {revision:string;icons:Record<string,string>};
const names=Object.keys(baseline.icons);
const groups=[names.slice(0,6),names.slice(6,16),names.slice(16,26),names.slice(26)];
function unique(svg:string,prefix:string){
  for(const match of [...svg.matchAll(/\bid="([^"]+)"/g)])svg=svg.replaceAll(match[1],`${prefix}-${match[1]}`);
  return svg;
}
const after=(name:string,size=112)=>renderToStaticMarkup(<DitherIcon name={name} texture="outline" animate={false} size={size} color="#c7b5fa"/>).replace(/<style>[\s\S]*?<\/style>/g,'');
for(const [page,icons] of groups.entries()){
  const h=80+Math.ceil(icons.length/3)*212;
  const panels=icons.map((name,i)=>`<g transform="translate(${i%3*320} ${80+Math.floor(i/3)*212})"><rect x="10" y="4" width="300" height="196" rx="10" fill="#1e1e23"/><text x="24" y="29" fill="#f4f4f5" font-size="16" font-family="sans-serif">${name}</text><g transform="translate(22 48)">${unique(baseline.icons[name],`before-${name}`)}</g><g transform="translate(173 48)">${unique(after(name),`after-${name}`)}</g><text x="78" y="181" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">Before Outline</text><text x="229" y="181" text-anchor="middle" fill="#aaa" font-size="13" font-family="sans-serif">After Outline</text></g>`).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${h}"><rect width="100%" height="100%" fill="#151518"/><text x="24" y="32" fill="#fafafa" font-size="21" font-family="sans-serif">Outline material correction · ${page+1}/4</text><text x="24" y="57" fill="#aaa" font-size="13" font-family="sans-serif">Same icon / size / color · actual React renders · before ${baseline.revision}</text>${panels}</svg>`;
  writeFileSync(new URL(`after-${page+1}.svg`,import.meta.url),svg);
  writeFileSync(new URL(`after-${page+1}.png`,import.meta.url),new Resvg(svg,{font:{loadSystemFonts:true}}).render().asPng());
}
const compact=names.map((name,i)=>`<g transform="translate(${i%6*150} ${50+Math.floor(i/6)*70})"><text x="8" y="16" fill="#ccc" font-size="11" font-family="sans-serif">${name}</text><g transform="translate(40 25)">${unique(after(name,24),`compact-${name}`)}</g><g transform="translate(82 21)">${unique(after(name,32),`medium-${name}`)}</g></g>`).join('');
writeFileSync(new URL('compact.png',import.meta.url),new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="470"><rect width="100%" height="100%" fill="#151518"/><text x="18" y="28" fill="#eee" font-size="18" font-family="sans-serif">Outline at actual 24px / 32px</text>${compact}</svg>`,{font:{loadSystemFonts:true}}).render().asPng());
console.log(`Rendered ${names.length} before/after pairs and compact-size board`);
