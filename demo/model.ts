import { definitions, type Texture } from '../src';

export const palettes = [
  { name: 'Iris', dark: '#bea5f5', light: '#7048b4' },
  { name: 'Cobalt', dark: '#92b5ff', light: '#315bc4' },
  { name: 'Jade', dark: '#86d5b5', light: '#247458' },
  { name: 'Amber', dark: '#eac282', light: '#956019' },
  { name: 'Coral', dark: '#f2a08c', light: '#b44735' },
  { name: 'Rose', dark: '#eba0c2', light: '#a73770' },
  { name: 'Citron', dark: '#d0e99a', light: '#5a731e' },
  { name: 'Graphite', dark: '#d2d6dc', light: '#424954' },
];
export const textures: Texture[] = ['dither', 'solid', 'outline'];
export const categories = ['All icons', ...new Set(definitions.map(icon => icon.category))];
const featured = ['download', 'bell', 'layers', 'heart', 'send', 'code-run', 'save-preferences', 'file-explorer', 'expand-view', 'sparkles', 'book', 'settings'];
export const collection = [...featured.map(name => definitions.find(icon => icon.name === name)!), ...definitions.filter(icon => !featured.includes(icon.name))];
export const labelFor = (name: string) => definitions.find(icon => icon.name === name)?.label ?? name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
export const componentName = (name: string) => name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('') + 'Icon';
export const packageUrl = '/unlocalhosted-dither-icons-0.1.0.tgz';
export const installCommand = 'npm install ./unlocalhosted-dither-icons-0.1.0.tgz';

export function filterIcons(query: string, category: string) {
  const words = query.trim().toLowerCase().split(/\s+/);
  return collection.filter(icon => {
    const text = `${icon.name} ${icon.label ?? ''} ${icon.category} ${(icon.keywords ?? []).join(' ')}`.toLowerCase();
    return (category === 'All icons' || icon.category === category) && words.every(word => text.includes(word));
  });
}

export function reactCode(name: string, size: number, texture: Texture, color: string, animate: boolean) {
  const component = componentName(name);
  return `import { ${component} } from '@unlocalhosted/dither-icons';\n\n<button\n  className="di-trigger"\n  aria-label="${labelFor(name)}"\n>\n  <${component}\n    size={${size}}\n    texture="${texture}"\n    color="${color}"\n    animate={${animate}}\n  />\n</button>`;
}
