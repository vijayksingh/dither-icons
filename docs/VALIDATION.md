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

## Focused refinement 02 — 2026-09-09

Scope: **folder, file, copy, trash**, after the user accepted the previous four. The accepted foundation and Refinement / 01 timelines remain unchanged. Interface Craft's individual critique/storyboard workflow and MOT-01 through MOT-16 govern these four reports.

### Rendered decisions and corrections

- Folder: fixed shaded back; staggered rear/front papers; hinged front; reveal rays. Moving occlusion removes the former accumulation of overlapping grain. An initial outlined back read as a briefcase; the final filled back restores the folder silhouette. Foreground and hidden cutout tracks are identical.
- File: fixed page with legible content marks in every material; a diagonal fold hinge holds both crease endpoints; crease light and a curved air mark form the climax.
- Copy: fixed source; a small peel followed by parallel registration; source glint precedes the stronger exterior destination ticks.
- Trash: opening lid and delayed handle; rim light and exterior ticks target the later closure. The follow-up polish below found and corrected a remaining geometric gap during the intended contact.

### Browser verification

- Inspected 112px studies in dither, outline, and solid. Dark Iris and light Cobalt were reviewed. Solid collection icons were inspected at 24px, dither at 64px.
- Saved [seven poses](motion-evidence/refinement-02/): 0%, 10%, 42% reveal, 59% contact, 65% impact, 85% recovery, 100% rest. Per-part computed transforms and half-speed playback samples accompany the screenshots. Trash's climax is intentionally later than the others.
- Actual and half-speed replay started all four and returned them to idle. Accent opacities visibly increased at their respective events and returned to zero. Every identity part returned to its initial transform.
- Keyboard Enter and Tab departure checked on each of the four. All previous gestures continued while focus advanced; every gesture finished. Mid-play keyboard activation did not restart the active sequence.
- Paused dither-to-solid material switching at 42% preserved every named part's computed transform, including the folder's moving cutouts.
- Reduced-motion emulation cleared all part transforms and hid every accent. Replay produced zero playing study icons. Motion-off disabled all four study controls and left zero playing icons.
- At 390 CSS pixels, client and scroll widths were both 390px. The study grid had two 173px columns, all controls stayed within the viewport, and keyboard replay started all four. This is responsive-layout/keyboard evidence, not physical-device touch verification.
- Browser console: no error entries. Loading/empty/error data states do not apply to these static studies. The playback engine and unrelated catalog flows were not modified.

### Automated and package verification

- TypeScript and all **13 tests** passed. New tests verify matching paper/cutout trajectories and unique mask IDs across instances/materials, plus fixed file-crease endpoints between keyframes.
- Existing checks cover all 36 timelines, 108 material variants, SVG target binding, ordered clocks, transform/opacity-only tracks, neutral endpoints, hidden accents, previous directional joints, accessibility, and CSS fallback.
- ESM library, declarations, gallery, and downloadable tarball built successfully. Library size is 94.53KB before compression; named imports still share the complete catalog.
- The new tarball installed in a fresh React 18.3.1 consumer. All 36 named exports, 36 timelines, and 108 server-rendered variants passed. Repository checks use React 19.
- No npm publication or deployment. Standalone inline SVG carries the same tracks and retains the documented CSS hover-departure limitation.

## Refinement 02 polish — 2026-09-09

Scope remains **folder, file, copy, trash** after the user requested more polish. Their Interface Craft reviews now document the actual material and timing corrections; this is not a new batch. MOT-01–16 remain the contract.

### What changed and why

- Folder: finer paper corners, clearer opposing fan, attached edge light before exterior rays, and one continuous cover-closing arc after the contents start tucking.
- File: a quieter paper underside replaces the triangular hole; a rounded lip catches light before the crease and air curl. Both hinge endpoints remain fixed. A too-faint initial underside was strengthened after live review.
- Copy: the source and duplicate now use the same full sheet geometry. Moving occlusion separates their grain, and light passes from source corner to attached duplicate edge to exterior registration strokes. Peel and squaring carry movement through the intermediate pose.
- Trash: closer inspection disproved the earlier assumption of true contact. Lid and rim now meet at 750ms and stay coincident through the 50ms compression, using the same equation and easing. The rim light moves with the bin. Side strokes and the smaller handle response dissipate separately.

### Current rendered evidence

- Eight fresh [native browser poses](motion-evidence/refinement-02-polish/): 0%, 8%, 32%, 44%, 60%, 64%, 85%, and 100%. `poses.json` records every named part's computed transform, origin, and opacity. Earlier images remain archived in `refinement-02/`.
- Actual-speed replay reviewed through reveal, contact, and recovery. Half-speed samples in `playback.json` show all four playing through the gesture and all four idle by 2701ms. The durations are 1320 / 1160 / 1190 / 1250ms at normal speed.
- Measured trash contact in the browser: lid/rim edge differences of approximately +0.000008 CSS px at 60%, and −0.000015 CSS px at 64%. The unit test also checks intermediate positions and matching easing, with no body response or accent before contact.
- Dark Iris dither/outline and light Cobalt solid reviewed at 112px. Solid collection icons checked at 24px; dither at 64px. The unchanged recommendation remains solid or outline for small controls, dither from 48px upward.
- Paused dither-to-outline switching at 44% preserved every part's transform, including the new moving occluders. Keyboard Enter and Tab departure checked for each icon; each continued playing after departure, and all returned to idle.
- Reduced-motion emulation: zero playing icons, zero transformed parts, zero visible accents. Motion off: all four study buttons disabled and zero playing icons. `lifecycle.json` records these checks.
- At 390 CSS px, client and scroll widths both measured 390px; the study grid used two 173px columns. Keyboard replay started all four. This verifies responsive layout and keyboard playback, not physical touch input. `responsive.json` includes these measurements and an empty browser-error log.
- Loading, empty, and error data states do not apply to static icon studies. No changes to the playback engine or the other 32 performances.

### Automated verification

- TypeScript and **15 tests passed**, including new checks for file/copy occlusion identity and maintained trash contact throughout compression. Existing checks continue covering all 36 timelines, 108 material variants, fixed file hinge, directional joints, exact rest, hidden accents, accessibility, and CSS fallback.
- ESM, declarations, gallery, and downloadable tarball built. Library output is 96.45KB before compression. React 18 consumer installation was verified in the preceding pass; it was not repeated for this artwork/timing-only change.
- Standalone CSS SVG uses the same tracks and retains the documented hover-departure limitation. No publication or deployment.

## Focused refinement 03 — 2026-09-09

Scope: **book, mail, message, send**, the next four in the motion catalog. Individual Interface Craft critiques and storyboards were applied under MOT-01–16. The preceding foundation and two refinement groups keep their existing performances. The playback engine was not changed.

### Rendered decisions

- Book: replace the slight two-leaf skew with one page turn around a fixed full binding. A moving occluder prevents stacked grain. The page and receiving bed meet, yield together, and give a landing glint followed by escaping air. The extra leaf merges into the stack before its hidden reset; the identity spread stays visible throughout.
- Mail: correct the house-like open silhouette with a wider envelope and a clearly revealed letter. Front/rear clipping at the horizontal hinge handles the letter/flap ordering continuously. Letter edge, exterior reveal, tuck, and quieter closure have distinct causal timing.
- Message: replace low-contrast square marks with round apertures in dither and solid, and filled circles in outline. A stronger final dot leads the nearby edge response and one exterior echo. The bubble remains fixed and the sequence never loops.
- Send: two paper faces, a wing flex with anchored keel, attached crease light, and separate near/far wakes. The nose leads the material response; a small coast precedes the return.

### Browser evidence and interaction

- Eight fresh [reference poses](motion-evidence/refinement-03/): 0%, 10%, 25%, 40%, 45%, 52%, 82%, and 100%. `poses.json` captures every named part's transform, origin, and opacity. References show native browser output, not concept drawings.
- Actual-speed replay inspected through crossing, reveal, climax, and recovery. Half-speed playback in `playback.json` records all four active through their gestures and idle at 2800ms. Normal durations: Book 1360ms, Mail 1360ms, Message 1180ms, Send 1220ms.
- Book page/bed bounding rectangles at 45% and 49% matched within 0.000031 CSS px. The related test checks both spine endpoints and corresponding curve points between contact frames. `geometry.json` records measurements and material continuity.
- Dark Iris dither/outline and light Cobalt solid reviewed at 112px. Solid collection icons checked at 24px; dither at 64px. Small-size recognition remains independent of highlights. Separate compact references cover Book and the three communication icons.
- Paused dither-to-outline switching at 52% preserved every named transform, including Message's dots moving between masked and visible SVG groups.
- Keyboard Enter and Tab departure verified on each icon: every gesture continued after departure, then all four returned to idle. Reduced motion produced zero playing icons, transformed parts, or visible accents. Motion off disabled all four study controls. `lifecycle.json` records the checks.
- At 390 CSS px, client and scroll widths both measured 390px; two study columns measured 173px each. Keyboard replay started all four. This is responsive-layout and keyboard verification, not physical-device touch testing.
- Browser error log was empty. Loading, empty, and error data states do not apply to these static icon studies.

### Automated and package checks

- TypeScript and **18 tests passed**. New tests cover moving occluder synchronization and unique apertures, Mail's matching hinge half-planes, Book's fixed binding and coupled landing, and Send's fixed keel endpoints between poses.
- Existing checks continue covering all 36 timelines and 108 material variants, real target binding, ordered clocks, transform/opacity-only tracks, exact identity return, hidden accent endpoints, accessibility, and shared CSS fallback.
- ESM library, declarations, gallery, and downloadable tarball built. Library output is 112.74KB before compression; named imports still share the complete catalog. The unchanged React peer contract was previously tested with React 18; a fresh consumer install was not repeated for this artwork-only batch.
- Standalone CSS SVG shares the choreography and retains the documented hover-departure limitation. No publication or deployment.
