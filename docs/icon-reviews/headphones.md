# Headphones: Interface Craft review

## Context
Audio output/listening device. Cognimated uses Headphones for “Download MP3” at `web-absorb/pwa/src/ReadingListView.tsx:124`; the native label determines the action. This headset differs from Volume's speaker, Listen's speaking page and Read Aloud's microphone input.

## First Impressions
Source-level critique: an open arch and two padded earcups identify a device before motion. The user's screenshot exposed band lines crossing the hollow cup contours. Matching animated cup knockouts now occlude the band before cups are painted; the revised material weights lighten Solid.

## Visual Design
The arch spans x=4–20 and joins the cups at y=12. Each cup rotates inward 5 degrees around its drawn suspension point. Drivers remain within the cups and expand 1.22 vertically. Cushion marks inherit their cup's transform. Solid contours are 1.05 units; Dither/Outline retain a 1.35 footprint, with transparent 0.35-edge Outline. The arch knockout uses the complete receiving cup silhouette and the same material width.

## Interface Design
Seat both cups against fixed suspension points; then the left and right drivers respond in a short stagger. Let drivers relax while the cups hold, clear cushion light and return the cups. The arch stays still. Each moving mask uses exactly its cup's transform origin, frames and easing, preventing outline intersections through the entire gesture. No audio, connected hardware or completed download is asserted.

## Consistency & Conventions
MOT-01/02/03/05 preserve device identity and physical attachment. MOT-06/07 bound rotation and bind grain/occlusion to the cups. MOT-08/16 require seating before response. MOT-09/10/11/12 retain finite shared tracks, neutral return and static reduced-motion meaning. MOT-14 excludes playback claims. MOT-13/15 user rendered approval remains pending. CSS hover cannot continue after departure; React can.

## User Context
Keep the native output, Listen or Download MP3 label. Do not use this as microphone-permission or device-detection status. Reduced motion retains the full headset and drivers. Human recognition alongside Listen and Volume remains a user review task.

## Top Opportunities
Implemented: device-specific seating/driver sequence, lighter strokes and connected joints without crossing Outline cores. Remaining: earcup weight and driver detail at 16/24px.

## Encoded storyboard and review
[Timing](../../src/motions/headphones.ts): 1260ms. Cup and matching `*-cut` actors pivot at (4,12)/(20,12), engage at 110ms, seat at 310ms. Drivers at (5.5,15.5)/(18.5,15.5) peak at 450/530ms and relax by 690ms. Cushion responses clear at 830ms. Cups return by 1080ms; neutral end 1260ms.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests cover drawn attachment points, identical visible/knockout tracks, rotating bounds, driver containment and transparent joint pixels. Screenshots record the first drawing's defects; no corrected user acceptance or performance benchmark is claimed.
