# Eye — blink correction

## Context
**Look, blink, reopen.** The user explicitly preferred closing and opening the eye to the earlier focus gesture. This replaces the prior no-blink decision. Preview/visibility controls still belong to the host; a transient blink does not hide actual content.

## First Impressions
The prior sideways glance was smooth but lacked the familiar physical action the user wanted. A credible blink needs an intact iris behind moving eyelids, a readable closure and a more relaxed opening.

## Visual Design
Keep the almond contour and centered round iris. The contour and aperture contract vertically around the fixed corners at y=12; the iris never scales. A shallow bowed crease and two short attached lashes carry the closed-eye state. The clip path contains a direct animated path: a group inside a clipPath does not paint reliably and is specifically covered by regression validation. The closed crease keeps useful weight while the open contour narrows.

## Interface Design
110ms of slight widening precedes full closure at 250ms. Hold closed for 70ms; reopen over 235ms with only 4% lift, then settle. A small iris highlight follows reopening at 640ms. It is visible through the same aperture. No corner brackets or scanning remain.

## Identity exception
**MOT-01 deliberate exception, explicitly requested by the user:** the open-eye silhouette temporarily becomes a closed-eye crease. The icon remains an eye and returns open. Preserve occlusion and a recognizable closed lid; do not reinterpret this as permission for unrelated icons to lose identity.

## Consistency & Conventions
MOT-03/04/05/06/07/08/09/10/11/12/13/14/15/16: individual causal parts, attached material, one clock, exact return, reduced-motion stillness and a complete React gesture after departure. The existing inspector tunes the same production tracks. Standalone CSS hover stops on pointer departure. No host state changes or simulated success.

## User Context
A familiar, short blink gives the symbol character without claiming a visibility toggle. At compact sizes the bowed lid matters more than the tiny lashes or catchlight. Motion off leaves the eye fully open.

## Top Opportunities
1. Cover the round iris with the moving aperture instead of flattening it.
2. Let a bowed crease carry the closed state for a readable 70ms.
3. Reopen more slowly and place the highlight after that opening.

## Encoded storyboard and rendered review
[eye.ts](../../src/motions/eye.ts), **1120ms**, **Close / Open / Awaken**.

```text
0 open — 110 widen — 250 close — 320 hold — 555 reopen — 640 light — 760 settle lids — 940 clear — 1120 rest
```

[Current browser evidence](../motion-evidence/refinement-07-rework/) supersedes the previous refinement for this icon. Implementation review is not user acceptance or a production release.
