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
