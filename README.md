# Dither Icons

52 original animated SVG icons for React, including sixteen icons selected for CraftingAttention. A standalone project by Unlocalhosted, inspired by the discoverability and interaction model of [lucide-animated](https://lucide-animated.com/). No Lucide paths or source are included.

## Run the catalog

Node 22+ recommended.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4192. Search and filter the collection, compare textures, replay animations, copy React usage or SVG, and download standalone SVGs.

## Use the library

Not published to npm yet. Build a local tarball:

```sh
npm pack
# In your application:
npm install /absolute/path/to/unlocalhosted-dither-icons-0.1.0.tgz
```

```tsx
import { BellIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Notifications">
  <BellIcon size={32} texture="dither" />
</button>
```

React 18+ is the only peer dependency. ESM and TypeScript declarations ship in `dist/`. CSS is embedded in each SVG so exports work without a stylesheet. All 52 icons use native Web Animations in React, with the same tracks compiled to CSS for standalone SVG hover. Named exports currently share the complete geometry catalog; per-icon bundle splitting is not implemented.

### API

All components forward an SVG ref and accept ordinary SVG props, including `color`, `className`, `style`, and event handlers.

| Prop | Default | Behavior |
| --- | --- | --- |
| `size` | `24` | SVG width and height, number or CSS-compatible string |
| `texture` | `dither` | `dither`, `solid`, or `outline` |
| `animate` | `true` | Enable one-shot hover / focus animations |
| `active` | `false` | Play on becoming true; reset false before replay |
| `replayKey` | `0` | Change this number to replay an icon |
| `speed` | `1` | Playback rate for all icons; `.5` is half speed |
| `progress` | absent | Pause a study at a normalized frame from `0` to `1`; omit to return to interaction |
| `title` | absent | Accessible image name; otherwise decorative |

`DitherIcon` also accepts a `name` for runtime selection. Invalid names throw a descriptive error. `definitions` and `IconArtwork` support building custom catalogs. Use `di-trigger` on a parent button to animate on the whole target's hover and keyboard focus. Touch users can tap a `di-trigger` button, or explicitly trigger with `active`.

Motion obeys `prefers-reduced-motion: reduce`. No looping animation, timers, filters, generated noise, or layout animation. All performances finish after pointer/focus leaves, ignore retriggers while playing, and cancel on unmount, motion-off, or reduced-motion changes. CSS-only SVG hover playback cannot persist after the pointer leaves; use React for the full interaction contract. Caller-supplied `animate={false}` takes precedence over `active`. Do not use motion as the only indicator of a state change.

## Visual contract

- Original vector contours in a 24 × 24 viewBox. Curves, consistent negative space, and optical proportions are independent of the texture grid.
- An 8 × 8 Bayer threshold matrix samples directional shading into quarter-unit stipple marks. A subtle tonal base preserves the silhouette. No checkerboard fill or stepped contour.
- `currentColor` throughout. The hosting interface supplies contrast.
- Prefer solid / outline at 16–24px. Dither is clearest at 48px+. Contours remain smooth at every size.
- Motion belongs to semantic parts: lids hinge, arrows lead, bells pivot, and signals pass through a chip. All 52 performances are individually authored, last 720–1560ms, and end at neutral. No catalog icon uses a generic motion preset.
- Every new icon needs a name, category, motion explanation, and bounded original geometry in `src/shapes.ts`. The catalog offers eight curated primary colors, with separate light/dark values, and exports the selected color.

## Checks

```sh
npm run typecheck
npm test
npm run build
npm pack
```

`dist/` is the React package; `site-dist/` is the static catalog. The build automatically creates the package download in `public/` before building the catalog. See `docs/VALIDATION.md` for delivery checks.

## License

MIT. Original icon geometry and implementation. The reference project's logo, branding, code, and icon paths are not part of this library.

## Individual motion studies

Open `/#motion-studies` and choose a family to inspect all 52 icons. **Platform / 04** opens Sigma, Bug, Sliders, and Graduation Cap; **Platform / 03** contains Workspace, Gauge, Orbit, and Lifebuoy; **Platform / 02** contains Tensor, Network, Checkpoint, and Hint; **Platform / 01** contains Path, Flask, Target, and Retry. The Foundation family preserves Bell, Heart, Download, and Layers. Use **Half speed**, **Inspect timing**, and the keyboard-accessible scrubber to inspect the same timelines used in the components. These are preview gestures, not claims that a download or notification action occurred.

- Bell: anchored shell swing, delayed clapper, asymmetric ringing cues.
- Heart: compression, release, a brief highlight and four quiet escaping flecks.
- Download: the arrow remains visible; the tray catches, rebounds, and settles. No symbol substitution.
- Layers: independent planes compress, separate, hold, and return in sequence.

`src/choreography.ts` collects the accepted foundation and the individually authored tracks in `src/motions/`. `src/CraftedArtwork.tsx`, `src/ExtendedArtwork.tsx`, `src/LearningArtwork.tsx`, `src/PlatformArtwork.tsx`, `src/PlatformNavigationArtwork.tsx`, and `src/PlatformToolsArtwork.tsx` name the semantic parts. `src/useChoreography.ts` owns interaction lifecycle and scrubbing. See [motion review evidence](docs/MOTION-REVIEW.md) and [platform integration mapping](docs/PLATFORM-ICONS.md).

## Authoring and review

Read [motion principles](docs/MOTION-PRINCIPLES.md), then the icon's [individual Interface Craft review](docs/MOTION-CATALOG.md). Every review includes semantic meaning, an identity boundary, a causal storyboard, exact keyframe times, and browser evidence. Reuse the interaction engine; author each performance independently.
