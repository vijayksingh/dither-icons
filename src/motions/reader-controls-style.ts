/** Reader-control weights, matched to the initial reader batch after the
 * lighter revision read as too thin in Solid and Outline.
 */
export const READER_CONTROLS_STYLE = {
  contour: 1.5, solidContour: 1.5, text: 1.25, outlineText: .9,
  response: 1, outlineResponse: .75, outlineEdge: .5, referenceOpacity: .5,
} as const;
