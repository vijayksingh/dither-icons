# Contributing to Dither Icons

Thanks for helping make the small details better. Useful contributions include interface icons, drawing and motion refinements, accessibility fixes, integration examples and clearer documentation.

For a substantial new direction, open an issue with the actual interface use case and a sketch or example first. Bug reports are most useful with the icon name, material, rendered size, browser, steps to reproduce and a screenshot or recording.

## Work locally

Use Node.js 22+ and a fork of this repository:

```sh
npm ci
npm run dev
```

The local gallery runs at http://127.0.0.1:4192. The motion studio is at `/motion`; individual icon pages expose their own timing inspector.

## Keep the craft

Read [AGENTS.md](AGENTS.md), the [motion principles](docs/MOTION-PRINCIPLES.md), and the relevant [individual icon review](docs/MOTION-CATALOG.md) before changing artwork or animation.

For a new or revised icon:

1. Identify an actual interface action and a clear semantic name. Check the existing collection for overlap.
2. Establish a readable silhouette at rest. Keep smooth vector contours independent of the dither grid.
3. Write a short storyboard: preparation, action, consequence and return. Preserve the icon's identity throughout. Move semantic parts; reuse the interaction engine, not another icon's performance.
4. Follow the existing artwork and timeline modules, add the export and metadata, and record the decision with the [review template](docs/ICON-REVIEW-TEMPLATE.md). Cite the applicable MOT rule IDs.
5. Inspect the gesture in the live browser, including the moment of contact or response and its return to neutral.

Small, carefully reviewed batches are easier to evaluate than a broad motion rewrite. Do not replace application state with icon theatrics: a gesture cannot prove that a download, save or test succeeded.

## Verify the change

After a meaningful implementation batch, run:

```sh
npm run typecheck
npm test
npm run build
```

Add a targeted regression when fixing a behavior or geometry invariant. Documentation-only changes usually need a link/content check rather than the entire suite.

For visible changes, inspect the default, hover, focus, active and disabled states where relevant. Check light and dark themes, phone widths, reduced motion and the actual target size. For motion, verify keyboard/tap replay, frame inspection, material changes, return to rest and complete standalone SVG export. Include screenshots or short recordings and describe what you actually checked.

## Generated documentation

The shared source lives in `demo/content/docs.ts` and `demo/content/agent.ts`. `scripts/generate-docs.tsx` combines it with the real icon definitions and motion metadata.

```sh
npm run generate:docs
```

Commit the resulting `AI.md`, `icons.json` and relevant `public/` changes alongside their source. Do not hand-edit the generated guides, manifests or reference sheets. Build and pack also regenerate them.

## Pull requests

Describe the problem, the resulting behavior and the validation performed. Keep unrelated changes out of the patch. For an icon or motion change, include its semantic intent and visual evidence, plus any known limitations.

By contributing, you agree that your contribution can be distributed under this project's [MIT license](LICENSE). Submit original work or material you have permission to contribute, with any required attribution.
