# Previous Word: Interface Craft review

## Context
Seek one readable word backward. Source: `web-absorb/extension/content/reading-focus-timer.js:1064,1244,2072,2107`. Important mismatch: Paced mode currently moves one word, while Listen/Read moves five. This requested single-word export does not silently change or re-label those five-word controls. Main path can skip excluded tokens when finding the preceding readable word.

## First Impressions
Source critique: ArrowLeft means navigation and says nothing about seek granularity. Retained word segments, a selection shoe and a fixed left-pointing arrow make the unit and direction separate, visible facts. Previous Word uses a lifted recall and a longer target hold than Next Word. No user visual acceptance claimed.

## Visual Design
Three words are centered at x=5/12/19, y=8 under a fixed context line. The selection shoe initially spans x=9–15, y=11–13.5, centered under the middle word. A connected left arrow stays at y=19. Seven units of selector travel reach exactly one word; a 0.3-unit overshoot stays inside the canvas. Shared thin controls material and true transparent Outline cores preserve the corrected composition bar.

## Interface Design
Lift attention from the current word, rewind one interval, seat under the preceding word, then open its underline from the trailing edge toward the beginning. Hold briefly for recognition and clear the underline before resetting. Words and arrow never move. This is registration of attention, not a physical collision: the localized payoff belongs to the exact selected word, not decorative impact rays.

## Consistency & Conventions
MOT-01/02 preserve word-level recall and leftward direction. MOT-03/05 bind the selector step to actual word centers with fixed prose. MOT-04/06 give a short release, bounded overshoot and readable hold. MOT-07 keeps grain attached. MOT-08/16 defer recall until seating. MOT-09/10/11/12 retain finite shared tracks, exact return, keyboard/tap lifecycle and static reduced motion; no per-frame React state. MOT-14 prevents page navigation or reading-credit claims. MOT-13/15 visual approval remains with the user; CSS hover still ends on departure.

## User Context
Keep native start-boundary disabling and actual seek labels. This glyph cannot truthfully label a five-word action as one word. Prefer `animate={false}` at frequently repeated compact controls. The left direction cue and three-word context remain readable without animation.

## Top Opportunities
Make granularity explicit through a one-interval selector; keep direction fixed; distinguish recall through its lifted departure and right-to-left target response.

## Encoded storyboard and review
[previous-word.ts](../../src/motions/previous-word.ts), 860ms: lift 90, arrive 230, seat 290, recall 360, hold 510, clear 590, return 620, rest 860. Actors: `previous-word-selector`, `previous-word-recall`. Shared [pair anatomy](../../src/motions/word-seek-geometry.ts) avoids inconsistent spacing; it does not supply a shared animation preset. [Batch checks](../motion-evidence/cognimated-reader-03/README.md) sample selector clearance, assert exact target registration, static identity and independent timing. Optical review and platform integration remain pending.
