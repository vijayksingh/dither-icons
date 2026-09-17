# Drag Handle: Interface Craft review

## Context
Reposition Cognimated's reader tray. The existing `.drag-handle` at `web-absorb/extension/content/reading-focus-timer.js:1016` also supports click-to-collapse. This icon denotes dragging; actual positioning and keyboard behavior remain with the host.

## First Impressions
Source-level critique: three ribs inside one capsule make a graspable object, distinct from a menu. Earlier corrections centered the grip and lightened the material. The user rejected the initial uniform slide as weightless, then rejected its 1580ms replacement as too slow. The current direction is explicit: weighted pull, then snap back. The revised 650ms gesture keeps load and lean but releases straight home in 90ms, without the displaced landing, long hold or second pickup. Rendered acceptance remains with the user.

## Visual Design
Grip bounds are x=8–16, y=5–19. Ribs span x=10.5–13.5 at y=8.5/12/15.5. Corners are symmetric at x=5.5/18.5, y=4/20. Solid contours now use 1.05 units, versus the rejected 1.5; prose/ribs use 0.9. Dither/Outline use a 1.35 contour footprint; Outline has true transparent cores with 0.35 boundary rails. Registration marks are subordinate at 0.5 opacity.

## Interface Design
Catch the upper rib at (12,8.5) before the body moves. Take up the load with a small downward yield, lift, then pull right 2.4 units with a 9-degree trailing lean. Hold tension for 60ms. Release directly home over 90ms using a fast ease-out, crossing the neutral position by only 0.32 units with a −3-degree lean. Recover to +0.08 units / +0.8 degrees, then exact rest. The pull takes 280ms; the return is intentionally much faster.

The grip, ribs and grain remain one rigid object. A matched moving knockout hides fixed registration marks behind the passing grip. The contact shadow projects the bottom center onto a fixed horizontal plane with the same clock/easing: broad/faint while lifted, narrow/darker as the snap reaches home. It starts and ends hidden. These are authored inertial poses, not a live drag physics simulation; no toolbar position is changed or saved.

## Consistency & Conventions
MOT-01/02/03/05 preserve the grip, upper-rib attachment and fixed reference. MOT-04 separates resistance from rapid release. MOT-06/07 bound the tilt/overshoot and attach grain plus knockout. MOT-08/16 localize the snap's contact response beneath the actual body. MOT-09/10/11/12 retain finite React playback, exact neutral return, static reduced-motion meaning and shared WAAPI/CSS tracks. MOT-14 excludes host state changes. MOT-13/15 visual approval remains pending. Standalone CSS hover ends on pointer departure; React finishes the gesture.

## User Context
Keep a labeled native drag target and keyboard alternative. A glyph cannot explain the host's secondary collapse action alone. Motion-off/reduced motion retain the complete grip. Human recognition at 16/24px remains a user review item.

## Top Opportunities
Retained: centered geometry, lighter materials, rigid lean, matched occlusion and contact shadow. Corrected: remove the slow two-part journey; contrast a resistant pull with a direct, fast snap and small rebound. Remaining: user assessment at actual speed.

## Encoded storyboard and review
[Timing](../../src/motions/drag-handle.ts): 650ms. `drag-grip` and matching `drag-grip-cut` pivot at (12,8.5). Grasp 40ms, load 110ms, lift 190ms, carry 320ms, release 380ms, snap 470ms, rebound 535ms, exact rest 650ms. Nested `drag-grasp` clears on release. `drag-contact` shares the body clock/easing and projects its footprint onto y=20 without vertical movement. There is no second pickup.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests cover load-before-lift, directional lean, a direct snap within 100ms, a complete sequence within 700ms, smaller rebound, matched mask/footprint clocks, rigid ribs, sampled rotated bounds, materials and neutral export contracts. Earlier screenshots record rejected drawings, not acceptance of this motion. No extended browser review claimed.

Snap follow-up verification: 14 focused tests passed, typecheck passed, one complete build passed, and `git diff --check` passed.

```sh
npm run typecheck
npm run build
npx tsx --test tests/reader-controls-motion.test.tsx tests/choreography.test.tsx
git diff --check
```

Files changed in this follow-up: `src/motions/drag-handle.ts`, `tests/reader-controls-motion.test.tsx`, `docs/MOTION-CATALOG.md`, this review, `icons.json`, `public/icons.json`, and `public/llms-full.txt`. Artwork, other icon timelines, package version and platform integration are unchanged. Generated references use the existing build sources. User visual approval and cross-browser/device assessment remain pending.
