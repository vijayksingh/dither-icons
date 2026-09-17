# Drag Handle: Interface Craft review

## Context
Reposition Cognimated's reader tray. The existing `.drag-handle` at `web-absorb/extension/content/reading-focus-timer.js:1016` also supports click-to-collapse. This icon denotes dragging; actual positioning and keyboard behavior remain with the host.

## First Impressions
Source-level critique: three ribs inside one capsule make a graspable object, distinct from a menu. The user's first screenshots identified broken alignment and heavy strokes. The correction centers the grip and ribs at (12,12), replaces the asymmetric reference with four aligned corners, and reduces stroke weight. Rendered acceptance remains with the user.

## Visual Design
Grip bounds are x=8–16, y=5–19. Ribs span x=10.5–13.5 at y=8.5/12/15.5. Corners are symmetric at x=5.5/18.5, y=4/20. Solid contours now use 1.05 units, versus the rejected 1.5; prose/ribs use 0.9. Dither/Outline use a 1.35 contour footprint; Outline has true transparent cores with 0.35 boundary rails. Registration marks are subordinate at 0.5 opacity.

## Interface Design
Engage the middle rib, move the rigid grip (+1,−1), then illuminate the upper-right registration corner. Hold, clear that cue, and return exactly. Grip, ribs and grain share a frame; the destination stays outside it. No toolbar is actually moved and no position is saved by the preview.

## Consistency & Conventions
MOT-01/02/03/05 preserve the grip and fixed reference. MOT-06/07 retain bounded movement and attached texture. MOT-08/16 put the response after arrival. MOT-09/10/11/12 retain finite React playback, neutral return, static reduced-motion meaning and shared WAAPI/CSS tracks. MOT-14 excludes host state changes. MOT-13/15 visual approval remains pending. Standalone CSS hover ends on pointer departure; React finishes the gesture.

## User Context
Keep a labeled native drag target and keyboard alternative. A glyph cannot explain the host's secondary collapse action alone. Motion-off/reduced motion retain the complete grip. Human recognition at 16/24px remains a user review item.

## Top Opportunities
Implemented from screenshots: centered geometry, symmetric references and lighter materials. Remaining: user feedback on grip recognition and the destination response.

## Encoded storyboard and review
[Timing](../../src/motions/drag-handle.ts): 1120ms. `drag-grip` origin (12,12), grasp at 120ms, arrival 360ms, return 820–1120ms. Nested `drag-grasp` clears by 650ms. Fixed `drag-destination` responds at 470ms and clears by 780ms.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests cover centering, bounds, rigid rib placement, delayed response, material differences and shared tracks. User screenshots are rejection evidence for the first implementation, not acceptance of this correction. No extended browser review claimed.
