import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DitherIcon,BellIcon,definitions,cellPaths,motionStyles} from '../src/index';
test('all original icons render every texture without duplicate or out-of-grid cells',()=>{
 assert.equal(definitions.length,73);assert.equal(new Set(definitions.map(d=>d.name)).size,73);
 for(const d of definitions){for(const p of d.parts){assert.equal(new Set(p.cells.map(c=>c.join(','))).size,p.cells.length);assert.ok(p.cells.every(([x,y])=>Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&x<24&&y<24),d.name)}
 for(const texture of ['dither','solid','outline'] as const){const svg=renderToStaticMarkup(<DitherIcon name={d.name} texture={texture}/>);assert.ok(svg.includes('viewBox="0 0 24 24"'));assert.ok(!svg.includes('NaN'));}}
});
test('dither keeps boundary pixels and alternates interior pixels',()=>{const cells=Array.from({length:25},(_,i)=>[i%5,Math.floor(i/5)]);const d=cellPaths(cells,'dither'),o=cellPaths(cells,'outline'),s=cellPaths(cells,'solid');assert.equal(d.ink,o.ink);assert.equal((d.ink.match(/M/g)||[]).length,16);assert.equal((d.grain.match(/M/g)||[]).length,5);assert.equal((s.ink.match(/M/g)||[]).length,25)});
test('decorative and named icons expose appropriate accessibility',()=>{assert.match(renderToStaticMarkup(<BellIcon/>),/aria-hidden="true"/);const named=renderToStaticMarkup(<BellIcon title="Notifications"/>);assert.match(named,/role="img"/);assert.match(named,/aria-label="Notifications"/);assert.ok(!named.includes('aria-hidden'));assert.match(motionStyles,/prefers-reduced-motion:reduce/)});
test('invalid dynamic names fail clearly',()=>assert.throws(()=>renderToStaticMarkup(<DitherIcon name="missing"/>),/Unknown Dither icon/));

test('every displayed part has an authored vector contour, independent of the old pixel map',()=>{
 for(const icon of definitions)for(const part of icon.parts)assert.ok(part.path?.startsWith('M'),icon.name);
 const svg=renderToStaticMarkup(<BellIcon texture="dither" color="#315bc4"/>);
 assert.match(svg,/maskUnits="userSpaceOnUse"/);assert.match(svg,/color="#315bc4"/);assert.match(svg,/a5 5/);
 const still=renderToStaticMarkup(<BellIcon animate={false} active/>);assert.match(still,/data-active="false"/);
});
