import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Resvg} from '@resvg/resvg-js';
import {writeFileSync} from 'node:fs';
import {DitherIcon} from '../../src/index';

const groups = [
  {file:'identical',title:'Same rendering in both materials',names:['terminal','cpu','test-suite','file-explorer','arrow-left','history']},
  {file:'similar-1',title:'Little distinction: same stroke or contour',names:['workspace','experiment-compare','search','zoom-out','path','gradient-check','batch-sampling','sigma','save-preferences','panel-left-close']},
  {file:'similar-2',title:'Little distinction: same stroke or contour',names:['network','hint','gauge','sliders','expand-view','plus','retry','close','check','training-step']},
  {file:'partial',title:'Solid-looking parts inside Outline',names:['trash','code','target','lifebuoy','sign-out','learning-rhythm','layers']},
];
const output = new URL('./', import.meta.url);
for(const group of groups){
  const width=960,cellWidth=320,cellHeight=212,height=80+Math.ceil(group.names.length/3)*cellHeight;
  const svg=renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    <rect width={width} height={height} fill="#151518"/>
    <text x="24" y="32" fill="#fafafa" fontSize="21" fontFamily="sans-serif">{group.title}</text>
    <text x="24" y="57" fill="#aaa" fontSize="13" fontFamily="sans-serif">Current v0.2.5 components · same size / color · static rest frame</text>
    {group.names.map((name,i)=><g key={name} transform={`translate(${i%3*cellWidth} ${80+Math.floor(i/3)*cellHeight})`}>
      <rect x="10" y="4" width="300" height="196" rx="10" fill="#1e1e23"/>
      <text x="24" y="29" fill="#f4f4f5" fontSize="16" fontFamily="sans-serif">{name}</text>
      <DitherIcon name={name} texture="solid" animate={false} size={112} x={22} y={48} color="#c7b5fa"/>
      <DitherIcon name={name} texture="outline" animate={false} size={112} x={173} y={48} color="#c7b5fa"/>
      <text x="78" y="181" textAnchor="middle" fill="#aaa" fontSize="13" fontFamily="sans-serif">Solid</text>
      <text x="229" y="181" textAnchor="middle" fill="#aaa" fontSize="13" fontFamily="sans-serif">Outline</text>
    </g>)}
  </svg>).replace(/<style>[\s\S]*?<\/style>/g,'');
  writeFileSync(new URL(`${group.file}.png`,output),new Resvg(svg,{font:{loadSystemFonts:true}}).render().asPng());
}
for(const name of groups[0].names){
  const raster=(texture:'solid'|'outline')=>new Resvg(renderToStaticMarkup(<DitherIcon name={name} texture={texture} animate={false} size={240} color="#ffffff"/>).replace(/<style>[\s\S]*?<\/style>/g,'')).render().pixels;
  const solid=raster('solid'),outline=raster('outline');
  console.log(`${name}: ${solid.equals(outline)?'exact RGBA match':'different pixels'}`);
}
