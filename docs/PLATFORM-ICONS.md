# Platform icon mapping

These additions belong to the standalone Dither Icons library. They are ready for deliberate integration into CraftingAttention; this pass does not change platform call sites.

## Platform / 01

| Library export | Actual platform need | Observed source in CraftingAttention |
| --- | --- | --- |
| `PathIcon` | Path navigation and ordered Milestones | `app/src/components/PlatformCommandPalette.tsx:157`, `app/src/routes/onboarding.tsx:731`; currently Map |
| `FlaskIcon` | Lab Unit discovery and counts | `app/src/components/PlatformCommandPalette.tsx:185`, `app/src/routes/study-plans.tsx:137`; currently FlaskConical |
| `TargetIcon` | Placement objectives and evidence goals | `app/src/routes/onboarding.tsx:786`, `:1081`, `:1272`; currently Target |
| `RetryIcon` | Restarting experiments and another attempt | `app/src/routes/onboarding.tsx:1110`, `app/src/components/study-sheets/SheetIcon.tsx`; RotateCcw has 39 TSX imports |

Source snapshot: 2026-09-09. Counts are import occurrences, not rendered instance counts. These four were chosen for useful coverage and distinct meanings. Future batches should inspect the platform again rather than assume catalog order is priority.

Rules for integration: preserve the canonical Path, Milestone, Unit, Lab Unit, Workspace, Run, and Checkpoint terminology from `CONTEXT.md`. Apply `UI-2`, `UI-4`, `COLOR-2/5`, `A11Y-2/4`, and `MOTION-1/4/6/7` from `docs/DESIGN-GUIDE.md` in CraftingAttention. Inherit semantic `currentColor`, let the native parent own the label and target size, and make compact/high-frequency controls useful without full spatial motion. The library's full gesture is optional feedback and never a Progress or Run result.

```tsx
import { FlaskIcon, RetryIcon } from '@unlocalhosted/dither-icons';

<a className="di-trigger" href={labUrl}>
  <FlaskIcon size={48} texture="dither" />
  Explore Lab Unit
</a>
<button onClick={resetExperiment}>
  <RetryIcon size={20} texture="solid" animate={false} />
  Reset experiment
</button>
```

The export remains transparent and color-inheriting. React completes an initiated gesture after departure. Standalone CSS SVG shares its tracks but cannot keep a hover animation running after hover ends.
