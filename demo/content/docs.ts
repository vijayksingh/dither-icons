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
      Replay the gesture
    </button>
  );
}`;
export const docs: Doc[] = [
  { slug: '', title: 'A good place to start.', eyebrow: 'INTRODUCTION', description: 'A small library with a particular point of view. Here’s how to make it part of yours.', sections: [
    { id: 'the-library', title: 'Fine grain. Real geometry.', blocks: [
      { type: 'text', text: `Dither Icons is a collection of ${definitions.length} original SVG icons for React. Smooth vector contours carry a fine ordered texture. Each icon has its own short, meaningful gesture: a bell rings, a tray catches, a lid opens.` },
      { type: 'image', src: '/reference/textures.svg', alt: 'The same Download icon in dither, solid and outline textures.', caption: 'One drawing. Three ways to belong in your interface.' },
    ] },
    { id: 'your-first-icon', title: 'Your first little detail.', blocks: [
      { type: 'text', text: 'Install the downloaded package, import a named component, and add it to a real button. The icon inherits your text color and needs no separate stylesheet.' },
      { type: 'code', language: 'tsx', title: 'DownloadButton.tsx', value: basicExample },
      { type: 'demo', kind: 'button' },
    ] },
    { id: 'choose-the-material', title: 'Choose the right material.', blocks: [
      { type: 'list', items: ['Dither: expressive detail at 48px and above. A fine tonal field sits inside a smooth silhouette.', 'Solid: the clearest reading for compact controls, usually 16–24px.', 'Outline: a lighter presence in dense navigation and toolbars.'] },
      { type: 'text', text: 'The texture changes the material, not the drawing or meaning. Color and contrast belong to your interface; the SVG uses currentColor.' },
    ] },
    { id: 'what-ships', title: 'Small surface. Considered behavior.', blocks: [
      { type: 'list', items: ['React 18+ is the only peer dependency. ESM and TypeScript declarations are included.', 'Hover, focus and tap play once. A gesture finishes after the pointer leaves.', 'Reduced-motion preferences are respected automatically. Static icons remain useful.', 'MIT licensed. Original geometry and individually authored animation tracks.'] },
      { type: 'note', text: 'Install the downloadable React package. A registry release is not available yet. Named exports share the complete geometry catalog; per-icon bundle splitting is not implemented.' },
    ] },
  ] },
  { slug: 'installation', title: 'In your project in minutes.', eyebrow: 'INSTALLATION', description: 'A downloadable package for React. A standalone SVG for everywhere else.', sections: [
    { id: 'download', title: '01. Take the package.', blocks: [
      { type: 'text', text: 'Download the .tgz package using Get the library. Place it in your application directory, then install it using your package manager.' },
      { type: 'code', language: 'sh', title: 'Terminal', value: installCommand },
      { type: 'note', text: 'Run this command in the directory containing the downloaded file, or replace the relative path with its actual location. A bare npm install @unlocalhosted/dither-icons is not available yet.' },
    ] },
    { id: 'use', title: '02. Add an icon.', blocks: [
      { type: 'code', language: 'tsx', title: 'DownloadButton.tsx', value: basicExample },
      { type: 'text', text: 'Add di-trigger to the parent button to make its entire hit area respond. Keep your real onClick action on that button. Playing a preview does not perform a download or change application state.' },
    ] },
    { id: 'frameworks', title: '03. Match your environment.', blocks: [
      { type: 'table', columns: ['Environment', 'Integration'], rows: [['React 18 / 19', 'Use the named exports in your existing React build.'], ['Server-component frameworks', 'Import animated icons from a client component. Put "use client" at the top of that wrapper where your framework requires it.'], ['Plain HTML / other frameworks', 'Open an icon page and download its standalone SVG. Inline the markup for hover animation.'], ['Image elements', 'Use a downloaded SVG in an <img> for its static appearance. Image embedding does not expose its internal hover targets.']] },
    ] },
    { id: 'local-development', title: 'Working on the library itself?', blocks: [
      { type: 'code', language: 'sh', title: 'From the library checkout · Node 22+', value: 'npm install\nnpm run dev\n\n# Package + public site\nnpm run build\n\n# Package only\nnpm pack' },
      { type: 'text', text: 'The development catalog runs on port 4192. The build creates the React package in dist and the public site in site-dist. AI.md and icons.json are included in the package; the website also serves the full guides and visual references.' },
    ] },
  ] },
  { slug: 'react', title: 'React, without ceremony.', eyebrow: 'REACT API', description: 'Named components, ordinary SVG props, and a few deliberate controls for motion.', sections: [
    { id: 'named-components', title: 'Start with a named component.', blocks: [
      { type: 'code', language: 'tsx', title: 'Notifications.tsx', value: `import { BellIcon } from '@unlocalhosted/dither-icons';\n\n<button className="di-trigger" aria-label="Notifications">\n  <BellIcon size={24} texture="solid" />\n</button>` },
      { type: 'text', text: 'Every component forwards its SVG ref and accepts standard SVG attributes, including className, style, color and event handlers. Keep the accessible name and click action on the surrounding control.' },
    ] },
    { id: 'props', title: 'The complete prop surface.', blocks: [
      { type: 'table', columns: ['Prop', 'Default', 'Behavior'], rows: [
        ['size', '24', 'Width and height. Number or CSS-compatible string.'], ['texture', 'dither', 'dither, solid, or outline.'], ['animate', 'true', 'Enable one-shot gestures. false also overrides active and replay.'], ['active', 'false', 'Play when this becomes true. Set false before triggering true again.'], ['replayKey', '0', 'Change this number to request another gesture. Retriggers during playback are ignored.'], ['speed', '1', 'Playback rate. 0.5 is half speed; use a positive number.'], ['progress', 'undefined', 'A normalized frame from 0 to 1. Omit to restore interaction.'], ['title', 'undefined', 'Accessible image name. Without a title the icon is decorative.'],
      ] },
    ] },
    { id: 'dynamic-icons', title: 'Selecting an icon at runtime.', blocks: [
      { type: 'code', language: 'tsx', title: 'Safe runtime selection', value: `import { DitherIcon, definitions } from '@unlocalhosted/dither-icons';\n\nconst requestedName = 'file-explorer';\nconst name = definitions.some(icon => icon.name === requestedName)\n  ? requestedName\n  : 'file';\n\n<DitherIcon name={name} size={24} texture="solid" />` },
      { type: 'text', text: 'DitherIcon defaults to sparkles when name is omitted. An unknown name throws an error. Validate names from external data against definitions or the icon manifest before rendering.' },
    ] },
    { id: 'controlled-replay', title: 'Replay on your own terms.', blocks: [
      { type: 'code', language: 'tsx', title: 'ReplayExample.tsx', value: replayExample },
      { type: 'demo', kind: 'replay' },
      { type: 'text', text: 'Use replayKey for event-driven playback. The gesture is still bounded, respects reduced motion, and ignores extra requests while already running.' },
    ] },
  ] },
  { slug: 'motion', title: 'Motion with a meaning.', eyebrow: 'MOTION', description: 'A short action, a clear response, and an exact return to rest.', sections: [
    { id: 'a-gesture-not-a-loop', title: 'A gesture, not a loop.', blocks: [
      { type: 'text', text: 'Each icon starts with an object and a verb. The Download arrow leads and its tray catches. The Bell shell swings and its clapper follows. All gestures preserve their identifying silhouette through the payoff.' },
      { type: 'list', items: ['React playback uses native Web Animations. Tracks change transform and opacity.', 'Pointer entry, keyboard focus and a click or tap can trigger playback.', 'Leaving the target lets the gesture finish. Repeated input during playback is ignored.', 'Unmounting, animate={false}, or a reduced-motion preference cancels the running tracks.'] },
    ] },
    { id: 'the-whole-hit-area', title: 'Let the whole control respond.', blocks: [
      { type: 'code', language: 'tsx', title: 'SavePreferences.tsx', value: `import { SavePreferencesIcon } from '@unlocalhosted/dither-icons';\n\n<button\n  className="di-trigger"\n  disabled={saving}\n  onClick={savePreferences}\n>\n  <SavePreferencesIcon size={24} texture="solid" />\n  {saving ? 'Saving…' : 'Save preferences'}\n</button>` },
      { type: 'note', text: 'saving and savePreferences belong to your application. The icon supplies visual feedback, never proof that the operation succeeded. Keep loading, error and success states in the control’s text and semantics.' },
    ] },
    { id: 'inspect', title: 'Look closely before tuning.', blocks: [
      { type: 'text', text: 'Every icon page includes half-speed playback and a frame inspector. Pass progress={0.5} to hold the middle frame, then remove progress to restore hover and focus interaction. Changing material keeps the inspected frame aligned with the replacement artwork.' },
      { type: 'code', language: 'tsx', title: 'Frame inspection', value: `<DownloadIcon size={96} progress={0.5} />\n\n// Return to normal interaction\n<DownloadIcon size={96} />` },
    ] },
    { id: 'svg-lifecycle', title: 'React and SVG share the drawing.', blocks: [
      { type: 'text', text: 'Standalone SVG includes CSS compiled from the same tracks. CSS-only hover stops when the pointer leaves; React preserves the complete gesture. Choose React for the richer interaction lifecycle and inline SVG when portability matters more.' },
    ] },
  ] },
  { slug: 'accessibility', title: 'A little delight. For everyone.', eyebrow: 'ACCESSIBILITY', description: 'The interaction should still make sense with a keyboard, a screen reader, or no motion at all.', sections: [
    { id: 'name-the-action', title: 'Name the action, not the artwork.', blocks: [
      { type: 'code', language: 'tsx', title: 'Decorative icon, named control', value: `<button className="di-trigger" aria-label="Open notifications">\n  <BellIcon size={24} texture="solid" />\n</button>\n\n<button className="di-trigger">\n  <DownloadIcon size={24} texture="solid" />\n  Download report\n</button>` },
      { type: 'text', text: 'Icons are aria-hidden by default. Label an icon-only button with aria-label, or give the button visible text. Avoid naming the same control twice through both the button and its decorative icon.' },
    ] },
    { id: 'meaningful-images', title: 'When the icon is the content.', blocks: [
      { type: 'code', language: 'tsx', title: 'A standalone named image', value: `<NetworkIcon\n  size={64}\n  title="Connected network"\n  animate={false}\n/>` },
      { type: 'text', text: 'title supplies an accessible SVG image name and role. Use this for an illustration that carries meaning on its own, rather than for an icon already explained by adjacent text.' },
    ] },
    { id: 'reduced-motion', title: 'Stillness is a complete experience.', blocks: [
      { type: 'text', text: 'prefers-reduced-motion: reduce is respected automatically by both the React runtime and the standalone CSS. Active motion is cancelled when that preference changes. You can also set animate={false} for any icon, independent of the system setting.' },
      { type: 'list', items: ['Use a real button or link with a visible focus treatment.', 'Keep disabled and loading states in the parent control.', 'Never communicate a result through motion alone.', 'At small sizes, prefer solid or outline and check contrast against the actual surface.'] },
    ] },
  ] },
  { slug: 'svg', title: 'Take the drawing with you.', eyebrow: 'SVG EXPORT', description: 'Transparent, scalable, and ready for places where React isn’t part of the picture.', sections: [
    { id: 'export', title: 'Choose. Customize. Download.', blocks: [
      { type: 'text', text: 'Open any icon page. Choose a material, color and export size, then use Download SVG. The SVG tab shows the exact source you receive, including its internal definitions and motion styles.' },
      { type: 'image', src: '/reference/textures.svg', alt: 'Dither, solid and outline Download exports compared at equal size.', caption: 'All three materials retain the same vector contour.' },
    ] },
    { id: 'embedding', title: 'Inline for interaction. Image for stillness.', blocks: [
      { type: 'code', language: 'html', title: 'A static image', value: '<img src="/download-dither.svg" width="48" height="48" alt="" />' },
      { type: 'text', text: 'Inline the complete SVG markup to expose its hover targets. Keep style, defs, mask and clipPath elements when moving it; removing them can remove texture, occlusion or motion. Keep IDs unique when combining multiple exported SVGs in one document.' },
      { type: 'note', text: 'The SVG has a transparent background. Its exported color is the selected palette value; change the SVG color attribute to inherit currentColor from the host when appropriate. An <img> cannot inherit the surrounding document’s currentColor.' },
    ] },
    { id: 'limits', title: 'Know the lifecycle difference.', blocks: [
      { type: 'text', text: 'CSS hover animation ends when hover ends. A standalone SVG does not expose React props such as replayKey or progress. Use the React component when keyboard replay, controlled inspection and finishing after pointer departure matter.' },
    ] },
  ] },
];
export const docPath = (slug: string) => slug ? `/docs/${slug}` : '/docs';
export const docLabel = (doc: Doc) => ({ '': 'Introduction', installation: 'Installation', react: 'React API', motion: 'Motion', accessibility: 'Accessibility', svg: 'SVG export' }[doc.slug] ?? doc.title);
