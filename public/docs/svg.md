# Take the drawing with you.

Transparent, scalable, and ready for places where React isn’t part of the picture.

## Choose. Customize. Download.

Open any icon page. Choose a material, color and export size, then use Download SVG. The SVG tab shows the exact source you receive, including its internal definitions and motion styles.

![Dither, solid and outline Download exports compared at equal size.](/reference/textures.svg)

All three materials retain the same vector contour.

## Inline for interaction. Image for stillness.

```html
<img src="/download-dither.svg" width="48" height="48" alt="" />
```

Inline the complete SVG markup to expose its hover targets. Keep style, defs, mask and clipPath elements when moving it; removing them can remove texture, occlusion or motion. Keep IDs unique when combining multiple exported SVGs in one document.

> The SVG has a transparent background. Its exported color is the selected palette value; change the SVG color attribute to inherit currentColor from the host when appropriate. An <img> cannot inherit the surrounding document’s currentColor.

## Know the lifecycle difference.

CSS hover animation ends when hover ends. A standalone SVG does not expose React props such as replayKey or progress. Use the React component when keyboard replay, controlled inspection and finishing after pointer departure matter.
