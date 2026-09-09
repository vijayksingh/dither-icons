import { definitions } from '../../src/shapes';
import { docs, docLabel, docPath } from './docs';
import { labelFor } from '../model';
export type SharePage = { path: string; title: string; description: string; heading: string[]; image: string; icons: string[] };
export const defaultSiteUrl = 'https://dithered.dev';
export const sharePages: SharePage[] = [
  { path: '/', title: 'Dither Icons — A little grain. A lot of character.', description: `${definitions.length} original animated SVG icons for React. Fine dither, clean contours, and meaningful motion. Free and MIT licensed.`, heading: ['A little grain.', 'A lot of character.'], image: 'home', icons: ['download','bell','heart','layers'] },
  { path: '/motion', title: 'Motion Studio — Dither Icons', description: 'Explore individually authored icon gestures. Replay, compare materials, and inspect every frame.', heading: ['Every gesture', 'has a reason.'], image: 'motion', icons: ['bell','download','layers','send'] },
  { path: '/ai', title: 'AI Integration Guide — Dither Icons', description: 'Exact icon names, accessible React examples, visual references, and integration instructions for your coding agent.', heading: ['Good icons.', 'Clear instructions.'], image: 'ai', icons: ['code','sparkles','file','check'] },
  ...docs.map(doc => ({ path: docPath(doc.slug), title: `${docLabel(doc)} — Dither Icons`, description: doc.description, heading: [docLabel(doc), 'Dither Icons'], image: `docs-${doc.slug || 'introduction'}`, icons: ['book','code','download','layers'] })),
  ...definitions.map(icon => ({ path: `/icons/${icon.name}`, title: `${labelFor(icon.name)} Icon — Dither Icons`, description: `${labelFor(icon.name)}: ${icon.description}. Original animated SVG for React, in dither, solid and outline.`, heading: [labelFor(icon.name), 'Made to move.'], image: `icon-${icon.name}`, icons: [icon.name] })),
];
export function siteOrigin(value = defaultSiteUrl) {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be an HTTP(S) origin without a path, query or credentials.');
  return url.origin;
}
export function sharePage(path: string) { return sharePages.find(page => page.path === (path.replace(/\/+$/, '') || '/')) ?? sharePages[0]; }
const escape = (value: string) => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function socialMetadata(page: SharePage, origin = defaultSiteUrl) {
  const base = siteOrigin(origin), image = `${base}/og/${page.image}.png`, url = `${base}${page.path}`;
  const meta = (key: string, value: string, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}" />`;
  return ['<!-- social:start -->', `<title>${escape(page.title)}</title>`, meta('description',page.description), `<link rel="canonical" href="${escape(url)}" />`, meta('og:type','website',true),meta('og:site_name','Dither Icons',true),meta('og:title',page.title,true),meta('og:description',page.description,true),meta('og:url',url,true),meta('og:image',image,true),meta('og:image:type','image/png',true),meta('og:image:width','1200',true),meta('og:image:height','630',true),meta('og:image:alt',page.heading.join(' ') + ' Original Dither Icons artwork.',true),meta('twitter:card','summary_large_image'),meta('twitter:creator','@dprophecyguy'),meta('twitter:title',page.title),meta('twitter:description',page.description),meta('twitter:image',image),meta('twitter:image:alt',page.heading.join(' ')), '<!-- social:end -->'].join('\n    ');
}
export function injectSocial(html: string, page: SharePage, origin = defaultSiteUrl) { return html.replace(/<!-- social:start -->[\s\S]*?<!-- social:end -->/, socialMetadata(page,origin)); }
