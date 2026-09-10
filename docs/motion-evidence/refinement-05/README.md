# Everyday essentials — refinement 05

Four icons only: **Search, Home, Settings, User**, in that order. See [validation](../../VALIDATION.md#focused-refinement-05--2026-09-10) and their [individual critiques](../../MOTION-CATALOG.md#focused-refinement-05--everyday-essentials).

- `pose-*.png`: nine browser-rendered poses; `poses.json` stores corresponding transforms, origins and opacity.
- `*-40.png`, `light-cobalt-solid.png`: material/theme comparisons.
- `actual-and-half-speed.json`, `keyboard-playback.json`: sampled rendered playback and keyboard departure.
- `material-continuity.json`: exact comparison across material changes.
- `stillness.json`, `reduced-motion.png`: reduced-motion and motion-off behavior.
- `responsive.json`: measured 390 CSS-pixel layout. Browser zoom and narrow screenshot limitations are recorded in validation.
- `size-and-export.svg` / `.png`: actual SVG artwork at 112, 48 and 24px; the SVG retains CSS hover animation. `svg-hover.json` records the observed CSS tracks.

Regenerate the SVG board from the repository root:

```sh
npx tsx docs/motion-evidence/refinement-05/render-reference.tsx
```

Screenshots are browser references, not concept drawings. Percentage is normalized separately to each icon's duration; their climaxes intentionally occur at different times.
