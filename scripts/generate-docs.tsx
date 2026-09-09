import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { DitherIcon, definitions, studies, ditherField } from '../src';
import { docs, type Block, type Doc } from '../demo/content/docs';
import { agentContract } from '../demo/content/agent';
import { componentName, labelFor, installCommand } from '../demo/model';

const packageInfo = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
for (const dir of ['public/docs', 'public/reference']) mkdirSync(new URL(`../${dir}`, import.meta.url), { recursive: true });
function write(path: string, content: string) { writeFileSync(new URL(`../${path}`, import.meta.url), content); }
export function blockMarkdown(block: Block): string {
  switch (block.type) {
    case 'text': return block.text;
    case 'note': return `> ${block.text}`;
    case 'code': return `\`\`\`${block.language}\n${block.value}\n\`\`\``;
    case 'list': return block.items.map(item => `- ${item}`).join('\n');
    case 'table': return `| ${block.columns.join(' | ')} |\n| ${block.columns.map(() => '---').join(' | ')} |\n${block.rows.map(row => `| ${row.map(cell => cell.replaceAll('|', '\\|')).join(' | ')} |`).join('\n')}`;
    case 'image': return `![${block.alt}](${block.src})\n\n${block.caption}`;
    case 'demo': return `Interactive example available on the public documentation page. Use the accompanying React snippet to reproduce it.`;
  }
}
function markdown(doc: Doc) { return `# ${doc.title}\n\n${doc.description}\n\n${doc.sections.map(section => `## ${section.title}\n\n${section.blocks.map(blockMarkdown).join('\n\n')}`).join('\n\n')}\n`; }
const manifest = {
  schemaVersion: 1,
  package: packageInfo.name,
  version: packageInfo.version,
  count: definitions.length,
  license: 'MIT',
  installation: { publishedToNpm: false, command: installCommand, peerDependencies: packageInfo.peerDependencies },
  textures: ['dither', 'solid', 'outline'],
  sizing: { viewBox: '0 0 24 24', default: 24, ditherRecommendedMinimum: 48, compactRecommendation: 'solid or outline' },
  icons: definitions.map(icon => ({ name: icon.name, component: componentName(icon.name), label: labelFor(icon.name), category: icon.category, description: icon.description, keywords: icon.keywords ?? [], page: `/icons/${icon.name}`, motion: { caption: studies[icon.name].caption, durationMs: studies[icon.name].duration, stages: studies[icon.name].stages } })),
};
const serialized = JSON.stringify(manifest, null, 2) + '\n';
write('public/icons.json', serialized); write('icons.json', serialized);
const api = docs.find(doc => doc.slug === 'react')!;
const agentGuide = `${agentContract}\n## Install the downloaded package\n\n\`\`\`sh\n${installCommand}\n\`\`\`\n\n${markdown(api)}\n## Visual references\n\n- Material comparison: /reference/textures.svg\n- Labeled contact sheet: /reference/icons.svg\n\nThese references are served by the website. Download them alongside this guide when working with a remote agent.\n`;
write('AI.md', agentGuide); write('public/AI.md', agentGuide);
for (const doc of docs) write(`public/docs/${doc.slug || 'introduction'}.md`, markdown(doc));
write('public/llms.txt', `# Dither Icons\n\n> ${definitions.length} original SVG icons with fine ordered dither and individually authored semantic motion. React 18+, MIT.\n\n## Start here\n\n- [Complete integration guide](/llms-full.txt): API, examples, behavior and valid exports.\n- [Agent contract](/AI.md): concise instructions for integrating the library.\n- [Icon manifest](/icons.json): schema version 1; exact names, exports, keywords and motion metadata.\n\n## Documentation\n\n${docs.map(doc => `- [${doc.title}](/docs/${doc.slug || 'introduction'}.md): ${doc.description}`).join('\n')}\n\n## Visual references\n\n- [Material comparison](/reference/textures.svg)\n- [All icons with export names](/reference/icons.svg)\n\n## Installation status\n\nVersion ${packageInfo.version}. Local .tgz package only; not published to the npm registry.\n`);
write('public/llms-full.txt', `${agentContract}\n${docs.map(markdown).join('\n')}\n## Available icons\n\n| Stable name | React export | Meaning |\n| --- | --- | --- |\n${manifest.icons.map(icon => `| ${icon.name} | ${icon.component} | ${icon.motion.caption} |`).join('\n')}\n\n## Visual references\n\n![Three textures](/reference/textures.svg)\n\n![All ${definitions.length} labeled icons](/reference/icons.svg)\n`);

// Render the actual accepted drawings. One shared grain field keeps these
// static reference sheets compact, without changing any icon's geometry.
function cleanReference(markup: string) {
  return markup.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<mask id="[^"]*-grain"[\s\S]*?<\/mask>/g, '').replace(/url\(#[^)]*-grain\)/g, 'url(#reference-texture)');
}
const grain = <defs><mask id="reference-texture" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={ditherField} fill="white" /></mask></defs>;
const materials = renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" width="900" height="310" viewBox="0 0 900 310" role="img" aria-label="Download in dither, solid and outline"><rect width="900" height="310" rx="18" fill="#161618" />{grain}<text x="30" y="36" fill="#a1a1aa" fontSize="12" fontFamily="sans-serif">ONE DRAWING. THREE MATERIALS.</text>{(['dither','solid','outline'] as const).map((texture, i) => <g key={texture} transform={`translate(${i * 290 + 20} 55)`}><rect width="280" height="235" rx="14" fill="#1c1c20" stroke="#2d2d33" /><DitherIcon name="download" x={85} y={31} size={110} texture={texture} animate={false} color="#bea5f5" /><text x="140" y="181" textAnchor="middle" fill="#efeff1" fontSize="15" fontFamily="sans-serif">{texture[0].toUpperCase() + texture.slice(1)}</text><text x="140" y="204" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="sans-serif">{texture === 'dither' ? 'Fine grain · 48px and above' : texture === 'solid' ? 'Clear silhouette · compact controls' : 'Light presence · compact controls'}</text></g>)}</svg>);
write('public/reference/textures.svg', cleanReference(materials));
const height = Math.ceil(definitions.length / 8) * 148 + 94;
const contactSheet = renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" width="1200" height={height} viewBox={`0 0 1200 ${height}`} role="img" aria-label={`All ${definitions.length} Dither Icons with their React exports`}><rect width="1200" height={height} fill="#161618" />{grain}<text x="24" y="34" fill="#efeff1" fontFamily="sans-serif" fontSize="20">Dither Icons</text><text x="24" y="55" fill="#a1a1aa" fontFamily="sans-serif" fontSize="11">{definitions.length} original drawings · static reference · {packageInfo.version}</text>{definitions.map((icon, i) => <g key={icon.name} transform={`translate(${i % 8 * 148 + 12} ${Math.floor(i / 8) * 148 + 78})`}><rect width="140" height="138" rx="12" fill="#1c1c20" stroke="#2d2d33" /><DitherIcon name={icon.name} x={34} y={14} size={72} animate={false} color="#bea5f5" /><text x="70" y="107" textAnchor="middle" fill="#efeff1" fontFamily="sans-serif" fontSize="10">{labelFor(icon.name)}</text><text x="70" y="124" textAnchor="middle" fill="#a1a1aa" fontFamily="monospace" fontSize="7.6">{componentName(icon.name)}</text></g>)}</svg>);
write('public/reference/icons.svg', cleanReference(contactSheet));
process.stdout.write(`Generated ${docs.length} guides, ${definitions.length} manifest entries, and 2 visual references.\n`);
