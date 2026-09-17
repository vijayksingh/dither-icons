# Transform Scope: Interface Craft review

## Context
The selection-popover scope control switches transformation between the selected passage and the whole article. It is the `.scope` button in `web-absorb/extension/content/selection-transform-controller.js:576`, rendered by `_renderScope()` at line 904 and applied by `_selectedTransformTargets()` at line 1142. The host owns `aria-pressed`, labels and target collection.

## First Impressions
The source supplies a page glyph and a selection-corner glyph. A page-only icon would imply whole-article scope; a marquee-only icon would imply selection scope. The library places both meanings side by side with a restrained bidirectional handoff, so the control reads as a scope switch without relying on a hidden state.

## Visual Design
The page outline and fold occupy the left anchor; page text remains inside it. Four selection corners and two selected-passage lines occupy the right anchor. A narrow center handoff stays subordinate. Both anchors are present at rest and throughout the gesture. Solid uses 1.05-unit contours and Outline uses transparent cores where appropriate; no page/selection edge is painted twice.

## Interface Design
The page yields slightly, selection takes focus, the bidirectional handoff crosses the gap, and the passage frame seats while the page remains visible. The handoff clears, emphasis releases, and both anchors return exactly. The icon never claims that the article scope changed or that a transform succeeded.

## Consistency & Conventions
MOT-01/02/03/05 preserve both scope identities and their spatial relationship. MOT-04/06 keep the emphasis exchange restrained. MOT-07 keeps texture bound to page and selection contours. MOT-08/16 localize the handoff response between the actual anchors. MOT-09/10/11/12 cover finite shared playback, exact neutral return, reduced motion and transform/opacity-only tracks. MOT-14 leaves pressed state and target selection authoritative to the host. MOT-15 requires the two-scope meaning to remain individual.

## User Context
Keep the real inverse accessible labels (“Transform the whole article” / “Transform only the selection”), pressed state, keyboard behavior and selection ownership. Still Solid/Outline is appropriate for a compact popover. Motion-off must still show both page and passage meanings.

## Top Opportunities
Show both scopes at rest; make the handoff occur in the actual gap; never replace this relation with a renamed page or marquee icon.

## Encoded storyboard and review
[transform-scope.ts](../../src/motions/transform-scope.ts), 1040ms: prepare 120, handoff 330, seat 460, clear 690, release 820, rest 1040. Actors: `scope-page`, `scope-selection`, `scope-transfer`; page and selection share no animation preset. Focused source/render checks are recorded in [selection batch evidence](../motion-evidence/cognimated-selection-01/README.md). Native browser replay and user optical review remain pending; no screenshot is claimed from source inspection.
