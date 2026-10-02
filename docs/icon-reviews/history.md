# History: Interface Craft review

## Context
Earlier activity and saved Workspace versions. Existing History icons appear in Dashboard history (`app/src/routes/dashboard.tsx:511`) and Checkpoint entries (`app/src/routes/workspace.tsx:91`). This is distinct from Retry or Restore.

## First Impressions
The conventional clock inside a return ring provides a concrete action: move its hands backward to an earlier time. Spinning the entire ring would blur the difference between history and retry.

## Visual Design
The ring and attached head remain fixed. The head vertex sits 1.1 units past the endpoint derived from the actual circular arc, with barbs swept ±42° around the tangent so they cover the shaft's cap without fusing into the ring. Minute and hour hands radiate from a shared round pivot that covers their meeting point. The hierarchy is ring, hands, then the fine traveling light.

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


## Outline material correction — 2026-10-02

**Invariant and critique:** A counterclockwise return ring encloses two distinct clock hands. Open ring and hand strokes, outline the hub, and occlude the hands beneath that fixed hub so its center stays transparent during rewind.

**Material rule:** Reuse the reader's 0.5-unit Outline edges and transparent cores. Fine text and small semantic dots stay readable. Applicable: MOT-01, MOT-03, MOT-07, MOT-10, MOT-11, MOT-12, MOT-13 and MOT-15.

**Storyboard retained:** Rewind / Recall / Hold, 1460ms. Authored tracks remain: `history-minute`, `history-hour`, `history-trace`, `history-recall`. This correction changes material, not the semantic action or timing.

**Rendered review:** [Before/after and compact review](../outline-audit/README.md#correction-evidence) plus [actual 50% browser pose](../outline-audit/browser/pose-50.png). The six inspected poses are 0%, 10%, 35%, 50%, 75% and 100%; actor binding, material-switch pose preservation, keyboard completion and stillness checks are recorded with that evidence. User visual approval remains pending. Standalone SVG retains the authored CSS tracks; CSS hover still ends on departure while React finishes its gesture.
