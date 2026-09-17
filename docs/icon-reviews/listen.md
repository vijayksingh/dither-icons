# Listen: Interface Craft review

## Context
Cognimated's Listen mode speaks article text. The page is the source, unlike Volume's speaker and Read Aloud's microphone input. The host owns playback and voice availability.

## First Impressions
The rejected tall page, large fold and large sound field competed for space. The revision replaces the folded sheet with a broader, shorter rounded page and two smaller arcs centered on its middle text line. It removes the third transient wavefront.

## Visual Design
The page occupies x=3–14.5, y=4–20 with 2-unit corners. Three text rows share x=6; the active source is centered at y=12. Sound arcs span y=9.5–14.5 and 7–17. Page and waves share 1.5-unit contours, text uses 1.25 and the temporary underline uses 1. The page/wave grouping fits inside the 24-unit viewBox throughout motion.

## Interface Design
Underline the retained source line first; the near arc then travels outward 0.35 units and the farther arc follows by 0.5 units. Keep the source marked during propagation. The arcs recover at different times, without disappearing or inflating the entire icon. The source underline and outward handoff provide the payoff.

## Consistency & Conventions
MOT-01/02/03/05 preserve the speaking-page metaphor and source-before-output sequence. MOT-06/07 preserve restrained motion and attached grain; MOT-08/16 keep feedback at its cause. MOT-09/10/11/12 retain complete native playback, neutral return, static reduced motion and shared CSS/WAAPI tracks. MOT-14 excludes actual audio/status claims. MOT-13/15 keep user visual acceptance separate. Standalone CSS hover cannot finish after pointer departure; React can.

## User Context
Keep the native Listen label and actual pressed/disabled state. Voice settings and playback errors remain application feedback. Solid/outline retain this same line construction; dither adds contour-bound grain. Compact recognition and cross-browser behavior remain unreviewed for this revision.

## Top Opportunities
Implemented: remove the heavy fold, shorten and widen the page, reduce the sound field and redundant accent. Remaining: user assessment of optical balance beside the other three controls.

## Encoded storyboard and review
[Source](../../src/motions/listen.ts): 1220ms. `listen-source` at (6,13.5) reads from 80–300ms. `listen-near` and `listen-far` use page-edge origin (14.5,12); near crests at 440ms, far begins at 470ms and crests at 640ms. Source holds to 720ms/clears by 820ms; near rests at 960ms, far at 1120ms.

[Revision checks and limits](../motion-evidence/cognimated-reader-refinement/README.md). Tests derive actual cubic contours from the artwork and sample wave separation across their shared height, including worst relative travel. Old folded-page screenshots are historical. No new browser visual review was performed, per user scope.
