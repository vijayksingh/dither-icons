# Moon: Interface Craft refinement 07

## Context
**Dark appearance.** Moon indicates nighttime or dark appearance in the same ModeToggle.tsx:29/44 pair. A crescent stays a crescent throughout; the host owns the theme.

## First Impressions
The earlier crescent was broad and its generic rotation had little conclusion. A short internal highlight was not enough to make the quiet symbol feel considered. The new drawing needs clean horns and a clear negative space.

## Visual Design
The crescent is the difference between two circular arcs: outer center (12,12), radius 9.3; cut center (15.8,8.2), radius 8.6. Both endpoints are calculated intersections, so the horns join exactly. The inner-rim light uses that same cut circle and inherits the crescent pose. A small four-point glint appears inside the opening after the rim light arrives.

## Interface Design
A one-degree preparation at 130ms gives way to a quiet five-degree incline by 450ms. The rim light begins after that settling, moving along the drawn inner arc from 520 to 710ms. The small glint answers at 780ms. The crescent holds until 900ms and returns slowly without elastic overshoot. All light clears before the ending.

## Consistency & Conventions
MOT-01/02/03/04/05/06/07/08/09/10/11/12/13/14/15/16. Use the existing native playback, shared CSS timeline and frame inspector. Each icon has its own geometry and timing module. Reduced motion and motion-off retain the complete static symbol. Standalone CSS hover stops on departure; React completes the gesture.

## User Context
A slower, quieter payoff suited to night. The small glint is absent at rest and never becomes an orbiting object. The crescent negative space and exact horn joints survive solid, outline and dither.

## Top Opportunities
1. Join both circular boundaries at their true intersections.
2. Settle the crescent before its contained light begins.
3. Use one small glint as the quiet finish, then fade it before recovery.

## Encoded storyboard and rendered review
[moon.ts](../../src/motions/moon.ts), **1420ms**, **Incline / Catch / Still**.

```text
0 — 130 gather — 450 incline — 520 light — 710 arrive — 780 glint — 900 hold — 1150 clear — 1420 rest
```

[Current browser evidence](../motion-evidence/refinement-07/) records inspected poses, actual/half-speed playback, keyboard completion, material continuity, reduced motion and compact exports. These supersede the broad-rollout references for this icon. Implementation review does not claim user acceptance or a production release.

![Eye, Sparkles, Sun and Moon during their response](../motion-evidence/refinement-07/pose-55.png)
