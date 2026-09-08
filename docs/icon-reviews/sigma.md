# sigma: Interface Craft review

## Context

**Collect several terms into one result.** CraftingAttention's `LossReductionArena.tsx:385` uses Sigma for the actual Sum reduction control. The icon should express many-to-one reduction without displaying invented loss values or implying that a backward pass succeeded.

## First Impressions

The complete operator carries the identity. Moving or folding the glyph would make the equation harder to recognize; its waist is a natural receiving point, and its lower terminal provides a destination for the result. The gesture therefore happens through the operator rather than moving the operator itself.

## Visual Design

An original continuous sigma contour has balanced upper and lower terminals and a generous open center. Three fine terms enter from the left. A clipped patch accumulates at the waist, then a trace follows the diagonal and lower stroke. Two short exterior witnesses make the final output visible even in solid material, where a same-color interior light naturally merges into the fill.

**Identity boundary:** The entire sigma stays fixed and visible. Input terms and light are accents, never fragments removed from the glyph. The trace is clipped to the real contour; it cannot cross the open center as a free-floating blob.

## Interface Design

The three inputs arrive 90ms apart at a shared waist. Only after the final term arrives does the accumulated light travel down to the foot and across to the terminal. Terminal light precedes the two output witnesses. The input dots do not imply numerical operands, and the output is a semantic gesture rather than a computed answer.

## Consistency & Conventions

MOT-01/02/05 preserve a stable mathematical operator. MOT-03/08/16 require every input before output and put the climax at the terminal. MOT-07 keeps the dither still; MOT-09–15 preserve the common lifecycle, exact return, stillness, shared timing, and individual review. Platform handoff: UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7.

## User Context

Use beside the native Sum label. A frequent lesson control should generally use still 24px solid/outline; the full gesture suits a larger operation preview. It does not replace the lesson's actual reduction visualization or communicate a loss value.

## Top Opportunities

1. Keep the symbol readable while terms move through its meaning.
2. Make the last operand a real dependency for the output.
3. Let the result leave from a terminal, with a restrained exterior response.

## Encoded storyboard and review

**Gather / Combine / Release · 1520ms**. [sigma.ts](../../src/motions/sigma.ts) contains the individual clock and tunable actors. [PlatformToolsArtwork.tsx](../../src/PlatformToolsArtwork.tsx) clips the receiver and trace to the operator.

| Actor | Key times (ms) |
| --- | --- |
| Three input terms | 100/190/280 entry; 390/480/570 arrival |
| `sum-receiver` | 390 first accumulation; 570 full; 660 release |
| `sum-trace` | 660 waist; 800 foot; 960 terminal |
| `sum-terminal` | 960 response; 1260 clear |
| Output witnesses | 1040 peak; 1260 clear |

Actual and half-speed playback reviewed. Eight poses include exact start/end equality. Dark dither/outline and light Cobalt solid preserve the same inspected 48% pose. See [batch validation](../VALIDATION.md) for interaction, reduced motion, and size checks. The solid interior trace is intentionally subordinate; input and exterior response retain the causal story.

**Reference position: 1 of four.**

![Sigma output at 66%, first position](../motion-evidence/platform-04/pose-66.png)

[Incoming terms](../motion-evidence/platform-04/pose-28.png) · [Rest](../motion-evidence/platform-04/pose-0.png) · [Outline](../motion-evidence/platform-04/outline-48.png)
