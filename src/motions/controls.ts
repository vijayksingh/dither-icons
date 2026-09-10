import {search} from './search';
import {home} from './home';
import {settings} from './settings';
import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/02/06: short gestures for routine controls, without substituting symbols. */
export const controls={
 search, home, settings,
 check:motion(900,'The vertex seats. The long arm affirms.',['Seat','Affirm','Rest'],[
  actor('check','9px 17px',[pose(0,'none'),pose(130,'translateY(.45px) rotate(-3deg) scale(.985)'),pose(340,'translateY(-.15px) rotate(2deg) scale(1.025)',ease.settle),pose(530,'rotate(-.4deg)'),pose(740,'none'),pose(900,'none')]),
  actor('affirm-light','10px 15px',[light(0,0,'translate(0px,0px) scale(.65)'),light(180,0,'translate(0px,0px) scale(.65)'),light(360,.75,'translate(3px,-3px) scale(1)'),light(620,0,'translate(7px,-7px) scale(.65)'),light(900,0)])]),
 close:motion(720,'Two diagonals close around one meeting point.',['Gather','Meet','Release'],[
  actor('diagonal-down','12px 12px',[pose(0,'none'),pose(110,'rotate(-2deg) scale(.985)'),pose(290,'rotate(2.5deg) scale(.95)',ease.settle),pose(410,'rotate(2.5deg) scale(.95)'),pose(590,'rotate(-.3deg) scale(1.005)'),pose(720,'none')]),
  actor('diagonal-up','12px 12px',[pose(0,'none'),pose(150,'rotate(2deg) scale(.985)'),pose(330,'rotate(-2.5deg) scale(.95)',ease.settle),pose(450,'rotate(-2.5deg) scale(.95)'),pose(630,'rotate(.3deg) scale(1.005)'),pose(720,'none')])]),
 plus:motion(840,'Make room across, then make room above.',['Across','Extend','Rest'],[
  actor('horizontal','12px 12px',[pose(0,'none'),pose(100,'scaleX(.94)'),pose(290,'scaleX(1.12)',ease.settle),pose(490,'scaleX(1.06)'),pose(690,'scaleX(.99)'),pose(840,'none')]),
  actor('vertical','12px 12px',[pose(0,'none'),pose(90,'none'),pose(180,'scaleY(.96)'),pose(390,'scaleY(1.12)',ease.settle),pose(550,'scaleY(1.06)'),pose(750,'scaleY(.99)'),pose(840,'none')]),
  actor('tip-light','12px 12px',[light(0,0,'scale(.94)'),light(200,0,'scale(.94)'),light(420,.45,'scale(1.1)'),light(660,0,'scale(1.16)'),light(840,0)])])
};
