import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { sharePages, injectSocial, siteOrigin } from '../demo/content/social';
const origin = siteOrigin(process.env.SITE_URL || loadEnv('production', process.cwd(), 'SITE_').SITE_URL);
const root = new URL('../site-dist/', import.meta.url);
const template = readFileSync(new URL('index.html',root),'utf8');
for (const page of sharePages) {
  const file = new URL(page.path === '/' ? 'index.html' : `${page.path.slice(1)}/index.html`,root);
  mkdirSync(dirname(fileURLToPath(file)),{recursive:true});
  writeFileSync(file,injectSocial(template,page,origin));
}
console.log(`Generated ${sharePages.length} crawler-readable HTML entries for ${origin}.`);

writeFileSync(new URL("robots.txt", root), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
writeFileSync(new URL("sitemap.xml", root), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sharePages.map(page => `<url><loc>${origin}${page.path}</loc></url>`).join("")}</urlset>`);
