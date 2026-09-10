# Development and energy — accepted concept revision

2026-09-10. Terminal, CPU, Chart and Bolt. The user rejected the first draft as shallow and accepted this revised concept-level performance. The neutral drawings, semantic turning points and response relationships are documented individually in `docs/icon-reviews/`.

- `native-filmstrip.png`: twelve actual browser screenshots, cropped and assembled only for comparison. Each row reads left to right; every cell orders Terminal, CPU, Chart, Bolt. `film-timing.json` records capture offsets during half-speed native playback. No recreated or interpolated frames.
- `pose-*.png` and `poses.json`: 0/12/26/34/44/58/76/100% inspected poses. First and last computed part records match exactly.
- `playback-actual.json`: native animation samples, all four begin active and finish idle. Sampling begins after the replay action returns.
- `dither-58.png`, `solid-58.png`, `outline-58.png`, `materials.json`: exactly matching transforms/opacity across materials at the same progress.
- `keyboard.json`: all four start their complete track sets and finish after Enter followed by Tab departure. `reduced-motion.json`: zero animations and no visible temporary accents.

The shared React runtime, reduced-motion contract, and CSS export lifecycle are unchanged. Standalone CSS uses the same authored tracks; it cannot finish after hover departure as React does. Layout is unchanged. This batch's evidence is desktop browser evidence, not a physical touch-device claim. Tiny register/letter detail is secondary to the primary gesture; prefer solid/outline for dense 24px controls.

Validation: 21 targeted tests passed, including all 69 timelines / 207 material bindings, exact neutral restoration, source/export parity, accessibility, repeated mask isolation, generated docs and five new geometric/causal regressions. The production build passed after correcting the CPU label at definition time rather than mutating the inferred readonly catalog. No version bump, push or deployment.
