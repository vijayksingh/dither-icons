import {readingFocus} from './reading-focus';
import {startAtText} from './start-at-text';
import {listen} from './listen';
import {readAloud} from './read-aloud';
import {dragHandle} from './drag-handle';
import {skipBlock} from './skip-block';
import {collapseRail} from './collapse-rail';
import {headphones} from './headphones';
import {readingPace} from './reading-pace';
import {readerPath} from './reader-path';
import {previousWord} from './previous-word';
import {nextWord} from './next-word';

export const reader = {
  'reading-focus': readingFocus, 'start-at-text': startAtText, listen, 'read-aloud': readAloud,
  'drag-handle': dragHandle, 'skip-block': skipBlock, 'collapse-rail': collapseRail, headphones,
  'reading-pace': readingPace, 'reader-path': readerPath, 'previous-word': previousWord, 'next-word': nextWord,
};
