# Dither Icons

36 original animated SVG icons for React. A standalone project by Unlocalhosted, inspired by the discoverability and interaction model of [lucide-animated](https://lucide-animated.com/). No Lucide paths or source are included.

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

React 18+ is the only peer dependency. ESM and TypeScript declarations ship in `dist/`. CSS is embedded in each SVG so exports work without a stylesheet. Named exports currently share the complete 36-icon geometry catalog; per-icon bundle splitting is not implemented.

### API

All components forward an SVG ref and accept ordinary SVG props, including `color`, `className`, `style`, and event handlers.

| Prop | Default | Behavior |
| --- | --- | --- |
| `size` | `24` | SVG width and height, number or CSS-compatible string |
| `texture` | `dither` | `dither`, `solid`, or `outline` |
| `animate` | `true` | Enable one-shot hover / focus animations |
| `active` | `false` | Play on becoming true; reset false before replay |
| `title` | absent | Accessible image name; otherwise decorative |

`DitherIcon` also accepts a `name` for runtime selection. Invalid names throw a descriptive error. `definitions` and `IconArtwork` support building custom catalogs. Use `di-trigger` on a parent button to animate on the whole target's hover and keyboard focus. Touch users can explicitly trigger with `active`.

Motion obeys `prefers-reduced-motion: reduce`. No looping animation, timers, filters, generated noise, or layout animation. Caller-supplied `animate={false}` takes precedence over `active`. Do not use motion as the only indicator of a state change.

## Visual contract

- Original geometry on a 24 × 24 integer grid. Square cells and stepped diagonals.
- Solid boundary pixels; alternating interior pixels at 65% opacity. Stable ordered dithering, never random noise.
- `currentColor` throughout. The hosting interface supplies contrast.
- Prefer solid / outline at 16–24px. Dither is clearest at 48px+. Use integer multiples for crisp grid rendering.
- Motion belongs to semantic parts: lids lift, arrows travel, bells pivot, cursors blink. 600ms maximum, once per interaction.
- Every new icon needs a name, category, motion explanation, and bounded original geometry in `src/shapes.ts`.

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
