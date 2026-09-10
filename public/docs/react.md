# React API

Component imports, SVG props, and playback controls.

## Import a component

```tsx
import { BellIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Notifications">
  <BellIcon size={24} texture="solid" />
</button>
```

Every component forwards its SVG ref and accepts standard SVG attributes, including className, style, color and event handlers. Keep the accessible name and click action on the surrounding control.

## Props

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

## Select an icon at runtime

```tsx
import { DitherIcon, definitions } from '@unlocalhosted/dither-icons';

const requestedName = 'file-explorer';
const name = definitions.some(icon => icon.name === requestedName)
  ? requestedName
  : 'file';

<DitherIcon name={name} size={24} texture="solid" />
```

DitherIcon defaults to sparkles when name is omitted. An unknown name throws an error. Validate names from external data against definitions or the icon manifest before rendering.

## Trigger a replay

```tsx
import { useState } from 'react';
import { SparklesIcon } from '@unlocalhosted/dither-icons';

export function ReplayExample() {
  const [replay, setReplay] = useState(0);
  return (
    <button onClick={() => setReplay(value => value + 1)}>
      <SparklesIcon size={48} replayKey={replay} />
      Replay animation
    </button>
  );
}
```

Interactive example available on the public documentation page. Use the accompanying React snippet to reproduce it.

Use replayKey for event-driven playback. The gesture is still bounded, respects reduced motion, and ignores extra requests while already running.
