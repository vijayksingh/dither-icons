import {actor,motion,pose,light,ease} from './authoring';
import {EXPLORER_ART} from './file-explorer';
/* COLLAPSE PANEL / withdraw the drawer → keep the workspace → latch
 *    0ms  an open left drawer and a left-facing arrow in a fixed frame
 *  130ms  arrow leads inward; the drawer takes up its travel
 *  470ms  drawer slides behind the left frame, without scaling its contents
 *  550ms  divider meets the retained rail; top and bottom latch witnesses
 *  810ms  the closed arrangement holds
 * 1050ms  witnesses clear, then the preview restores the drawer
 * 1460ms  original affordance; the host alone changes explorer state
 * MOT-01/03/05/07/08/16: reveal by occlusion, not shrinking the contents.
 */
export const PANEL_CLOSE_TIMING={rest:0,lead:130,withdraw:210,close:470,latch:550,hold:810,clear:1050,home:1290,settle:1460};
export const PANEL_CLOSE_GEOMETRY={left:4.4,top:5.1,width:4.8,height:13.8,divider:9.2,travel:-4.25,arrowTravel:-2.25};
const T=PANEL_CLOSE_TIMING,G=PANEL_CLOSE_GEOMETRY;
export const PANEL_CLOSE_ART={frame:EXPLORER_ART.frame,frameLine:EXPLORER_ART.frameLine,panel:'M4.4 5.1h4.8v13.8H4.4Z',divider:'M9.2 5.1v13.8',rows:'M5.8 8h1.6M5.8 11h1.6M5.8 14h1.6',arrow:'M15.2 9.3 12.5 12l2.7 2.7M12.5 12h5.4',latch:'M4.95 5.55h1.2M4.95 18.45h1.2'};
const drawer=[pose(T.rest,'translateX(0px)'),pose(T.withdraw,'translateX(0px)',ease.settle),pose(T.close,`translateX(${G.travel}px)`),pose(T.clear,`translateX(${G.travel}px)`),pose(T.home,'translateX(0px)'),pose(T.settle,'translateX(0px)')];
export const panelLeftClose=motion(T.settle,'The side panel closes while the workspace stays visible.',['Withdraw','Close','Latch'],[
 actor('panel-drawer','0px 0px',drawer),
 actor('panel-divider','0px 0px',drawer),
 actor('panel-arrow','12.5px 12px',[pose(T.rest,'translateX(0px)'),pose(T.lead,'translateX(-.6px)',ease.settle),pose(T.close,`translateX(${G.arrowTravel}px)`),pose(T.hold,`translateX(${G.arrowTravel}px)`),pose(T.home,'translateX(0px)'),pose(T.settle,'translateX(0px)')]),
 actor('panel-latch','4.95px 12px',[light(T.rest,0,'scaleX(.2)'),light(T.close,0,'scaleX(.2)'),light(T.latch,.95,'scaleX(1)'),light(T.clear,0,'scaleX(1.2)'),light(T.settle,0,'scaleX(.2)')]),
]);
