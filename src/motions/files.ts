import {folder} from './folder';
import {file} from './file';
import {copy} from './copy';
import {trash} from './trash';
import {upload} from './upload';
import {motion,actor,pose,light,ease} from './authoring';
/** MOT-02/03/05: hinges, sources, and containers define the motion. */
export const files={
 upload,
 folder,file,copy,trash,
 book:motion(1180,'Two leaves open around one steady spine.',['Part','Read','Bind'],[
  actor('left-leaf','12px 14px',[pose(0,'none'),pose(130,'scaleX(.97)'),pose(430,'skewY(3deg) scaleX(1.035)',ease.settle),pose(680,'skewY(3deg) scaleX(1.035)'),pose(990,'skewY(-.5deg)'),pose(1180,'none')]),
  actor('right-leaf','12px 14px',[pose(0,'none'),pose(180,'scaleX(.97)'),pose(480,'skewY(-3deg) scaleX(1.035)',ease.settle),pose(720,'skewY(-3deg) scaleX(1.035)'),pose(1040,'skewY(.5deg)'),pose(1180,'none')]),
  actor('page-light','12px 12px',[light(0,0,'scaleX(.35)'),light(310,0,'scaleX(.35)'),light(520,.6,'scaleX(1)'),light(800,.2),light(1020,0),light(1180,0)])])
};
