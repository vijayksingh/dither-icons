# Dither Icons — agent integration guide

Use existing components from @unlocalhosted/dither-icons. Do not invent export names, redraw geometry, or replace individual semantic animation tracks with generic effects.

## Installation

The package is not published to the npm registry. Download the site's .tgz file or run npm pack in the library checkout. Install the actual local file in the target app. React 18+ is the only peer dependency. The package contains ESM, TypeScript declarations, this AI.md guide, and icons.json.

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

## Install the downloaded package

```sh
npm install ./unlocalhosted-dither-icons-0.1.0.tgz
```

# React, without ceremony.

Named components, ordinary SVG props, and a few deliberate controls for motion.

## Start with a named component.

```tsx
import { BellIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Notifications">
  <BellIcon size={24} texture="solid" />
</button>
```

Every component forwards its SVG ref and accepts standard SVG attributes, including className, style, color and event handlers. Keep the accessible name and click action on the surrounding control.

## The complete prop surface.

| Prop | Default | Behavior |
| --- | --- | --- |
| size | 24 | Width and height. Number or CSS-compatible string. |
| texture | dither | dither, solid, or outline. |
| animate | true | Enable one-shot gestures. false also overrides active and replay. |
| active | false | Play when this becomes true. Set false before triggering true again. |
| replayKey | 0 | Change this number to request another gesture. Retriggers during playback are ignored. |
| speed | 1 | Playback rate. 0.5 is half speed; use a positive number. |
| progress | undefined | A normalized frame from 0 to 1. Omit to restore interaction. |
| title | undefined | Accessible image name. Without a title the icon is decorative. |

## Selecting an icon at runtime.

```tsx
import { DitherIcon, definitions } from '@unlocalhosted/dither-icons';

const requestedName = 'file-explorer';
const name = definitions.some(icon => icon.name === requestedName)
  ? requestedName
  : 'file';

<DitherIcon name={name} size={24} texture="solid" />
```

DitherIcon defaults to sparkles when name is omitted. An unknown name throws an error. Validate names from external data against definitions or the icon manifest before rendering.

## Replay on your own terms.

```tsx
import { useState } from 'react';
import { SparklesIcon } from '@unlocalhosted/dither-icons';

export function ReplayExample() {
  const [replay, setReplay] = useState(0);
  return (
    <button onClick={() => setReplay(value => value + 1)}>
      <SparklesIcon size={48} replayKey={replay} />
      Replay the gesture
    </button>
  );
}
```

Interactive example available on the public documentation page. Use the accompanying React snippet to reproduce it.

Use replayKey for event-driven playback. The gesture is still bounded, respects reduced motion, and ignores extra requests while already running.

## Visual references

- Material comparison: /reference/textures.svg
- Labeled contact sheet: /reference/icons.svg

These references are served by the website. Download them alongside this guide when working with a remote agent.
