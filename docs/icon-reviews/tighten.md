# Tighten: Interface Craft review

## Context
The selection-popover action makes selected text more concise. It maps to `data-mode="concise"` with the visible Tighten label in `web-absorb/extension/content/selection-transform-controller.js:568`; the host owns the selected range and rewrite result.

## First Impressions
The source has four opposing inward marks. Unbound arrows would read as navigation. The library turns those marks into four corners of two text clamps around a retained three-line block, so concision reads as compression of language rather than movement to another destination.

## Visual Design
The central text block stays between x=8.8 and x=15.8. Left and right clamp groups have separate origins and move inward by 1.18 units; their arrow tips remain intact. The text compresses mildly around x=12, never collapsing into a bar. A lower registration line appears only at the seat. There are no overlapping primary paths at the clamp endpoints, so Outline retains clean negative space.

## Interface Design
Both clamps take up play, squeeze toward the same retained text, seat, then show a short registration response. The compact block holds before the clamps release. Nothing is removed, navigated or marked complete; the host applies or rejects the rewrite.

## Consistency & Conventions
MOT-01/02/03/05 distinguish opposing text clamps from ArrowRight/ArrowLeft. MOT-04/06 keep travel short and the return measured. MOT-07 keeps texture attached to each clamp. MOT-08/16 delay registration until both sides seat. MOT-09/10/11/12 cover finite playback, exact return, reduced motion and shared export timing. MOT-14 keeps rewrite state external. MOT-15 gives Tighten its own mechanical story.

## User Context
The popover needs a truthful label such as Tighten selected text, not a generic forward label. Preserve the host's focus, disabled/loading state and selection boundary. Still Solid/Outline is the compact choice; Dither remains a larger study material.

## Top Opportunities
Retain the text block; make both sides participate in one squeeze; place the payoff at the seat instead of adding generic arrow travel.

## Encoded storyboard and review
[tighten.ts](../../src/motions/tighten.ts), 980ms: brace 80, squeeze 260, seat 380, register 455, hold 630, release 745, rest 980. Actors: `tighten-left-clamp`, `tighten-right-clamp`, `tighten-text`, `tighten-registration`. Shared React/SVG tracks use transform/opacity only. Focused source/render checks are recorded in [selection batch evidence](../motion-evidence/cognimated-selection-01/README.md). Native browser replay and user optical review remain pending; no screenshot is claimed from source inspection.
