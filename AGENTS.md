# Dither Icons

## Site copy

Read `docs/COPY-GUIDE.md` before writing public copy, icon captions, or sharing metadata. Describe the product and visible animation; avoid claims about soul, character, humanity, or how the visitor should feel. Regenerate downloadable docs and sharing images from their sources.

## Releases and production

Read `docs/RELEASING.md` and `docs/DEPLOYMENT.md` before publishing, tagging, or changing CI/CD. Production is `https://dithered.dev`; npm is `@unlocalhosted/dither-icons`; GitHub is `vijayksingh/dither-icons`. Stable `vX.Y.Z` tags release both npm and the website from the same checked artifact. Main pushes run CI only.

Keep the tag, `package.json`, lockfile, npm version, and deployed `/release.json` in agreement. Never move a published tag, overwrite an npm version, or promote an older release over `latest`. Rerun the failed release job to repair a partial deployment. Use npm trusted publishing in Actions; never add npm write tokens or bypass 2FA. Cloudflare credentials belong only in the infra secret store and GitHub Actions secrets.

Do not report a release as complete until the release workflow, public registry installation, and ordinary-browser check of `dithered.dev` pass. A Pages URL, build success, or forced DNS resolution is insufficient. Preserve exact failures and separate pending human authentication from completed work.

## Icon craft

Before adding or changing motion, read `docs/MOTION-PRINCIPLES.md` and the icon's entry in `docs/MOTION-CATALOG.md`. Cite applicable MOT rule IDs in the decision or review record.

Work icon by icon. Preserve identity at every frame; author semantic parts and individual timelines. Reuse the engine, not generic performances. Keep React and SVG export behavior aligned and document the CSS hover lifecycle limitation.

Preserve unrelated changes. Commit coherent completed chunks. Verify substantive changes in the live catalog with keyboard replay, frame inspection, reduced motion, and relevant responsive sizes. Run targeted tests and one build after a meaningful batch, rather than the full suite after every small edit.

For every icon, apply Interface Craft's Design Critique and Storyboard Animation process. Record its semantic meaning, invariant, causal parts, timing, and rendered review in `docs/icon-reviews/`; use `docs/ICON-REVIEW-TEMPLATE.md`. A name-only rewrite of another icon's motion is not an individual review (MOT-15). When material changes replace SVG actors, rebind the animation targets and preserve the inspected time.
