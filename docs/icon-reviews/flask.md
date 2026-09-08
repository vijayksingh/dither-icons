# flask: Interface Craft review

## Context

New platform icon: **represent a Lab Unit and bounded experimentation**. Selected from observed CraftingAttention flows; see [PLATFORM-ICONS.md](../PLATFORM-ICONS.md).

## First Impressions

Lab labels in study plans and the command palette already use FlaskConical. The library was missing a material-matched equivalent, and an arbitrary whole-flask wiggle would obscure the experimental meaning.

## Visual Design

The upright glass encloses a dithered liquid surface. A fixed chamber clip contains all liquid, bubble, and fizz geometry. A single bubble rises above the meniscus; the glass remains steady. Outline uses a single vessel contour and meniscus.

## Interface Design

The liquid gathers, rolls across, and produces one rising bubble. Three short fizz marks follow its release, then a meniscus light and diminishing tilt settle. The sequence is finite.

**Identity boundary:** The vessel remains upright and recognizable, with its contents contained. This preview does not represent a successful Run or chemistry simulation.

## Consistency & Conventions

MOT-01–08 preserve identity, parts, stable references, and attached grain. MOT-09–13 bind completion, exact rest, reduced motion, common timing, and rendered verification. MOT-14–16 require truthful preview semantics, an individual review, and a perceptible causal climax. Platform handoff rules: UI-2, A11Y-2/4, COLOR-2, MOTION-1/6/7. The native parent supplies its real action and accessible name.

## User Context

The Learner may be concentrating on difficult work. Keep the glyph useful while still. Prefer solid or outline at 24px; use dither at 48px and larger. In high-frequency platform controls, use a still icon or short state feedback under MOTION-6; this full gesture is an optional invitation, never the sole state cue.

## Top Opportunities

1. Express **represent a Lab Unit and bounded experimentation** through the causal sequence above.
2. Preserve the listed identity boundary during every intermediate pose.
3. Keep the climax localized, then finish completely instead of looping.

## Encoded storyboard

**Stir / React / Settle · 1400ms**

135ms gather; 350ms roll; 540ms bubble rise; 630ms fizz; 695ms meniscus response; 1050ms liquid still; 1400ms rest.

The timestamp storyboard and single `TIMING` object are in [flask.ts](../../src/motions/flask.ts). Geometry binds in [LearningArtwork.tsx](../../src/LearningArtwork.tsx). Native React, CSS export, and the inspector share these tracks.

| Named part | Keyframe times (ms) |
| --- | --- |
| `liquid` | 0, 135, 350, 585, 760, 1050, 1400 |
| `bubble` | 0, 300, 385, 540, 585, 1400 |
| `reaction-fizz` | 0, 540, 630, 865, 1400 |
| `meniscus-light` | 0, 585, 695, 920, 1400 |

## Rendered review

Reviewed at actual and half speed and at 0%, 10%, 28%, 36%, 45%, 65%, 82%, and 100%. Dark Iris dither/outline and light Cobalt solid preserve the silhouette and causal response. All computed parts match at 0% and 100%; paused material changes preserve the 45% pose. All four were inspected together at 24px solid and 64px dither. Keyboard departure completes, reduced motion is static, and motion-off disables playback. See [VALIDATION.md](../VALIDATION.md) for recorded evidence and limits.

**Reference position: 2 of four.**

![flask, position 2, browser pose at 45%](../motion-evidence/platform-01/pose-45.png)

[Rest](../motion-evidence/platform-01/pose-0.png) · [Preparation](../motion-evidence/platform-01/pose-10.png) · [Recovery](../motion-evidence/platform-01/pose-82.png) · [Outline](../motion-evidence/platform-01/outline-45.png) · [Light solid](../motion-evidence/platform-01/light-solid-45.png)
