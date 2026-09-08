import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/02/04/05: directional silhouettes travel without leaving their frame. */
export const navigation={
 'arrow-right':motion(780,'A small draw back, then a clear way forward.',['Draw back','Lead','Arrive'],[
  actor('arrow','12px 12px',[pose(0,'none'),pose(110,'translateX(-.65px)'),pose(300,'translateX(1.8px)',ease.settle),pose(470,'translateX(1.55px)'),pose(640,'translateX(-.12px)'),pose(780,'none')]),
  actor('tail-light','3px 12px',[light(0,0,'scaleX(.2)'),light(160,0,'scaleX(.2)'),light(330,.65,'scaleX(1)'),light(580,0,'translateX(1px) scaleX(.3)'),light(780,0)])]),
 'arrow-up':motion(860,'Build a little lift, then clear the way.',['Gather','Lift','Level'],[
  actor('arrow','12px 12px',[pose(0,'none'),pose(130,'translateY(.7px) scaleY(.97)'),pose(350,'translateY(-1.5px) scaleY(1.015)',ease.settle),pose(560,'translateY(-1.2px)'),pose(720,'translateY(.1px)'),pose(860,'none')]),
  actor('lift-light','12px 21px',[light(0,0,'scaleY(.3)'),light(200,0,'scaleY(.3)'),light(400,.6,'translateY(-.4px) scaleY(1)'),light(650,0,'translateY(-1px) scaleY(.5)'),light(860,0)])]),
 'external-link':motion(920,'The frame stays. The corner reaches outward.',['Anchor','Reach','Return'],[
  actor('arrow','17px 7px',[pose(0,'none'),pose(120,'translate(-.35px,.35px)'),pose(350,'translate(1.1px,-1.1px)',ease.settle),pose(570,'translate(.95px,-.95px)'),pose(780,'translate(-.08px,.08px)'),pose(920,'none')]),
  actor('frame','10px 14px',[pose(0,'none'),pose(190,'none'),pose(400,'translate(-.25px,.25px)'),pose(740,'none'),pose(920,'none')]),
  actor('corner-light','18px 6px',[light(0,0),light(270,0),light(430,.7),light(670,0),light(920,0)])])
};
