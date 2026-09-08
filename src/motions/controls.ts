import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/02/06: short gestures for routine controls, without substituting symbols. */
export const controls={
 search:motion(1180,'The whole lens leans in for a closer look.',['Attend','Inspect','Return'],[
  actor('magnifier','16px 16px',[pose(0,'none'),pose(150,'translate(.2px,.15px) rotate(2deg)'),pose(440,'translate(-.45px,-.45px) rotate(-7deg)',ease.settle),pose(680,'translate(-.45px,-.45px) rotate(-7deg)'),pose(990,'translate(.05px,.05px) rotate(.7deg)'),pose(1180,'none')]),
  actor('lens-light','10.5px 10.5px',[light(0,0,'rotate(-30deg)'),light(290,0,'rotate(-30deg)'),light(470,.65,'rotate(0deg)'),light(750,.2,'rotate(45deg)'),light(980,0,'rotate(60deg)'),light(1180,0)])]),
 home:motion(1220,'A familiar doorway opens to welcome you.',['Welcome','Reveal','Rest'],[
  actor('door','10.5px 18px',[pose(0,'none'),pose(150,'scaleX(1.04)'),pose(440,'scaleX(.35) skewY(-8deg)',ease.settle),pose(710,'scaleX(.35) skewY(-8deg)'),pose(1040,'scaleX(1.025) skewY(.5deg)'),pose(1220,'none')]),
  actor('interior-light','12px 21px',[light(0,0,'scaleY(.4)'),light(260,0,'scaleY(.4)'),light(530,.3,'scaleY(1)'),light(780,.3),light(1080,0),light(1220,0)])]),
 settings:motion(1080,'A measured adjustment finds its detent.',['Take up','Click','Release'],[
  actor('gear','12px 12px',[pose(0,'none'),pose(130,'rotate(-3deg)'),pose(380,'rotate(16deg)',ease.settle),pose(460,'rotate(13.5deg)'),pose(670,'rotate(13.5deg)'),pose(940,'rotate(-1deg)'),pose(1080,'none')]),
  actor('detent','12px 12px',[light(0,0,'rotate(-5deg)'),light(310,0,'rotate(-5deg)'),light(450,.7,'rotate(14deg)'),light(660,.35,'rotate(14deg)'),light(940,0,'rotate(0deg)'),light(1080,0)])]),
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
