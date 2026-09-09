import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { Resvg } from '@resvg/resvg-js';
import { DitherIcon, definitions } from '../src';
import { sharePages } from '../demo/content/social';

const output = new URL('../public/og/', import.meta.url);
mkdirSync(output,{recursive:true});
for (const page of sharePages) {
  const single = page.icons.length === 1;
  const svg = renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#111113" />
    <DitherIcon name="layers" size={32} x={62} y={49} animate={false} color="#ecebf0" />
    <text x="107" y="74" fontFamily="DM Sans" fontSize="27" fontWeight="600" fill="#efeff1">dither<tspan dx="6" fill="#a1a1aa" fontWeight="400">icons</tspan></text>
    <text x="64" y="173" fontFamily="DM Sans" fontSize="13" letterSpacing="2.6" fill="#9f9da8">{single ? 'ORIGINAL ANIMATED SVG' : 'CONSIDERED SHAPES. MEANINGFUL MOTION.'}</text>
    {page.heading.map((line,i)=><text key={i} x="60" y={264+i*83} fontFamily="DM Sans" fontWeight="500" fontSize={line.length>19 ? 49 : 64} letterSpacing="-2" fill={i===0?'#f1f0f4':'#a6a3b0'}>{line}</text>)}
    <text x="64" y="421" fontFamily="DM Sans" fontSize="20" fill="#bcb8c7">Fine grain. Clean contours. A human touch.</text>
    {single ? <g><rect x="795" y="154" width="316" height="316" rx="44" fill="#1b1a20" stroke="#35313e" /><DitherIcon name={page.icons[0]} x={843} y={202} size={220} animate={false} color="#bea5f5" /></g> : page.icons.map((name,i)=><g key={name} transform={`translate(${777+i%2*175} ${139+Math.floor(i/2)*175}) rotate(${[-6,5,-3,7][i]} 76 76)`}><rect width="152" height="152" rx="30" fill="#1b1a20" stroke="#35313e"/><DitherIcon name={name} x={30} y={30} size={92} animate={false} color="#bea5f5" /></g>)}
    <path d="M64 531H1136" stroke="#2a282f" />
    <text x="64" y="576" fontFamily="DM Sans" fontSize="16" fill="#9996a2">{definitions.length} original icons<tspan dx="22">React + SVG</tspan><tspan dx="22">MIT licensed</tspan></text>
    <text x="1136" y="576" textAnchor="end" fontFamily="DM Sans" fontSize="19" fill="#ddd9e6">dithered.dev</text>
  </svg>).replace(/<style>[\s\S]*?<\/style>/g,'');
  const renderer = new Resvg(svg,{font:{fontFiles:[fileURLToPath(new URL('./assets/DM-Sans.ttf',import.meta.url))],loadSystemFonts:false,defaultFontFamily:'DM Sans'}});
  writeFileSync(new URL(`${page.image}.png`,output),renderer.render().asPng());
}
console.log(`Generated ${sharePages.length} social preview images (1200 × 630).`);
