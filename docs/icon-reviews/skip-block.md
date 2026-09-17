# Skip Block: Interface Craft review

## Context
Skip the current article chunk in guided reading: `.skip-block`, “Skip current block”, at `web-absorb/extension/content/reading-focus-timer.js:1035`. This is not next-page navigation or audio fast-forward. The host determines the real next block and eligibility.

## First Impressions
Source-level critique: two retained text chunks, a hooked bypass arrow and a margin bracket communicate chunk scope. The user flagged the first drawing's alignment/SVG defects. Its intersecting stem/head strokes have been replaced with one closed arrow contour; the bracket and text have more clearance.

## Visual Design
Text spans x=12–21, with source baselines y=6/9 and receiving baselines y=16/19. The bracket at x=9.75 spans y=5.5–9.5, aligned around both source lines. The hooked arrow ends at the receiving block's center, y=17.5. Its closed contour has no duplicate head/stem join in Outline. Bracket contours use 1.05 Solid / 1.35 Dither or Outline; text is 0.9 (0.8 Outline).

## Interface Design
Withdraw the bracket 0.5 into the empty gutter, pass the complete chunk by 10 units, then seat beside the receiving block. The receiving underline responds only after arrival. Clear it before reversing through the gutter. Both text chunks and the hooked arrow remain fixed; no text disappears and no skipped block earns reading credit.

## Consistency & Conventions
MOT-01/02/03/05 preserve retained content and the bypass relationship. MOT-06/07 keep the marker rigid and grain attached. MOT-08/16 require response after seating. MOT-09/10/11/12 provide finite triggers, exact rest, reduced-motion stillness and common SVG/React timing. MOT-14 leaves progress to the host. MOT-13/15 user approval remains pending. CSS hover stops on departure; React completes playback.

## User Context
Retain “Skip current block”, real disabled state, focus and target size. Use still compact variants for frequent repeated actions. The resting hook and separated chunks must convey scope without motion; the user will assess this at toolbar sizes.

## Top Opportunities
Implemented from screenshots: continuous arrow silhouette, lighter contour and clearer gutter alignment. Remaining: human distinction from Start at Text at 16px.

## Encoded storyboard and review
[Timing](../../src/motions/skip-block.ts): 1380ms. `skip-marker` origin (9.75,5.5), withdraw 140ms, bypass 430ms, arrive 550ms. `skip-next-line` origin (12,17.5), response 680ms, hold 820ms, clear 940ms. Return: out at 1080ms, up at 1240ms, neutral at 1380ms.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests compare actual drawn baselines, bracket/arrow clearance, closed arrow contour, preserved text and delayed response. Initial screenshots document rejected joins; no corrected rendered acceptance is claimed.
