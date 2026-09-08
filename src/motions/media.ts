import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/02/05: starting, arresting, and propagating each keep their own identity. */
export const media={
 play:motion(800,'A gentle start with a forward intention.',['Load','Start','Coast'],[
  actor('triangle','7px 12px',[pose(0,'none'),pose(110,'translateX(-.5px) scaleX(.98)'),pose(300,'translateX(.9px) scaleX(1.015)',ease.settle),pose(490,'translateX(.65px)'),pose(670,'translateX(-.08px)'),pose(800,'none')]),
  actor('start-light','4px 12px',[light(0,0,'scaleX(.3)'),light(160,0,'scaleX(.3)'),light(340,.55,'scaleX(1)'),light(590,0,'translateX(.7px) scaleX(.3)'),light(800,0)])]),
 pause:motion(840,'Two bars come to a considered stop.',['Brake','Hold','Relax'],[
  actor('bar-left','8px 20px',[pose(0,'none'),pose(100,'translateX(-.2px)'),pose(310,'translateX(.6px) scaleY(.96)',ease.settle),pose(500,'translateX(.6px) scaleY(.96)'),pose(690,'translateX(-.05px) scaleY(1.005)'),pose(840,'none')]),
  actor('bar-right','16px 20px',[pose(0,'none'),pose(150,'translateX(.2px)'),pose(360,'translateX(-.6px) scaleY(.96)',ease.settle),pose(530,'translateX(-.6px) scaleY(.96)'),pose(730,'translateX(.05px) scaleY(1.005)'),pose(840,'none')]),
  actor('seats','12px 22px',[light(0,0),light(230,0),light(420,.4),light(650,0),light(840,0)])]),
 volume:motion(1100,'A source speaks. Its waves follow.',['Source','Near','Far'],[
  actor('speaker','12px 12px',[pose(0,'none'),pose(120,'scaleX(.97)'),pose(290,'scaleX(1.055)',ease.settle),pose(500,'scaleX(.992)'),pose(720,'none'),pose(1100,'none')]),
  actor('wave-near','13px 12px',[pose(0,'none'),pose(190,'none'),pose(400,'translateX(.35px) scaleY(1.1)',ease.settle),pose(620,'translateX(.2px) scaleY(1.03)'),pose(850,'none'),pose(1100,'none')]),
  actor('wave-far','13px 12px',[pose(0,'none'),pose(290,'none'),pose(520,'translateX(.55px) scaleY(1.07)',ease.settle),pose(730,'translateX(.3px) scaleY(1.025)'),pose(980,'none'),pose(1100,'none')]),
  actor('sound-light','18px 12px',[light(0,0),light(350,0),light(570,.5),light(880,0),light(1100,0)])])
};
