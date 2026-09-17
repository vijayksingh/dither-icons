# Next Word: Interface Craft review

## Context
Seek one readable word forward. Source: `web-absorb/extension/content/reading-focus-timer.js:1066,1245,2073,2108`. Paced mode currently uses one word; Listen/Read uses five. This export implements the requested one-word meaning for future integration; it does not change that behavior. Main path can advance past excluded tokens to the next readable word.

## First Impressions
Source critique: ArrowRight alone suggests navigation or continuation without a unit. The three retained words and stepping selection shoe make the unit explicit, while a stationary arrow keeps direction readable during every pose. Next Word has a shorter forward release and leading-edge response than Previous Word's recall. Visual approval remains with the user.

## Visual Design
Use the pair's aligned text band, center word at x=12, next word at x=19, and selection shoe spanning x=9–15 at rest. The fixed right arrow at y=19 never drifts into the text. A seven-unit advance plus 0.35-unit bounded overshoot preserves outer clearance. Solid stays at the corrected 1.05 contour; Outline cores are true knockouts, not background-colored overpainting.

## Interface Design
Take up forward travel with a small counter-movement, release the current registration, advance one interval, and settle under the next word. Its underline opens from the leading edge only after seating. Keep the position briefly, clear the response, and return the preview selector. No word is removed, no arrow direction changes, and no application playback or recognition state is asserted.

## Consistency & Conventions
MOT-01/02 keep discrete word seeking distinct from generic forward navigation. MOT-03/05 derive registration from the next drawn word center; text and arrow stay fixed. MOT-04/06 bound anticipation and overshoot without repetitive bounce. MOT-07 binds texture to the selector. MOT-08/16 make selected-word response follow arrival. MOT-09/10/11/12 retain exact return, finite shared React/SVG timing, static reduced motion and transform/opacity-only playback. MOT-14 preserves host seek/progress authority. MOT-13/15 user rendered approval remains pending. CSS hover retains its documented departure limit.

## User Context
Preserve end-boundary disabling, labels and forgiving host seek behavior. Do not use the one-word export to imply a one-word step on the currently five-word Listen/Read handlers. A still compact rendition avoids repeated animation competing with reading; keyboard and touch remain parent responsibilities.

## Top Opportunities
Show an actual single-word interval; make forward direction invariant; put the payoff at the target word's leading edge after the selector seats.

## Encoded storyboard and review
[next-word.ts](../../src/motions/next-word.ts), 780ms: load 70, release 110, arrive 220, seat 270, identify 335, hold 430, clear 510, return 550, rest 780. Actors: `next-word-selector`, `next-word-identify`. [Pair anatomy](../../src/motions/word-seek-geometry.ts) is shared but this clock and choreography are independent. [Batch checks](../motion-evidence/cognimated-reader-03/README.md) cover word distance, response order, clearance, material cores, named export and SVG parity. No user visual approval or platform integration claimed.
