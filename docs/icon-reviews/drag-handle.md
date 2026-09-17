# Drag Handle: Interface Craft review

## Context
Reposition Cognimated's reader tray. The existing `.drag-handle` at `web-absorb/extension/content/reading-focus-timer.js:1016` also supports click-to-collapse. This icon denotes dragging; positioning, collapse state and keyboard alternatives remain with the host. This change does not modify that platform.

## First Impressions
User rejected the first uniform slide as weightless, the 1580ms pickup/return as slow, and the 650ms revision as lacking impact. The latter shortened travel but decelerated before an arbitrary overshoot; a floating shadow could not receive force. Source comparison with the user-selected [Bin](trash.md) and [Download](download.md) identifies the missing relationship: accelerating arrival, a receiving part that yields after contact, then a separately timed response. This critique uses source geometry and the user's feedback, not a claim of visual acceptance.

## Visual Design
Keep the centered capsule at x=8–16, y=5–19, three rigid ribs at y=8.5/12/15.5 and the accepted lighter materials. Solid contour is 1.05 units; Dither/Outline retain 1.35 with real transparent Outline cores. Upper guide corners stay fixed. Lower guide arms extend beneath the flat underside at x=11/13, becoming paired home stops rather than unrelated marks. They remain subordinate at 0.5 opacity. The moving grip knockout keeps guide lines out of its interior.

`dragSeatArt` derives the receiving height from both actual stroke widths: `bottom + contactTravel + (contourWidth + responseWidth) / 2`. Thus the grip's exterior and stop's top ink edge meet for Solid, Dither and Outline despite their different weights. Identical translation and easing preserve the joint during the receiving motion. Do not substitute aligned centerlines for touching ink edges.

## Interface Design
Grasp the upper rib, resist slightly against the pull, lift and drag 3.2 units right with a 12.5-degree trailing lean. Hold tension for 50ms. Accelerate back over 90ms using Download's approach easing. Arrive flat on both lower stops at 425ms. Neither stop moves before that event. Grip and stops travel down together by 0.42 units over 45ms using Bin's contact easing; the rigid grip does not squash. The receiving seam lights during that coupled motion. Exterior ticks answer at 505ms. The grip then rebounds away while the stops recover; exact rest follows at 700ms.

The upper guides remain the stable reference. Ribs, grain and grasp accent belong to the grip; seam and ticks belong to the receiving stops. The matching knockout uses the entire grip track and pivot. The floating shadow is removed. This is authored drag-and-release feedback, not an interactive physics simulation or a successful toolbar-state change.

## Consistency & Conventions
MOT-01/02 preserve the graspable grip and drag meaning. MOT-03/04/05 require actual contact, force transfer and a stable reference, following the accepted Bin/Download relationship without copying their silhouettes or full performances. MOT-06 bounds travel and one diminishing recovery. MOT-07 matches the moving knockout and material. MOT-08/16 place the seam after contact and exterior response after receiver yield. MOT-09/10/11/12 preserve finite playback, exact neutral return, meaningful static reduced motion, transform/opacity-only tracks and shared React/SVG timing. MOT-14 keeps application state unchanged. MOT-13/15 rendered approval belongs to the user. CSS-only hover still ends on departure; React completes playback.

## User Context
Keep a labeled native drag target and keyboard alternative. No sound, looping vibration or success badge. Static and reduced-motion variants retain the grip and home reference without accents. Recognition and impact at actual speed and small sizes remain user review items; passing geometry tests cannot establish satisfaction.

## Top Opportunities
1. Replace the decelerating overshoot with an accelerating arrival on real stops.
2. Transfer weight into those stops before the rebound; keep contact through the entire receiving segment.
3. Separate the attached seam response from the later outward ticks instead of using a shadow as the climax.

## Encoded storyboard and review
[Timing and geometry](../../src/motions/drag-handle.ts), [artwork binding](../../src/ReaderArtwork.tsx). Interface Craft storyboard/configuration stays in the existing shared engine; no timers or per-frame React state are added.

Grasp 40ms; resistance 105ms; lift 180ms; pull 285ms; release 335ms; contact 425ms; receiver yield/seam crest 470ms; exterior ticks 505ms; rebound 550ms; accents clear 610ms; small recovery 635ms; exact rest 700ms. `drag-grip` and `drag-grip-cut` pivot at (12,8.5). `drag-stop` is a separate receiving actor. `drag-seat-light` and `drag-impact-0/1` inherit its coordinates. `drag-grasp` clears on release.

Focused checks cover Download's accelerating approach, no premature receiver motion, shared contact easing, 101 samples of joined ink edges per material, ordered impact accents, matched knockout tracks, rigid ribs, viewBox clearance, unique SVG IDs, static material cores, reduced-motion CSS and generated metadata parity. Earlier screenshots in [batch evidence](../motion-evidence/cognimated-reader-02/README.md) record rejected iterations, not approval of this revision. No extended visual review or cross-device performance claim.

Verification: typecheck passed, one complete build passed, all 14 focused tests passed, and `git diff --check` passed. The local preview route returned HTTP 200. These are implementation checks, not user visual approval.

```sh
npm run typecheck
npm run build
npx tsx --test tests/reader-controls-motion.test.tsx tests/choreography.test.tsx
git diff --check
```

Files changed: `docs/icon-reviews/drag-handle.md`, `docs/MOTION-CATALOG.md`, `src/motions/drag-handle.ts`, `src/ReaderArtwork.tsx`, `tests/reader-controls-motion.test.tsx`, `icons.json`, `public/icons.json`, `public/llms-full.txt`, `public/reference/icons.svg`, and `public/og/icon-drag-handle.png`. Generated files are rebuilt by the existing pipeline. No other icon timeline, package version, deployment or platform integration changes. User visual approval and cross-browser/device verification remain pending.
