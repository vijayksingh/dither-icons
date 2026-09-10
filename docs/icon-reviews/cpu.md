# cpu: Interface Craft review

## Context
A processor receives inputs, changes a register, and emits a result. Use for compute/device affordances, not as an execution-success status.

## First Impressions
The rejected single traveler barely distinguished a CPU from any connected dot. The new die clocks four visible cells before it can transmit. This creates an intermediate processing state with a dependency on completed input.

## Visual Design
Twelve lower-contrast pins and the rounded package stay fixed. Three faint orthogonal traces feed a four-cell die. Cells fit inside the core aperture with a half-unit gap. Signal dots follow actual trace corners; the output echo stays inside the viewBox.

## Interface Design
Three staggered lanes load the core. All inputs arrive before the first register activation. Cells clock in reading order, hold together, gather toward the output gate, then release one pulse through the middle right pin. Exterior ticks follow its arrival.

## Consistency & Conventions
MOT-01/03/04/05/07/08/15/16 govern identity, connected parts, timing and localized consequences. MOT-09/10/11/12 retain the shared replay, exact return, stillness and export contracts. MOT-14 reserves application state for the host.

## User Context
The fixed chip remains recognizable when effects disappear. At compact scale the center activation and left-to-right handoff carry the meaning; full register detail is intended for larger previews. No simulated hardware metric or success claim.

## Top Opportunities
Expose the register operation; connect traces and travelers geometrically; emit only after the complete register is available.

## Encoded storyboard and review
[Authored timeline](../../src/motions/cpu.ts). 1640ms: input begins at 120ms with 55ms stagger; final receipt at 500ms; cells clock at 560/635/710/785ms; loaded hold to 865ms; gather by 950ms; output reaches its pin at 1110ms; echo at 1180ms; clear by 1400ms. All core/package geometry is stationary.

Reviewed the complete live sequence at actual and half speed, eight inspected poses, and identical 58% part matrices across dither/solid/outline. Input and output are visibly connected; temporary marks clear before the final rest. Keyboard playback finishes after departure; reduced motion leaves no active tracks or visible accents. User accepted this concept-level revision on 2026-09-10 and requested the next batch.

[Evidence and limits](../motion-evidence/refinement-08/README.md).

![Native half-speed sequence, Terminal / CPU / Chart / Bolt left to right](../motion-evidence/refinement-08/native-filmstrip.png)
