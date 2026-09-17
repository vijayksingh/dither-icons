# Read Aloud: Interface Craft review

## Context
Cognimated's “Read aloud” mode (`web-absorb/extension/content/reading-focus-timer.js:1048`) relates microphone input to recognized article text. The microphone must remain distinct from Listen's page-to-audio output. Only real recognition may earn durable reading progress.

## First Impressions
A fixed microphone receives an inward cue before text baselines answer. The direction is distinct from Listen. User feedback found the microphone and detached prose insufficiently composed; the current arrangement remains a draft for the user's review.

## Visual Design
The microphone is centered at x=17.2, with a 4.8-unit-wide capsule, cradle and stand. Capsule/cradle strokes are 1.5 units; prose is 1.35; grille and response details are 0.65. An inner diaphragm expands within the capsule's actual aperture. The text occupies x=2.8–9.7 with large vertical gaps. That separation, the heavy right-hand microphone, and the text hierarchy are unresolved visual concerns. All identifying parts remain present without animation.

## Interface Design
Two inward marks approach the stationary capsule. Its diaphragm receives them, then relaxes. Only afterward do two word baselines respond in order; an endpoint witness follows the full phrase. The full printed text stays intact. No checkmark, fabricated recognized word, progress increment, permission state or completion badge appears.

## Consistency & Conventions
MOT-01/02/03/05 preserve microphone identity, input semantics, causal order and fixed reference. MOT-06/07 keep motion local and grain attached. MOT-08/16 locate the phrase response after reception. MOT-09/10/11/12 retain single complete native performances, neutral return, stillness and shared CSS/WAAPI data. MOT-13/15 require an individual record; MOT-14 explicitly excludes recognition/progress claims. CSS-only hover ends on departure; React finishes playback.

## User Context
The host owns microphone permission, connectivity, recognition confidence, paused state and actual progress. A labeled native button remains necessary. Reduced motion preserves the microphone and phrase; it does not remove a real status because no actual status is encoded by the gesture. Physical-device audio and call-site testing are outside this batch.

## Top Opportunities
Compose microphone and prose as one clearer symbol; reduce incidental grille/text detail where compact rendering demands it; harmonize optical weight with Listen. These await user visual review under the latest instruction.

## Encoded storyboard and review
[Timing source](../../src/motions/read-aloud.ts). 1540ms: `aloud-input` approaches at 140ms; `aloud-diaphragm` peaks at 300ms and rests at 440ms; `aloud-phrase-0` responds at 580ms, `aloud-phrase-1` at 760ms, and `aloud-registration` at 830ms; responses clear at 1120ms. The diaphragm's local (17.2,10.6) origin keeps expansion centered and within its capsule.

[Prior browser evidence](../motion-evidence/cognimated-reader-01/README.md) records rest/preparation/action/recovery/rest, material rebinding at 770ms, duplicate Enter suppression and full recovery after focus departure. Reduced-motion replay left zero animations, identity opacity 1 and accents at 0. Those facts establish runtime behavior only; user composition concerns remain unresolved and no final compact-size review was completed.
