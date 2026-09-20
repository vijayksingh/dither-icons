# Cognimated selection / 01 — corrective core-command pass

Exactly four existing unreleased exports: `SimplifyIcon`, `TightenIcon`, `VividIcon`, and `TransformScopeIcon`. This is a corrective re-authoring of the current selection set, not another batch. The library catalog remains at 89; package version remains 0.2.4. No `web-absorb` file was edited.

## Source receipt

The actual controls are in the adjacent checkout's `extension/content/selection-transform-controller.js`: the three action buttons are `data-mode="simplify"`, `data-mode="concise"` and `data-mode="vivid"` at lines 567–569; the `.scope` button with page and selection glyphs is at line 576. Scope rendering is `_renderScope()` at line 904; selected versus article target collection is `_selectedTransformTargets()` at line 1142. Existing Sparkles, Close, History, ArrowRight and Send remain unchanged.

## Corrected composition

- Simplify shows subordinate branches folding behind one stable readable spine; the central meaning stays present.
- Tighten shows eight ordered word units and whitespace compressing horizontally between bounded edges; baseline and order stay fixed.
- Vivid keeps a neutral phrase; the focus word gains visible weight and grows one calligraphic swash out of its own end.
- Transform Scope keeps page content retained; four constant-size selection-lens corners travel to the page frame and return.

Each has its own Interface Craft storyboard, named timing/geometry values, actor IDs and design critique. Renderer keeps the reader-batch material hierarchy: 1.5 contour in every material, 1.25 text, 1 response, .75 Outline response and .5 Outline edges, with transparent Outline cores where needed. Playback finite, transform/opacity-only, no per-frame React state, exact neutral return, reduced-motion CSS leaves authored rest pose.

## Motion revision, 2026-09-19

User review rejected the first Vivid and Transform Scope animations. Vivid's accent read as a small checkmark between the text lines and the focus word barely moved; its accent is now a swash that grows from the word's end while the word gains visible weight. Transform Scope scaled its four corner marks into oversized brackets that overshot the page; the marks now keep their size and travel to the page frame. The page keeps a rectangular frame with an interior fold line so the corner marks can seat without doubling the outline. Thirteen-frame filmstrips were inspected in Solid and Outline before the tests were updated.

## Verification

```sh
npm run typecheck
npx tsx --test tests/selection-commands-motion.test.tsx
npx tsx --test tests/selection-commands-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx tests/site-docs.test.tsx tests/registry.test.tsx tests/social.test.tsx
npm run build
git diff --check
```

The focused implementation tests cover source meanings, named exports, searchable metadata, causal ordering, branch folding, ordered word-unit compression, attached swash growth from the word end, corner travel to the page frame, finite shared React/SVG tracks, reduced motion, unique SVG IDs and valid Dither/Solid/Outline SVG rasters. The full suite passes (130 tests).

## Integration risks and limits

These are library gestures only. Host must preserve selection ranges, `data-mode` dispatch, `aria-label`, `aria-pressed`, loading/disabled behavior and article-versus-selection target collection. Icon does not claim rewrite success, scope change or result insertion. At compact popover sizes, human optical review, native keyboard/replay review, reduced-motion emulation and cross-device performance remain user-owned follow-up. React playback finishes after departure; standalone CSS hover has documented departure limitation and needs focusable `.di-trigger` parent for keyboard activation.

No publish, tag, deploy or package-version change is part of this batch. [Changed files](FILES.md).
