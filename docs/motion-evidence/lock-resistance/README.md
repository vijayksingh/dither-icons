# Lock: resistance shake

2026-09-10. Updates Lock only. Replaces its crown stretch with a bounded rigid shackle rattle, a firm arrest and a closed hold. Close, Plus and Unlock appear as unchanged neighbors.

- `pose-0/17/23/42/51/100.png`, `poses.json`: neutral, two major lateral extremes, arrest, response and exact neutral. Both feet stay inserted at the extremes. Start/end computed poses match.
- `outline-left-stop.png`, `light-cobalt-left-stop.png`, `materials.json`: leftward extreme in dither/solid/outline with exact transform and opacity continuity; dark Iris and light Cobalt.
- `playback.json`: actual and half-speed native samples after Enter then Tab departure. Lock keeps playing after focus moves to Unlock, then finishes with all accents hidden. Sampling begins after the trigger, so the sample clock excludes UI/tool latency.
- `reduced-motion.json`: system preference produces zero Lock animations, no transforms and hidden accents. Emulation restored after verification.
- `console.json`: no warnings or errors reported.
- `size-and-export.svg` / `.png`: unchanged silhouettes at 112/48px dither and 24px solid/outline, with the new Lock CSS timeline. `svg-hover.json` confirms all three named Lock tracks run in a standalone SVG. CSS hover ends on departure; React completes the gesture.

The page layout and drawings were not changed; compact rendering was checked through the actual-size export board. No new physical-device test. Regenerate with `npx tsx docs/motion-evidence/lock-resistance/render-reference.tsx`.

[Meaning and storyboard](../../icon-reviews/lock.md). These captures record implementation review, not a security guarantee or user acceptance.
