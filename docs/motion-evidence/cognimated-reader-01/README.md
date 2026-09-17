# Cognimated reader / 01 — implementation evidence

Captured locally on 2026-09-17 in the Codex Chromium browser at `http://127.0.0.1:4192/motion`. These files record implementation checks performed before the user stopped extended visual review. The user found the shapes, composition and stroke hierarchy insufficiently refined and elected to perform further visual/feedback review themselves. **No visual acceptance is claimed.**

## Captures

- `dither-0.png`, `dither-10.png`, `dither-30.png`, `dither-50.png`, `dither-70.png`, `dither-100.png`: current geometry at the labeled normalized inspector positions. Each icon uses its own duration.
- `solid-50.png`, `outline-light-50.png`: material changes at the retained midpoint, plus light-theme contrast inspection.
- `reduced-motion.png`: `prefers-reduced-motion: reduce`, followed by keyboard replay; all symbols remain at rest.
- `half-speed-replay.png`: a frame during half-speed playback, not an endpoint assertion.

## Runtime receipts

- `frame-checks.json`: all 17 actors stay connected and paused at their authored clocks for the six inspected positions.
- `material-rebind.json`: solid/outline replacements remain connected at 710ms (Reading Focus), 640ms (Start at Text), 740ms (Listen), 770ms (Read Aloud).
- `keyboard-lifecycle.json`: Enter starts each icon; repeated Enter leaves its start time unchanged; Tab/focus departure allows completion; no animations remain after completion. Half-speed playback also completes and clears.
- `reduced-motion.json`: media preference true, zero active animations, no moving actor transforms, identity opacity 1, hidden accents at 0. Emulation was cleared after the check.

Screenshots and runtime receipts are observations, not proof of final optical quality. Solid/outline currently share stroked contours. No universal stroke-width standard is asserted: the four icons use individually chosen widths documented in their reviews, and consistency is part of the remaining user feedback.

## Checks and boundaries

Focused command: `npx tsx --test tests/reader-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx` — 19 passing. `npm run typecheck` — passing. Initial checks caught floating-point equality in a test and bracket/case crowding; those were corrected before the passing run.

`npm run build` — passed once for the complete batch: 77 manifest entries, 6 guides, 86 social preview images, ESM and declarations, gallery build and 86 crawler-readable pages. Existing social images regenerate because their catalog-count labels change to 77; existing icon geometry/timelines were not edited. `git diff --check` also passed. No full test suite was run.

Shared engine unchanged. No per-frame React updates or animation dependencies added. All new tracks use transform/opacity. CSS export tracks are generated from the same studies; standalone hover cannot continue after pointer departure. CSS-only live playback and a compact-size/responsive review were not completed; an unfinished extra fixture generator was removed when the user stopped extended review.

Exactly four new exports. No `web-absorb` changes, platform call-site integration, package version bump, publication, tag or deployment. The published package remains a separate release; local new exports must not be assumed present there. Safari/Firefox, physical-device performance, compact toolbar composition and final visual approval remain unverified.
