# Reader Path: Interface Craft review

## Context
Main path toggle skips captions, references, symbols and asides while retaining source content. Source: `web-absorb/extension/content/reading-focus-timer.js:1034,1247,2083–2088`; skip kinds and traversal are in `guided-word-reader.js:19,101–107,302–310,413–423`. This is a reading option, not CraftingAttention Path navigation.

## First Impressions
Source critique: milestone nodes would import the wrong meaning. The drawing instead places a direct downward column next to a retained detour and indented aside. The route tongue chooses between those relationships; no generic traveling dot substitutes for the primary action. This is source-level critique, not user visual approval.

## Visual Design
Main spine at x=5.5 spans y=3.5–20.5 with a downward direction cue. Detour loops through x=11.5; main text sits at x=15–21 above and below the aside. The five-unit route tongue pivots at the drawn junction (5.5,7). Corrected thin controls weights apply. Spine and branch use one contour/core mask so their junctions do not accumulate Outline lines. A second, moving knockout follows the tongue exactly to avoid double grain or a route showing through its core.

## Interface Design
Take up four degrees, then turn the tongue 90 degrees into the main column. Its tip arrives at (5.5,12), exactly where downstream junction light starts. Main prose below the aside answers afterward. Neither detour nor aside moves or vanishes. Hold the selection, clear response, then reset the demonstration. The entire fixed main route stays readable at rest and throughout.

## Consistency & Conventions
MOT-01/02 preserve route selection rather than milestone traversal. MOT-03/05 retain a real hinge, downstream endpoint and stationary reference. MOT-04/06 bound the finite hinge action. MOT-07 aligns visible and knockout tracks. MOT-08/16 sequence gate seating, junction response and continued prose. MOT-09/10/11/12 retain common playback, neutral return and meaningful static reduced motion; transform/opacity only. MOT-14 keeps host checked state authoritative. MOT-13/15 rendered approval remains pending. Standalone CSS hover has the established departure limitation.

## User Context
The glyph identifies an option; it must not replace `aria-checked`, on/off copy or a visible checked indicator. Main path off includes all details. Keep all source text, accessible labeling, disabled state and keyboard switch behavior; the icon does not discard content or change recognized reading credit.

## Top Opportunities
Differentiate the source-reading route from learning navigation; retain skipped content; put feedback at the actual gate endpoint before answering in main prose.

## Encoded storyboard and review
[reader-path.ts](../../src/motions/reader-path.ts), 980ms: brace 90, seat 300, junction 365, prose 450, hold 630, clear 720, return 750, rest 980. Actors: `reader-route-gate`, matching `reader-route-cut`, `reader-route-junction`, `reader-route-prose`. [Batch checks](../motion-evidence/cognimated-reader-03/README.md) cover the hinge sweep, actual endpoint, unchanged source branches, Outline core at the seated joint and shared exports. User handles optical/actual-speed review; no browser/device acceptance claimed.
