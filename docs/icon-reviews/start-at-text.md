# Start at Text: Interface Craft review

## Context
Cognimated's starting-word picker chooses the word/sentence where guided reading begins. It does not edit article text. A native label must disambiguate the conventional I-beam.

## First Impressions
The rejected drawing had an isolated dot-like word, wide gaps and prose heavier than its caret. The revision uses three evenly spaced lines, one left text edge and a dedicated caret gutter. The caret now moves between sentence baselines rather than crossing a sparse row.

## Visual Design
Text starts at x=8 on y=6.5/12/17.5; the middle sentence has two substantial 4/4.5-unit words. The I-beam centers at x=4 with 2-unit caps and 4-unit height. Contour/caret is 1.5 units, prose 1.25 and response 1, all round-ended. Its entire sweep stays outside the text, preserving whitespace rather than passing over letters.

Outline correction: I-beam stem/caps now have transparent cores and 0.5-unit boundary rails. Text stays single-line at 0.9 units; entry underline uses 0.75. This outlines the selection instrument without doubling every word. Outer caret extent and gutter remain unchanged (MOT-01/05/07/12), as do all actor names and timing. Pixel tests verify the transparent caret spine and distinct output at 16/24/48px. User optical approval remains pending.

## Interface Design
Hold the first line briefly, place the caret beside the next sentence, then underline its first word. Retain the article text throughout. Clear the underline before returning the caret. No decorative backward pickup or detached registration tick remains.

## Consistency & Conventions
MOT-01/02/03/05 preserve insertion-point identity, selection meaning, source-before-response and fixed prose. MOT-06/07 keep controlled travel and attached grain. MOT-08/16 locate the response under the entry word. MOT-09/10/11/12 preserve input lifecycle, exact return, static reduced motion and shared export tracks; MOT-14 leaves actual seeking to the host. MOT-13/15: recorded implementation critique is not rendered acceptance. CSS hover stops on departure; React completes playback.

## User Context
Use “Choose starting word” as the accessible name; preserve picker keyboard guidance and real selected state. Static mode retains the whole I-beam and all text. Compact label/recognition review and platform integration remain pending.

## Top Opportunities
Implemented: correct text/caret hierarchy, eliminate dot-like content, align the selection to an actual baseline. Remaining: user judgment of the I-beam's ambiguity between selection and editing.

## Encoded storyboard and review
[Source](../../src/motions/start-at-text.ts): 1120ms. `start-caret` pivots at (4,6.5), waits to 100ms and arrives one 5.5-unit line below at 360ms. `start-word-line` originates at (8,14), opens by 510ms, holds to 710ms and clears by 820ms. Caret returns from 850–1120ms.

[Revision checks and limits](../motion-evidence/cognimated-reader-refinement/README.md). Tests verify sentence-center alignment, equal line pitch, minimum word lengths and stroke-inclusive gutter clearance. Prior screenshots are of the rejected horizontal-seeking arrangement. No new browser visual review was performed; user owns that review.
