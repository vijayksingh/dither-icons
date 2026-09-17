# Cognimated reader controls / 02

Exactly four additions: `DragHandleIcon`, `SkipBlockIcon`, `CollapseRailIcon`, `HeadphonesIcon`.

Review in the local [Motion studio](http://127.0.0.1:4192/motion#motion-studies-panel), which opens **Cognimated reader controls**. The preceding **Cognimated reader** set remains selectable. Individual workbenches use `/icons/drag-handle`, `/icons/skip-block`, `/icons/collapse-rail` and `/icons/headphones`.

## Feedback applied

The user's first three screenshots identified alignment/SVG defects in the first two icons, overlapping Outline lines and thick Solid strokes. Corrections:

- Center the grip/ribs and use four aligned reference corners.
- Replace the skip arrow's separate stem/head strokes with one closed contour; realign the margin bracket and text.
- Occlude the rail body behind its retained top tab; occlude the headphone band behind moving cup silhouettes with identical tracks.
- Reduce Solid contour width from 1.5 to 1.05; text from 1.25 to 0.9. Retain distinct, finer hollow Outline geometry.

Each icon has its own source-level Interface Craft critique and named storyboard. React/WAAPI and standalone SVG CSS use the same tracks. Transform/opacity are the only animated properties; no per-frame React state. Reduced motion and motion-off retain the complete static drawing. Temporary accents are not required for recognition.

## Verification commands

```sh
npm run typecheck
npm run build
npx tsx --test tests/reader-controls-motion.test.tsx tests/reader-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx tests/social.test.tsx tests/registry.test.tsx
git diff --check
```

Checks cover material/actor binding, neutral return, cause-before-response, grip alignment/bounds, block/gutter clearance, fixed rail clipping, headphone pivots and matched knockouts, transparent Outline joint pixels, lighter Solid weights, repeated SVG IDs, reduced-motion CSS, compact rasters, named exports, manifest/agent-guide agreement, social metadata and registry compatibility. The existing build regenerates guides, manifests, references, OG images and crawler HTML.

Results: typecheck passed; one complete build passed (81 manifest entries, 90 share images and HTML pages). The 35-case focused run passed 34 cases and exposed one test-only selector error: it matched a CSS attribute selector before the real SVG group. After restricting that assertion to the opening `<g>` tag, all nine cases in the affected file passed with `npx tsx --test tests/reader-controls-motion.test.tsx`; the other 26 cases were unchanged and had passed. No production code changed after the build. Raster tests avoid system-font discovery because these SVGs contain no text.

A built-package smoke check rendered all four named exports from `dist/index.js`, verified their generated share HTML and sitemap entries, and confirmed package version `0.2.3` unchanged. The local `/motion` route returned HTTP 200. This is implementation/HTTP evidence, not user visual approval. [Complete file list](FILES.md).

## Limits

The user owns visual/feedback review. Initial screenshots are rejection evidence; **corrected visual approval is pending**. Raster checks establish geometry/material differences, not human recognition, browser performance or optical quality. No extended subjective review or device benchmark is claimed.

Library-only work: no `web-absorb` modifications or call-site integration. Four new exports are unreleased; version unchanged. Parent controls retain labels, targets, focus, disabled/expanded state, drag mechanics, reading progress and audio/download status. React completes a started gesture after departure. Standalone CSS hover ends on departure; keyboard activation uses a focusable `.di-trigger` parent.

Reviews: [Drag Handle](../../icon-reviews/drag-handle.md), [Skip Block](../../icon-reviews/skip-block.md), [Collapse Rail](../../icon-reviews/collapse-rail.md), [Headphones](../../icon-reviews/headphones.md).
