# Drag Handle: Interface Craft review

## Context
Reposition Cognimated's reader tray. The existing `.drag-handle` at `web-absorb/extension/content/reading-focus-timer.js:1016` also supports click-to-collapse. This icon denotes dragging; actual positioning and keyboard behavior remain with the host.

## First Impressions
Source-level critique: three ribs inside one capsule make a graspable object, distinct from a menu. Earlier screenshot corrections centered the grip and lightened the material. The user then rejected the uniform diagonal slide as lacking physics, weight and a drag feeling. This revision changes the primary motion: load before pickup, a lower-body lag around the caught upper rib, inertial swing on release and a damped landing. Rendered acceptance remains with the user.

## Visual Design
Grip bounds are x=8–16, y=5–19. Ribs span x=10.5–13.5 at y=8.5/12/15.5. Corners are symmetric at x=5.5/18.5, y=4/20. Solid contours now use 1.05 units, versus the rejected 1.5; prose/ribs use 0.9. Dither/Outline use a 1.35 contour footprint; Outline has true transparent cores with 0.35 boundary rails. Registration marks are subordinate at 0.5 opacity.

## Interface Design
Catch the upper rib at (12,8.5) before the body moves. Take up the load with a small downward yield, lift, then drag right with the lower body leaning 9 degrees behind the pull. Braking carries the grasp past its resting destination and lets the mass swing through to the opposite side. Release downward into contact, counter-rotate by a smaller amount, then rest 2.4 units to the right. The preview returns through a reverse-direction pickup and a smaller final landing.

The grip, ribs and grain remain one rigid object. A matched moving knockout hides fixed registration marks behind the passing grip, avoiding the earlier overlap problem. The contact shadow projects the bottom center onto a fixed horizontal plane with the same clock/easing: broad/faint while lifted, narrow/darker at landing. It starts and ends hidden. The unrelated corner flash is removed. These are authored inertial poses, not a live drag physics simulation; no toolbar position is changed or saved.

## Consistency & Conventions
MOT-01/02/03/05 preserve the grip, upper-rib attachment and fixed reference. MOT-04 separates load, carry, release and energy dissipation. MOT-06/07 bound the tilt/overshoot and attach grain plus knockout. MOT-08/16 localize the landing response beneath the actual body. MOT-09/10/11/12 retain finite React playback, exact neutral return, static reduced-motion meaning and shared WAAPI/CSS tracks. MOT-14 excludes host state changes. MOT-13/15 visual approval remains pending. Standalone CSS hover ends on pointer departure; React finishes the gesture.

## User Context
Keep a labeled native drag target and keyboard alternative. A glyph cannot explain the host's secondary collapse action alone. Motion-off/reduced motion retain the complete grip. Human recognition at 16/24px remains a user review item.

## Top Opportunities
Retained: centered geometry, symmetric references and lighter materials. Implemented after motion feedback: directional lag, braking overshoot, contact shadow and diminishing landing rotation. Remaining: user assessment of the weight and pickup/release rhythm at actual speed.

## Encoded storyboard and review
[Timing](../../src/motions/drag-handle.ts): 1580ms. `drag-grip` and matching `drag-grip-cut` pivot at (12,8.5). Grasp 90ms, load 170ms, lift 300ms, carry 500ms, brake 630ms, contact 760ms, counter-rotation 835ms, placed 930ms. Return pickup 1050ms, reverse lean 1230ms, home contact 1390ms, smaller rebound 1470ms, exact rest 1580ms. Nested `drag-grasp` follows both pickups. `drag-contact` has matching times/easing and projects the lower body onto y=20; it never moves vertically.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests cover load-before-lift, directional lag, deceleration overshoot, diminishing release/rebound, matched mask/footprint clocks, rigid ribs, sampled rotated bounds, materials and neutral export contracts. Earlier screenshots record rejected drawings, not acceptance of this motion. No extended browser review claimed.

Weight follow-up verification: 14 focused tests passed, typecheck passed, one complete build passed, and `git diff --check` passed.

```sh
npm run typecheck
npm run build
npx tsx --test tests/reader-controls-motion.test.tsx tests/choreography.test.tsx
git diff --check
```

Files changed in this follow-up: `src/motions/drag-handle.ts`, `src/ReaderArtwork.tsx`, `tests/reader-controls-motion.test.tsx`, `docs/MOTION-CATALOG.md`, this review, `icons.json`, `public/icons.json`, `public/llms-full.txt`, and `public/reference/icons.svg`. Generated references use the existing build sources. No other icon timeline, package version or platform integration changed. User visual approval and cross-browser/device assessment remain pending.
