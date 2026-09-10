# Navigation and workspace — Platform / 09

2026-09-10. Back, History, Collapse Panel and Zoom Out. Individually selected from actual CraftingAttention controls, critiqued using Interface Craft and authored in separate timing modules. Source mapping is in `docs/PLATFORM-ICONS.md`. These four are new, unreleased exports; previous 69 performances are unchanged.

- `native-filmstrip.png` uses ten real browser screenshots from half-speed playback. Each row reads left to right; within each frame: Back, History, Collapse Panel, Zoom Out. `film-timing.json` records wall-clock offsets after replay. Cropping and assembly only; no synthesized frames.
- `pose-*.png`, `poses.json`: 0/12/32/46/60/78/100% inspection. The first and last complete part records match exactly.
- `dither-46.png`, `solid-46.png`, `outline-46.png`, `materials.json`: all named-part matrices/opacity match at 46%, including material replacement during inspection. `light-cobalt-46.png` checks the alternate light palette.
- `keyboard.json`: actual-speed Enter then Tab departure starts all 3/4/4/6 tracks and finishes with zero animations.
- `reduced-motion.json`: system reduced motion gives zero animations and no visible temporary accents. `motion-off.json`: all study buttons disabled, no running animations. Overrides were cleared.
- `size-and-export.svg` / `.png`: actual SVGs at 112/48px dither and 24px solid/outline. `svg-hover.json` verifies all 3/4/4/6 authored CSS tracks via real pointer hover on painted contours. Standalone CSS retains the documented stop-on-hover-departure limitation; React completes the gesture.
- `responsive.json`: 390px client and scroll widths, two 172px columns. The browser's zoom required a 312px override. No physical-device claim.
- `console.json`: no warnings or errors. Default, hover, focus-visible, active, departure, disabled, light/dark, compact and reduced-motion states inspected. Static studies have no data-loading, empty or error state.

**21 targeted tests, TypeScript and production build passed.** Checks cover 73 timelines / 219 material bindings, all export labels, exact rest, SVG CSS, accessible identity, masks, docs and the new geometric relationships. New cases protect direction/bounds, clock gearing and actual arc/head attachment, full-size drawer occlusion and rail contact, and context revealing after an in-bounds zoom reduction. Build generated 73 manifest entries and 82 social/crawler pages; all social images changed because they carry the library count.

No app integration, package version, push, tag, publication or deployment. Implementation/rendered review complete; user acceptance pending.
