# Expand View: Interface Craft review

## Context

**Expand a Problem Unit visualizer into a larger view.** Actual platform call site: `routes/problem.$slug.tsx:1786–1795` sets expanded only when canExpand; its current ExpandIcon accompanies Expand / Desktop required.

## First Impressions

Four open corners must read as a view boundary, distinct from External Link. Two fixed content marks make increased room legible without zooming the subject.

## Visual Design

**Identity boundary:** Every corner is a rigid L with constant weight. The subject stays fixed, all four corners remain in view, and the icon never becomes a loader or external-link arrow.

## Interface Design

Corners gather slightly, move outward in opposing pairs, and settle. Close corner echoes follow the settled extent, then fade before the frame returns.

## Consistency & Conventions

MOT-01/03/05 bind meaning, causal attachment and stable references. MOT-07/08/16 bind attached grain and a localized climax. MOT-09–15 bind completed playback, exact rest, keyboard, stillness, shared export timing and individual rendered review. Platform handoff: UI-2/4, COLOR-2/5, A11Y-2/4 and MOTION-1/4/6/7.

## User Context

Retain canExpand, disabled guidance and the native Expand label. Preview motion does not enter fullscreen or imply an unavailable mobile visualizer. Frequent compact controls should use still solid/outline, with their native target and accessible label. Use the full dither gesture for larger, infrequent entry points.

## Top Opportunities

1. Preserve the familiar control silhouette through every frame.
2. Stage the response after its physical cause, at the relevant part.
3. Keep the static variant and the real platform state authoritative.

## Encoded storyboard and review

**Gather / Expand / Breathe · 1440ms.** [expand-view.ts](../../src/motions/expand-view.ts) records the timestamp storyboard and named actors; [PlatformActionsArtwork.tsx](../../src/PlatformActionsArtwork.tsx) owns the original drawing.

| Actor | Timing and attachment |
| --- | --- |
| Four rigid corners | Gather .3px inward at 130ms; extend 1.9px at 470ms; settle at 1.6px by 580ms |
| Two diagonal echo pairs | Peak at 660 / 710ms after the settled extent; clear 940ms |
| Return | Original boundary at 1240ms; static central content never moves |

All four L shapes keep their weight and remain within the viewBox. Echoes are nested within their respective moving corners; the first diagonal pair is followed by the other. Two unchanged center lines establish that the view gains room around its subject. No arrow or zoom metaphor competes with the expand affordance.

Actual and half-speed sequences reviewed through recovery. Eight native poses at 0/10/24/34/46/52/82/100% have identical initial/final computed states. Dither, outline and solid retain the same 52% pose. Each icon was keyboard-replayed, allowed to finish after Tab departure, cancelled under reduced motion and disabled with motion off. Light/dark, 24px solid, 64px dither and a 390px two-column layout were inspected. See [batch validation](../VALIDATION.md) for evidence and limits.

**Reference position: 3 of four.**

![expand-view motion reference](../motion-evidence/platform-08/pose-46.png)

[Rest](../motion-evidence/platform-08/pose-0.png) · [Outline](../motion-evidence/platform-08/outline-52.png) · [Light solid](../motion-evidence/platform-08/light-solid-52.png) · [Compact](../motion-evidence/platform-08/collection-solid-24.png)
