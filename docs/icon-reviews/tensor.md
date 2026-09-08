# tensor: Interface Craft review

## Context

Represent a multidimensional array and **inspect a solid slice while preserving its indices**. The NumPy sheet already teaches slicing through an indexed volume; see [platform mapping](../PLATFORM-ICONS.md). This is an inspection gesture, not an array mutation.

## First Impressions

The first version extracted only the front surface. The user correctly identified that it looked like a skin peeling off. That version is superseded: the selected half now has a top, side, and front, all moving as one solid 1 × 2 × 2 block. A shaded cut face remains behind it.

## Visual Design

Two adjoining cuboids assemble into a 2 × 2 × 2 volume. Shared grid lines meet at the same coordinates. Top, side, and front have different ink densities, so thickness reads without extra outlines. The slice's complete silhouette masks the stationary cuboid; it cannot reveal a transparent hole or accumulate double grain.

**Identity boundary:** Cell order, face adjacency, and projected depth survive every pose. All three extracted faces translate rigidly along the same isometric axis. None rotate, flatten, or detach independently.

## Interface Design

The slice takes up a little travel, separates, and holds for inspection. Its trailing cut edge catches light, followed by a fine dimension witness across the actual gap. The volume remains the fixed reference. Returning the same block restores the original grid exactly.

## Consistency & Conventions

MOT-01/03/05/07 protect solid identity, joined faces, and attached grain. MOT-08/16 put the payoff at the exposed cut edge. MOT-09–15 supply complete playback, neutral return, reduced motion, shared export timing, and this individual review. Platform integration follows UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7; use semantic color and a named native parent.

## User Context

Use dither for sheet entry points at 48px or larger; use solid/outline for compact controls. The static cube is complete. Full extraction is optional inspection feedback, never a continuous lesson distraction or a claim that values changed.

## Top Opportunities

1. Preserve actual slice thickness, not merely an attractive face animation.
2. Make the cut surface visible behind the selected block.
3. Keep every face and the full occluder on one clock.

## Encoded storyboard and review

**Select / Extract / Rejoin · 1400ms**. Source: [tensor.ts](../../src/motions/tensor.ts), geometry: [PlatformArtwork.tsx](../../src/PlatformArtwork.tsx).

| Actor / origin | Key times (ms) |
| --- | --- |
| `slice`, `slice-occlusion` / 12,16.5 | 0 rest; 120 gather; 390 extract; 640 hold; 1100 home; 1400 rest |
| `slice-edge` / 7.8,14.2, inside slice | 300 start; 455 peak; 880 clear |
| `slice-gap` / 7.5,19.7, stationary frame | 390 start; 535 peak; 880 clear |

After the thickness correction, reviewed continuous actual/half speed and 0/10/28/36/45/65/82/100% poses. The extracted block retains three faces in dither, outline, and solid. Its new cut plane is visible in the gap; the 0% and 100% computed poses match. Material switches retain the 45% pose. Keyboard departure finishes; reduced motion and motion-off are still. Inspected 24px solid and 64px dither alongside the other platform icons. See [validation](../VALIDATION.md).

**Reference position: 1 of four.**

![Solid Tensor slice, position 1, at 45%](../motion-evidence/platform-02/pose-45.png)

[Rest](../motion-evidence/platform-02/pose-0.png) · [Outline depth](../motion-evidence/platform-02/outline-45.png) · [Light solid depth](../motion-evidence/platform-02/light-solid-45.png) · [Recovery](../motion-evidence/platform-02/pose-82.png)
