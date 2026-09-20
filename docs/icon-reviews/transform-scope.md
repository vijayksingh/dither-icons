# Transform Scope: Interface Craft review

## Context

`TransformScopeIcon` represents the `.scope` control in `web-absorb/extension/content/selection-transform-controller.js:576`, rendered by `_renderScope()` at line 904 and applied by `_selectedTransformTargets()` at line 1142. The host owns `aria-pressed`, inverse labels and article-versus-selection target collection.

## First Impressions

The previous side-by-side page/selection drawing explained two nouns but not the transition between scopes. This revision makes the selection boundary the actor. Page content remains retained while four constant-size lens corners travel from the passage frame to the page frame, then return. The motion communicates target extent without a generic bidirectional arrow.

## Visual Design

One page frame with a 2.4-unit dog-ear and four content lines establish the article. Four constant-size selection corners form a lens around the passage; the rest lens keeps 0.325–0.525 clearance from the text lines and 0.5 from the page frame, so no mark crosses the content. At rest both page and selection meanings are recognizable; during expansion each corner travels to its page-frame corner, seats with a short local click and returns. The marks never scale, so the frame stays legible. Content does not vanish or swap.

## Interface Design

The user sees a scope change as boundary expansion: frame, expand, seat, contract. No transfer arrow needs to explain it. The icon does not claim `aria-pressed` changed, a transform ran, or a rewrite result was inserted.

## Consistency & Conventions

MOT-01/05 retain page, content and selection identities at rest. MOT-02/03 make the boundary/lens the primary actor while page content stays fixed. MOT-04/06 bound expansion and overshoot to one compact scale response. MOT-07 keeps dither attached to page and lens contours. MOT-08/16 localize the climax at the seated expanded boundary, not in a detached arrow. MOT-09/10/11/12 provide finite playback, exact return, reduced-motion stillness and shared React/SVG tracks. MOT-14 leaves pressed state and target selection to the host. MOT-15 distinguishes this scope instrument from PanelLeftCloseIcon and generic arrow pairs.

## Storyboard

```text
  0ms  page, content and selected-passage lens wait together
110ms lens corners gather at the selection frame; page remains fixed
320ms the four corners travel toward the page frame
450ms corners seat on the page frame with a short local click
680ms expanded target extent holds; page content remains visible
820ms corners contract toward the selected passage
1040ms page, content and lens return exactly to neutral
```

## Named geometry and timing

`TRANSFORM_SCOPE_TIMING` names `prepare`, `expand`, `seat`, `hold`, `contract` and `settle`. `TRANSFORM_SCOPE_GEOMETRY` names the rest lens rectangle and the page frame; `TRANSFORM_SCOPE_CORNERS` derives each corner's origin and travel, and `TRANSFORM_SCOPE_OPACITY` names the lens response. Four `scope-corner-*` tracks own the animation. Transform/opacity-only playback avoids per-frame React state.

## User Context

Host must preserve inverse accessible labels (“Transform the whole article” / “Transform only the selection”), pressed state, keyboard behavior and selection ownership. Still Solid or Outline suits the compact popover. Reduced motion retains page, content, folded corner and selection lens at rest.

## Top Opportunities

1. Keep page content visible through expansion; disappearing content would imply a different document.
2. Preserve selection corners at rest so both target meanings survive without motion.
3. Check the seated corner marks against the page frame and fold in Outline.

## Encoded storyboard and review

[transform-scope.ts](../../src/motions/transform-scope.ts) encodes the storyboard at 1040ms. Focused tests assert corner origins, travel, seating and local click, authored page/content/selection paths, absence of transfer/arrow actors, finite tracks, reduced motion and exact return. Browser replay and user optical review remain pending; no approval is claimed.
