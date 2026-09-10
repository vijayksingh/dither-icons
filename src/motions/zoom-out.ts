import {actor,motion,pose,light,ease} from './authoring';
import {SEARCH_ART} from './search';
/* ZOOM OUT / reduce the subject → reveal context → retain orientation
 *    0ms  a fixed lens and unmistakable minus sign
 *  140ms  four corners identify the current field of view
 *  510ms  that field recedes inside the lens
 *  610ms  surrounding points become visible in the space just made
 *  780ms  hold subject and new context together
 * 1040ms  contextual witnesses clear before the field resets
 * 1380ms  original minus lens; no control state changes in the library
 * MOT-01/03/05/08/16: seeing more follows making the subject smaller.
 */
export const ZOOM_OUT_TIMING={rest:0,identify:140,fit:510,context:610,hold:780,clear:1040,settle:1380};
export const ZOOM_OUT_GEOMETRY={center:[9.8,9.8],radius:4.65,fieldExtent:2.75,scale:.58,contextRadius:3.8,points:[[9.8,6],[13.6,9.8],[9.8,13.6],[6,9.8]]};
const G=ZOOM_OUT_GEOMETRY,T=ZOOM_OUT_TIMING;
export const ZOOM_OUT_ART={body:SEARCH_ART.body,minus:'M7.7 9.8h4.2',field:'M7.05 7.95v-.9h.9M11.65 7.05h.9v.9M12.55 11.65v.9h-.9M7.95 12.55h-.9v-.9'};
export const zoomOut=motion(T.settle,'Step back. See what surrounds it.',['Frame','Recede','Reveal'],[
 actor('zoom-field-position','9.8px 9.8px',[pose(T.rest,'scale(1)'),pose(T.identify,'scale(1)',ease.settle),pose(T.fit,`scale(${G.scale})`),pose(T.clear,`scale(${G.scale})`),pose(T.settle,'scale(1)')]),
 actor('zoom-field','9.8px 9.8px',[light(T.rest,0),light(T.identify,.85),light(T.hold,.85),light(T.clear,0),light(T.settle,0)]),
 ...G.points.map((_,i)=>actor(`zoom-context-${i}`,'9.8px 9.8px',[light(T.rest,0,'scale(.88)'),light(T.fit+i*22,0,'scale(.88)'),light(T.context+i*22,.85,'scale(1)'),light(T.hold,.85,'scale(1)'),light(T.clear,0,'scale(1.04)'),light(T.settle,0,'scale(.88)')])),
]);
