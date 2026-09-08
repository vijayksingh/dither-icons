# upload: Interface Craft refinement 01

## Context
**Meaning:** release an item upward from a local source. The upward arrow and open tray are invariant. Download's accepted impact is the craft reference, but upload expresses release rather than reception. This supersedes the broad-rollout review.

## First Impressions
The former arrow slid upward while the complete tray scaled. It had little distinction from arrow-up. The first revised release flare also blended into the tray opening; the user's missing-climax critique prompted moving the flare outside the rim.

## Visual Design
The bed stays still; the two side walls pivot slightly around their bases. The arrow head leads a connected stem while its foot follows. The tip rests at y=3.5 to give the upward release breathing room, retaining an ordinary upload silhouette.

A narrow line of light gathers just above the source bed. Two fine strokes then flare upward outside the rim. The light belongs to the loaded source; the outward strokes belong to its release. The solid and outline versions preserve the same event without depending on dither.

## Interface Design
The arrow loads downward until 170ms and begins its release. The source light peaks at 210ms. Side walls remain gathered until 245ms, then open; the flare crests at 330ms and the head reaches full rise at 355ms. The foot catches up at 560ms. The tray is still again at 800ms, before the arrow's final return.

## Consistency & Conventions
MOT-01–13, MOT-14, MOT-15, MOT-16. Like Download, the supporting container reacts and produces a localized response. Unlike its reception timing, the source gathers light before the upward motion clears it. No checkmark, detached arrow, vanished payload, or claim of a completed upload.

## User Context
The icon is a reusable upload affordance, not a progress indicator. It should feel ready to release without pretending that network work has finished. Reduced motion keeps the complete arrow and tray with all light effects hidden.

## Top Opportunities addressed
1. Put the release in the source walls and the arrow's lagging foot.
2. Give the release a visible flare outside the tray, not a buried interior detail.
3. Let the source settle first, then return the arrow gently.

## Encoded storyboard
Source: [upload.ts](../../src/motions/upload.ts). `TIMING`, `UPLOAD_STEM`, `HEAD`, `FOOT`, `LIPS`, `RELEASE`, and `EASING` contain the physical/timing values.

| Time | Action |
| --- | --- |
| 0–170ms | Arrow gathers downward; side walls incline inward 7 degrees. |
| 90–210ms | Source light gathers and crests. |
| 170–355ms | Head releases upward 2.15 units while its foot lags. |
| 245–440ms | Walls release outward after clearance. |
| 245–330ms | Exterior release strokes appear and crest. |
| 330–670ms | Flare travels upward and dissipates. |
| 560–800ms | Foot catches up; source walls settle. |
| 800–1180ms | Arrow eases home; all accents disappear. |

## Rendered review
Fourth icon from the left. Inspected at 0%, 10%, 35%, 70%, and 100%; actual and half-speed replay; dither/solid/outline. The source flare is now visible outside the tray, the arrow stays joined, and the bed does not bounce. Outline wall joins remain connected through their small rotations. [Batch validation](../VALIDATION.md#focused-refinement-01--2026-09-09) records interaction checks.

![Four-icon crest; upload is fourth](../motion-evidence/refinement-01/crest.png)

[Rest](../motion-evidence/refinement-01/rest.png) · [Preparation](../motion-evidence/refinement-01/prepare.png) · [Recovery](../motion-evidence/refinement-01/recover.png) · [Light solid](../motion-evidence/refinement-01/solid-light.png)
