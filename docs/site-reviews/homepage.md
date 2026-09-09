# Public homepage — Interface Craft review

Scope: the standalone Dither Icons homepage. The user asked to finish this surface first. Developer documentation, AI documentation and additional site pages remain the next phase. The accepted 68 icon drawings and timelines are unchanged.

## Diagnosis and direction

The previous page mixed an oversized specimen, dense control rows, a motion workshop, an edge-to-edge icon matrix and a permanent code inspector. Those competing hierarchies made a carefully authored library feel like an internal tool.

Reference inspected in the live browser: https://transitions.dev/ (9 September 2026). Adopt the reference's compact navigation, centered introduction, quiet neutral surfaces, nested preview cards and immediate copy affordances. Keep our own identity: tactile fanned icon tiles, a curated color palette, fine grain, original icon geometry and individual semantic performances. No reference assets or source were copied.

The new sequence is: meet the material → try a gesture → find an icon → inspect/copy it → explore motion or take the package. The studio stays reachable through its existing hash link but no longer interrupts the collection.

## Decisions

- A small five-tile shelf introduces the real product. One restrained fan entrance; hover lifts only the tile under the pointer. No perpetual hero animation. MOT-01, MOT-02; MOTION-1, MOTION-4.
- Three spacious columns on desktop, two on phones. Each card separates the preview action, name/inspector action and copy action. The first twelve are curated; expansion and search expose every accepted icon. UI-2, UI-4.
- Shared category indicator moves from its current rendered position. Preview gestures remain native, individually authored icon timelines; site motion never changes their actors. MOT-15; MOTION-6, MOTION-7.
- Native dialog supplies focus containment and Escape. Closing restores the exact opening control. The mobile close button stays outside the scrolling content. A11Y-1, A11Y-2, A11Y-4, A11Y-8.
- Copy switches to a check only after the clipboard promise succeeds, then resets. A failed copy exposes selectable source and an explanation. Export controls generate real React/SVG for the chosen texture, size and color. UI-4.
- Colors remain semantic CSS tokens. Eight curated accent pairs retain different light/dark values. Neutral light-mode secondary text was darkened after checking contrast. COLOR-2, COLOR-5.
- Reduced motion removes the shelf entrance, lift, surface movement and icon playback. Explicit motion-off keeps the full static gallery usable. MOTION-1, MOTION-4; A11Y-10.
- Unchanged SVG previews are memoized so search, theme and inspector updates do not rebuild their geometry. Collection expansion uses a concurrent update and visible progress. No new runtime dependency.

## Site storyboard

| Trigger | Response | Timing |
| --- | --- | --- |
| Initial visit | Five samples fan into their resting arrangement | 620ms, 35ms stagger |
| Shelf hover / focus | Selected sample lifts; its label appears; original gesture plays | 420ms settle, 140ms label |
| Category change | Shared selection surface travels from its current position | 300ms |
| Icon inspector opens | Surface fades/scales from 97%, moves up 8px | 280ms |
| Inspector dismisses | Surface fades and withdraws 5px; then focus returns | 160ms |
| Copy resolves | Copy mark becomes a check; confirmation returns to rest | 240ms mark, 2000ms hold |

All controls retain immediate semantic state. Timelines live in `demo/ui.tsx`, `demo/CategoryFilter.tsx`, and the named CSS timing variables. CSS and native animation both honor reduced motion.

## Rendered checks

Live browser, not source-only inspection:

- Desktop at the browser's native 1744 × 1028, plus 1280 × 900; mobile at 390 × 844. Light and dark compositions inspected.
- All 68 icons expanded, with focus moving to the first newly revealed icon. No page-width overflow at 390px.
- Search, combined category filters, empty results and reset; Cmd-K focuses search. Eight-color popover opens, selects Cobalt and closes; generated source receives the matching light-mode color.
- Inspector opens from Download; successful copy confirmation; size changed to 64; solid material reflected in code; SVG source available. Escape restores focus to Inspect Download.
- Mobile inspector scrolled to its code/export controls; close remains at the top of the surface.
- Download keyboard playback observed five native tracks running, then zero after the gesture settles. Explicit motion-off leaves zero enabled icons and disables preview controls.
- Emulated reduced motion: zero running animations, zero playing icons, no shelf CSS animation. Emulation restored afterward.
- Existing motion workshop still opens at `#motion-studies` with family, speed, replay and inspection controls.
- Final in-app browser review shows no console warnings or errors. Package and favicon URLs return HTTP 200.
- TypeScript and production build pass. 64 tests pass, including three catalog/export regressions. Production build retains the existing whole-catalog bundle-size advisory; per-icon package splitting is outside this homepage change.

Compact desktop controls deliberately use 36–40px targets inside spacious rows; mobile close and primary controls are 44px. The copy control is 40 × 44px on small cards to preserve a separate name target. No touch action depends on hover. Loading is relevant only to collection expansion; there is no remote data-fetching state on this static page.
