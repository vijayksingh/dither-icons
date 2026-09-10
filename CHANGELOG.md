# Changelog

## 0.2.2 — 2026-09-10

- Rewrote the homepage, motion studio, icon pages, docs, and AI page with direct descriptions and action labels.
- Replaced promotional icon captions with descriptions of the visible animation. All 73 timelines, durations, and stage names are unchanged.
- Updated the README, generated agent docs, metadata, and social previews to match.
- Fixed singular search counts, mobile text joining at hidden line breaks, and the missing-page title.
- Added `docs/COPY-GUIDE.md` for future contributors and agents.

## 0.2.1 — 2026-09-10

- Fixed **Download React package** in the installation guide to download the versioned archive from dithered.dev. The npm links still open the registry listing.
- The production release check now verifies that the website's package download matches the release artifact's SHA-512 integrity.

## 0.2.0 — 2026-09-10

The library contains 73 original icons with individually reviewed motion, in dither, solid, and outline materials. No existing exports or component props were removed or renamed.

### Added

- `UnlockIcon`: a visibly open resting state, paired with Lock's closed housing.
- `ArrowLeftIcon` (Back), `HistoryIcon`, `PanelLeftCloseIcon` (Collapse Panel), and `ZoomOutIcon`: navigation and workspace controls with separate semantic gestures.
- Individual motion critiques, browser evidence, and updated AI manifests and reference sheets for the complete catalog.

### Refined

- Search, Home, Settings, and User: focused gestures with distinct arrivals and responses; Settings keeps a clean open center.
- Check, Close, Plus, and Lock: clearer action semantics, including a firm resistance shake that keeps the lock closed.
- Eye, Sparkles, Sun, and Moon: an actual blink, surrounding sparkles, radial illumination, and a nightfall sequence.
- Terminal, CPU, Chart, and Bolt: command and response, a clocked register, measurement from a shared baseline, and charge followed by discharge.
- Motion category entries now include each icon exactly once.

Gestures describe intent; application state remains authoritative for navigation, access, persistence, and computation. Reduced-motion and still variants retain each icon's identity.
