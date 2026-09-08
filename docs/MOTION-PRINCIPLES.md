# Dither Icons: motion principles

These rules encode the accepted Bell, Heart, Download, and Layers studies. Apply them to each icon individually. A finished timeline is the quality unit; an animation preset is not.

## Binding rules

| ID | Principle | Required outcome |
| --- | --- | --- |
| MOT-01 | Preserve identity | The identifying silhouette stays visible at every frame. Download never becomes a checkmark; a pause never becomes play. |
| MOT-02 | Start with a verb | Describe the object's action before writing keyframes: inspect, hinge, receive, fold, settle. |
| MOT-03 | Give parts a relationship | A secondary part responds to the primary action with appropriate delay, direction, or resistance. Do not move all parts as one unless the object is rigid. |
| MOT-04 | Choreograph energy | Prepare briefly, perform the action, then dissipate energy. Most time belongs to the readable action and recovery, not anticipation. |
| MOT-05 | Keep a stable reference | A tray, frame, baseline, roof, or anchor makes the moving part understandable. Arrows preserve their direction. |
| MOT-06 | Scale motion to the object | Small displacement and restrained elastic overshoot. No generic wiggle, full spin, floating loop, or whole-icon bounce without a physical reason. |
| MOT-07 | Texture belongs to the object | Stable ordered dither moves with its contour. Do not animate noise, scatter the identity into particles, or shimmer the whole surface. |
| MOT-08 | Accents explain a response | Ring marks follow a strike; a highlight follows a catch. Accents start and finish hidden, remain subordinate, and are not required for recognition. |
| MOT-09 | Finish the gesture | Hover exit and focus departure do not cut React playback short. Repeated triggers during playback do not pile up or reset it. |
| MOT-10 | Return exactly | Identity parts end at their starting transform and opacity. A stopped or completed animation leaves no residual pose. |
| MOT-11 | Respect input and stillness | Hover, keyboard focus, and click/tap work. Motion-off, reduced motion, and unmount cancel work. The static icon remains fully useful. |
| MOT-12 | One source of timing | The named SVG parts, native playback, CSS fallback, and frame inspector use the same authored tracks. Transform and opacity only. |
| MOT-13 | Verify the whole sequence | Inspect rest, anticipation, action, recovery, and rest again. Review at actual size and actual speed, then slow/scrub to diagnose. |
| MOT-14 | Do not simulate app success | A library preview is a gesture study. It does not assert that a file downloaded, a message sent, or a setting changed. |

## Per-icon process

1. Write its verb, invariant, moving parts, and three stages in the catalog ledger.
2. Author the parts and pivot points. Preserve the existing recognizable contour where it is sound.
3. Write its own timeline. Reuse the playback engine and easing vocabulary; do not reuse another object's performance.
4. Inspect the object in isolation and in the collection. Correct overlaps, clipping, ambiguous intermediate poses, or an overlong recovery.
5. Check the neutral ending, repeated input, reduced motion, and SVG export. Record the inspected frames and remaining limits.

The four accepted studies remain reference examples. Newly finished icons use the same native playback lifecycle and inspector. Standalone CSS hover exports share the tracks but cannot continue after pointer departure; React supplies that stronger lifecycle contract.
