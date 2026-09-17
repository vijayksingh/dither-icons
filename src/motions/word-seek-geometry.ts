/** Shared drawing vocabulary for a directional pair; performances remain individual. */
export const WORD_SEEK_GEOMETRY = {
  centers: [5, 12, 19], wordY: 8, wordWidth: 4, step: 7,
  cursorLeft: 9, cursorRight: 15, cursorTop: 11, cursorBottom: 13.5,
  responseY: 10, arrowY: 19,
};
const G = WORD_SEEK_GEOMETRY;
export const WORD_SEEK_ART = {
  context: 'M3 4H21',
  words: G.centers.map(x => `M${x - G.wordWidth / 2} ${G.wordY}h${G.wordWidth}`),
  cursor: 'M9 11v1.75a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V11',
  previousArrow: 'M15.5 19h-7l2.75-2.75M8.5 19l2.75 2.75',
  nextArrow: 'M8.5 19h7l-2.75-2.75M15.5 19l-2.75 2.75',
  underlines: G.centers.map(x => `M${x - G.wordWidth / 2} ${G.responseY}h${G.wordWidth}`),
};
