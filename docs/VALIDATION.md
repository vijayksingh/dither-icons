# First release validation — 2026-09-08

- 36 original definitions; each rendered in dither, solid, and outline (108 variants).
- Geometry tests: unique cells, integer coordinates, bounds inside 24 × 24; dither boundary preservation and alternating interior coverage.
- Accessibility: decorative default, named SVG role and label, reduced-motion stylesheet.
- TypeScript checks and ESM/declaration/catalog builds passed.
- Packed tarball installed into a fresh temporary consumer; named component import and server render passed with all 36 definitions available.
- Live browser: search for download; empty search and reset; selection updates inspector; React copy verified against clipboard; keyboard replay; dark and light themes.
- Narrow viewport: fixed grid minimum-width overflow; final rendered document client/scroll widths both 354px in the browser's zoom-adjusted mobile emulation.
- Reduced-motion emulation: animated part computed `animation-name: none`. Default mode: download part computed `di-fall`, 0.6 seconds.
- No browser console errors during checks.

Known limits: not published to npm; original 36-icon starter collection, not Lucide's full catalog. Named imports currently share the full geometry catalog. Showcase loads optional fonts from Google Fonts, with system fallbacks. SVG exports carry embedded animation CSS and use currentColor; hover animation requires inline SVG rather than an HTML img. No automatic loop. No auth, loading, or backend states exist in this static catalog.

## Vector and material revision — 2026-09-08

User rejected the pixel-art contours and coarse checkerboard. The rendered family now uses authored vector contours with curved silhouettes, deliberate negative space, and an independent fine Bayer dither field. Original cell data remains only as legacy geometry/fallback metadata; it no longer draws catalog icons.

- All 36 definitions and every part have explicit vector paths; regression test enforces this.
- Directional shading sampled through an 8 × 8 threshold matrix at quarter-unit spacing, with a quiet 16% base. Outline/solid bypass the grain mask.
- Bell motion pivots near its crown; smaller overshoot, softer easing, staggered layer separation.
- Eight curated palettes: Iris, Cobalt, Jade, Amber, Coral, Rose, Citron, Graphite. Dark/light values are separate; selected color appears in React snippets and SVG exports.
- Live checks: palette selection, light Cobalt export (#315bc4), dark Iris clipboard export (#bea5f5), SVG copying, icon selection, dark/light render, reduced-motion computed animation none, narrow viewport client/scroll both 354px. Browser console showed no errors.
- Typecheck, five targeted tests, library declarations, packed download, and catalog build passed.
