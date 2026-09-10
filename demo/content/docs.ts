import { definitions } from '../../src';
import { installCommand } from '../model';
export type Block =
  | { type: 'text' | 'note'; text: string }
  | { type: 'code'; value: string; language: string; title: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'demo'; kind: 'textures' | 'button' | 'replay' };
export type Doc = { slug: string; title: string; description: string; eyebrow: string; sections: { id: string; title: string; blocks: Block[] }[] };
export const basicExample = `import { DownloadIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Download file">
  <DownloadIcon size={48} texture="dither" />
</button>`;
export const replayExample = `import { useState } from 'react';
import { SparklesIcon } from '@unlocalhosted/dither-icons';

export function ReplayExample() {
  const [replay, setReplay] = useState(0);
  return (
    <button onClick={() => setReplay(value => value + 1)}>
      <SparklesIcon size={48} replayKey={replay} />
      Replay animation
    </button>
  );
}`;
export const docs: Doc[] = [
  { slug: '', title: 'Using Dither Icons', eyebrow: 'INTRODUCTION', description: 'Install an icon, choose a material, and configure playback.', sections: [
    { id: 'the-library', title: 'The library', blocks: [
      { type: 'text', text: `Dither Icons includes ${definitions.length} original SVG icons with individual animations. Each drawing comes in dither, solid, and outline. The dither texture sits inside the vector shape and moves with it.` },
      { type: 'image', src: '/reference/textures.svg', alt: 'The same Download icon in dither, solid and outline textures.', caption: 'The Download icon in dither, solid, and outline.' },
    ] },
    { id: 'your-first-icon', title: 'Add your first icon', blocks: [
      { type: 'text', text: 'Install the package, import a named component, and add it to a real button. The icon inherits your text color and needs no separate stylesheet.' },
      { type: 'code', language: 'tsx', title: 'DownloadButton.tsx', value: basicExample },
      { type: 'demo', kind: 'button' },
    ] },
    { id: 'choose-the-material', title: 'Choose a material', blocks: [
      { type: 'list', items: ['Dither: a fine dot pattern within the vector shape. Best at 48px and above.', 'Solid: filled shapes for compact controls, usually 16–24px.', 'Outline: stroked shapes for navigation and toolbars.'] },
      { type: 'text', text: 'All three materials use the same geometry. Icons inherit currentColor; check contrast against your background.' },
    ] },
    { id: 'what-ships', title: 'What the package includes', blocks: [
      { type: 'list', items: ['React 18+ is the only peer dependency. ESM and TypeScript declarations are included.', 'Hover, focus and tap play once. A gesture finishes after the pointer leaves.', 'Reduced-motion preferences are respected automatically. Static icons remain useful.', 'MIT licensed. Original geometry and individually authored animation tracks.'] },
      { type: 'note', text: 'Install the React package from npm. Named exports share the complete geometry catalog; per-icon bundle splitting is not implemented.' },
    ] },
  ] },
  { slug: 'installation', title: 'Install Dither Icons', eyebrow: 'INSTALLATION', description: 'Use the React package or download individual SVGs from the catalog.', sections: [
    { id: 'download', title: '1. Install the package', blocks: [
      { type: 'text', text: 'Install the package from npm using your package manager.' },
      { type: 'code', language: 'sh', title: 'Terminal', value: installCommand },
      { type: 'note', text: 'React 18 or newer is the only peer dependency.' },
    ] },
    { id: 'use', title: '2. Add an icon', blocks: [
      { type: 'code', language: 'tsx', title: 'DownloadButton.tsx', value: basicExample },
      { type: 'text', text: 'Add di-trigger to the parent button to make its entire hit area respond. Keep your real onClick action on that button. Playing a preview does not perform a download or change application state.' },
    ] },
    { id: 'frameworks', title: 'Framework support', blocks: [
      { type: 'table', columns: ['Environment', 'Integration'], rows: [['React 18 / 19', 'Use the named exports in your existing React build.'], ['Server-component frameworks', 'Import animated icons from a client component. Put "use client" at the top of that wrapper where your framework requires it.'], ['Plain HTML / other frameworks', 'Open an icon page and download its standalone SVG. Inline the markup for hover animation.'], ['Image elements', 'Use a downloaded SVG in an <img> for its static appearance. Image embedding does not expose its internal hover targets.']] },
    ] },
    { id: 'local-development', title: 'Local development', blocks: [
      { type: 'code', language: 'sh', title: 'From the library checkout · Node 22+', value: 'npm install\nnpm run dev\n\n# Package + public site\nnpm run build\n\n# Package only\nnpm pack' },
      { type: 'text', text: 'The development catalog runs on port 4192. The build creates the React package in dist and the public site in site-dist. AI.md and icons.json are included in the package; the website also serves the full guides and visual references.' },
    ] },
  ] },
  { slug: 'react', title: 'React API', eyebrow: 'REACT API', description: 'Component imports, SVG props, and playback controls.', sections: [
    { id: 'named-components', title: 'Import a component', blocks: [
      { type: 'code', language: 'tsx', title: 'Notifications.tsx', value: `import { BellIcon } from '@unlocalhosted/dither-icons';\n\n<button className="di-trigger" aria-label="Notifications">\n  <BellIcon size={24} texture="solid" />\n</button>` },
      { type: 'text', text: 'Every component forwards its SVG ref and accepts standard SVG attributes, including className, style, color and event handlers. Keep the accessible name and click action on the surrounding control.' },
    ] },
    { id: 'props', title: 'Props', blocks: [
      { type: 'table', columns: ['Prop', 'Default', 'Behavior'], rows: [
        ['size', '24', 'Width and height. Number or CSS-compatible string.'], ['texture', 'dither', 'dither, solid, or outline.'], ['animate', 'true', 'Enable one-shot gestures. false also overrides active and replay.'], ['active', 'false', 'Play when this becomes true. Set false before triggering true again.'], ['replayKey', '0', 'Change this number to request another gesture. Retriggers during playback are ignored.'], ['speed', '1', 'Playback rate. 0.5 is half speed; use a positive number.'], ['progress', 'undefined', 'A normalized frame from 0 to 1. Omit to restore interaction.'], ['title', 'undefined', 'Accessible image name. Without a title the icon is decorative.'],
      ] },
    ] },
    { id: 'dynamic-icons', title: 'Select an icon at runtime', blocks: [
      { type: 'code', language: 'tsx', title: 'Safe runtime selection', value: `import { DitherIcon, definitions } from '@unlocalhosted/dither-icons';\n\nconst requestedName = 'file-explorer';\nconst name = definitions.some(icon => icon.name === requestedName)\n  ? requestedName\n  : 'file';\n\n<DitherIcon name={name} size={24} texture="solid" />` },
      { type: 'text', text: 'DitherIcon defaults to sparkles when name is omitted. An unknown name throws an error. Validate names from external data against definitions or the icon manifest before rendering.' },
    ] },
    { id: 'controlled-replay', title: 'Trigger a replay', blocks: [
      { type: 'code', language: 'tsx', title: 'ReplayExample.tsx', value: replayExample },
      { type: 'demo', kind: 'replay' },
      { type: 'text', text: 'Use replayKey for event-driven playback. The gesture is still bounded, respects reduced motion, and ignores extra requests while already running.' },
    ] },
  ] },
  { slug: 'motion', title: 'Animation controls', eyebrow: 'MOTION', description: 'Configure triggers, inspect frames, and handle reduced motion.', sections: [
    { id: 'a-gesture-not-a-loop', title: 'Playback behavior', blocks: [
      { type: 'text', text: 'Each icon plays a short animation and returns to its starting pose. In Download, the arrow lands before the tray responds. In Bell, the clapper follows the swinging shell.' },
      { type: 'list', items: ['React playback uses native Web Animations. Tracks change transform and opacity.', 'Pointer entry, keyboard focus and a click or tap can trigger playback.', 'Leaving the target lets the gesture finish. Repeated input during playback is ignored.', 'Unmounting, animate={false}, or a reduced-motion preference cancels the running tracks.'] },
    ] },
    { id: 'the-whole-hit-area', title: 'Trigger from the parent button', blocks: [
      { type: 'code', language: 'tsx', title: 'SavePreferences.tsx', value: `import { SavePreferencesIcon } from '@unlocalhosted/dither-icons';\n\n<button\n  className="di-trigger"\n  disabled={saving}\n  onClick={savePreferences}\n>\n  <SavePreferencesIcon size={24} texture="solid" />\n  {saving ? 'Saving…' : 'Save preferences'}\n</button>` },
      { type: 'note', text: 'saving and savePreferences belong to your application. The icon supplies visual feedback, never proof that the operation succeeded. Keep loading, error and success states in the control’s text and semantics.' },
    ] },
    { id: 'inspect', title: 'Inspect a frame', blocks: [
      { type: 'text', text: 'Every icon page includes half-speed playback and a frame inspector. Pass progress={0.5} to hold the middle frame, then remove progress to restore hover and focus interaction. Changing material keeps the inspected frame aligned with the replacement artwork.' },
      { type: 'code', language: 'tsx', title: 'Frame inspection', value: `<DownloadIcon size={96} progress={0.5} />\n\n// Return to normal interaction\n<DownloadIcon size={96} />` },
    ] },
    { id: 'svg-lifecycle', title: 'React and standalone SVG', blocks: [
      { type: 'text', text: 'Standalone SVG includes CSS compiled from the same tracks. CSS-only hover stops when the pointer leaves; React preserves the complete gesture. Use React when playback should finish after the pointer leaves. Use inline SVG for CSS hover animation without React.' },
    ] },
  ] },
  { slug: 'accessibility', title: 'Accessibility', eyebrow: 'ACCESSIBILITY', description: 'Label controls, support keyboard input, and respect reduced-motion preferences.', sections: [
    { id: 'name-the-action', title: 'Label the control', blocks: [
      { type: 'code', language: 'tsx', title: 'Decorative icon, named control', value: `<button className="di-trigger" aria-label="Open notifications">\n  <BellIcon size={24} texture="solid" />\n</button>\n\n<button className="di-trigger">\n  <DownloadIcon size={24} texture="solid" />\n  Download report\n</button>` },
      { type: 'text', text: 'Icons are aria-hidden by default. Label an icon-only button with aria-label, or give the button visible text. Avoid naming the same control twice through both the button and its decorative icon.' },
    ] },
    { id: 'meaningful-images', title: 'Label a standalone image', blocks: [
      { type: 'code', language: 'tsx', title: 'A standalone named image', value: `<NetworkIcon\n  size={64}\n  title="Connected network"\n  animate={false}\n/>` },
      { type: 'text', text: 'title supplies an accessible SVG image name and role. Use this for an illustration that carries meaning on its own, rather than for an icon already explained by adjacent text.' },
    ] },
    { id: 'reduced-motion', title: 'Reduced motion', blocks: [
      { type: 'text', text: 'prefers-reduced-motion: reduce is respected automatically by both the React runtime and the standalone CSS. Active motion is cancelled when that preference changes. You can also set animate={false} for any icon, independent of the system setting.' },
      { type: 'list', items: ['Use a real button or link with a visible focus treatment.', 'Keep disabled and loading states in the parent control.', 'Never communicate a result through motion alone.', 'At small sizes, prefer solid or outline and check contrast against the actual surface.'] },
    ] },
  ] },
  { slug: 'svg', title: 'Export SVGs', eyebrow: 'SVG EXPORT', description: 'Download icons with your selected material, color, size, and motion setting.', sections: [
    { id: 'export', title: 'Download an icon', blocks: [
      { type: 'text', text: 'Open any icon page. Choose a material, color and export size, then use Download SVG. The SVG tab shows the exact source you receive, including its internal definitions and motion styles.' },
      { type: 'image', src: '/reference/textures.svg', alt: 'Dither, solid and outline Download exports compared at equal size.', caption: 'All three materials retain the same vector contour.' },
    ] },
    { id: 'embedding', title: 'Embed the SVG', blocks: [
      { type: 'code', language: 'html', title: 'A static image', value: '<img src="/download-dither.svg" width="48" height="48" alt="" />' },
      { type: 'text', text: 'Inline the complete SVG markup to expose its hover targets. Keep style, defs, mask and clipPath elements when moving it; removing them can remove texture, occlusion or motion. Keep IDs unique when combining multiple exported SVGs in one document.' },
      { type: 'note', text: 'The SVG has a transparent background. Its exported color is the selected palette value; change the SVG color attribute to inherit currentColor from the host when appropriate. An <img> cannot inherit the surrounding document’s currentColor.' },
    ] },
    { id: 'limits', title: 'Playback differences', blocks: [
      { type: 'text', text: 'CSS hover animation ends when hover ends. A standalone SVG does not expose React props such as replayKey or progress. Use the React component when keyboard replay, controlled inspection and finishing after pointer departure matter.' },
    ] },
  ] },
];
export const docPath = (slug: string) => slug ? `/docs/${slug}` : '/docs';
export const docLabel = (doc: Doc) => ({ '': 'Introduction', installation: 'Installation', react: 'React API', motion: 'Motion', accessibility: 'Accessibility', svg: 'SVG export' }[doc.slug] ?? doc.title);
