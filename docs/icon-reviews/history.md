# History: Interface Craft review

## Context
Earlier activity and saved Workspace versions. Existing History icons appear in Dashboard history (`app/src/routes/dashboard.tsx:511`) and Checkpoint entries (`app/src/routes/workspace.tsx:91`). This is distinct from Retry or Restore.

## First Impressions
The conventional clock inside a return ring provides a concrete action: move its hands backward to an earlier time. Spinning the entire ring would blur the difference between history and retry.

## Visual Design
The ring and attached head remain fixed. Its endpoint is derived from the actual circular arc, and the head joins that point. Minute and hour hands share a round pivot and stay well inside the ring. The hierarchy is ring, hands, then the fine traveling light.

## Interface Design
A small forward take-up precedes a quarter-turn rewind. The hour hand follows the minute hand at a 1:12 angular ratio with identical easing. The earlier time holds while the ring light reaches the arrowhead; a local catch follows arrival. The hands then return to the original time.

## Consistency & Conventions
MOT-01/03/05/07/08/15/16 guide identity, relationships, material and the semantic finish. MOT-09/10/11/12 preserve complete finite playback, exact rest, stillness and shared export timing. MOT-14 leaves application state to the host. Future platform use follows UI-2/4, COLOR-2/5, A11Y-2/4 and MOTION-1/4/6/7.

## User Context
This is a history affordance, not a clock displaying real time and not a Checkpoint restoration result. The fixed outer shape remains useful with motion off. Small-size clarity comes from the ring and hands; ring light is optional.

## Top Opportunities
Put rewind into the hands; preserve their geared relationship between keyframes; keep the carrier and arrowhead physically joined.

## Encoded storyboard and review
[Timing source](../../src/motions/history.ts). 1460ms. Prepare 120ms; rewind by 490ms; trace reaches the head at 580ms; recall marks at 650ms; hold until 860ms; clear 1060ms; original hands at 1300ms. Actors: history-minute, history-hour, history-trace, history-recall.

The two hands visibly rewind as one clock; the ring does not rotate. The earlier position remains readable during the hold, and all marks clear before rest. The compact silhouette is distinct from the existing Retry icon. Reviewed seven poses, actual-speed keyboard completion, native half-speed playback, three materials, light Cobalt/dark Iris, reduced motion, motion off, narrow layout and compact standalone SVGs. [Evidence and limits](../motion-evidence/platform-09/README.md). Implementation and rendered review are complete; user acceptance is pending.

![Browser sequence: Back, History, Collapse Panel and Zoom Out](../motion-evidence/platform-09/native-filmstrip.png)
