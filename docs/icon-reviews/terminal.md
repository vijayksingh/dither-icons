# terminal: Interface Craft review

## Context
A command-line interface: enter a command, submit it, receive text, remain ready. Relevant to the platform terminal entry and developer tools.

## First Impressions
The rejected version typed two marks and decorated the cursor. It never performed the defining terminal action: submitting a line. The revised line feed visibly changes the relationship between input and output.

## Visual Design
The rounded frame stays fixed. The prompt remains visible as it moves into history, with clear space below the inner top edge. Text uses the inherited ink; the two typed glyphs and thin return mark remain smaller than the chevron. No fabricated checkmark.

## Interface Design
Typing holds for 100ms before submission. The history rises 2.8 units while the cursor returns to the beginning of a lower row. Response length and cursor displacement use one linear interpolation, so the text writes behind the cursor rather than appearing independently. Both rows clear before neutral recovery.

## Consistency & Conventions
MOT-01/03/04/05/07/08/15/16 govern identity, connected parts, timing and localized consequences. MOT-09/10/11/12 retain the shared replay, exact return, stillness and export contracts. MOT-14 reserves application state for the host.

## User Context
Keyboard and tap replay the same finite exchange. At compact sizes the line feed and cursor remain the gesture; the tiny literal glyphs are secondary. Motion does not execute commands or certify a result.

## Top Opportunities
Make Return the turning point; physically connect the response to its cursor; leave a readable exchange before resetting.

## Encoded storyboard and review
[Authored timeline](../../src/motions/terminal.ts). 1560ms: type at 180–420ms, hold until 520ms, carriage return at 690ms, response completes at 980ms, hold through 1120ms, clear by 1290ms, ready at 1560ms. Actors: terminal-history, terminal-cursor, terminal-first, terminal-second, terminal-return, terminal-response.

Reviewed the complete live sequence at actual and half speed, eight inspected poses, and identical 58% part matrices across dither/solid/outline. Input and output are visibly connected; temporary marks clear before the final rest. Keyboard playback finishes after departure; reduced motion leaves no active tracks or visible accents. User accepted this concept-level revision on 2026-09-10 and requested the next batch.

[Evidence and limits](../motion-evidence/refinement-08/README.md).

![Native half-speed sequence, Terminal / CPU / Chart / Bolt left to right](../motion-evidence/refinement-08/native-filmstrip.png)


## Outline material correction — 2026-10-02

**Invariant and critique:** Command frame, submission prompt and ready cursor remain recognizable. Open the frame, prompt and cursor interiors without removing the command receipts or changing their submission order.

**Material rule:** Reuse the reader's 0.5-unit Outline edges and transparent cores. Fine text and small semantic dots stay readable. Applicable: MOT-01, MOT-03, MOT-07, MOT-10, MOT-11, MOT-12, MOT-13 and MOT-15.

**Storyboard retained:** Type / Submit / Respond, 1560ms. Authored tracks remain: `terminal-history`, `terminal-cursor`, `terminal-first`, `terminal-second`, `terminal-return`, `terminal-response`. This correction changes material, not the semantic action or timing.

**Rendered review:** [Before/after and compact review](../outline-audit/README.md#correction-evidence) plus [actual 50% browser pose](../outline-audit/browser/pose-50.png). The six inspected poses are 0%, 10%, 35%, 50%, 75% and 100%; actor binding, material-switch pose preservation, keyboard completion and stillness checks are recorded with that evidence. User visual approval remains pending. Standalone SVG retains the authored CSS tracks; CSS hover still ends on departure while React finishes its gesture.
