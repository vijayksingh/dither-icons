import {actor,light,motion,pose,ease} from './authoring';

/* CHART / a ruler measures three real heights from their common baseline
 *    0ms  three quantities stay fixed
 *  160ms  measuring line unfolds along the baseline
 *  390ms  ruler reaches the first bar; its height is marked
 *  650ms  ruler reaches the second; the earlier mark remains
 *  910ms  ruler reaches the highest bar; three measurements now read together
 * 1020ms  the final cap opens and a right-edge register answers
 * 1240ms  a short hold lets the comparison read
 * 1450ms  ruler retracts sideways, then the marks clear
 * 1690ms  exact neutral; no invented growth or changing data
 * MOT-01/03/05/08/14/16: measuring is the main gesture, not decoration.
 */
export const CHART_TIMING={rest:0,unfold:160,first:390,firstHold:450,second:650,secondHold:710,third:910,resolve:1020,hold:1240,clear:1450,settle:1690};
export const CHART_GEOMETRY={baseline:20.2,bars:[{x:6.1,width:3.2,top:14.1},{x:11.7,width:3.2,top:9.8},{x:17.3,width:3.2,top:5.5}],rulerStart:3.6,rulerEnd:21.4,capOffset:.45};
const G=CHART_GEOMETRY,T=CHART_TIMING;
export const CHART_POINTS=G.bars.map(b=>[b.x+b.width/2,b.top-G.capOffset]);
export const CHART_ART={
 axis:'M2.9 3.6a.7.7 0 0 1 1.4 0V20.2H21.2a.7.7 0 0 1 0 1.4H3.6a.7.7 0 0 1-.7-.7Z',
 axisLine:'M3.6 3.6v17.3h17.6',
 bars:G.bars.map(({x,width,top})=>`M${x+.6} ${top}h${width-1.2}a.6.6 0 0 1 .6.6V${G.baseline}h-${width}V${top+.6}a.6.6 0 0 1 .6-.6Z`),
 caps:G.bars.map(({x,width,top})=>`M${x-.45} ${top-.45}h${width+.9}`),
};
const level=(i:number)=>`translateY(${CHART_POINTS[i][1]-G.baseline}px)`;
export const chart=motion(T.settle,'A scan compares three bars against a shared baseline.',['Measure','Compare','Resolve'],[
 actor('chart-ruler-position','0px 0px',[pose(T.rest,'translateY(0px)'),pose(T.unfold,'translateY(0px)',ease.smooth),pose(T.first,level(0)),pose(T.firstHold,level(0)),pose(T.second,level(1)),pose(T.secondHold,level(1)),pose(T.third,level(2)),pose(T.clear,level(2)),pose(T.settle,'translateY(0px)')]),
 actor('chart-ruler',`${G.rulerStart}px ${G.baseline}px`,[light(T.rest,0,'scaleX(0)'),light(T.unfold,.6,'scaleX(1)'),light(T.third,.6,'scaleX(1)'),light(T.resolve,.8,'scaleX(1)'),light(T.hold,.8,'scaleX(1)'),light(T.clear,0,'scaleX(0)'),light(T.settle,0,'scaleX(0)')]),
 ...[T.first,T.second,T.third].map((time,i)=>actor(`chart-mark-${i}`,`${G.rulerStart}px ${CHART_POINTS[i][1]}px`,[light(T.rest,0,'scaleX(.25)'),light(time,0,'scaleX(.25)'),light(time+90,.9,'scaleX(1)'),light(T.hold,.9,'scaleX(1)'),light(T.clear,0,'scaleX(1)'),light(T.settle,0,'scaleX(.25)')])),
 actor('chart-resolve',`${G.rulerEnd}px ${CHART_POINTS[2][1]}px`,[light(T.rest,0,'translateX(-.4px) scale(.7)'),light(T.third,0,'translateX(-.4px) scale(.7)'),light(T.resolve,.9,'translateX(0px) scale(1)'),light(T.hold,.4,'translateX(.2px) scale(1)'),light(T.clear,0,'translateX(.4px) scale(1)'),light(T.settle,0,'translateX(-.4px) scale(.7)')]),
]);

// The measuring slit belongs to the ruler, including its reveal and retraction.
for(const [part,copy] of [['chart-ruler-position','chart-ruler-mask-position'],['chart-ruler','chart-ruler-mask']]){
 const track=chart.tracks.find(t=>t.part===part)!;
 chart.tracks.push({...track,part:copy});
}
