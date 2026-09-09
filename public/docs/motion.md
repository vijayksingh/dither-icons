# Motion with a meaning.

A short action, a clear response, and an exact return to rest.

## A gesture, not a loop.

Each icon starts with an object and a verb. The Download arrow leads and its tray catches. The Bell shell swings and its clapper follows. All gestures preserve their identifying silhouette through the payoff.

- React playback uses native Web Animations. Tracks change transform and opacity.
- Pointer entry, keyboard focus and a click or tap can trigger playback.
- Leaving the target lets the gesture finish. Repeated input during playback is ignored.
- Unmounting, animate={false}, or a reduced-motion preference cancels the running tracks.

## Let the whole control respond.

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

## Look closely before tuning.

Every icon page includes half-speed playback and a frame inspector. Pass progress={0.5} to hold the middle frame, then remove progress to restore hover and focus interaction. Changing material keeps the inspected frame aligned with the replacement artwork.

```tsx
<DownloadIcon size={96} progress={0.5} />

// Return to normal interaction
<DownloadIcon size={96} />
```

## React and SVG share the drawing.

Standalone SVG includes CSS compiled from the same tracks. CSS-only hover stops when the pointer leaves; React preserves the complete gesture. Choose React for the richer interaction lifecycle and inline SVG when portability matters more.
