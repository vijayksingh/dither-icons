# A good place to start.

A small library with a particular point of view. Here’s how to make it part of yours.

## Fine grain. Real geometry.

Dither Icons is a collection of 68 original SVG icons for React. Smooth vector contours carry a fine ordered texture. Each icon has its own short, meaningful gesture: a bell rings, a tray catches, a lid opens.

![The same Download icon in dither, solid and outline textures.](/reference/textures.svg)

One drawing. Three ways to belong in your interface.

## Your first little detail.

Install the downloaded package, import a named component, and add it to a real button. The icon inherits your text color and needs no separate stylesheet.

```tsx
import { DownloadIcon } from '@unlocalhosted/dither-icons';

<button className="di-trigger" aria-label="Download file">
  <DownloadIcon size={48} texture="dither" />
</button>
```

Interactive example available on the public documentation page. Use the accompanying React snippet to reproduce it.

## Choose the right material.

- Dither: expressive detail at 48px and above. A fine tonal field sits inside a smooth silhouette.
- Solid: the clearest reading for compact controls, usually 16–24px.
- Outline: a lighter presence in dense navigation and toolbars.

The texture changes the material, not the drawing or meaning. Color and contrast belong to your interface; the SVG uses currentColor.

## Small surface. Considered behavior.

- React 18+ is the only peer dependency. ESM and TypeScript declarations are included.
- Hover, focus and tap play once. A gesture finishes after the pointer leaves.
- Reduced-motion preferences are respected automatically. Static icons remain useful.
- MIT licensed. Original geometry and individually authored animation tracks.

> Install the downloadable React package. A registry release is not available yet. Named exports share the complete geometry catalog; per-icon bundle splitting is not implemented.
