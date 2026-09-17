# Cognimated reader — distinct Outline material

The previous implementation rendered Solid and Outline identically. This correction adds transparent contour cores for exactly Reading Focus, Start at Text, Listen and Read Aloud. It preserves the composition revision's geometry, timings, actor names and Solid/dither rendering.

## Material design

Interface Craft's hierarchy critique separates primary instruments from prose: primary 1.5-unit contour bands gain a transparent 0.5-unit core, leaving two 0.5-unit boundary rails; text remains a single 0.9-unit stroke and response detail uses 0.75. Values live in `src/motions/reader-style.ts`. Masks follow their owning actors and never paint a fake background color. This retains `currentColor`, actual transparency and existing outer clearances (MOT-01/05/07/12).

React, downloadable SVG and frame inspection consume the same artwork and tracks. The material dependency in the existing playback hook already rebinds actors and restores inspected time; no engine changes were needed. Reduced motion retains the complete static drawing. CSS hover still stops on departure; React finishes an initiated performance.

## Checks and remaining limits

`npx tsx --test tests/reader-motion.test.tsx tests/icons.test.tsx tests/choreography.test.tsx tests/catalog.test.tsx`: 22 pass. `npm run typecheck`, one `npm run build` and `git diff --check`: pass. Build regenerated docs, manifest, references, social previews, ESM/declarations and the gallery. No tracked generated artifact changed because those previews use the unchanged materials. The existing Vite server on port 4192 serves the new Outline branch; this is source-delivery verification, not a new browser review.

The new raster test checks all four contour cores are truly transparent, their boundary rails remain visible, and Solid/Outline produce different pixels at 16/24/48px. Existing checks cover actor binding, unique mask references, static/reduced-motion export contracts and causal timing. Automated pixel assertions are not human legibility or visual approval.

User owns visual review. No extended browser review, cross-browser/device checks or new runtime material-switch proof was performed. Fine contour rails at compact sizes remain a visual/integration risk. No `web-absorb` changes, call-site integration, version change, publication, tag or deployment.

Changed implementation: `src/ReaderArtwork.tsx`, `src/motions/reader-style.ts`, `tests/reader-motion.test.tsx`. Documentation: the four `docs/icon-reviews/` reader records, `docs/MOTION-CATALOG.md`, `docs/PLATFORM-ICONS.md`, the composition revision's historical evidence note, and this record. Generated files are refreshed only through the build workflow.
