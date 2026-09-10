# Settings: Interface Craft refinement 05

## Context
**Make a measured adjustment.** Settings appears in the command palette and `app/src/routes/settings.tsx:103`. The preview must neither certify persistence nor suggest an ongoing loading operation.

## First Impressions
The previous gear turned and flashed a rotating tick, but nothing visibly received the adjustment. The six-tooth contour was heavy. Its response had timing without a mechanical relationship.

## Visual Design
Eight softly filleted teeth surround an open center. A small inner tab belongs to the gear; a short spring bow provides a fixed receiving contact. An early implementation used an L-shaped pawl, which read as clock hands in the browser. The final bow removes that competing symbol. Local light stays inside the aperture, and the gear index stays on the rotating surface.

## Interface Design
The gear takes up resistance by four degrees, advances to 22.5 degrees and stops. The tab reaches the spring at exactly (12, 9.05). The spring then compresses around that contact, leaving the meeting point fixed. A small contact echo follows the flex. The gear holds while the spring relaxes; all accents clear before the preview restores its initial setting.

## Consistency & Conventions
MOT-01/02/03/04/05/06/07/08/09/10/11/12/13/14/15/16. Geometry and timing live together; transforms/opacity only. Platform UI-2/4 and MOTION-6/7 retain conventional Settings identity, still feedback for frequent use and reduced-motion behavior.

## User Context
The teeth and aperture remain legible at rest and 24px. This is a finite preview of adjustment, not a save confirmation. No full spin, random oscillation or recurring clock is introduced.

## Top Opportunities
1. Turn toward a real receiver rather than a floating tick.
2. Let contact precede compression and the localized response.
3. Refine tooth shoulders and remove the clock-like inner drawing.

## Encoded storyboard and review
[settings.ts](../../src/motions/settings.ts) owns the source. Duration **1360ms**; stages **Adjust / Register / Release**.

- 120ms: resistance; 410ms: exact tab/spring contact.
- 470ms: spring flex and local light; 540ms: echo.
- 710ms: hold ends; 860ms: all accents clear.
- 1170ms: original alignment; 1360ms: exact rest.

Native 28% shows the approach, 35% the contact response, 40% the dispersing echo, and 70% the return. The gear remains fixed during spring flex. The geometry test transforms the actual drawn tab vertex to the spring endpoint with error below .00002 viewBox units. All textures preserved their inspected pose. Both playback speeds and keyboard departure completed.

![Settings is third, contact response](../motion-evidence/refinement-05/pose-35.png)

[Rest](../motion-evidence/refinement-05/pose-0.png) · [Outline](../motion-evidence/refinement-05/outline-40.png) · [Recovery](../motion-evidence/refinement-05/pose-70.png) · [Shared validation](../VALIDATION.md#focused-refinement-05--2026-09-10)
