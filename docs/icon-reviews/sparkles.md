# Sparkles — surrounding field correction

## Context
**Sparkle all around.** The user preferred multiple surrounding sparkles to the previous large-star/small-reply pair. Retain a central emphasis and give the surrounding field enough overlap to be perceived together.

## First Impressions
Two stars made the earlier gesture feel like a small exchange. The first expanded draft also faded its first glint too quickly. A distributed, overlapping field creates the requested sense of shimmer without random noise or a particle explosion.

## Visual Design
Three permanent concave four-point stars: center (12,12), upper-right (19.25,4.65) and lower-left (4.4,19.25). Their radii are 6.35, 2.5 and 2.1. Four smaller glints occupy the upper-left, right, bottom and left space, clear of the central contour. Size hierarchy and fine satellite outlines remain legible at 24px. Transient glints are filled four-point shapes, never square particles.

## Interface Design
The center gathers at 140ms and flares at 340ms. Surrounding glints peak at 410/490/570/650ms, each lingers briefly then fades in place. The two permanent satellites answer at 500/650ms. A 390ms decay lets several surrounding sparks coexist; all clear by 1040ms. No star tumbles, orbits or flies outward.

MOT-01 is preserved by the three permanent stars. The user's multiple-sparkle direction supersedes the previous two-star composition; it does not require destroying the central symbol.

## Consistency & Conventions
MOT-03/04/05/06/07/08/09/10/11/12/13/14/15/16: individual causal parts, attached material, one clock, exact return, reduced-motion stillness and a complete React gesture after departure. The existing inspector tunes the same production tracks. Standalone CSS hover stops on pointer departure. No host state changes or simulated success.

## User Context
A brief field of light is more expressive than two twitches. It remains subordinate to the platform action; it is not a loading indicator, AI success state or automatic achievement.

## Top Opportunities
1. Place actual sparkle silhouettes on all sides of a smaller dominant center.
2. Overlap the staggered replies long enough to read as a field.
3. Keep the three permanent stars intact through every phase.

## Encoded storyboard and rendered review
[sparkles.ts](../../src/motions/sparkles.ts), **1260ms**, **Gather / Illuminate / Twinkle**.

```text
0 three stars — 140 gather — 340 flare — 410/490/570/650 surrounding glints — 1040 clear — 1260 rest
```

[Current browser evidence](../motion-evidence/refinement-07-rework/) supersedes the previous refinement for this icon. Implementation review is not user acceptance or a production release.
