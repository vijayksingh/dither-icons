# Cognimated selection / 01 — core commands

Exactly four unreleased exports: `SimplifyIcon`, `TightenIcon`, `VividIcon`, and `TransformScopeIcon`. The library catalog advances from 85 to 89; package version remains 0.2.4. No `web-absorb` file was edited.

## Source receipt

The actual controls are in the adjacent checkout's `extension/content/selection-transform-controller.js`: the three action buttons are `data-mode="simplify"`, `data-mode="concise"` and `data-mode="vivid"` at lines 567–569; the `.scope` button with page and selection glyphs is at line 576. Scope rendering is `_renderScope()` at line 904; selected versus article target collection is `_selectedTransformTargets()` at line 1142. Existing Sparkles, Close, History, ArrowRight and Send remain unchanged.

## Composition

- Simplify retains three text lines, gathers the lower lines, then lets one clarity star and underline answer.
- Tighten uses opposing clamps around a retained three-line block, with a short registration line after the squeeze.
- Vivid binds one focal star and one plus to a fixed text passage; it does not borrow Sparkles' surrounding field.
- Transform Scope keeps a whole-page outline and a selected-passage frame visible together, with the handoff in the gap between them.

Each has its own Interface Craft storyboard, named timing/config values, actor IDs and motion review. The renderer shares the corrected reader-control material hierarchy: 1.05 Solid contour, 1.35 Dither/Outline contour, .9 text, .75 response, and transparent Outline cores where a contour needs one. Playback is finite, transform/opacity-only, no per-frame React state, exact neutral return, and reduced-motion CSS leaves the authored rest pose.

## Verification

```sh
npm run typecheck
npx tsx --test tests/selection-commands-motion.test.tsx
npx tsx --test tests/selection-commands-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx tests/site-docs.test.tsx tests/registry.test.tsx tests/social.test.tsx
npm run build
git diff --check
```

The focused implementation tests cover source meanings, named exports, searchable metadata, causal ordering, opposing clamp travel, scope preservation, finite shared React/SVG tracks, reduced motion, unique SVG IDs and valid Dither/Solid/Outline SVG rasters. The full suite was intentionally not run.

## Integration risks and limits

These are library gestures only. The host must preserve selection ranges, `data-mode` dispatch, `aria-label`, `aria-pressed`, loading/disabled behavior and article-versus-selection target collection. The icon does not claim a rewrite succeeded, a scope changed or a result was inserted. At compact popover sizes, human optical review, native keyboard/replay review, reduced-motion emulation and cross-device performance remain user-owned follow-up. React playback finishes after departure; standalone CSS hover has the documented departure limitation and needs a focusable `.di-trigger` parent for keyboard activation.

No publish, tag, deploy or package-version change is part of this batch. [Changed files](FILES.md).
