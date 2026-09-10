import {user} from './user';
import {lock} from './lock';
import {motion,actor,pose,light,ease} from './authoring';
/** MOT-01/05/14: a person, protection and attention keep their state throughout. */
export const presence={
 user,
 lock,
 eye:motion(1400,'A glance finds its subject, then returns.',['Notice','Follow','Center'],[
  actor('pupil','12px 12px',[pose(0,'none'),pose(230,'translateX(-.8px)',ease.settle),pose(440,'translateX(-.8px)'),pose(720,'translateX(1.1px)',ease.settle),pose(920,'translateX(1.1px)'),pose(1220,'translateX(-.08px)'),pose(1400,'none')]),
  actor('attention-light','12px 12px',[light(0,0),light(490,0),light(730,.45),light(1000,.2),light(1260,0),light(1400,0)])])
};
