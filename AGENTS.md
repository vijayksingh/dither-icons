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

## Semantic quality and Astra prompting

Names are not briefs. Never send Astra only a list of icon names or action labels. Before implementation, write a semantic card for every icon:

- **Verb and object:** what changes, and what physical or editorial object carries that change.
- **Invariant:** what must remain recognizable and stable through every frame.
- **Causal parts:** the actors that cause the action, the receiver, and the localized payoff.
- **Neighbor boundary:** why this is not an existing icon or a nearby action.
- **Forbidden shortcuts:** generic sparkle, star, plus, underline, bounce, pulse, spin, or directional arrow unless that element is the actual cause of the action.

The common failure mode is decorating a label instead of visualizing its meaning. A review paragraph that rationalizes a sparkle after the fact is not a semantic design. If the primary action cannot be described as a distinct instrument and causal sequence, stop and redesign before touching geometry or motion.

For Cognimated selection commands, preserve these distinctions:

- **Simplify:** reduce cognitive branching while preserving the main idea; subordinate clauses fold into one stable readable spine. Not three lines gathering, and not a clarity star.
- **Tighten:** reduce wordiness/length; actual word units and whitespace compress horizontally while order and baseline remain. Not abstract clamps or navigation arrows.
- **Vivid:** make language more expressive/specific; a localized ink or expressive accent grows from one target word or phrase. Not ambient sparkles or a plus symbol.
- **Transform scope:** change the rewrite target between a selected passage and the whole article; the selection boundary expands to the page boundary or returns. The boundary/lens is the actor, not a transfer arrow.

Use the same standard for reader-bar icons: tie motion to the reader object or control state, preserve the article/text invariant, and distinguish every icon from existing `Play`, `Arrow`, `Gauge`, `Path`, `Sparkles`, and `Volume` meanings. Inspect the actual adjacent `web-absorb` call site before selecting a batch; do not infer priority from catalog order.

Astra's task prompt must include the semantic cards, the neighboring-icon comparison, the forbidden motifs, the actual source call sites, and an explicit instruction to challenge or redesign any icon whose first concept is generic decoration. Require individual storyboard/review records to explain the causal meaning, not merely repeat the label. Ask for a compact-size/static-frame self-check before commit; user visual review remains a separate gate and must never be claimed by the agent.

Cost controls: one Astra agent per coherent batch; finish the semantic design gate before implementation; run focused tests and one build only after the complete batch; do not spend a full build/test cycle on a rejected concept. If user feedback says a batch is shallow, stop the agent, do not append more icons, and re-author the current batch with new instruments. Preserve the rejected commit for traceability, then create one corrective commit.
