# Vivid: Interface Craft review

## Context
The selection-popover action makes selected text more vivid. It maps to `data-mode="vivid"` in `web-absorb/extension/content/selection-transform-controller.js:569`; the host owns the rewrite and result state.

## First Impressions
The source combines one emphasis star with a plus. Reusing Sparkles would lose the text-editing context. The library places one star beside a retained text passage and gives it one local underline and a small plus response, making vividness a focused emphasis rather than ambient decoration.

## Visual Design
Three text lines occupy the left band. The star at (17, 8.2) is the focal contour; the plus at (17, 15.8) is separate and smaller in meaning. Only the underline is a response actor. The text never moves, the star never becomes a multi-star field, and Solid/Outline use the corrected reader-control weights.

## Interface Design
The passage holds while the star warms and opens. After the focal mark peaks, the underline catches; the plus follows as a local answer. The emphasis clears before the star and plus return to rest. No color mutation or successful rewrite is simulated.

## Consistency & Conventions
MOT-01/02/03/05 keep text as the reference and preserve the star/plus relationship. MOT-04/06 bound the focal rotation and scale. MOT-07 binds material to the shapes. MOT-08/16 place the underline and plus after the star's action. MOT-09/10/11/12 preserve finite, shared, transform/opacity-only playback and reduced-motion stillness. MOT-14 leaves rewrite state to the host. MOT-15 distinguishes Vivid from Sparkles.

## User Context
The native action should retain its Make vivid label, selection ownership and disabled/loading behavior. At compact popover sizes, use still Solid or Outline when repeated. Motion-off retains the passage, star and plus, so the command remains identifiable.

## Top Opportunities
Anchor emphasis to text; keep one focal mark; delay the plus until the textual emphasis has landed.

## Encoded storyboard and review
[vivid.ts](../../src/motions/vivid.ts), 980ms: warm 100, flare 300, underline 390, plus 455, clear 760, rest 980. Actors: `vivid-star`, `vivid-highlight`, `vivid-plus`; the text is intentionally fixed. Focused source/render checks are recorded in [selection batch evidence](../motion-evidence/cognimated-selection-01/README.md). Native browser replay and user optical review remain pending; no screenshot is claimed from source inspection.
