/** Original circular contours; shared geometry never implies shared timing. */
const n=(v:number)=>Number(v.toFixed(5));
export const polar=(x:number,y:number,r:number,a:number)=>[n(x+r*Math.cos(a*Math.PI/180)),n(y+r*Math.sin(a*Math.PI/180))];
export const circlePath=(x:number,y:number,r:number)=>`M${n(x+r)} ${y}a${r} ${r} 0 1 0 ${-2*r} 0a${r} ${r} 0 1 0 ${2*r} 0Z`;
export const ringPath=(x:number,y:number,r:number,w:number)=>circlePath(x,y,r)+circlePath(x,y,n(r-w));
export const arcPath=(x:number,y:number,r:number,a:number,b:number)=>`M${polar(x,y,r,a).join(' ')}A${r} ${r} 0 ${Math.abs(b-a)>180?1:0} ${b>a?1:0} ${polar(x,y,r,b).join(' ')}`;
export const arcBand=(x:number,y:number,r:number,w:number,a:number,b:number)=>{
 const outer=n(r+w/2),inner=n(r-w/2);
 return `${arcPath(x,y,outer,a,b)}L${polar(x,y,inner,b).join(' ')}${arcPath(x,y,inner,b,a).replace(/^M[^A]+/,'')}Z`;
};
