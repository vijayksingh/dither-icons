# Listen: Interface Craft review

## Context
Cognimated's “Listen” mode (`web-absorb/extension/content/reading-focus-timer.js:1047`) speaks article text. A page is the source, unlike Volume's loudspeaker or Read Aloud's microphone input. Selecting this mode and starting playback remain platform actions.

## First Impressions
The folded page and two persistent sound arcs identify text-to-speech at rest. The written phrase precedes outgoing sound during playback. User feedback rejected the overall batch's shape/composition quality; the tall narrow page, fold and wave proportions remain subject to that review.

## Visual Design
Page and sound contours use 1.5-unit round strokes; text uses 1.1; transient underlines/front use 0.65. The page occupies x=3.2–13.8 and y=3–21. Wave contours remain separate and inside the viewBox at peak travel. The document, its fold and prose never disappear. Dither is clipped into each contour and moves with its group. Solid and outline share this line-based construction, as in the existing navigation family.

## Interface Design
First underline one written word, then the next. Only after the phrase is ready does the near sound arc move. The farther arc responds later, followed by a fine exterior front. Keep the full source page and both arcs visible during independent recovery. No actual audio, download or playback status is simulated.

## Consistency & Conventions
MOT-01/02/03/05 preserve a speaking page and source-before-output order. MOT-06/07 limit contour travel and retain texture. MOT-08/16 keep the front subordinate and downstream of its cause. MOT-09/10/11/12 retain the common complete native gesture, exact return, reduced-motion and shared export tracks. MOT-13/15 govern this review; MOT-14 separates illustration from real speech playback. CSS-only hover cannot finish after pointer departure; React can.

## User Context
Keep a labeled native mode button and its actual pressed/disabled state. Voice selection, availability and audio errors need real platform feedback. The static page/arcs remain recognizable with motion disabled. Compact readability and the user's composition approval remain open.

## Top Opportunities
Unify page/fold/wave proportions; assess optical center against Read Aloud; verify that the text-to-speech distinction survives toolbar size. No further visual changes were made after the user took over review.

## Encoded storyboard and review
[Timing source](../../src/motions/listen.ts). 1480ms: `listen-word-0` reads from 120–300ms; `listen-word-1` follows to 450ms; `listen-near` crests at 570ms, `listen-far` at 730ms, and `listen-front` at 820ms. Accents clear at 1080ms; waves return by 1160/1300ms; neutral at 1480ms. Waves use the page-edge origin (13.8,12); word reveals originate at their own baselines.

[Prior browser evidence](../motion-evidence/cognimated-reader-01/README.md) includes all six sampled phases, material changes retaining 740ms, keyboard replay/retrigger checks and reduced-motion cancellation. No wave clipping was observed at those inspected poses. These observations are not final visual approval, cross-browser/device proof, or Cognimated integration proof.
