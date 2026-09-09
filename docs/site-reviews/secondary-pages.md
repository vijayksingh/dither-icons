# Public pages — Interface Craft review

9 September 2026. The user accepted the homepage and asked to extend the same experience to the other pages, using transitions.dev again. This change covers 68 individual icon pages, the motion studio, six developer guides and the AI guide. Original icon drawings and timelines are preserved.

## Direction and hierarchy

Inspected https://transitions.dev/detail.html?t=card-resize and https://transitions.dev/skill.html in the live browser. Adopt their quiet navigation, compact directory, preview/source tabs, contained demonstration stage and readable guide hierarchy. Use Dither Icons' existing typography, material, palette and original illustrations. No reference code, assets or branding were copied.

- Icon pages put one actual drawing and its gesture first. Material, color, export size and source are adjacent to that preview. Previous/next links and a filterable directory make browsing continuous. UI-2, UI-4; MOT-01, MOT-15.
- Documentation uses a shared sidebar, restrained article measure, selectable syntax-colored examples, live controls, section links and Markdown downloads. The table scrolls inside its container on phones. A11Y-1, A11Y-2, A11Y-4, A11Y-8.
- The AI page translates an interface action into the exact component and integration instructions. Its examples preserve the application's real state. No fake CLI, installation flow or operation-success animation. MOT-02, MOT-14; UI-4.
- The manifest, downloadable text and visual sheets are generated from the actual definitions, studies and shared guide content. The two sheets render the accepted artwork and label each real export. Generation runs during build and packing.
- Shared semantic colors remain consistent between pages. Light and dark variants use the accepted palette pairs. COLOR-2, COLOR-5.
- Browser Back restores collection filters, scroll and focused icon. Each new page focuses its heading. Search autofocus, Escape dismissal and opener restoration are explicit. A11Y-2, A11Y-8.

## Site motion storyboard

| Trigger | Visible response | Timing |
| --- | --- | --- |
| Navigate to another page | Content arrives from 4px below; heading and controls are ready immediately | 220ms |
| Hover/focus a directory link | Text and neutral surface respond | 150ms |
| Open global search | Contained surface arrives, input receives focus | 280ms |
| Dismiss search | Surface withdraws, then focus returns to the opening control | 160ms |
| Successful copy | Check and confirmation replace the copy label, then reset | 240ms mark, 2000ms hold |
| Press the AI example | Control compresses slightly; the existing semantic icon gesture plays | 180ms control response |
| Inspect an icon | Original tracks pause at the selected normalized time | Immediate |

There is no persistent decorative loop. Reduced motion removes site movement and cancels icon animations. The explicit motion toggle disables previews and inspection while keeping source and downloads available. MOTION-1, MOTION-4, MOTION-6, MOTION-7; A11Y-10; MOT-09, MOT-11, MOT-12.

## Export correction

The production browser check found that serialized SVGs contained an empty style element: the renderer omitted two adjacent string children inside style. Concatenating those strings before rendering retains the complete stylesheet. Drawings, timing and interaction behavior are unchanged. A regression now checks the serialized output of all 68 icons for their actual keyframes and reduced-motion CSS. MOT-12.

The corrected production Download export was copied and downloaded: the 6,777-byte solid SVG contains its arrow keyframes and reduced-motion rules. CSS hover still ends when hover ends; React is required for playback that finishes after pointer departure.

## Rendered verification

Desktop in the in-app browser and Chrome; phone layouts at 390 × 844 in Chrome. The in-app browser's emulated screenshot scaling was unreliable, so mobile visual acceptance used Chrome. Temporary viewport and reduced-motion overrides were reset.

- Default, hover-capable, keyboard focus and active controls inspected on individual icon pages, docs, AI and studio. Light and dark layouts inspected.
- All four page templates inspected at phone width. No page-width overflow on the icon, React documentation, AI or studio layouts. Mobile page picker and menu navigate and close correctly.
- A filtered collection opened Save Preferences at scroll zero with its H1 focused. Browser Back restored query `save`, collection scroll and the exact `Inspect Save Preferences` link.
- Global search finds Sign Out through `logout`; arrow keys and Enter open it. Cmd-K opens search. An unmatched query shows a useful empty state. Escape closes and restores focus to `Search the library`.
- React source copied with the selected component, solid material, 64px size and Cobalt color. Keyboard arrow navigation switches source tabs. Corrected SVG source retains its complete animation stylesheet; the real downloaded file was inspected.
- Motion family selection, keyboard scrubbing and material changes retain the inspected time. Reduced motion leaves zero animations. Motion-off disables study playback and scrubbing.
- AI composer selection of Sign Out / outline / 24px produces those exact settings, currentColor, an accessible button and links to the actual manifest/guide in the clipboard.
- Material sheet and labeled contact sheet inspected in the live browser. All six Markdown guides, the AI guide, llms files, manifest and both SVG references return HTTP 200 with their expected content types.
- Direct production deep-link and lazy-page loading checked. Loading fallback was observed during first loads. The static site has no remote data-loading state. Clipboard failure and page-error fallbacks are implemented; these failure branches were reviewed in source, not fault-injected.
- Production in-app browser console has no warnings or errors. Chrome emitted installed extension diagnostics; those were not treated as application errors.
- Typecheck, 70 tests and production build pass. The package includes AI.md, icons.json, ESM and declarations. The initial site JS is 422.92 kB / 129.66 kB gzip; the icon export renderer is loaded on demand.

Compact desktop controls deliberately use 31–40px targets with separation. Mobile primary controls, navigation and menu targets are larger; tab and material controls retain compact targets above 24px. Source and reference tables can scroll horizontally inside their own containers. These exceptions preserve separate actions and readable code without page overflow.

This is implementation and browser evidence, not a claim of user acceptance. Publication and per-icon bundle splitting remain outside this change. The package is a local download; installation docs say so explicitly.
