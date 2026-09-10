# Moon — nightfall correction

## Context
**Nightfall.** The user requested more refinement for Moon while approving Sun. Moon remains the dark-appearance symbol, with a distinct slower performance and no theme mutation.

## First Impressions
The old rim highlight was difficult to see against the solid contour. Its tiny isolated glint did not give the crescent enough of a finish. A short, visible falling-star path makes the night scene easier to read across materials.

## Visual Design
A slightly smaller crescent sits lower-left to leave a clear patch of sky. Outer center (10.8,13.2), radius 8.6; cut center (14.6,9.4), radius 8.05. Both horns use exact circle intersections. The main star settles at (18.1,7.6), with a quieter distant glint at (12.7,2.9). Its largest twinkle clears the raised crescent's actual inner arc, including outline thickness. There is no same-color rim effect to disappear into the drawing.

## Interface Design
The crescent rises .65 units and inclines 9 degrees by 460ms. A small star appears above the opening and travels down-left in one continuous eased passage to 780ms. Its short trailing line shares that translation and contracts as the star stops. The arrival twinkle peaks at 860ms, accompanied by a smaller distant star. The crescent holds through 1010ms; stars fade by 1220ms, before exact neutral at 1580ms. One continuous flight avoids a midpoint stop.

MOT-01 preserves the crescent. MOT-05 uses its settled pose as the reference for the arriving star. The star is a brief night-sky gesture; it does not become a persistent orbiting object.

## Consistency & Conventions
MOT-03/04/05/06/07/08/09/10/11/12/13/14/15/16: individual causal parts, attached material, one clock, exact return, reduced-motion stillness and a complete React gesture after departure. The existing inspector tunes the same production tracks. Standalone CSS hover stops on pointer departure. No host state changes or simulated success.

## User Context
The slower rise and last falling light should feel quiet and complete. The silhouette works without stars at rest or with motion disabled. Keep this gentler than Sparkles' surrounding field.

## Top Opportunities
1. Give the crescent and star separate readable space.
2. Carry the tail with the star and remove it at arrival.
3. Let the arrival twinkle finish before the slow return.

## Encoded storyboard and rendered review
[moon.ts](../../src/motions/moon.ts), **1580ms**, **Rise / Catch a star / Rest**.

```text
0 crescent — 130 prepare — 460 rise — 500 star appears — 780 arrives — 860 twinkles — 1010 hold — 1220 clear — 1580 rest
```

[Current browser evidence](../motion-evidence/refinement-07-rework/) supersedes the previous refinement for this icon. Implementation review is not user acceptance or a production release.
