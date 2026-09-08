import {code} from './code';
import {motion,actor,pose,light,ease} from './authoring';
/** MOT-02/03/05: syntax, readiness, signal flow, and comparison have different clocks. */
export const development={
 code,
 terminal:motion(1160,'A prompt invites the cursor into readiness.',['Prompt','Respond','Ready'],[
  actor('prompt','7px 12px',[pose(0,'none'),pose(130,'translateX(-.3px)'),pose(360,'translateX(.75px)',ease.settle),pose(520,'translateX(.65px)'),pose(830,'translateX(-.08px)'),pose(1160,'none')]),
  actor('cursor','15px 17px',[pose(0,'none'),pose(300,'none'),pose(440,'scale(.82,.55)'),pose(610,'scale(1.04,1.1)',ease.settle),pose(820,'scale(.995,.99)'),pose(1030,'none'),pose(1160,'none')]),
  actor('line-light','11px 11px',[light(0,0,'scaleX(.15)'),light(280,0,'scaleX(.15)'),light(500,.55,'scaleX(1)'),light(740,0,'scaleX(1)'),light(1160,0)])]),
 cpu:motion(1280,'An input reaches the die. An output answers.',['Receive','Process','Respond'],[
  actor('input','4px 8px',[light(0,0,'scaleX(.25)'),light(90,0,'scaleX(.25)'),light(260,.7,'scaleX(1)'),light(450,.25,'scaleX(1)'),light(580,0),light(1280,0)]),
  actor('die','12px 12px',[pose(0,'none'),pose(250,'none'),pose(380,'scale(.94)'),pose(540,'scale(1.08)',ease.settle),pose(720,'scale(.985)'),pose(940,'none'),pose(1280,'none')]),
  actor('die-light','12px 12px',[light(0,0),light(310,0),light(510,.55),light(740,.18),light(930,0),light(1280,0)]),
  actor('output','15px 16px',[light(0,0,'scaleX(.2)'),light(570,0,'scaleX(.2)'),light(800,.7,'scaleX(1)'),light(1020,.2),light(1190,0),light(1280,0)])]),
 chart:motion(1260,'Each bar answers from the same baseline.',['Compare','Emphasize','Resolve'],[
  actor('bar-small','7.5px 18px',[pose(0,'none'),pose(110,'scaleY(.95)'),pose(340,'scaleY(1.12)',ease.settle),pose(510,'scaleY(1.07)'),pose(780,'scaleY(.99)'),pose(1000,'none'),pose(1260,'none')]),
  actor('bar-medium','13.5px 18px',[pose(0,'none'),pose(130,'none'),pose(260,'scaleY(.96)'),pose(470,'scaleY(1.075)',ease.settle),pose(640,'scaleY(1.045)'),pose(950,'scaleY(.993)'),pose(1140,'none'),pose(1260,'none')]),
  actor('bar-tall','19.5px 18px',[pose(0,'none'),pose(270,'none'),pose(400,'scaleY(.97)'),pose(610,'scaleY(1.05)',ease.settle),pose(780,'scaleY(1.025)'),pose(1080,'scaleY(.995)'),pose(1260,'none')]),
  actor('cap-small','7.5px 12px',[light(0,0),light(170,0),light(370,.55),light(660,0),light(1260,0)]),
  actor('cap-medium','13.5px 7px',[light(0,0),light(310,0),light(510,.55),light(800,0),light(1260,0)]),
  actor('cap-tall','19.5px 3px',[light(0,0),light(450,0),light(650,.55),light(940,0),light(1260,0)])])
};
