# Read Aloud: Interface Craft review

## Context
Cognimated's Read Aloud mode relates microphone input to article text recognized by speech processing. Only real recognition earns durable progress. This is not Listen's synthesized audio output.

## First Impressions
The rejected drawing put a large microphone on the right and scattered short prose on the left. The revision centers the microphone above a two-line transcript, replacing two side-by-side symbols with one vertical composition. The wide stand and surplus grille bars are removed.

## Visual Design
The capsule centers at x=12, spans x=9–15 and y=3–11. A stationary 10-unit cradle and short stem end above the transcript; its first row spans x=5–19 at y=18, with a second row at 21.5. Contours are 1.5 units, text 1.25 and diaphragm/response details 1. The single diaphragm remains within the capsule even at its full response. All identifying contours remain visible in every frame.

Outline correction: microphone capsule/cradle now use transparent cores and 0.5-unit boundary rails. Transcript strokes stay single-line at 0.9 units; diaphragm, input and word responses use 0.75. The capsule's outer footprint and aperture bounds remain intact while its wall gains a transparent center (MOT-01/05/07/12). Pixel checks verify transparency, visible edge and distinct materials at 16/24/48px. Receiving/word-response timing is unchanged; user optical approval remains pending.

## Interface Design
Two small input marks approach from the left; the internal diaphragm receives, then relaxes. Only afterward do the two transcript words receive ordered underlines. Keep transcript and microphone fixed. No detached endpoint witness, checkmark, fake recognized word or success badge is introduced.

## Consistency & Conventions
MOT-01/02/03/05 preserve microphone identity, receiving semantics, causal order and fixed transcript. MOT-06/07 keep local travel and attached grain. MOT-08/16 place word responses after reception. MOT-09/10/11/12 preserve finite playback, exact return, static reduced motion and shared export data. MOT-14 reserves recognition/progress for the platform. MOT-13/15: tests are not rendered visual approval. CSS hover ends on departure; React finishes playback.

## User Context
Keep the native mode label and truthful permission/STT/paused states. Still mode retains the microphone plus transcript. Physical-device microphone behavior, compact toolbar legibility and user approval remain pending; this library revision adds no integration.

## Top Opportunities
Implemented: center the microphone, group prose beneath it, remove stand/grille clutter, harmonize strokes. Remaining: user assessment of the stacked transcript metaphor at small sizes.

## Encoded storyboard and review
[Source](../../src/motions/read-aloud.ts): 1340ms. `aloud-input` approaches by 120ms; `aloud-diaphragm` at (12,7) receives at 260ms and rests at 380ms. `aloud-phrase-0/1` originate at each transcript baseline start (y=19.5), respond at 520/690ms, hold to 860ms and clear by 1020ms.

[Revision checks and limits](../motion-evidence/cognimated-reader-refinement/README.md). Tests cover capsule clearance, microphone/transcript centering and reception-before-text order. Old right-hand microphone screenshots do not depict this revision. No new browser visual review was performed; user owns that review.
