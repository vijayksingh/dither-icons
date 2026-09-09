import { componentName, labelFor, reactCode } from '../model';
import { type Texture } from '../../src';
export function agentPrompt(name: string, texture: Texture, size: number, origin = '') {
  return `Use Dither Icons for the ${labelFor(name).toLowerCase()} control in this project.

Read ${origin}/llms-full.txt for the integration contract and ${origin}/icons.json for valid names and exports. If these URLs are not reachable from your environment, ask for the downloaded AI.md and icons.json files instead.

Use the existing ${componentName(name)} export from @unlocalhosted/dither-icons, with texture="${texture}" and size={${size}}. Install @unlocalhosted/dither-icons from npm before adding the import.

Keep the existing application action and state. Use a real button with a meaningful accessible name and visible focus; add di-trigger to that button. Let the icon inherit the interface's semantic color. Respect reduced motion, and never use the gesture as proof that an action succeeded. Preserve the original geometry and individual animation tracks.

Start from this example and adapt its accessible label to the actual action:

${reactCode(name, size, texture, 'currentColor', true)}

Verify keyboard interaction, disabled/loading states, contrast at the actual size, and reduced-motion stillness in the running application. Prefer solid or outline for compact 16–24px controls; dither is clearest at 48px and above.`;
}
export const agentContract = `# Dither Icons — agent integration guide

Use existing components from @unlocalhosted/dither-icons. Do not invent export names, redraw geometry, or replace individual semantic animation tracks with generic effects.

## Installation

Install @unlocalhosted/dither-icons from the npm registry. React 18+ is the only peer dependency. The package contains ESM, TypeScript declarations, this AI.md guide, and icons.json.

## Selection

Read icons.json. Each record has a stable name, component export, semantic label, category, keywords, description and motion metadata. Choose an icon from the actual interface action, not merely the page topic. Use solid or outline for compact 16–24px controls; use dither for expressive details at 48px and above. Check the reference texture sheet and contact sheet when comparing silhouettes.

## Integration

Use a named export when possible. Put the action on a native button or link, with di-trigger on the interactive parent. Icons inherit currentColor. Supply color through the host's semantic tokens and verify contrast. Icons without title are decorative and aria-hidden. Name an icon-only button with aria-label; for a standalone meaningful image use title on the SVG.

Keep the real application's loading, disabled, success and error state. A gesture never proves a save, download, sign-out or test result. Use text and correct ARIA state for those outcomes.

## Motion

Every icon has an individually authored one-shot gesture. Hover, keyboard focus and click/tap work on di-trigger controls. React playback completes after the pointer leaves and ignores retriggers while running. Reduced-motion changes, animate={false} and unmount cancel work. active plays on becoming true; reset it false before a later true. replayKey is an event-driven counter. progress is a normalized inspection frame; remove it to resume interaction. speed is a positive playback rate.

Do not animate the grain independently of its object. Do not loop, rotate or bounce the entire icon without a semantic reason. Do not alter accepted geometry or timelines merely to integrate a control.

## SVG

Standalone SVG includes compiled CSS tracks and internal texture definitions. Inline the complete markup for hover behavior; an img embedding is static. CSS-only hover cannot finish after pointer departure. Keep IDs unique when combining exported SVGs. The chosen palette color is included in exports; an image cannot inherit currentColor from its surrounding document.

## Checks

Verify the imported name exists in icons.json. Check the actual rendered size, label, focus ring, keyboard activation, disabled/loading state, color contrast and reduced motion. Inspect real state changes separately from icon feedback. Named exports currently share the complete geometry catalog; do not claim per-icon bundle splitting.
`;
