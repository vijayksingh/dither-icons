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
| MOT-15 | Review meaning individually | Apply Interface Craft critique and storyboard to each icon. Record meaning, invariant, named parts, causal timing, and rendered evidence before calling that icon complete. |
| MOT-16 | Make the climax legible | Give the strongest action a brief, localized response: tip rays after extension, an updraft behind a lift, a corner echo after reaching out, or a flare after release. Place it at the cause, let it peak just after the action, then decay independently. A technically smooth gesture with no perceptible payoff is unfinished. |

## Per-icon process

1. Write its verb, invariant, moving parts, and three stages in the catalog ledger.
2. Author the parts and pivot points. Preserve the existing recognizable contour where it is sound.
3. Write its own timeline. Reuse the playback engine and easing vocabulary; do not reuse another object's performance.
4. Inspect the object in isolation and in the collection. Correct overlaps, clipping, ambiguous intermediate poses, or an overlong recovery.
5. Check the neutral ending, repeated input, reduced motion, and SVG export. Record the inspected frames and remaining limits.

The four accepted studies remain reference examples. Newly finished icons use the same native playback lifecycle and inspector. Standalone CSS hover exports share the tracks but cannot continue after pointer departure; React supplies that stronger lifecycle contract.

The 2026-09-09 focused refinement adds MOT-16 after user feedback that the new icons lacked Download's satisfying impact. Apply it through the object's own meaning; do not turn every gesture into a collision. The first focused batch was exactly arrow-right, arrow-up, external-link, and upload; the user accepted it before the next batch began.

Refinement / 02 applies the same rules to folder, file, copy, and trash. Two concrete attachment checks support MOT-03 and MOT-07: moving paper occluders must share their visible plane's complete track, and a folded surface must keep both crease endpoints fixed. Climax timing follows the event: reveal and registration occur earlier; trash's impact occurs on closure.

The follow-up polish makes three checks explicit within MOT-03/07/08: a contact must join the actual receiving and arriving contours throughout compression, not merely line up their effect timings; a peeling surface must reveal material beneath it rather than an unexplained hole; and a surface highlight inherits that surface's coordinate frame before an exterior echo disperses independently. These are physical relationship checks, not a reason to add more effects to every icon.

Refinement / 03 applies those relationships to book, mail, message, and send. A book's whole binding stays fixed during a page turn, and its landing page matches the receiving bed before both yield. Mail's front/rear half-planes meet at its hinge so a letter and flap exchange occlusion continuously. Message keeps its bubble fixed while round dots lead a finite response. Send lets its wing flex only perpendicular to an anchored keel, while the exterior wake remains in the surrounding frame.

Refinement / 04 distinguishes four different payoffs under MOT-03/05/08/16: Play releases pressure behind a forward-moving triangle; Pause arrests each foot before compression, then sustains stillness; Volume preserves its source attachment and wave separation while distance orders the response; Code treats mirrored delimiters as one relationship, with matching timing and easing. Contact marks, wavefronts, and registration ticks follow their own causes. Highlights stay attached to surfaces; exterior effects use the surrounding frame.

Platform / 01 adds selection by real use case: Path navigation, Lab Units, placement objectives, and experiment reset. Under MOT-03/05/08, a path's signal arrives before the receiving node answers; flask contents remain inside a stationary chamber; a target's dart and occluder share one frame; and a retry glint follows the return arc into its attached head. Reusable motion expresses meaning but never changes or certifies platform state.

Platform / 02 adds volume and causal dependency checks under MOT-01/03/05/08/16. A tensor slice must carry thickness through joined top, side, and front faces; a moving surface alone does not represent a solid slice. Its exposed cut face belongs to the stationary remainder, while the selected block's full occluder shares its clock. A computation node waits for all required inputs. A captured Checkpoint stays seated after contact. Hint illumination has an internal source and remains inside its glass until the exterior rays respond. Climax follows the object's meaning: exposure, transmission, retention, and insight.

Platform / 03 ties motion to fixed references under MOT-03/05/08/16: Workspace creates space before its source lines extend; Gauge's tick responds when the needle registers; Orbit's near/far layers and occluder share one elliptical trajectory; Lifebuoy reaches the same waterline that its ripples respond to. Under MOT-06, a finite satellite traversal has an orbital reason to complete a circuit, and buoyancy has a receiving surface that explains vertical movement. Neither permits a generic icon spin, recurring bob, or animated metric claim. Sampled curved paths must also bound their interpolation error, not merely put authored endpoints on the carrier.

Platform / 04 applies MOT-03/05/08/14/16 to operation-specific feedback. Sigma output waits for every input term and travels along its actual contour. Bug diagnosis preserves the fault and the insect; it never implies repair. Sliders keeps the untouched variables fixed and binds its fill, knob, and knockout through identical interpolation. Graduation Cap maintains two physical attachment hinges; its weighted response continues after the board rests. Narrow outlines must preserve the same meaningful negative space as filled materials, especially at Bug's center seam.

Platform / 05 applies MOT-01/03/05/08/14/16 to learning workflow semantics. Code Run waits for its source receipts before launching; Test Suite waits for independent physical contacts before responding as a collection. Milestone keeps whole attachment edges fixed, with nested cloth coordinates. Concept Review retains both cards and directs light to a real earlier line. An arrow contour must join its arc, neck, and head continuously; its light route follows that same drawing through interpolation. Use a stable semantic ID and named export, plus a human-readable label and search keywords describing actual platform use. None of these gestures certifies execution success, tests passed, capability achieved, or an answer revealed.
