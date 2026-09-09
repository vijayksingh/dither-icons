import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { definitions } from '../src';
import { SETS } from '../demo/MotionStudies';
import { sharePages, socialMetadata, injectSocial, sharePage, siteOrigin } from '../demo/content/social';

test('public motion categories cover every icon exactly once without internal batch labels',()=>{
  const names=Object.values(SETS).flat();
  assert.equal(new Set(names).size,names.length);
  assert.deepEqual([...names].sort(),definitions.map(icon=>icon.name).sort());
  for(const label of Object.keys(SETS)) assert.ok(!/Platform|Refinement|\d/.test(label));
});
test('every shareable route has a unique PNG and absolute metadata for its own URL',()=>{
  assert.equal(new Set(sharePages.map(page=>page.path)).size,sharePages.length);
  assert.equal(new Set(sharePages.map(page=>page.image)).size,sharePages.length);
  for(const page of sharePages){
    const html=socialMetadata(page);
    assert.ok(html.includes(`content="https://dithered.dev${page.path}"`));
    assert.ok(html.includes(`https://dithered.dev/og/${page.image}.png`));
    assert.ok(html.includes('summary_large_image'));
    assert.ok(html.includes('@dprophecyguy'));
    const png=readFileSync(new URL(`../public/og/${page.image}.png`,import.meta.url));
    assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  }
});
test('metadata replacement avoids duplicates and escapes values',()=>{
  const template='<head><!-- social:start --><!-- social:end --></head>';
  const page={...sharePages[0],title:'An "icon" <test> & more'};
  const html=injectSocial(injectSocial(template,sharePages[0]),page,'https://preview.example');
  assert.equal((html.match(/property="og:title"/g)||[]).length,1);
  assert.ok(html.includes('&quot;icon&quot; &lt;test&gt; &amp; more'));
  assert.ok(html.includes('https://preview.example/og/home.png'));
  assert.equal(sharePage('/icons/download/').image,'icon-download');
  assert.throws(()=>siteOrigin('https://example.com/private'));
  assert.throws(()=>siteOrigin('javascript:alert(1)'));
});
