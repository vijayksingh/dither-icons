# Astra handoff contract

Use this for high-complexity icon, motion, visual-language, or cross-file design work. It is the source of truth for Astra prompts in this repository. `AGENTS.md` carries the short version; this file carries the working contract.

## Why the previous handoff failed

The failed selection batch gave Astra four labels and implementation constraints. It did not give Astra a semantic model of the transformations. The result was technically complete but conceptually interchangeable: the icons decorated the names instead of showing what the host action does.

The repair is not stronger adjectives. The repair is a design gate before a code gate.

## Phase A: evidence and concept gate

Before asking Astra to edit, the parent agent must inspect the real call site and neighboring library icons, then send a bounded issue-shaped brief containing:

1. **User outcome** — what the person is trying to accomplish.
2. **Source evidence** — absolute file paths and line ranges for the real control, state, and handler.
3. **Verb and object** — the action and the thing being changed.
4. **Before / transition / after** — the actual causal event, not an animation adjective.
5. **Invariant** — the object, order, boundary, or relationship that must survive.
6. **Actors** — source, receiver, constraint, and response. Every visible part needs an owner.
7. **Neighbor boundary** — nearest existing icons and the exact reason this action must not reuse them.
8. **Forbidden substitutions** — motifs that would communicate the wrong action or merely decorate it.
9. **Static and compact meaning** — what remains legible at rest, 16–24px, and reduced motion.
10. **Non-goals** — state, routing, success, progress, selection, or mutation owned by the host rather than the icon.

Astra must return a concept packet before editing:

```text
DECISION
  action:
  object:
  user outcome:
  before:
  after:
  invariant:
  causal actors:
  primary instrument:
  payoff and its cause:
  nearest-neighbor rejection:
  forbidden motifs:

STORYBOARD
  rest:
  cause:
  consequence:
  settle:
  neutral return:

MEANING TESTS
  label-off reading:
  motion-off reading:
  16px reading:
  counterfactual: what wrong action would this suggest if relabeled?

RISKS
  ambiguity:
  integration boundary:
  unresolved decision:
```

No source edits, generated assets, tests, or build during Phase A. If the concept packet cannot pass the label-off and counterfactual tests, Astra must return `BLOCKED: semantic ambiguity` and propose a different instrument. It must not decorate the weak concept with stars, sparkles, plus marks, arrows, underlines, pulses, or generic clamps to make it feel finished.

The parent agent checks the packet against the actual call site and the neighboring catalog before opening Phase B. A review paragraph is not evidence of meaning; the instrument and causal sequence must make the claim observable.

## Phase B: implementation gate

Only after the concept packet passes, send a follow-up to the same Astra context with:

- exact files allowed to change;
- the accepted concept packet pasted in full;
- existing engine and export constraints;
- individual storyboard/review requirements;
- focused test commands;
- one complete-batch build command;
- explicit no-publish/no-deploy/no-version-change boundaries;
- required final report: commit, files, checks, unresolved risks, and rejected alternatives.

The implementation must preserve the accepted instrument. If the geometry drifts toward a generic symbol, stop and return to Phase A. Do not add another icon to hide a weak one. Re-author the current icon.

## Semantic acceptance gates

For every icon, ask:

- If the label disappeared, would the static drawing still identify the action's relationship?
- If all motion stopped, would the remaining parts still distinguish it from its nearest neighbor?
- Does the payoff follow a visible cause, or is it an unrelated decoration?
- Does each part have a domain owner, or are there ornamental actors with no reason to exist?
- Does the icon show a transformation of the real object, rather than a generic mood attached to it?
- Would relabeling the icon to a neighboring action make the drawing equally plausible? If yes, reject it.

For Cognimated selection commands:

- **Simplify:** subordinate cognitive branches fold into one stable readable spine while the main idea remains.
- **Tighten:** actual word units and whitespace contract horizontally while order and baseline remain.
- **Vivid:** a localized expressive ink/accent grows from a target phrase and changes its emphasis without becoming ambient decoration.
- **Transform scope:** a real selection boundary expands to the article boundary or returns; the boundary is the actor.

These are semantic constraints, not implementation suggestions. A sparkle after text movement does not mean simplify. Two arrows facing text do not automatically mean tighten. A plus does not mean vivid. A bidirectional arrow does not mean scope.

## Cost and delegation rules

- One Astra context per coherent batch. Reuse it for the Phase B follow-up; do not spawn a new agent to repair its own unresolved concept.
- Maximum four icons per batch, but fewer is correct when the concepts are coupled or ambiguous.
- Do not run a build or broad test suite before the concept gate passes.
- After implementation, run focused checks and one build. Do not repeat them for cosmetic iterations.
- If the user calls the work shallow, interrupt Astra, preserve the WIP, record the failure, and return to Phase A. Do not ask Astra to add polish to a rejected mental model.
- User visual review is a separate gate. Astra may self-check frames and compact static output, but must never claim user approval.

## Prompt shape

Write the prompt like a GitHub issue, not a mood board:

```text
Task: [one bounded outcome]
Read: [exact source, project docs, skill files]
Write: [exact allowed paths]
Source evidence: [call sites and handlers]
Concept packet: [accepted packet]
Must preserve: [invariants and host boundaries]
Must reject: [wrong neighboring meanings and forbidden motifs]
Phase: [A concept packet only | B implementation]
Verification: [focused checks, one build, no broad repetition]
Report: [fixed output blocks]
```

Avoid “top-notch”, “premium”, “unmatched”, or “make it meaningful” without observable acceptance criteria. State what the viewer must be able to infer from the drawing and what false action the drawing must not suggest.
