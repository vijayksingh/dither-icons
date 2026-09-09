import {tokenize} from './tokenize';
import {embeddingLookup} from './embedding-lookup';
import {attentionFocus} from './attention-focus';
import {batchSampling} from './batch-sampling';
export const dataFlow={tokenize,'embedding-lookup':embeddingLookup,'attention-focus':attentionFocus,'batch-sampling':batchSampling};
