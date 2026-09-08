import {motion,actor,pose,light,ease} from './authoring';
/** MOT-02/07/08: light travels across a stable material, never through random grain. */
export const atmosphere={
 sparkles:motion(1180,'One glint opens. A smaller star answers.',['Gather','Glint','Echo'],[
  actor('star','12px 12px',[pose(0,'none'),pose(150,'scale(.91,.94) rotate(-3deg)'),pose(390,'scale(1.06,1.08) rotate(4deg)',ease.settle),pose(600,'scale(.995,1.025) rotate(-.6deg)'),pose(850,'scale(1.008) rotate(.2deg)'),pose(1180,'none')]),
  actor('satellite','20px 4px',[pose(0,'none'),pose(220,'scale(.8) rotate(-12deg)'),pose(520,'scale(1.25) rotate(14deg)',ease.settle),pose(740,'scale(.98) rotate(-2deg)'),pose(1000,'none'),pose(1180,'none')]),
  actor('star-light','12px 12px',[light(0,0,'scaleY(.3)'),light(180,0,'scaleY(.3)'),light(390,.65,'scaleY(1)'),light(650,0,'scaleY(.6)'),light(1180,0)])]),
 sun:motion(1160,'The center warms. The rays answer.',['Warm','Radiate','Rest'],[
  actor('rays-cardinal','12px 12px',[pose(0,'none'),pose(140,'scale(.96)'),pose(410,'scale(1.035) rotate(3deg)',ease.settle),pose(610,'scale(1.035) rotate(3deg)'),pose(900,'scale(.998) rotate(-.3deg)'),pose(1160,'none')]),
  actor('rays-diagonal','12px 12px',[pose(0,'none'),pose(120,'none'),pose(260,'scale(.96)'),pose(520,'scale(1.06) rotate(3deg)',ease.settle),pose(730,'scale(1.04) rotate(3deg)'),pose(1020,'scale(.998) rotate(-.3deg)'),pose(1160,'none')]),
  actor('warmth','12px 12px',[light(0,0,'scale(.94)'),light(120,.12,'scale(.94)'),light(350,.55,'scale(1)'),light(700,.22),light(980,0),light(1160,0)])]),
 moon:motion(1300,'A quiet crescent catches the last light.',['Incline','Catch light','Still'],[
  actor('crescent','12px 12px',[pose(0,'none'),pose(180,'rotate(1.5deg)'),pose(510,'rotate(-7deg)',ease.settle),pose(760,'rotate(-7deg)'),pose(1100,'rotate(.5deg)'),pose(1300,'none')]),
  actor('rim-light','12px 12px',[light(0,0),light(310,0),light(590,.5),light(850,.2),light(1120,0),light(1300,0)])]),
 bolt:motion(780,'Energy travels through the bend to the point.',['Charge','Conduct','Discharge'],[
  actor('charge','13px 7px',[light(0,0,'translate(-.3px,-.2px)'),light(100,.7),light(230,.45,'translate(-.35px,.6px)'),light(350,0),light(780,0)]),
  actor('conduct','12px 12px',[light(0,0),light(140,0),light(290,.75),light(430,.3),light(550,0),light(780,0)]),
  actor('discharge','10px 18px',[light(0,0,'translate(.5px,-.5px)'),light(310,0,'translate(.5px,-.5px)'),light(450,.65,'translate(0px,0px)'),light(620,0,'translate(-.5px,.7px)'),light(780,0)])])
};
