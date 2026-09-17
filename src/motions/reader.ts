import {readingFocus} from './reading-focus';
import {startAtText} from './start-at-text';
import {listen} from './listen';
import {readAloud} from './read-aloud';
import {dragHandle} from './drag-handle';
import {skipBlock} from './skip-block';
import {collapseRail} from './collapse-rail';
import {headphones} from './headphones';

export const reader = {
  'reading-focus': readingFocus, 'start-at-text': startAtText, listen, 'read-aloud': readAloud,
  'drag-handle': dragHandle, 'skip-block': skipBlock, 'collapse-rail': collapseRail, headphones,
};
