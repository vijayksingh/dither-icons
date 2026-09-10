# Using Dither Icons

Install an icon, choose a material, and configure playback.

## The library

Dither Icons includes 73 original SVG icons with individual animations. Each drawing comes in dither, solid, and outline. The dither texture sits inside the vector shape and moves with it.

![The same Download icon in dither, solid and outline textures.](/reference/textures.svg)

The Download icon in dither, solid, and outline.

## Add your first icon

Install the package, import a named component, and add it to a real button. The icon inherits your text color and needs no separate stylesheet.

```tsx
import { DownloadIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Download file">
  <DownloadIcon size={48} texture="dither" />
</button>
```

Interactive example available on the public documentation page. Use the accompanying React snippet to reproduce it.

## Choose a material

- Dither: a fine dot pattern within the vector shape. Best at 48px and above.
- Solid: filled shapes for compact controls, usually 16–24px.
- Outline: stroked shapes for navigation and toolbars.

All three materials use the same geometry. Icons inherit currentColor; check contrast against your background.

## What the package includes

- React 18+ is the only peer dependency. ESM and TypeScript declarations are included.
- Hover, focus and tap play once. A gesture finishes after the pointer leaves.
- Reduced-motion preferences are respected automatically. Static icons remain useful.
- MIT licensed. Original geometry and individually authored animation tracks.

> Install the React package from npm. Named exports share the complete geometry catalog; per-icon bundle splitting is not implemented.
