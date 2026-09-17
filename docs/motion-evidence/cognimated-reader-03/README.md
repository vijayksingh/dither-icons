# Cognimated reader / 03 — pace and navigation

Exactly four new exports: `ReadingPaceIcon`, `ReaderPathIcon`, `PreviousWordIcon`, `NextWordIcon`. Catalog: 85. Package version remains 0.2.3; these additions are local and unreleased.

## Preview and composition

[Motion studio](http://127.0.0.1:4192/motion#motion-studies-panel) opens **Cognimated pace and navigation** on a fresh load; select that family in an already-open page. Individual pages: `/icons/reading-pace`, `/icons/reader-path`, `/icons/previous-word`, `/icons/next-word`.

- Reading Pace sets a horizontal detent beneath retained words, not a Gauge needle. Word cues follow registration.
- Reader Path seats a hinged gate into a direct prose column. The side detour and aside remain visible; this is not CraftingAttention's node path.
- Previous Word lifts and recalls one prior word, then opens its underline from the trailing edge.
- Next Word takes up travel and steps to one next word, then opens its underline from the leading edge. The pair shares anatomy but has independent clocks and holds.

Interface Craft storyboard and source critique are recorded individually: [Reading Pace](../../icon-reviews/reading-pace.md), [Reader Path](../../icon-reviews/reader-path.md), [Previous Word](../../icon-reviews/previous-word.md), [Next Word](../../icon-reviews/next-word.md). Existing corrected reader weights, transparent Outline cores, matched mechanical knockouts and cause-before-response ordering are retained. The engine is unchanged: transform/opacity only, no per-frame React state, finite playback, exact neutral return and meaningful static reduced motion.

## Verification

```sh
npm run typecheck
npm run build
npx tsx --test tests/reader-navigation-motion.test.tsx tests/reader-controls-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx tests/social.test.tsx tests/registry.test.tsx
npx tsx --test tests/reader-navigation-motion.test.tsx
git diff --check
```

Typecheck and one complete build passed. Generated 85 manifest entries and 94 sharing PNGs/crawler-readable pages. Existing OG images change because the shared catalog-count footer changes from 81 to 85, not because earlier icon drawings changed. [Complete changed-file list](FILES.md).

The first focused run passed 33 of 34 cases and exposed a test-only numeric-parser error: shorthand `.25` coordinates were interpreted as 25. After correcting the parser, all eight tests in the affected file passed. No production source changed after the build; the other 26 passing cases were unchanged. This is not a claim of a full-suite run.

Checks cover all named exports and search terms, detent alignment, gate pivot/endpoint, exactly one-word selector travel, retained text and arrow direction, sampled bounds, causal response ordering, matched visible/mask tracks, unique SVG IDs, static 16/24/48px rasters, transparent Outline cores at actual mechanical endpoints, neutral returns, reduced-motion CSS, generated guide/manifest agreement and existing registry/social contracts.

A built-package smoke check rendered all four named exports from `dist/index.js`, found their generated sharing HTML/OG files/sitemap entries, and confirmed package version 0.2.3. Automated SVG endpoint rasters are geometry checks, not native-browser animation or user aesthetic approval.

## Integration risks and limits

**Current Listen/Read seeks five words, not one.** Source handlers and dynamic accessible labels explicitly select five in those modes; Paced mode selects one. These exports honor the requested single-word meaning but must not be presented as matching existing five-word behavior. The [platform mapping](../../PLATFORM-ICONS.md#cognimated-reader--03) records exact call sites and the boundary. Main path may also skip excluded tokens to reach the adjacent readable word. No web-absorb file was edited.

User owns visual review. Optical balance, recognition at compact sizes, native-browser keyboard/replay/material switching, reduced-motion emulation and cross-device frame performance remain unverified for this batch. No subjective iteration or external release claimed. Earlier 81 performances remain unchanged.

Host controls retain real WPM, checked/expanded/disabled state, seek boundaries, keyboard targets and recognized progress. Reader Path is an option glyph, not an on/off indicator. Read-aloud hides/disables the WPM range. Prefer still compact controls for repeated seeking. React finishes an initiated gesture after departure; standalone CSS hover cannot, and keyboard activation requires a focusable `.di-trigger` parent.
