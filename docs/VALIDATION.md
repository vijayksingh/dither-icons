# First release validation — 2026-09-08

- 36 original definitions; each rendered in dither, solid, and outline (108 variants).
- Geometry tests: unique cells, integer coordinates, bounds inside 24 × 24; dither boundary preservation and alternating interior coverage.
- Accessibility: decorative default, named SVG role and label, reduced-motion stylesheet.
- TypeScript checks and ESM/declaration/catalog builds passed.
- Packed tarball installed into a fresh temporary consumer; named component import and server render passed with all 36 definitions available.
- Live browser: search for download; empty search and reset; selection updates inspector; React copy verified against clipboard; keyboard replay; dark and light themes.
- Narrow viewport: fixed grid minimum-width overflow; final rendered document client/scroll widths both 354px in the browser's zoom-adjusted mobile emulation.
- Reduced-motion emulation: animated part computed `animation-name: none`. Default mode: download part computed `di-fall`, 0.6 seconds.
- No browser console errors during checks.

Known limits: not published to npm; original 36-icon starter collection, not Lucide's full catalog. Named imports currently share the full geometry catalog. Showcase loads optional fonts from Google Fonts, with system fallbacks. SVG exports carry embedded animation CSS and use currentColor; hover animation requires inline SVG rather than an HTML img. No automatic loop. No auth, loading, or backend states exist in this static catalog.

## Vector and material revision — 2026-09-08

User rejected the pixel-art contours and coarse checkerboard. The rendered family now uses authored vector contours with curved silhouettes, deliberate negative space, and an independent fine Bayer dither field. Original cell data remains only as legacy geometry/fallback metadata; it no longer draws catalog icons.

- All 36 definitions and every part have explicit vector paths; regression test enforces this.
- Directional shading sampled through an 8 × 8 threshold matrix at quarter-unit spacing, with a quiet 16% base. Outline/solid bypass the grain mask.
- Bell motion pivots near its crown; smaller overshoot, softer easing, staggered layer separation.
- Eight curated palettes: Iris, Cobalt, Jade, Amber, Coral, Rose, Citron, Graphite. Dark/light values are separate; selected color appears in React snippets and SVG exports.
- Live checks: palette selection, light Cobalt export (#315bc4), dark Iris clipboard export (#bea5f5), SVG copying, icon selection, dark/light render, reduced-motion computed animation none, narrow viewport client/scroll both 354px. Browser console showed no errors.
- Typecheck, five targeted tests, library declarations, packed download, and catalog build passed.

## Four motion studies

See [MOTION-REVIEW.md](MOTION-REVIEW.md) for the focused bell/heart/download/layers review, actual playback evidence, frame inspection, reduced-motion behavior, and the download identity correction. That earlier review covered four studies. The complete rollout below supersedes its remaining-icon status.

## Complete semantic motion rollout — 2026-09-09

All 36 icons now have individual Interface Craft reviews in [MOTION-CATALOG.md](MOTION-CATALOG.md). The accepted four foundation timelines are preserved; the other 32 use separate authored actors and timing. MOT-01 through MOT-15 govern this rollout.

### Rendered inspection

- Each new icon reviewed in its family at 20% preparation, 40% action, 70% recovery, and 100% neutral. Per-part endpoint inspection confirmed visible actors return to neutral and accents disappear. Browser images are linked from every individual report.
- Actual playback started for every new family and returned to idle. Half-speed playback and keyboard departure checked on folder/trash: the folder continued after focus moved to trash, then both settled. No timer or recurring animation loop added.
- All six catalog categories inspected at the rendered 64px size. Dark Iris studies and light Cobalt catalog inspected. All 36 catalog instances report authored choreography.
- Material review covered dither/solid/outline for development icons and layered solid-mode cases. Corrections: CPU die clearance; file crease; solid folder interior; mail hinge/seams; solid message dot cutouts; joined search handle; inset code brackets. The folder interior cutout is limited to solid mode so dither retains the original material hierarchy.
- Switching a paused message from dither to solid preserved all three computed dot transforms exactly. The animation hook now rebinds when material changes replace actors.
- Reduced-motion emulation canceled the inspected transforms and left all actors with computed animation `none`; replay produced zero playing icons. Motion-off disabled study replay, timing inspection, and the inspector replay, with all 36 catalog icons marked `data-animate=false`.
- Mobile layout at 390px: client width and scroll width both 390px, two 173px study columns, 358px timeline, and all controls inside the viewport. Narrow-layout keyboard replay worked. Native mobile screenshots and pointer coordinates were unreliable in the browser automation surface; this is a layout/keyboard check, not a claim of physical-device touch verification.
- Browser console: no error entries. Loading/error states do not exist in the motion component; existing catalog search/copy flows were not changed by this rollout.

### Automated and package checks

- TypeScript passed; 10 targeted tests passed. Coverage includes all 36 definitions, 108 material variants, unique track bindings, ordered complete clocks, transform/opacity-only tracks, visible-actor opacity and neutral return, hidden accent endpoints, download identity, accessibility, and independent eye aperture IDs.
- ESM library, declarations, catalog, and downloadable tarball built successfully. The final library is approximately 73KB before compression; named exports still share the complete catalog.
- The final tarball installed into a fresh React 18.3.1 consumer at `/tmp/dither-consumer-52SWCT`. All 36 named exports, 36 timelines, and 108 server-rendered variants passed; the repository development checks use React 19.

### Delivery limits

No npm publication or remote deployment was requested. The React runtime completes gestures after input leaves; standalone inline SVG uses the same tracks as CSS hover animations and stops when hover ends. Masks and SVG vector rendering may repaint; transform/opacity-only authoring is not a claim that every browser promotes every SVG actor to a compositor layer. Light accents can merge into a solid fill, so the identifying contour and primary motion do not depend on them.

## Focused refinement 01 — 2026-09-09

The user limited the next quality pass to **arrow-right, arrow-up, external-link, and upload**. These four reviews replace their broad-rollout assessments. Other timelines and the accepted foundation remain unchanged. This pass also responds to the user's missing-climax feedback: Download's impact was the reference for a visible, localized payoff (new MOT-16).

### What changed

- Arrow-right: fixed tail, connected extending shaft, rigid leading head, tip rays at the crest.
- Arrow-up: head leads, foot catches up, curved updrafts follow the lift, weighted return.
- External-link: unmoving source frame, connected corner/shaft with delayed tail follow-through, outer destination echo.
- Upload: stationary source bed, pivoting side walls, leading head/lagging foot, source light and exterior release flare.
- Separate source files expose each storyboard, named timing, geometry, pivots, easing, and accent settings. The existing playback engine is unchanged.
- Gallery opens with the four together under **Refinement / 01**. Individual review records contain the semantic critique and browser images.

### Rendered and interaction checks

- Five paused poses: 0%, 10%, 35%, 70%, 100%. [Images and computed transforms](motion-evidence/refinement-01/) are saved together. At 35%, the localized effects provide the visible crest; at 100%, all identity parts are neutral and all accents are hidden.
- Actual-speed and half-speed replay started all four. Sampled computed transforms/opacities showed each effect appearing and dissipating; actual-speed playback returned all four to idle.
- Keyboard Enter and subsequent Tab departure checked on each of the four. Previous gestures continued while focus advanced, without restarting; all four finished at idle.
- Dither, solid, and outline inspected at the 112px study size. Split outline contours initially had pinholes at the arrow necks; round caps corrected those. Light Cobalt solid and dark Iris dither/outline reviewed. Solid collection icons inspected at 24px; dither collection inspected at 64px.
- Material switches kept the paused geometry and attached effects. The existing runtime rebinds its targets when material nodes change.
- Reduced-motion emulation removed all transforms and hid every accent. Replay produced zero playing study icons. Motion-off disabled every study and set all four SVGs to `data-animate=false`.
- Narrow viewport: nominal 390px emulation yielded 354 CSS pixels under the browser's zoom. Client/scroll widths were both 354px; study columns were approximately 155px each. All controls fit, and keyboard replay started all four. This is responsive-layout/keyboard evidence, not physical-device touch testing.
- Browser console had no error entries. Loading/error/empty data states do not apply to these static motion studies. The library event lifecycle was not rewritten.

### Automated/package checks

- TypeScript passed. All 11 targeted tests passed, including the new geometric invariant: head and shaft endpoints remain coincident between keyframes for each of the four, including the external link's rotated coordinate frame.
- Existing tests cover 36 timelines and 108 material variants, unique SVG targets, complete clocks, transform/opacity-only animation, exact neutral endpoints, hidden accent endpoints, identity, accessibility, and CSS fallback.
- ESM/declarations/gallery/downloadable tarball built successfully. Library output is 82.23KB before compression; named imports still share the complete catalog.
- The new tarball was installed into a fresh React 18.3.1 consumer. All 36 named exports, 36 timelines, and 108 server-rendered variants passed. Local development uses React 19.
- `git diff --check` passed. No npm publication or deployment was performed. Standalone inline SVG shares the tracks but retains the documented CSS hover-departure limitation.
