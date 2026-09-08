import {upload} from './upload';
import {motion,actor,pose,light,ease} from './authoring';
/** MOT-02/03/05: hinges, sources, and containers define the motion. */
export const files={
 upload,
 folder:motion(1160,'A cover opens to reveal what it holds.',['Unseat','Reveal','Close'],[
  actor('cover','12px 20px',[pose(0,'none'),pose(110,'scaleY(1.025)'),pose(390,'scaleY(.7)',ease.settle),pose(650,'scaleY(.7)'),pose(960,'scaleY(1.025)'),pose(1160,'none')]),
  actor('paper','12px 12px',[pose(0,'none'),pose(200,'none'),pose(470,'translateY(-2px)',ease.settle),pose(660,'translateY(-2px)'),pose(920,'translateY(.1px)'),pose(1160,'none')])]),
 file:motion(960,'A lifted corner, a glimpse of the page.',['Lift','Read','Lay flat'],[
  actor('page','12px 20px',[pose(0,'none'),pose(170,'none'),pose(380,'translateY(-.3px)'),pose(680,'none'),pose(960,'none')]),
  actor('fold','14px 8px',[pose(0,'none'),pose(110,'scale(1.02)'),pose(350,'rotate(-7deg) scale(.87)',ease.settle),pose(550,'rotate(-7deg) scale(.87)'),pose(800,'rotate(1deg) scale(1.015)'),pose(960,'none')]),
  actor('content-light','8px 14px',[light(0,0),light(230,0),light(430,.6),light(710,.2),light(900,0),light(960,0)])]),
 copy:motion(1040,'The source stays while its twin separates.',['Register','Separate','Nest'],[
  actor('source','10px 10px',[pose(0,'none'),pose(150,'translate(.25px,.25px)'),pose(350,'translate(-.3px,-.3px)'),pose(760,'none'),pose(1040,'none')]),
  actor('duplicate','15px 15px',[pose(0,'none'),pose(140,'translate(-.5px,-.5px)'),pose(380,'translate(1px,1px)',ease.settle),pose(610,'translate(1px,1px)'),pose(880,'translate(-.12px,-.12px)'),pose(1040,'none')]),
  actor('registration','7px 7px',[light(0,0,'scale(.8)'),light(200,0,'scale(.8)'),light(390,.65,'scale(1)'),light(670,0,'scale(1.1)'),light(1040,0)])]),
 trash:motion(1100,'The lid gives way, then seats gently.',['Release','Open','Seat'],[
  actor('lid','4px 6px',[pose(0,'none'),pose(110,'translateY(.35px)'),pose(350,'translateY(-.3px) rotate(-9deg)',ease.settle),pose(570,'translateY(-.3px) rotate(-9deg)'),pose(850,'translateY(.2px) rotate(1deg)'),pose(1100,'none')]),
  actor('bin','12px 21px',[pose(0,'none'),pose(200,'none'),pose(430,'translateY(.2px) scaleY(.985)'),pose(760,'none'),pose(1100,'none')]),
  actor('rim-light','12px 8px',[light(0,0,'scaleX(.7)'),light(300,0,'scaleX(.7)'),light(480,.45,'scaleX(1)'),light(730,0),light(1100,0)])]),
 book:motion(1180,'Two leaves open around one steady spine.',['Part','Read','Bind'],[
  actor('left-leaf','12px 14px',[pose(0,'none'),pose(130,'scaleX(.97)'),pose(430,'skewY(3deg) scaleX(1.035)',ease.settle),pose(680,'skewY(3deg) scaleX(1.035)'),pose(990,'skewY(-.5deg)'),pose(1180,'none')]),
  actor('right-leaf','12px 14px',[pose(0,'none'),pose(180,'scaleX(.97)'),pose(480,'skewY(-3deg) scaleX(1.035)',ease.settle),pose(720,'skewY(-3deg) scaleX(1.035)'),pose(1040,'skewY(.5deg)'),pose(1180,'none')]),
  actor('page-light','12px 12px',[light(0,0,'scaleX(.35)'),light(310,0,'scaleX(.35)'),light(520,.6,'scaleX(1)'),light(800,.2),light(1020,0),light(1180,0)])])
};
