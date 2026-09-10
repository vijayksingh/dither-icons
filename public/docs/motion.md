# Animation controls

Configure triggers, inspect frames, and handle reduced motion.

## Playback behavior

Each icon plays a short animation and returns to its starting pose. In Download, the arrow lands before the tray responds. In Bell, the clapper follows the swinging shell.

- React playback uses native Web Animations. Tracks change transform and opacity.
- Pointer entry, keyboard focus and a click or tap can trigger playback.
- Leaving the target lets the gesture finish. Repeated input during playback is ignored.
- Unmounting, animate={false}, or a reduced-motion preference cancels the running tracks.

## Trigger from the parent button

```tsx
import { SavePreferencesIcon } from '@unlocalhosted/dither-icons';

<button
  className="di-trigger"
  disabled={saving}
  onClick={savePreferences}
>
  <SavePreferencesIcon size={24} texture="solid" />
  {saving ? 'Saving…' : 'Save preferences'}
</button>
```

> saving and savePreferences belong to your application. The icon supplies visual feedback, never proof that the operation succeeded. Keep loading, error and success states in the control’s text and semantics.

## Inspect a frame

Every icon page includes half-speed playback and a frame inspector. Pass progress={0.5} to hold the middle frame, then remove progress to restore hover and focus interaction. Changing material keeps the inspected frame aligned with the replacement artwork.

```tsx
<DownloadIcon size={96} progress={0.5} />

// Return to normal interaction
<DownloadIcon size={96} />
```

## React and standalone SVG

Standalone SVG includes CSS compiled from the same tracks. CSS-only hover stops when the pointer leaves; React preserves the complete gesture. Use React when playback should finish after the pointer leaves. Use inline SVG for CSS hover animation without React.
