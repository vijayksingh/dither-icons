import {motion,actor,pose,light,ease} from './authoring';
/** MOT-02/03/14: opening correspondence, a conversational beat, and sending intent are distinct. */
export const communication={
 mail:motion(1140,'An envelope opens, then folds closed.',['Unfold','Reveal','Close'],[
  actor('flap','12px 5px',[pose(0,'none'),pose(130,'scaleY(.92)'),pose(420,'scaleY(-.42)',ease.settle),pose(680,'scaleY(-.42)'),pose(970,'scaleY(1.025)'),pose(1140,'none')]),
  actor('letter','12px 9px',[light(0,0,'translateY(0px)'),light(220,0,'translateY(0px)'),light(460,.55,'translateY(-1.5px)'),light(720,.55,'translateY(-1.5px)'),light(940,0,'translateY(0px)'),light(1140,0)])]),
 message:motion(1020,'A thought passes from dot to dot.',['Begin','Answer','Rest'],[
  actor('dot-left','7px 10px',[pose(0,'none'),pose(100,'translateY(.2px) scale(.93)'),pose(270,'translateY(-.65px) scale(1.2)',ease.settle),pose(490,'translateY(.08px)'),pose(690,'none'),pose(1020,'none')]),
  actor('dot-center','12px 10px',[pose(0,'none'),pose(210,'translateY(.2px) scale(.93)'),pose(380,'translateY(-.65px) scale(1.2)',ease.settle),pose(600,'translateY(.08px)'),pose(800,'none'),pose(1020,'none')]),
  actor('dot-right','17px 10px',[pose(0,'none'),pose(320,'translateY(.2px) scale(.93)'),pose(490,'translateY(-.65px) scale(1.2)',ease.settle),pose(710,'translateY(.08px)'),pose(910,'none'),pose(1020,'none')])]),
 send:motion(1040,'A paper plane finds its direction.',['Aim','Lead','Ease back'],[
  actor('plane','11px 13px',[pose(0,'none'),pose(140,'translate(-.45px,.4px) rotate(-4deg)'),pose(400,'translate(.85px,-.85px) rotate(2deg)',ease.settle),pose(620,'translate(.7px,-.7px) rotate(1deg)'),pose(880,'translate(-.08px,.08px) rotate(-.3deg)'),pose(1040,'none')]),
  actor('crease-light','10px 13px',[light(0,0,'scale(.8)'),light(240,0,'scale(.8)'),light(440,.6,'scale(1)'),light(720,0),light(1040,0)]),
  actor('wake','5px 17px',[light(0,0,'translate(0px,0px)'),light(280,0,'translate(0px,0px)'),light(480,.45,'translate(-.4px,.4px)'),light(780,0,'translate(-1px,1px)'),light(1040,0)])])
};
