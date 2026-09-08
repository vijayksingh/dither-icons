# orbit: Interface Craft review

## Context

**Explore a relationship around a stable center.** The curriculum atlas already uses Orbit in platform navigation. This is an atlas invitation, not a physics lesson, route transition, or loading indicator.

## First Impressions

The slanted orbital plane, central body, and satellite establish depth while still. The satellite passes across the foreground, disappears partly behind the central body on the far side, and returns to its starting position. This spatial relationship carries the identity.

## Visual Design

The center and tilted ellipse remain stationary. Front and rear satellite layers share one trajectory and complementary half-plane clips. The center occludes the rear; a moving satellite mask clears the front orbit and core beneath the near-side satellite. The foreground arc is stronger than the rear arc, so depth remains readable without animation.

**Identity boundary:** The center, orbital plane, and satellite relationship remain intact. Satellite position follows the actual ellipse, not a circle loosely placed around it. Dither travels with each contour.

## Interface Design

One traversal begins gently. The near-side pass lights a short portion of the traversed orbital arc, followed by a quieter glint on the central surface. The satellite recedes behind the body and returns exactly. The 64 authored samples keep linear interpolation within 0.03 viewBox units of the ellipse; there is no runtime frame loop.

## Consistency & Conventions

MOT-03/05/07 bind geometry, depth, and fixed context. MOT-08/16 put the response at the foreground pass. Under MOT-06, a **single satellite orbit** is a deliberate physical reason for a full traversal: the icon and coordinate frame never spin, and playback never loops. The 1560ms duration gives both near and far transit time to read. MOT-09–15 supply lifecycle, neutral return, reduced motion, shared export timing, and this individual review. Platform handoff: UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7.

## User Context

Use the still silhouette for frequent atlas navigation. Full motion can invite exploration once. Do not reuse it as an indefinite loading spinner or move the Learner to another Path without an explicit action.

## Top Opportunities

1. Use actual front/rear occlusion to communicate depth.
2. Keep one exact trajectory across both visible layers and the mask.
3. Give the close pass a localized wake, then allow a quiet far-side return.

## Encoded storyboard and review

**Depart / Pass / Return · 1560ms**. Source: [orbit.ts](../../src/motions/orbit.ts).

| Actor / reference | Key times (ms) |
| --- | --- |
| `satellite-front`, `satellite-rear`, `satellite-occlusion` / initial ellipse point at 20° | 0 rest; 100 depart; 64 shared samples; 1320 home; 1560 rest |
| `orbital-wake` / 12,12 | 350 start; 510 peak; 760 clear |
| `orbital-surface` / 10.45,9.55 | 440 start; 585 peak; 760 clear |

Reviewed actual/half-speed playback and 0/10/28/36/45/58/82/100% poses. The 28–36% frames show the foreground pass; the 58% frame exposes the rear occlusion. All three satellite actors stay registered across material switches. Exact endpoints, keyboard departure, reduced motion, motion-off, 24px solid, 64px dither, and 390px layout were checked. See [validation](../VALIDATION.md).

**Reference position: 3 of four.**

![Orbit foreground pass, position 3, at 36%](../motion-evidence/platform-03/pose-36.png)

[Rest](../motion-evidence/platform-03/pose-0.png) · [Rear transit](../motion-evidence/platform-03/pose-58.png) · [Outline depth](../motion-evidence/platform-03/outline-36.png)
