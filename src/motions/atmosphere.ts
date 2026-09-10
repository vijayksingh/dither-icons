import {motion,actor,light} from './authoring';
import {sparkles} from './sparkles';
import {sun} from './sun';
import {moon} from './moon';
/** MOT-02/07/08: light belongs to its source and carrier. */
export const atmosphere={sparkles,sun,moon,
 bolt:motion(780,'Energy travels through the bend to the point.',['Charge','Conduct','Discharge'],[
  actor('charge','13px 7px',[light(0,0,'translate(-.3px,-.2px)'),light(100,.7),light(230,.45,'translate(-.35px,.6px)'),light(350,0),light(780,0)]),
  actor('conduct','12px 12px',[light(0,0),light(140,0),light(290,.75),light(430,.3),light(550,0),light(780,0)]),
  actor('discharge','10px 18px',[light(0,0,'translate(.5px,-.5px)'),light(310,0,'translate(.5px,-.5px)'),light(450,.65,'translate(0px,0px)'),light(620,0,'translate(-.5px,.7px)'),light(780,0)])])
};
