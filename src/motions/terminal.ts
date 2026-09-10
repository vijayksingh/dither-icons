import {actor,light,motion,pose,ease} from './authoring';

/* TERMINAL / type → return → response → ready
 *    0ms  one prompt and a waiting cursor inside a fixed window
 *  180ms  cursor clears the first character cell
 *  280ms  first glyph types in; second follows at 420ms
 *  520ms  pause before Return: input must read before it is submitted
 *  690ms  command becomes history; cursor makes a real carriage return
 *  980ms  a response writes left-to-right, exactly behind the cursor
 * 1120ms  hold the exchange; no checkmark or invented success
 * 1290ms  temporary text clears before the history returns
 * 1560ms  original prompt and cursor, ready again
 * MOT-01/03/05/08/14/16: the line feed is the turning point.
 */
export const TERMINAL_TIMING={rest:0,firstMove:180,first:280,secondMove:350,second:420,submit:520,newline:690,reply:980,hold:1120,clear:1290,settle:1560};
export const TERMINAL_GEOMETRY={cursorX:11.4,cursorY:15.1,cursorWidth:2.2,cell:2.65,historyRise:2.8,responseX:6.2,responseY:16.5,responseLength:8.1,innerRight:20.6};
export const TERMINAL_ART={
 frame:'M4.3 3.4H19.7a2.5 2.5 0 0 1 2.5 2.5V18.1a2.5 2.5 0 0 1-2.5 2.5H4.3a2.5 2.5 0 0 1-2.5-2.5V5.9a2.5 2.5 0 0 1 2.5-2.5ZM4.3 5a.9.9 0 0 0-.9.9V18.1a.9.9 0 0 0 .9.9H19.7a.9.9 0 0 0 .9-.9V5.9a.9.9 0 0 0-.9-.9Z',
 frameLine:'M4.3 4.2H19.7a1.7 1.7 0 0 1 1.7 1.7V18.1a1.7 1.7 0 0 1-1.7 1.7H4.3a1.7 1.7 0 0 1-1.7-1.7V5.9a1.7 1.7 0 0 1 1.7-1.7Z',
 prompt:'M5.7 8.6a.85.85 0 0 1 1.2 0l3 2.8a.85.85 0 0 1 0 1.2l-3 2.8a.85.85 0 0 1-1.2-1.2L8.05 12 5.7 9.8a.85.85 0 0 1 0-1.2Z',
 promptLine:'M6.3 9.2 9.3 12l-3 2.8',
 cursor:'M12 14.5h1a.6.6 0 0 1 0 1.2h-1a.6.6 0 0 1 0-1.2Z',
 first:'M11.7 10.3v2.9h1.35',
 second:'M15.8 10.6h-1.4v1.1h1.4v1.5h-1.4',
 response:'M6.2 16.5h8.1',
 returnMark:'M18.5 13.7v1.2h-1.2m.5-.5-.5.5.5.5',
};
const T=TERMINAL_TIMING,G=TERMINAL_GEOMETRY;
const cursor=(x:number,y=0)=>`translate(${x}px,${y}px)`;
export const terminal=motion(T.settle,'Type a command. Return. Hear back.',['Type','Submit','Respond'],[
 actor('terminal-history','0px 0px',[pose(T.rest,'translateY(0px)'),pose(T.submit,'translateY(0px)',ease.settle),pose(T.newline,`translateY(-${G.historyRise}px)`),pose(T.clear,`translateY(-${G.historyRise}px)`),pose(T.settle,'translateY(0px)')]),
 actor('terminal-cursor','12.5px 15.1px',[pose(T.rest,cursor(0)),pose(T.firstMove,cursor(G.cell)),pose(T.first,cursor(G.cell)),pose(T.secondMove,cursor(G.cell*2)),pose(T.submit,cursor(G.cell*2),ease.settle),pose(T.newline,cursor(G.responseX-G.cursorX,G.responseY-G.cursorY),'linear'),pose(T.reply,cursor(G.responseX-G.cursorX+G.responseLength,G.responseY-G.cursorY)),pose(T.clear,cursor(G.responseX-G.cursorX+G.responseLength,G.responseY-G.cursorY)),pose(T.settle,cursor(0))]),
 ...[{part:'terminal-first',begin:T.firstMove,typed:T.first},{part:'terminal-second',begin:T.secondMove,typed:T.second}].map(({part,begin,typed})=>actor(part,'0px 0px',[light(T.rest,0),light(begin,0),light(typed,1),light(T.hold,1),light(T.clear,0),light(T.settle,0)])),
 actor('terminal-return','18px 14.5px',[light(T.rest,0),light(T.submit,0,'translateY(-.5px)'),light(T.newline,.9,'translateY(0px)'),light(T.reply,0,'translateY(.4px)'),light(T.settle,0)]),
 actor('terminal-response',`${G.responseX}px ${G.responseY}px`,[light(T.rest,0,'scaleX(0)'),{...light(T.newline,.9,'scaleX(0)'),easing:'linear'},light(T.reply,.9,'scaleX(1)'),light(T.hold,.9,'scaleX(1)'),light(T.clear,0,'scaleX(1)'),light(T.settle,0,'scaleX(0)')]),
]);
