# Simplify: Interface Craft review

## Context

`SimplifyIcon` represents the `data-mode="simplify"` selection command in `web-absorb/extension/content/selection-transform-controller.js:567`. The host owns selection, rewrite dispatch and returned text; this icon only communicates reducing cognitive branching while preserving the main idea.

## First Impressions

The previous star-and-lines treatment decorated the label. It did not show simplification. This revision makes a branching text structure do the work: subordinate fragments fold toward one stable meaning spine. The spine remains the visual reference, so the action reads as reduction of structure rather than discovery.

## Visual Design

The spine is a continuous vertical path at `x=6.2`. Three readable main lines sit to its right. Upper and lower subordinate fragments sit on separate hinge points and fold inward in sequence. No star, plus, underline or ambient effect competes with the text structure. The main lines remain visible through every frame; dither stays attached to each authored path.

## Interface Design

The user sees one causal sentence: branches prepare, upper branch folds, lower branch folds, then the spine settles. The central meaning is never removed. The icon does not imply that a rewrite succeeded or that the host accepted a result.

## Consistency & Conventions

MOT-01/05 preserve the spine and main text as stable identity. MOT-02/03 make each branch a subordinate actor with an ordered hinge relationship. MOT-04/06 bound folds to short rotations and a restrained spine settle. MOT-07 keeps material attached to each contour. MOT-08/16 place the localized spine response after the final fold without adding a generic payoff. MOT-09/10/11/12 provide finite playback, exact return, reduced-motion stillness and one shared React/SVG source. MOT-14 leaves transformation success to the host. MOT-15 distinguishes this hierarchy instrument from Sparkles, which remains an appearance/discovery field.

## Storyboard

```text
  0ms  branching text waits around a fixed meaning spine
 90ms  upper and lower branches take tension at separate hinges
300ms  upper branch folds inward; main spine stays readable
410ms  lower branch folds inward behind the same spine
500ms  spine settles with a restrained scale 1.0 -> 1.035 response
700ms  reduced hierarchy holds briefly
840ms  folded branches release toward authored rest
1080ms all paths return exactly to neutral
```

## Named geometry and timing

`SIMPLIFY_TIMING` names `prepare`, `upperFold`, `lowerFold`, `spineSettle`, `hold`, `release` and `settle`. `SIMPLIFY_GEOMETRY` names `spineX`, `upperHingeY` and `lowerHingeY`. `simplify-branch-upper`, `simplify-branch-lower` and `simplify-spine` have independent tracks and explicit transform origins. Tracks use transform only; no per-frame React state.

## User Context

At 16–24px, Solid or Outline remains the compact choice; Dither is the larger reference material. Host labels, focus, disabled/loading state, selection ownership and result insertion remain external. Reduced motion retains spine, main lines and both branch groups without movement.

## Top Opportunities

1. Keep the spine dominant so reduction never reads as deletion.
2. Preserve staged upper-then-lower folding; simultaneous collapse would become generic shrinking.
3. Inspect Outline at compact size for branch separation and dither-core clearance.

## Encoded storyboard and review

[simplify.ts](../../src/motions/simplify.ts) encodes the storyboard at 1080ms. Focused tests assert branch hinge rotations, origins, spine response, authored paths, banned decorative actors, finite tracks, reduced motion and exact return. Browser replay and user optical review remain pending; no approval is claimed.
