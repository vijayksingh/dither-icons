import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/05/14: a person, protection and attention keep their state throughout. */
export const presence={
 user:motion(1120,'A small nod, softly answered by the shoulders.',['Notice','Acknowledge','Ease'],[
  actor('head','12px 12px',[pose(0,'none'),pose(130,'translateY(-.15px) rotate(2deg)'),pose(390,'translateY(.45px) rotate(-7deg) scaleY(.97)',ease.settle),pose(580,'translateY(.35px) rotate(-6deg) scaleY(.98)'),pose(890,'translateY(-.05px) rotate(.7deg)'),pose(1120,'none')]),
  actor('shoulders','12px 22px',[pose(0,'none'),pose(240,'none'),pose(500,'scale(1.015,.97) rotate(-.8deg)'),pose(750,'scale(1.005,.99)'),pose(1010,'none'),pose(1120,'none')])]),
 lock:motion(1060,'The shackle takes tension. The lock holds.',['Test','Hold','Seat'],[
  actor('shackle','12px 10px',[pose(0,'none'),pose(130,'scaleY(.985)'),pose(350,'scaleY(1.06)',ease.settle),pose(580,'scaleY(1.06)'),pose(820,'scaleY(.985)'),pose(1060,'none')]),
  actor('seat-light','12px 10px',[light(0,0),light(250,0),light(450,.65),light(680,.3),light(920,0),light(1060,0)]),
  actor('body-light','12px 14px',[light(0,0),light(410,0),light(620,.35),light(870,0),light(1060,0)])]),
 eye:motion(1400,'A glance finds its subject, then returns.',['Notice','Follow','Center'],[
  actor('pupil','12px 12px',[pose(0,'none'),pose(230,'translateX(-.8px)',ease.settle),pose(440,'translateX(-.8px)'),pose(720,'translateX(1.1px)',ease.settle),pose(920,'translateX(1.1px)'),pose(1220,'translateX(-.08px)'),pose(1400,'none')]),
  actor('attention-light','12px 12px',[light(0,0),light(490,0),light(730,.45),light(1000,.2),light(1260,0),light(1400,0)])])
};
