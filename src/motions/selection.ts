import {simplify} from './simplify';
import {tighten} from './tighten';
import {vivid} from './vivid';
import {transformScope} from './transform-scope';

export const selection = {simplify, tighten, vivid, 'transform-scope': transformScope};
