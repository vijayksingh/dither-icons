# Vivid: Interface Craft review

## Context

`VividIcon` represents `data-mode="vivid"` in `web-absorb/extension/content/selection-transform-controller.js:569`. The host owns the rewrite and result state. The icon communicates language gaining expressive specificity through one localized word-level accent.

## First Impressions

The previous star-and-plus pairing added symbols beside text without showing what became vivid. This revision makes one focus word the cause. A small ink flourish grows from that word's baseline, while the neutral phrase remains intact. The accent is attached language, not ambient decoration.

## Visual Design

Four context lines retain the phrase structure. The focus word sits on the first baseline at `x=7.6`; it gathers, then gains visible weight and rises 0.3 units. A calligraphic swash grows from the word's own end at `x=10.7`, dips through the line gap and flicks upward before retracting into the word. No sparkle, plus, underline or detached highlight exists.

## Interface Design

The phrase prepares, the focus word gains weight, the swash grows out of its end, the accent holds briefly, then retracts before the word returns. This is a localized expressive edit, not discovery, selection, send or success feedback.

## Consistency & Conventions

MOT-01/05 retain phrase structure and one fixed focus word. MOT-02/03 make the accent causally dependent on the word and share its coordinate neighborhood. MOT-04/06 bound lift and ink growth to compact scale/opacity changes. MOT-07 keeps dither attached to text and accent contours. MOT-08/16 delay ink peak until focus has registered, then decay the accent independently. MOT-09/10/11/12 provide finite playback, exact neutral return, reduced-motion stillness and shared React/SVG timing. MOT-14 leaves rewrite success external. MOT-15 distinguishes Vivid from Sparkles by local attachment and from Plus by language-specific geometry.

## Storyboard

```text
  0ms  neutral phrase waits with one identified focus word
 80ms  the focus word gathers without disturbing phrase structure
240ms focus word gains weight and rises on its fixed baseline
320ms the swash starts at the word's end
440ms swash reaches expressive peak; focus remains readable
620ms word and swash hold as one local emphasis
740ms swash retracts into the word
860ms focus weight releases; 1040ms exact neutral phrase is restored
```

## Named geometry and timing

`VIVID_TIMING` names `prepare`, `focus`, `inkStart`, `inkPeak`, `hold`, `clear`, `release` and `settle`. `VIVID_GEOMETRY` names the focus pivot and the swash origin on the word's end. `vivid-focus-word` and `vivid-ink-accent` have separate transform/opacity tracks. No color mutation, per-frame React state or detached response actor.

## User Context

Use still Solid or Outline at repeated popover size; Dither remains a larger reference material. Host labels, focus, loading/disabled state, selection and returned text remain authoritative. Reduced motion retains neutral phrase, focus word and attached ink silhouette.

## Top Opportunities

1. Keep the swash start tangent to the word's end; any gap turns it into decoration.
2. Keep context lines stable so emphasis reads as a word-level rewrite.
3. Check thin Outline accent clearance at 16–24px.

## Encoded storyboard and review

[vivid.ts](../../src/motions/vivid.ts) encodes the storyboard at 1040ms. Focused tests assert focus weight and rise, the swash origin on the word's end, visibility, authored paths, absence of sparkle/plus/underline actors, finite tracks, reduced motion and exact return. Browser replay and user optical review remain pending; no approval is claimed.
