// Regenerate from the repository root: npx tsx docs/motion-evidence/refinement-07/render-reference.tsx
import React from 'react';
import {writeFileSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon,type Texture} from '../../../src';

const names=['eye','sparkles','sun','moon'];
const rows:[number,Texture,number][]=[[112,'dither',100],[48,'dither',290],[24,'solid',405],[24,'outline',495]];
const svg=renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" width="1020" height="590" viewBox="0 0 1020 590" role="img" aria-label="Eye, Sparkles, Sun and Moon at large and compact sizes">
 <rect width="1020" height="590" rx="18" fill="#111113"/>
 <g fill="#f1f1f3" fontFamily="sans-serif"><text x="28" y="35" fontSize="20">Visibility and appearance</text><text x="28" y="59" fontSize="12" fill="#a1a1aa">Real SVG exports. Hover an icon to replay; reduced motion stays still.</text>
  {names.map((name,i)=><text key={name} x={240+i*215} y="92" textAnchor="middle" fontSize="13">{name}</text>)}
  {rows.map(([size,texture,y])=><g key={size+texture}>
   <text x="28" y={y+size/2+5} fontSize="12" fill="#a1a1aa">{size}px · {texture}</text>
   {names.map((name,i)=><DitherIcon key={name} name={name} size={size} x={240+i*215-size/2} y={y} texture={texture} color="#efb09a"/>)}
  </g>)}
 </g>
</svg>);
writeFileSync(new URL('./size-and-export.svg',import.meta.url),svg);
