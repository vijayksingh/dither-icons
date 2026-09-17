# Cognimated reader — composition revision, 2026-09-17

This revision implements the previously missed shape/composition/stroke feedback. It is not final visual acceptance. The user retains visual review; no new browser visual-review loop or screenshot capture was performed.

## Drawings replaced

- Reading Focus: circular stopwatch, paired brackets and shoulder become a soft-square reading timer with a single margin marker and aligned prose.
- Start at Text: sparse horizontal word seeking becomes a caret aligned to three sentence baselines; the isolated dot-like word and endpoint tick are removed.
- Listen: tall folded sheet becomes a broader rounded page; sound arcs are shorter, source-centered and limited to two persistent contours.
- Read Aloud: right-hand microphone and detached left-hand text become a centered microphone above two transcript rows; stand/grille clutter and endpoint tick are removed.

Each keeps original, separately authored artwork and its own causal timeline. Shared `reader-style.ts` defines 1.5-unit contours, 1.25-unit prose, 1-unit temporary responses and round-ended construction in a 24-unit grid. This is a family-specific optical hierarchy, not a claim that one stroke width is universally standard. Solid and outline retain identical line-based construction; dither retains attached contour grain.

Interface Craft's critique establishes the geometry changes; its storyboard process names each actor, origin, timing and response. Animate/accessibility/performance guidance keeps gestures finite, subordinate to the action, transform/opacity-only and fully static under reduced motion. Existing engine and exports remain intact; no per-frame React state or animation dependency was added.

## Verification

- `npx tsx --test tests/reader-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx`: 21 tests pass. Includes rounded-case/marker clearance, sentence baseline/gutter alignment, stroke hierarchy, actual cubic wave separation, capsule containment, causal timing, actor bindings, exact neutral return, repeated-instance masks and React/SVG track consistency across three materials.
- `npm run typecheck`: passes.
- `npm run build`: passed once after the complete four-icon revision. Generated 77 manifest entries, 6 guides, 2 visual references, 86 social previews, ESM/declarations, the Vite gallery (171 modules) and 86 crawler-readable pages. Only the four reader social-preview files changed.
- `git diff --check`: checked before commit.
- The already-running Vite server at `http://127.0.0.1:4192` was queried directly; its Reading Focus module serves the new geometry/timing source. This confirms updated source delivery, not browser rendering or visual acceptance.

## Review and integration limits

Earlier [first-batch screenshots](../cognimated-reader-01/README.md) are historical and do not show the revision. New compact-size, responsive, keyboard/reduced-motion browser checks, Safari/Firefox and physical-device performance have not been run. Static meaning and motion contracts have source/render tests, not new runtime proof. The user will review appearance and composition in the motion studio.

No changes to `web-absorb`, no call-site integration, no version change, no publish/tag/deploy. Hosts must retain native accessible labels, actual selected/disabled/permission/STT state and reading progress. Standalone CSS hover still stops on departure; React completes an initiated gesture. These remain local, unreleased exports.

See [complete changed-file manifest](FILES.md).
