import assert from 'node:assert/strict';

// Use the machine's normal DNS and TLS validation. A Pages preview URL or an
// overridden resolver cannot prove that the public domain works for visitors.
const origin = new URL(process.env.SITE_URL || 'https://dithered.dev').origin;
const routes = ['/', '/motion', '/ai', '/docs', '/docs/react', '/icons/download'];
const assets = new Map();

async function get(path) {
  const url = new URL(path, origin);
  assert.equal(url.origin, origin, `Unexpected asset origin: ${url}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, 200, `${url}: HTTP ${response.status}`);
  assert.equal(new URL(response.url).origin, origin, `${url}: redirected off-domain`);
  return response;
}

try {
  if (process.env.RELEASE_SHA) {
    const release = await (await get('/release.json')).json();
    assert.equal(release.commit, process.env.RELEASE_SHA, 'Public site is serving another commit');
    if (process.env.RELEASE_VERSION) assert.equal(release.version, process.env.RELEASE_VERSION);
    console.log(`OK deployed revision: ${release.commit}`);
  }
  for (const path of routes) {
    const response = await get(path);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    const html = await response.text();
    assert.match(html, /<div id="root">/, `${path}: missing app root`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical?.[1], `${origin}${path}`, `${path}: wrong canonical URL`);
    const og = html.match(/<meta property="og:image" content="([^"]+)"/);
    assert.ok(og, `${path}: missing sharing image`);
    assets.set(og[1], 'png');
    const bundles = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(js|css))"/g)];
    assert.ok(bundles.some(match => match[2] === 'js'), `${path}: missing JS bundle`);
    assert.ok(bundles.some(match => match[2] === 'css'), `${path}: missing CSS bundle`);
    for (const [, url, type] of bundles) assets.set(url, type);
    console.log(`OK ${path}: HTML and sharing metadata`);
  }

  for (const [url, type] of assets) {
    const response = await get(url);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.ok(bytes.length > 0, `${url}: empty asset`);
    if (type === 'png') {
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${url}: invalid PNG`);
    } else {
      const contentType = response.headers.get('content-type') || '';
      assert.match(contentType, type === 'js' ? /(?:javascript|ecmascript)/ : /text\/css/,
        `${url}: wrong content type (possible SPA fallback)`);
    }
    console.log(`OK ${new URL(url, origin).pathname}: ${bytes.length} bytes`);
  }

  const sitemap = await (await get('/sitemap.xml')).text();
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`), 'Sitemap missing public homepage');
  const robots = await (await get('/robots.txt')).text();
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'Robots sitemap URL is incorrect');
  console.log(`Public HTTP checks passed for ${origin}. Complete the browser checks in docs/DEPLOYMENT.md.`);
} catch (error) {
  console.error(`Deployment verification FAILED for ${origin}: ${error.message}`);
  if (error.cause) console.error(`${error.cause.code || 'Cause'}: ${error.cause.message}`);
  process.exitCode = 1;
}
