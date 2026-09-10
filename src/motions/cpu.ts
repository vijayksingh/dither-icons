import {actor,light,motion} from './authoring';

/* CPU / load the register → clock the cells → emit a result
 *    0ms  fixed package, twelve pins and an empty die
 *  120ms  three input lanes begin loading, 55ms apart
 *  390ms  the first input reaches the die; the last at 500ms
 *  560ms  the four die cells clock in reading order (75ms stagger)
 *  865ms  complete register holds before output is permitted
 *  950ms  registered cells gather toward the output gate
 * 1110ms  one output pulse reaches the external pin
 * 1180ms  the pin gives a brief outward echo
 * 1640ms  all activity has cleared; the hardware never floats
 * MOT-01/03/05/08/14/16: input changes the register before output.
 */
export const CPU_TIMING={rest:0,appear:120,inputStagger:55,turn:240,enter:315,receive:390,lastReceive:500,clock:560,cellStagger:75,loaded:865,send:950,emit:1110,answer:1180,clear:1400,settle:1640};
export const CPU_GEOMETRY={pinOuter:1.6,packageEdge:5,coreEdge:8.8,coreRight:15.2,outputEnd:22.4,center:12,lanes:[8,12,16],cells:[[10.25,10.25],[12.25,10.25],[10.25,12.25],[12.25,12.25]],cellSize:1.5};
export const CPU_ART={
 package:'M7 5H17a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM7 6.4a.6.6 0 0 0-.6.6V17a.6.6 0 0 0 .6.6H17a.6.6 0 0 0 .6-.6V7a.6.6 0 0 0-.6-.6Z',
 packageLine:'M7 5.7H17a1.3 1.3 0 0 1 1.3 1.3V17a1.3 1.3 0 0 1-1.3 1.3H7a1.3 1.3 0 0 1-1.3-1.3V7a1.3 1.3 0 0 1 1.3-1.3Z',
 core:'M9.6 8.8h4.8a.8.8 0 0 1 .8.8v4.8a.8.8 0 0 1-.8.8H9.6a.8.8 0 0 1-.8-.8V9.6a.8.8 0 0 1 .8-.8ZM10 10v4h4v-4Z',
 coreLine:'M9.6 9.4h4.8a.2.2 0 0 1 .2.2v4.8a.2.2 0 0 1-.2.2H9.6a.2.2 0 0 1-.2-.2V9.6a.2.2 0 0 1 .2-.2Z',
 
 answer:'M23 10.4l.45-.4M23 13.6l.45.4',
};
const T=CPU_TIMING,G=CPU_GEOMETRY;
export const cpu=motion(T.settle,'Load the register. Clock it. Send the result.',['Load','Compute','Emit'],[
 ...G.lanes.map((y,i)=>actor(`cpu-input-${i}`,'0px 0px',[light(T.rest,0,`translate(1.6px,${y}px)`),light(T.appear+i*T.inputStagger,.95,`translate(1.6px,${y}px)`),light(T.turn+i*T.inputStagger,.95,`translate(6.9px,${y}px)`),light(T.enter+i*T.inputStagger,.95,`translate(6.9px,${10.5+i*1.5}px)`),light(T.receive+i*T.inputStagger,.95,`translate(8.8px,${10.5+i*1.5}px)`),light(T.clock+i*T.inputStagger,0,`translate(8.8px,${10.5+i*1.5}px)`),light(T.settle,0,`translate(1.6px,${y}px)`)])),
 ...G.cells.map(([x,y],i)=>actor(`cpu-cell-${i}`,`${x+.75}px ${y+.75}px`,[light(T.rest,0,'scale(.4)'),light(T.lastReceive+i*T.cellStagger,0,'scale(.4)'),light(T.clock+i*T.cellStagger,1,'scale(1)'),light(T.loaded,1,'scale(1)'),light(T.send,.8,`translate(${13-x}px,${11.25-y}px) scale(.4)`),light(T.emit,0,`translate(${13-x}px,${11.25-y}px) scale(.2)`),light(T.settle,0,'scale(.4)')])),
 actor('cpu-output','0px 0px',[light(T.rest,0,'translateX(15.2px) scaleX(1)'),light(T.loaded,0,'translateX(15.2px) scaleX(1)'),light(T.send,1,'translateX(15.2px) scaleX(1)'),light(T.emit,1,'translateX(22.4px) scaleX(1)'),light(T.answer,0,'translateX(22.4px) scaleX(1)'),light(T.settle,0,'translateX(15.2px) scaleX(1)')]),
 actor('cpu-answer','22.4px 12px',[light(T.rest,0,'scale(.6)'),light(T.emit,0,'scale(.6)'),light(T.answer,.95,'scale(1)'),light(T.clear,0,'scale(1.1)'),light(T.settle,0,'scale(.6)')]),
]);
