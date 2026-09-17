/** Optical hierarchy in the reader family's 24 x 24 grid, not a universal standard. */
export const READER_STYLE = {
  contour: 1.5,
  text: 1.25,
  response: 1,
  contextOpacity: .72,
} as const;

/** Outline keeps the same outer footprint, but opens the contour's core.
 * Prose stays single-line: outlining the smaller letters would add visual noise.
 */
export const READER_OUTLINE = {
  edge: .5,
  text: .9,
  response: .75,
} as const;
