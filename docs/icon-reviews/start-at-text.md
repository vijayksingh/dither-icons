# Start at Text: Interface Craft review

## Context
Cognimated exposes “Choose guided reading starting word” (`web-absorb/extension/content/reading-focus-timer.js:1032`), with arrow-key selection and Enter to start. The icon denotes choosing an entry point, not inserting or rewriting article content.

## First Impressions
An I-beam moves through retained words and identifies the following word with a baseline. The symbol separates seeking from playback, but user feedback found the text/caret composition insufficiently composed. The isolated short word and large vertical gaps still need visual judgment. This is an unapproved implementation.

## Visual Design
The caret is 1.35 units wide, has 0.8-unit cap half-widths and spans y=9.5–15.4. Text strokes are 1.6 units. Context lines remain at y=5.2 and 19.1; the selected row sits at 12.5. The caret lands at x=10.15, between a short first word ending at 7.6 and a second beginning at 13. Cap clearance was corrected during implementation. Text being heavier than the caret is an outstanding hierarchy concern from the user's feedback, not a claimed standard.

## Interface Design
Take up 0.35 units of travel, place the I-beam in the second gap, grow a baseline under the word immediately to its right, then register at that baseline's end. Retain text throughout. Clear the baseline before returning the caret, so the cue cannot imply two selected starting words. The library never seeks or starts speech itself.

## Consistency & Conventions
MOT-01/02/03/05 preserve I-beam identity, placement semantics, causal selection and fixed prose. MOT-06/07 keep controlled travel and attached texture. MOT-08/16 delay the local endpoint response until after baseline growth. MOT-09/10/11/12 preserve the existing input, neutral-return, stillness and shared-timing contracts. MOT-13/15 require individual review; MOT-14 reserves actual seeking for the host. Standalone CSS hover stops on departure; React finishes an initiated gesture.

## User Context
Keep “Choose starting word” as the accessible name; the I-beam alone can also suggest editing. The host retains picker state and keyboard guidance. Motion-off preserves the complete caret and text. Compact sizes and article-toolbar integration were not reviewed after the user took over visual feedback.

## Top Opportunities
Improve baseline alignment and the proportion of text to caret; reconsider the isolated short segment; preserve a clear entry-point metaphor without adding editing implications. Further visual iteration was stopped on user instruction.

## Encoded storyboard and review
[Timing source](../../src/motions/start-at-text.ts). 1280ms: `start-caret` prepares at 110ms and seats at 410ms; `start-word-line` opens by 530ms; `start-registration` responds at 630ms; accents clear at 880ms before the caret returns from 950–1280ms. Pivots are the caret's row center, the selected word's baseline start, and its endpoint.

The prior live studio review sampled rest, preparation, action, recovery and rest again at 0/10/30/50/70/100%. [Evidence](../motion-evidence/cognimated-reader-01/README.md) records material rebinding at 640ms, complete keyboard-triggered recovery, and zero active animations under reduced motion. These checks do not override the user's composition rejection. Small-size recognition and final visual acceptance remain open.
