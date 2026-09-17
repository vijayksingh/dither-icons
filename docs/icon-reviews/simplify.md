# Simplify: Interface Craft review

## Context
The selection-popover action simplifies selected text. It is the `data-mode="simplify"` control in `web-absorb/extension/content/selection-transform-controller.js:567`; the host owns selection, the rewrite request and the returned text.

## First Impressions
The source drawing is a short text stack followed by one clarity star. A star field would collide with Sparkles and would make the action look like discovery rather than text simplification. The library keeps the text as the primary instrument and makes the lower lines gather before the single mark answers.

## Visual Design
Three round-ended text lines at x=3 remain readable in every frame. Their lower lines shorten and rise by bounded amounts; they never disappear. The single star at (17, 9.5) stays attached to the text band. A short lower clarity line is subordinate and starts hidden. Solid uses the corrected 1.05 control contour; Outline uses transparent 0.35-unit edge rails rather than a background overpaint.

## Interface Design
Text prepares, the lower lines gather, the clarity star opens, and the underline registers only after the gathering has seated. The text is the stable reference. The response cannot imply that a rewrite was accepted or inserted; it is only a finite gesture study.

## Consistency & Conventions
MOT-01/02/03/05 keep the text silhouette and its relationship to the clarity mark. MOT-04/06 bound the gathering. MOT-07 binds dither to each contour. MOT-08/16 place the localized clarity response after the text action. MOT-09/10/11/12 provide finite playback, exact neutral return, reduced-motion stillness and shared React/SVG tracks. MOT-14 leaves transformation success to the host. MOT-15 records this meaning separately from Sparkles.

## User Context
At 16–24px, Solid or Outline should be preferred for a repeated popover action; Dither is the larger reference material. Keyboard/touch target, disabled state, selection ownership and returned-text state remain external. Motion-off leaves the text and star intact.

## Top Opportunities
Keep the selected-text anchor visually dominant; make reduction visible through line gathering; keep one clarity mark instead of borrowing Sparkles' surrounding field.

## Encoded storyboard and review
[simplify.ts](../../src/motions/simplify.ts), 1020ms: gather 90, clarify 300, register 430, clear 650, release 820, rest 1020. Actors: `simplify-line-0/1/2`, `simplify-spark`, `simplify-clarity`. React and standalone SVG use the same tracks; reduced motion disables animation while preserving the first frame. Focused source/render checks are recorded in [selection batch evidence](../motion-evidence/cognimated-selection-01/README.md). Native browser replay and user optical review remain pending; no screenshot is claimed from source inspection.
