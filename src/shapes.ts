/** Original geometry authored on a 24 × 24 grid. No third-party paths. */
export type Motion = 'ring'|'rise'|'fall'|'pulse'|'turn'|'slide'|'blink'|'draw';
export type Part = { cells: number[][]; motion?: Motion };
export type IconDefinition = { name:string; category:string; description:string; parts:Part[] };
const rect=(x:number,y:number,w:number,h:number)=>Array.from({length:w*h},(_,i)=>[x+i%w,y+Math.floor(i/w)]);
const poly=(points:number[][])=>{const cells:number[][]=[];for(let y=1;y<23;y++)for(let x=1;x<23;x++){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const [a,b]=points[i],[c,d]=points[j];if((b>y+.5)!==(d>y+.5)&&x+.5<(c-a)*(y+.5-b)/(d-b)+a)inside=!inside;}if(inside)cells.push([x,y]);}return cells;};
const line=(points:number[][])=>{const cells:number[][]=[];for(let i=1;i<points.length;i++){const [x,y]=points[i-1],[a,b]=points[i];const n=Math.max(Math.abs(a-x),Math.abs(b-y));for(let j=0;j<=n;j++)cells.push(...rect(Math.round(x+(a-x)*j/(n||1)),Math.round(y+(b-y)*j/(n||1)),2,2));}return cells;};
const ring=(x:number,y:number,r:number,t=2)=>{const c:number[][]=[];for(let b=1;b<23;b++)for(let a=1;a<23;a++){const d=Math.hypot(a+.5-x,b+.5-y);if(d<r&&d>=r-t)c.push([a,b]);}return c;};
const part=(cells:number[][],motion?:Motion):Part=>({cells:[...new Map(cells.map(c=>[c.join(','),c])).values()],motion});
const p=(points:number[][],motion?:Motion)=>part(poly(points),motion);
const l=(points:number[][],motion?:Motion)=>part(line(points),motion);
const r=(x:number,y:number,w:number,h:number,motion?:Motion)=>part(rect(x,y,w,h),motion);
const o=(x:number,y:number,rad:number,motion?:Motion)=>part(ring(x,y,rad),motion);
const def=(name:string,category:string,description:string,...parts:Part[]):IconDefinition=>({name,category,description,parts});
export const definitions = [
 def('bell','Interface','The bell swings from its crown.',p([[7,5],[10,3],[14,3],[17,5],[17,15],[20,18],[4,18],[7,15]],'ring'),r(10,20,4,2)),
 def('heart','Interface','A double beat, then back to rest.',p([[3,5],[9,5],[12,8],[15,5],[21,5],[22,7],[22,12],[12,22],[2,12],[2,7]],'pulse')),
 def('sparkles','Interface','Two stars brighten in sequence.',p([[12,2],[15,9],[22,12],[15,15],[12,22],[9,15],[2,12],[9,9]],'pulse'),r(20,2,2,2,'blink')),
 def('search','Interface','The lens leans in to inspect.',o(10,10,7,'pulse'),l([[15,15],[21,21]],'slide')),
 def('home','Interface','The doorway rises to welcome you.',p([[2,11],[12,2],[22,11],[20,11],[20,21],[4,21],[4,11]]),r(10,14,4,7,'rise')),
 def('settings','Interface','A measured quarter turn.',part([...ring(12,12,7),...rect(10,2,4,4),...rect(10,18,4,4),...rect(2,10,4,4),...rect(18,10,4,4),...rect(4,4,3,3),...rect(17,17,3,3),...rect(17,4,3,3),...rect(4,17,3,3)],'turn')),
 def('check','Interface','A confirmation lands into place.',l([[4,12],[9,17],[19,6]],'draw')),
 def('close','Interface','Two diagonals give a short emphasis.',part([...line([[5,5],[18,18]]),...line([[18,5],[5,18]])],'pulse')),
 def('plus','Interface','The cross expands once.',part([...rect(10,3,4,18),...rect(3,10,18,4)],'pulse')),
 def('arrow-right','Navigation','Forward intent follows the arrow.',part([...rect(3,10,14,4),...poly([[13,3],[22,12],[13,21]])],'slide')),
 def('arrow-up','Navigation','An upward nudge.',part([...rect(10,7,4,14),...poly([[3,11],[12,2],[21,11]])],'rise')),
 def('external-link','Navigation','The arrow leaves the frame.',l([[11,4],[3,4],[3,20],[19,20],[19,12]]),part([...line([[11,11],[20,2]]),...line([[13,2],[20,2],[20,9]])],'rise')),
 def('download','Files','The arrow drops into a steady tray.',l([[3,16],[3,21],[20,21],[20,16]]),part([...rect(10,2,4,10),...poly([[5,10],[19,10],[12,17]])],'fall')),
 def('upload','Files','The arrow lifts out of the tray.',l([[3,16],[3,21],[20,21],[20,16]]),part([...rect(10,8,4,9),...poly([[5,9],[12,2],[19,9]])],'rise')),
 def('folder','Files','A folder lifts to reveal its contents.',p([[2,5],[10,5],[13,8],[22,8],[22,21],[2,21]]),p([[2,10],[22,10],[20,21],[4,21]],'rise')),
 def('file','Files','The page rises gently.',p([[5,2],[15,2],[21,8],[21,22],[5,22]],'rise'),l([[15,2],[15,8],[21,8]])),
 def('copy','Files','The front sheet separates from its twin.',l([[6,17],[3,17],[3,3],[16,3],[16,6]]),p([[8,8],[21,8],[21,22],[8,22]],'slide')),
 def('trash','Files','The lid lifts while the bin stays put.',p([[5,8],[19,8],[17,22],[7,22]]),part([...rect(3,5,18,2),...rect(9,2,6,3)],'rise')),
 def('mail','Communication','The flap opens briefly.',l([[2,5],[21,5],[21,19],[2,19],[2,5]]),p([[3,6],[21,6],[12,14]],'rise')),
 def('message','Communication','A message arrives into the bubble.',p([[2,3],[22,3],[22,17],[10,17],[4,22],[4,17],[2,17]]),part([...rect(6,8,2,2),...rect(11,8,2,2),...rect(16,8,2,2)],'blink')),
 def('send','Communication','A paper plane takes a short flight.',p([[2,10],[22,2],[14,22],[10,14]],'rise')),
 def('user','Interface','A small greeting from the avatar.',o(12,7,5,'ring'),p([[3,22],[3,18],[7,14],[17,14],[21,18],[21,22]])),
 def('lock','Interface','The shackle lifts from its body.',l([[6,10],[6,5],[9,2],[14,2],[17,5],[17,10]],'rise'),p([[4,10],[20,10],[20,22],[4,22]])),
 def('eye','Interface','The pupil takes a quick look.',l([[2,11],[7,6],[16,6],[21,11],[16,16],[7,16],[2,11]]),r(10,9,4,5,'slide')),
 def('play','Media','A playhead moves forward.',p([[6,3],[22,12],[6,21]],'slide')),
 def('pause','Media','Playback settles into pause.',part([...rect(5,3,5,18),...rect(14,3,5,18)],'pulse')),
 def('volume','Media','Sound travels outward from the speaker.',p([[2,9],[7,9],[13,3],[13,21],[7,15],[2,15]]),l([[17,6],[20,9],[20,14],[17,17]],'blink')),
 def('sun','Interface','A little turn of daylight.',part([...ring(12,12,5),...rect(11,1,2,3),...rect(11,20,2,3),...rect(1,11,3,2),...rect(20,11,3,2),...rect(3,3,3,3),...rect(18,18,3,3),...rect(18,3,3,3),...rect(3,18,3,3)],'turn')),
 def('moon','Interface','A quiet tilt toward night.',p([[13,2],[7,4],[3,9],[3,16],[7,21],[14,22],[20,18],[22,13],[17,15],[12,13],[9,9],[10,5]],'ring')),
 def('code','Development','The brackets open a little space.',l([[7,5],[2,11],[7,17]],'rise'),l([[16,5],[21,11],[16,17]],'fall'),l([[14,3],[10,20]])),
 def('terminal','Development','A cursor blinks once at the prompt.',l([[2,3],[21,3],[21,21],[2,21],[2,3]]),l([[5,8],[8,11],[5,14]]),r(12,14,6,2,'blink')),
 def('layers','Development','Stacked planes separate, then settle.',p([[2,15],[12,21],[22,15],[12,9]]),p([[2,11],[12,17],[22,11],[12,5]],'rise'),p([[2,7],[12,13],[22,7],[12,1]],'rise')),
 def('cpu','Development','A signal lights up the central die.',part([...rect(5,5,14,14),...rect(2,7,3,2),...rect(2,15,3,2),...rect(19,7,3,2),...rect(19,15,3,2),...rect(7,2,2,3),...rect(15,2,2,3),...rect(7,19,2,3),...rect(15,19,2,3)]),r(9,9,6,6,'blink')),
 def('chart','Development','Bars grow from a shared baseline.',l([[2,3],[2,21],[22,21]]),r(6,12,3,7,'rise'),r(12,7,3,12,'rise'),r(18,3,3,16,'rise')),
 def('book','Files','A page opens for reading.',p([[2,3],[9,3],[12,6],[15,3],[22,3],[22,20],[15,20],[12,22],[9,20],[2,20]]),l([[12,6],[12,20]],'blink')),
 def('bolt','Interface','One quick flash of energy.',p([[13,1],[3,14],[10,14],[8,23],[22,9],[14,9],[17,1]],'blink')),
] as const;
export type IconName = typeof definitions[number]['name'];
