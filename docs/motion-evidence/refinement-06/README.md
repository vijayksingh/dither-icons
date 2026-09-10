# Actions and access — refinement 06

2026-09-10. Exactly four: **Check, Close, Plus, Lock**, left to right. Native browser references from the live Motion studio; no image editing or concept-art substitution.

- `pose-*.png` / `poses.json`: 0, 10, 28, 40, 50, 62, 75 and 100% inspection. Each percentage is relative to that icon's own duration.
- `dither-45.png`, `solid-45.png`, `outline-45.png` / `material-continuity.json`: same inspected frame retained across all materials.
- `light-cobalt-45.png`: contrast and contour review on a light surface.
- `actual-and-half-speed.json`: sampled native playback at both speeds, including neutral endings. Sampling starts after the UI trigger, so elapsed time excludes trigger-to-observation latency.
- `keyboard-playback.json`: Enter and Tab departure per study; animations finish. Tabbing between adjacent studies can start the next study before its explicit Enter; that replay is intentionally not restarted.
- `reduced-motion.json` / `.png`: system reduced-motion preference emulated; all transforms absent and accents hidden after replay.
- `size-and-export.svg` / `.png`: actual exports at 112px and 48px dither, 24px solid/outline. `svg-hover.json` verifies all named CSS tracks bind on hover.

Regenerate the SVG board with `npx tsx docs/motion-evidence/refinement-06/render-reference.tsx`. Standalone CSS hover playback stops on pointer departure; React supplies completion after departure. See [individual reviews](../../MOTION-CATALOG.md#focused-refinement-06--actions-and-access) and [validation](../../VALIDATION.md#focused-refinement-06--2026-09-10).

`motion-off.json` records cancellation during replay: disabled study controls, zero animations, original transforms and hidden accents. `responsive.json` records the emulated 390 CSS-pixel layout: two 172px columns with no horizontal overflow. The narrow screenshot output was scaled by the browser surface; actual-size drawing review uses the SVG board above.
