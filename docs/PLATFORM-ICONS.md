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

## Platform / 02

| Library export | Actual platform need | Observed source in CraftingAttention |
| --- | --- | --- |
| `TensorIcon` | NumPy arrays and inspecting an indexed slice | `app/src/components/study-sheets/SheetHero.tsx:4–52`; the NumPy hero selects a rigid layer from a 3D array |
| `NetworkIcon` | PyTorch connected computation | `app/src/components/study-sheets/SheetHero.tsx:65–76`; input × weight → prediction, then a separate weight update |
| `CheckpointIcon` | Workspace version history and dashboard Checkpoints | `app/src/routes/workspace.tsx:70,91`; History currently labels retained versions. `app/src/routes/dashboard.tsx:309,340,575` uses GitCommitVertical |
| `HintIcon` | Progressive help in Lab Units | `app/src/components/lab/LabHintDrawer.tsx:26–53`; first hint, more specific hint, then answer approach |

Source inspected 2026-09-09. Tensor is an inspection metaphor: extracting a solid 1 × 2 × 2 block does not delete values. Network expresses connected computation, not a full autograd or training model. Checkpoint denotes the retained version; Retry remains appropriate for the separate restore/reset action. Hint belongs beside the native disclosure label and must not reveal content automatically.

Apply the same UI-2/4, COLOR-2/5, A11Y-2/4, and MOTION-1/4/6/7 integration rules above. The four are available as named exports and in the Learning filter, with their complete gestures in **Platform / 02**. Prefer still solid/outline in compact, frequently used controls. No platform call sites are modified by this library batch.

## Platform / 03

| Library export | Actual platform need | Observed source in CraftingAttention |
| --- | --- | --- |
| `WorkspaceIcon` | Navigate to the Learner's growing codebase and saved state | `app/src/components/PlatformCommandPalette.tsx:113–118`; currently FolderTree for Workspace history |
| `GaugeIcon` | Dashboard overview and a calibrated difficulty cue | `app/src/components/PlatformCommandPalette.tsx:105–110`; Gauge for Dashboard. `app/src/components/home/LearningCatalogPage.tsx:175` uses Gauge beside difficulty |
| `OrbitIcon` | Explore the curriculum atlas | `app/src/components/PlatformCommandPalette.tsx:97–102`; Orbit routes to `/paths/universe` |
| `LifebuoyIcon` | Open Support | `app/src/components/PlatformCommandPalette.tsx:129–134`; currently LifeBuoy |

Source inspected 2026-09-09. Workspace depicts an organized working surface; history and restoration still belong to the platform's real Checkpoint flow. Gauge returns to its starting reading and cannot indicate increased mastery. Orbit makes one finite traversal with a stationary center; it is not a loading spinner. Lifebuoy offers support without sending a request or implying a response.

Catalog categories reflect general meaning: Workspace is Development, Gauge and Lifebuoy are Interface, and Orbit is Learning. **Platform / 03** groups all four for review. The existing UI-2/4, COLOR-2/5, A11Y-2/4, and MOTION-1/4/6/7 handoff rules remain binding; frequent navigation should generally use still compact icons. This batch does not change platform call sites.

## Platform / 04

| Library export | Actual platform need | Observed source in CraftingAttention |
| --- | --- | --- |
| `SigmaIcon` | Sum loss reduction | `app/src/lessons/primitives/r3f/LossReductionArena.tsx:385`; Sigma is the real Sum mode icon |
| `BugIcon` | Diagnose a buggy parameter-registration case | `app/src/lessons/primitives/r3f/ParameterRegistrationScanner.tsx:359`; Bug labels the buggy case |
| `SlidersIcon` | Adjust independent experiment parameters | `app/src/lessons/primitives/viz/BackpropFlow.tsx:424–440` and `app/src/lessons/primitives/nn/GradientDecayExplorer.tsx:846–878`; a proposed affordance for existing functional controls, not an existing Sliders import |
| `GraduationCapIcon` | Browse Paths | `app/src/components/PlatformCommandPalette.tsx:89–94`; GraduationCap routes to `/paths` |

Source inspected 2026-09-09. Sigma denotes reduction, not an invented numerical answer. Bug locates the fault without asserting a repair. Sliders previews one independent adjustment without changing a real parameter. Graduation Cap invites curriculum exploration without certifying completion. The category split is Learning / Development / Interface / Learning.

Apply UI-2/4, COLOR-2/5, A11Y-2/4, and MOTION-1/4/6/7. Preserve the native control's label, state and keyboard behavior; use semantic currentColor. Prefer still 24px solid/outline for frequent actions and 48px+ dither for larger entry points. **Platform / 04** groups the four performances. This batch adds library exports and does not modify platform call sites.
