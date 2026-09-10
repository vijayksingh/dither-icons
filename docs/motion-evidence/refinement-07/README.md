# Visibility and appearance — refinement 07

Local browser review, 2026-09-10. **Eye, Sparkles, Sun, Moon** only. Individual Interface Craft critiques and timestamp storyboards live in [icon-reviews](../../icon-reviews/). MOT-01/03/05/07/08/16 govern the drawings and causal responses; MOT-09/10/11/12 govern completion, stillness and shared timing. These are implementation review records, not user acceptance or a production release.

## Visual inspection

- `pose-{0,12,30,45,55,65,80,100}.png`: native Motion studio frames in dark Iris dither. Eye finds and holds a subject; Sparkles gives its smaller star the delayed reply; Sun's expanding wave reaches the rays before they extend; Moon holds its incline before catching the last light.
- `poses.json`: computed transforms/opacities at those eight positions. Initial and final records match exactly. At each frame, 64 points around the transformed iris were tested against the fixed SVG aperture: **512 checks, zero outside**. This samples the inspected frames; it is not an exhaustive continuous collision proof.
- `dither-55.png`, `solid-55.png`, `outline-55.png`, `materials.json`: the same 55% pose survives material replacement. Every named part's computed transform and opacity matches across all three materials. The final outline capture includes the satellite's lighter 1.05-unit stroke.
- `light-cobalt-55.png`: light Cobalt outline. Moon's rim trace is subtler against a solid or outlined contour; its separate opening glint remains the readable finish.
- [Size and export board](size-and-export.svg), `size-and-export.png`: actual JavaScript-free SVG exports at 112/48px dither and 24px solid/outline. Regenerate with `npx tsx docs/motion-evidence/refinement-07/render-reference.tsx` from the repository root. These compact drawings carry their identity without depending on the small transient accents.

## Playback and input

- `playback.json`: native frame samples through actual-speed and half-speed playback. All four start active and finish idle. Sampling begins after the replay tool call returns, so elapsed sample time is not the authored clock's exact zero.
- `keyboard.json`: Enter replays each study, followed immediately by Tab. Each continues after focus departure and finishes. Focus traversal can start the next study; an active gesture does not restart on the subsequent Enter.
- `svg-hover.json`: hovering a painted contour activates all **3 / 4 / 10 / 3** CSS tracks for Eye / Sparkles / Sun / Moon. Native SVG coordinate conversion selected actual painted regions. Standalone CSS still stops on hover departure; React completes its gesture after departure.
- `reduced-motion.json`: system preference emulation produced zero running study animations, neutral transforms and hidden accents after replay. `motion-off.json`: every study control disabled and every study animation removed. Temporary emulation was reset.
- `responsive.json`: **390px client and scroll widths**, two **172px** study columns, and the new category selector within the viewport. Existing browser zoom required a 312px viewport override to measure 390 CSS pixels. This is emulated layout evidence, not a physical touch-device test. The override was removed.
- Browser warning/error log was empty. Default, hover, focus-visible, active, departure, disabled, light/dark, material, compact and reduced-motion states were inspected. These static studies have no loading, data-error or data-empty state.

## Checks

TypeScript and production build passed. **20 targeted tests passed** across the new geometry/causality checks, every timeline's binding and neutral restoration, all 69 icons in 207 material variants, accessible naming, isolated SVG definitions, generated manifests and guide links. Four new tests validate actual Eye aperture nesting, Sparkles hierarchy and reply timing, Sun's rounded ray contact and radial travel, and Moon's joined circle geometry and carried light.

`verification.json` records the neutral/material comparisons and iris sampling totals. Generated manifests, agent references, the contact sheet and affected social images were refreshed. No package version, tag, push or deployment changed.
