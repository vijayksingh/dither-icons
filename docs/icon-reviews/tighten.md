# Tighten: Interface Craft review

## Context

`TightenIcon` represents `data-mode="concise"` in `web-absorb/extension/content/selection-transform-controller.js:568`. The host owns the selected range and rewrite result. The icon communicates shorter wording while preserving order and baseline.

## First Impressions

The previous opposing-clamp drawing showed pressure around an abstract block, not language becoming shorter. This revision gives the block eight visible word units. Bounds move inward while every word keeps its row and order. Compression therefore changes word spacing and line extent, not navigation direction.

## Visual Design

Two bounded edges at `x=3.2` and `x=20.8` establish the measured extent. Five ordered word units occupy the upper baseline and three occupy the lower baseline. Each unit has its own origin and `scaleX`/`translateX` pose. Bounds and words compress together; no arrowhead, underline, registration mark or generic clamp actor remains.

## Interface Design

The user sees bounds brace the phrase, word units compress, the shorter block seats, then everything releases. Baseline and order are invariants. The icon does not imply moving to another destination or confirm that a rewrite was accepted.

## Consistency & Conventions

MOT-01/05 preserve word order, baselines and bounded reference edges. MOT-02/03 make each word unit participate in one horizontal compression rather than moving all artwork as a rigid group. MOT-04/06 use brief preparation, bounded travel and a short seat. MOT-07 keeps dither attached to bounds and words. MOT-08/16 let the seat itself be the climax; no separate decorative registration payoff is needed. MOT-09/10/11/12 cover finite playback, exact neutral return, reduced-motion stillness and shared React/SVG timing. MOT-14 leaves rewrite state to the host. MOT-15 distinguishes Tighten from ArrowLeft/ArrowRight through word geometry, not direction.

## Storyboard

```text
  0ms  bounded phrase waits with eight ordered word units
 80ms  left/right edges prepare; words keep baseline and order
280ms edges move inward; each word compresses on its own origin
400ms shorter text extent seats between the bounds
700ms compressed wording holds without changing row order
820ms bounds and word units release through the same tracks
1040ms all units return exactly to neutral
```

## Named geometry and timing

`TIGHTEN_TIMING` names `prepare`, `compress`, `seat`, `hold`, `release` and `settle`. `TIGHTEN_GEOMETRY` names edge positions and baselines. `TIGHTEN_WORD_ORIGINS` and `TIGHTEN_WORD_POSES` make all eight semantic units explicit. Tracks use transform only; no per-frame React state.

## User Context

At popover size, Solid or Outline remains preferred for repeated use. Host must preserve label, focus, selection boundary and loading/disabled state. Reduced motion leaves bounds, all word units, baseline and order visible.

## Top Opportunities

1. Keep every word readable enough at the reference size to prevent the icon becoming two abstract walls.
2. Preserve the eight-unit order during the squeeze; that is the semantic proof.
3. Check Outline for gaps between adjacent upper-row units after compression.

## Encoded storyboard and review

[tighten.ts](../../src/motions/tighten.ts) encodes the storyboard at 1040ms. Focused tests assert eight words, origins, edge travel, baseline-preserving compression, authored paths, absence of navigation/decorative actors, finite tracks, reduced motion and exact return. Browser replay and user optical review remain pending; no approval is claimed.
