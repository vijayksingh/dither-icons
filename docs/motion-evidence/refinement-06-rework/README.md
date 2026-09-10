# Close / Plus correction and Unlock state

2026-09-10. **Close, Plus, Lock, Unlock**, left to right. Supersedes the rejected Close/Plus performances in refinement-06. Lock's motion is unchanged. Unlock is a new semantic definition and named export. Native captures from the local Motion studio; no generated concept art or image editing.

- `pose-*.png` / `poses.json`: 0, 15, 30, 40, 50, 60, 75 and 100% of each icon's individual clock. Every computed part transform/opacity matches exactly at 0 and 100%.
- `dither-50.png`, `solid-50.png`, `outline-50.png` / `materials.json`: identical inspected transforms and opacities across material replacement.
- `light-cobalt-50.png`: light-surface contour and contrast reference. Other captures use dark Coral.
- `playback.json`: native actual/half-speed sampling. All four are playing at the first sample and idle at the last. The sample clock begins after the UI trigger, excluding tool latency.
- `keyboard.json`: Enter-triggered replay continues after Tab departure and finishes. Tabbing to the next study can start it before its explicit Enter; overlapping requests intentionally do not restart the gesture.
- `reduced-motion.json` / `.png`: system preference emulated, zero animations, all actor transforms absent, all transient accents hidden. Unlock's static SVG rotation still leaves it open.
- `motion-off.json`: all four controls disabled, no study-icon animations, no playing flags. Page-level UI transitions are outside this measurement.
- `responsive.json`: a 390px browser viewport request produced a 487 CSS-pixel content viewport at the existing browser zoom. Two columns, no horizontal overflow. This is a narrow-layout check, not a physical-device or exact 390 CSS-pixel claim.
- `console.json`: no browser warnings or errors reported.
- `size-and-export.svg` / `.png`: actual exported drawings at 112/48px dither and 24px solid/outline. `svg-hover.json`: complete CSS tracks active on all four exports; pointer targets use painted strokes/housing rather than the transparent keyhole.

Regenerate the board with `npx tsx docs/motion-evidence/refinement-06-rework/render-reference.tsx`. CSS hover stops on pointer departure; React completes after departure. [Individual reviews](../../MOTION-CATALOG.md#semantic-correction-and-unlock-state--2026-09-10) explain meaning, anchors and causal timings. These references record implementation review, not user acceptance or a production release.
