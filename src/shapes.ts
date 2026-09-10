import {EYE_ART} from './motions/eye';
import {SPARKLES_ART} from './motions/sparkles';
import {MOON_ART} from './motions/moon';
import {LOCK_ART} from './motions/lock';
import {UNLOCK_REST_TRANSFORM} from './motions/unlock';
import {SAVE_ART} from './motions/save-preferences';
import {EXPLORER_ART} from './motions/file-explorer';
import {EXPAND_ART} from './motions/expand-view';
import {EXIT_ART} from './motions/sign-out';
import {TOKEN_ART,TOKEN_PIECES} from './motions/tokenize';
import {EMBEDDING_ART} from './motions/embedding-lookup';
import {ATTENTION_ART,ATTENTION_KEYS} from './motions/attention-focus';
import {BATCH_ART} from './motions/batch-sampling';
import {RHYTHM_ART} from './motions/learning-rhythm';
import {GRADIENT_ART} from './motions/gradient-check';
import {COMPARE_ART} from './motions/experiment-compare';
import {STEP_ART} from './motions/training-step';
import {CODE_RUN_ART} from './motions/code-run';
import {SUITE_ART,SUITE_CASES} from './motions/test-suite';
import {MILESTONE_ART} from './motions/milestone';
import {REVIEW_ART} from './motions/concept-review';
import {SIGMA_ART} from './motions/sigma';
import {BUG_ART} from './motions/bug';
import {SLIDERS_ART,SLIDERS_KNOBS} from './motions/sliders';
import {CAP_ART} from './motions/graduation-cap';
import {TENSOR_ART} from './motions/tensor';
import {WORKSPACE_ART} from './motions/workspace';
import {GAUGE_ART} from './motions/gauge';
import {ORBIT_ART} from './motions/orbit';
import {LIFEBUOY_ART} from './motions/lifebuoy';
import {NETWORK_ART} from './motions/network';
import {CHECKPOINT_ART} from './motions/checkpoint';
import {HINT_ART} from './motions/hint';
import {PATH_ART} from './motions/path';
import {FLASK_ART} from './motions/flask';
import {TARGET_ART} from './motions/target';
import {RETRY_ART} from './motions/retry';
/** Original vector geometry authored in a 24 × 24 viewBox. No third-party paths. */
export type Motion = 'ring'|'rise'|'fall'|'pulse'|'turn'|'slide'|'blink'|'draw';
export type Part = { cells: number[][]; path?:string; stroke?:boolean; transform?:string; motion?: Motion };
export type IconDefinition = { name:string; label?:string; keywords?:readonly string[]; category:string; description:string; parts:Part[] };
const rect=(x:number,y:number,w:number,h:number)=>Array.from({length:w*h},(_,i)=>[x+i%w,y+Math.floor(i/w)]);
const poly=(points:number[][])=>{const cells:number[][]=[];for(let y=1;y<23;y++)for(let x=1;x<23;x++){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const [a,b]=points[i],[c,d]=points[j];if((b>y+.5)!==(d>y+.5)&&x+.5<(c-a)*(y+.5-b)/(d-b)+a)inside=!inside;}if(inside)cells.push([x,y]);}return cells;};
const line=(points:number[][])=>{const cells:number[][]=[];for(let i=1;i<points.length;i++){const [x,y]=points[i-1],[a,b]=points[i];const n=Math.max(Math.abs(a-x),Math.abs(b-y));for(let j=0;j<=n;j++)cells.push(...rect(Math.round(x+(a-x)*j/(n||1)),Math.round(y+(b-y)*j/(n||1)),2,2));}return cells;};
const ring=(x:number,y:number,r:number,t=2)=>{const c:number[][]=[];for(let b=1;b<23;b++)for(let a=1;a<23;a++){const d=Math.hypot(a+.5-x,b+.5-y);if(d<r&&d>=r-t)c.push([a,b]);}return c;};
const part=(cells:number[][],motion?:Motion):Part=>({cells:[...new Map(cells.map(c=>[c.join(','),c])).values()],motion});
const p=(points:number[][],motion?:Motion)=>({...part(poly(points),motion),path:'M'+points.map(p=>p.join(' ')).join('L')+'Z'});
const l=(points:number[][],motion?:Motion)=>({...part(line(points),motion),path:'M'+points.map(p=>p.join(' ')).join('L'),stroke:true});
const r=(x:number,y:number,w:number,h:number,motion?:Motion)=>({...part(rect(x,y,w,h),motion),path:`M${x} ${y}h${w}v${h}h-${w}Z`});
const o=(x:number,y:number,rad:number,motion?:Motion)=>({...part(ring(x,y,rad),motion),path:`M${x-rad+1} ${y}a${rad-1} ${rad-1} 0 1 0 ${2*(rad-1)} 0a${rad-1} ${rad-1} 0 1 0 -${2*(rad-1)} 0`,stroke:true});
const def=(name:string,category:string,description:string,...parts:Part[]):IconDefinition=>({name,category,description,parts});
const vector=(path:string):Part=>({cells:[],path});
export const definitions = [
 def('bell','Interface','The bell swings from its crown.',p([[7,5],[10,3],[14,3],[17,5],[17,15],[20,18],[4,18],[7,15]],'ring'),r(10,20,4,2)),
 def('heart','Interface','A double beat, then back to rest.',p([[3,5],[9,5],[12,8],[15,5],[21,5],[22,7],[22,12],[12,22],[2,12],[2,7]],'pulse')),
 def('sparkles','Interface','Two stars brighten in sequence.',p([[12,2],[15,9],[22,12],[15,15],[12,22],[9,15],[2,12],[9,9]],'pulse'),r(20,2,2,2,'blink')),
 def('search','Interface','The lens leans in to inspect.',o(10,10,7,'pulse'),l([[15,15],[21,21]],'slide')),
 def('home','Interface','The doorway rises to welcome you.',p([[2,11],[12,2],[22,11],[20,11],[20,21],[4,21],[4,11]]),r(10,14,4,7,'rise')),
 def('settings','Interface','A measured quarter turn.',part([...ring(12,12,7),...rect(10,2,4,4),...rect(10,18,4,4),...rect(2,10,4,4),...rect(18,10,4,4),...rect(4,4,3,3),...rect(17,17,3,3),...rect(17,4,3,3),...rect(4,17,3,3)],'turn')),
 def('check','Interface','A confirmation lands into place.',l([[4,12],[9,17],[19,6]],'draw')),
 def('close','Interface','Two deliberate diagonal strokes cross out.',part([...line([[5,5],[18,18]]),...line([[18,5],[5,18]])],'pulse')),
 def('plus','Interface','The upright registers; the crossbar responds.',part([...rect(10,3,4,18),...rect(3,10,18,4)],'pulse')),
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
 def('lock','Interface','The shackle rattles against a fixed housing and stays locked.',l([[6,10],[6,5],[9,2],[14,2],[17,5],[17,10]],'rise'),p([[4,10],[20,10],[20,22],[4,22]])),
 {...def('unlock','Interface','An open shackle clears its free end while its right foot stays seated.',{...vector(LOCK_ART.shackle),transform:UNLOCK_REST_TRANSFORM},vector(LOCK_ART.body+LOCK_ART.keyhole)),label:'Unlock',keywords:['unlocked','open lock','access','permissions','editable']},
 def('eye','Interface','The iris finds a subject and focuses.',l([[2,11],[7,6],[16,6],[21,11],[16,16],[7,16],[2,11]]),r(10,9,4,5,'slide')),
 def('play','Media','A playhead moves forward.',p([[6,3],[22,12],[6,21]],'slide')),
 def('pause','Media','Playback settles into pause.',part([...rect(5,3,5,18),...rect(14,3,5,18)],'pulse')),
 def('volume','Media','Sound travels outward from the speaker.',p([[2,9],[7,9],[13,3],[13,21],[7,15],[2,15]]),l([[17,6],[20,9],[20,14],[17,17]],'blink')),
 def('sun','Interface','Light leaves the center before the rays extend.',part([...ring(12,12,5),...rect(11,1,2,3),...rect(11,20,2,3),...rect(1,11,3,2),...rect(20,11,3,2),...rect(3,3,3,3),...rect(18,18,3,3),...rect(18,3,3,3),...rect(3,18,3,3)],'turn')),
 def('moon','Interface','A crescent settles before catching the last light.',p([[13,2],[7,4],[3,9],[3,16],[7,21],[14,22],[20,18],[22,13],[17,15],[12,13],[9,9],[10,5]],'ring')),
 def('code','Development','The brackets open a little space.',l([[7,5],[2,11],[7,17]],'rise'),l([[16,5],[21,11],[16,17]],'fall'),l([[14,3],[10,20]])),
 def('terminal','Development','A cursor blinks once at the prompt.',l([[2,3],[21,3],[21,21],[2,21],[2,3]]),l([[5,8],[8,11],[5,14]]),r(12,14,6,2,'blink')),
 def('layers','Development','Stacked planes separate, then settle.',p([[2,15],[12,21],[22,15],[12,9]]),p([[2,11],[12,17],[22,11],[12,5]],'rise'),p([[2,7],[12,13],[22,7],[12,1]],'rise')),
 def('cpu','Development','A signal lights up the central die.',part([...rect(5,5,14,14),...rect(2,7,3,2),...rect(2,15,3,2),...rect(19,7,3,2),...rect(19,15,3,2),...rect(7,2,2,3),...rect(15,2,2,3),...rect(7,19,2,3),...rect(15,19,2,3)]),r(9,9,6,6,'blink')),
 def('chart','Development','Bars grow from a shared baseline.',l([[2,3],[2,21],[22,21]]),r(6,12,3,7,'rise'),r(12,7,3,12,'rise'),r(18,3,3,16,'rise')),
 def('book','Files','A page opens for reading.',p([[2,3],[9,3],[12,6],[15,3],[22,3],[22,20],[15,20],[12,22],[9,20],[2,20]]),l([[12,6],[12,20]],'blink')),
 def('bolt','Interface','One quick flash of energy.',p([[13,1],[3,14],[10,14],[8,23],[22,9],[14,9],[17,1]],'blink')),
 def('path','Learning','Follow a connected sequence of milestones.',vector(PATH_ART.first),vector(PATH_ART.second),vector(PATH_ART.node(5,19)),vector(PATH_ART.node(12,12)),vector(PATH_ART.node(19,5))),
 def('flask','Learning','A contained experiment stirs and responds.',vector(FLASK_ART.outer+FLASK_ART.inside)),
 def('target','Learning','Focus an objective at a precise center.',vector(TARGET_ART.outer),vector(TARGET_ART.inner),vector(TARGET_ART.dart)),
 def('retry','Learning','Wind back to make another attempt.',vector(RETRY_ART.arc),vector(RETRY_ART.head)),
 def('tensor','Learning','Inspect one solid slice of a multidimensional array.',vector(TENSOR_ART.top),vector(TENSOR_ART.left),vector(TENSOR_ART.cut),vector(TENSOR_ART.sliceTop),vector(TENSOR_ART.sliceLeft),vector(TENSOR_ART.face)),
 def('network','Learning','Combine connected inputs into an output.',vector(NETWORK_ART.upper),vector(NETWORK_ART.lower),vector(NETWORK_ART.output)),
 def('checkpoint','Learning','Preserve an exact Workspace state.',vector(CHECKPOINT_ART.ring),vector(CHECKPOINT_ART.state),vector(CHECKPOINT_ART.rail)),
 def('hint','Learning','A small nudge illuminates an idea.',vector(HINT_ART.outer+HINT_ART.inside),vector(HINT_ART.base)),
 def('workspace','Development','An organized surface for your growing codebase.',vector(WORKSPACE_ART.frame),vector(WORKSPACE_ART.divider),vector(WORKSPACE_ART.first),vector(WORKSPACE_ART.second),vector(WORKSPACE_ART.third)),
 def('gauge','Interface','Take a reading against a stable scale.',vector(GAUGE_ART.rim),vector(GAUGE_ART.needle),vector(GAUGE_ART.hub)),
 def('orbit','Learning','Explore a relationship around a stable center.',vector(ORBIT_ART.rear),vector(ORBIT_ART.front),vector(ORBIT_ART.core),vector(ORBIT_ART.satellite)),
 def('lifebuoy','Interface','Support that yields and holds.',vector(LIFEBUOY_ART.body),...LIFEBUOY_ART.bands.map(d=>vector(d))),
 def('sigma','Learning','Collect terms into one sum.',vector(SIGMA_ART.body)),
 def('bug','Development','Locate the fault without losing its context.',vector(BUG_ART.head),vector(BUG_ART.left),vector(BUG_ART.right)),
 def('sliders','Interface','Adjust one variable against a stable reference.',...SLIDERS_KNOBS.map(k=>vector(SLIDERS_ART.knob(k.x,k.y)))),
 def('graduation-cap','Learning','An invitation to explore a learning path.',vector(CAP_ART.board),vector(CAP_ART.crown),vector(CAP_ART.tuft)),
 {...def('code-run','Development','Execute learner code in the Browser Runtime.',vector(CODE_RUN_ART.frame),vector(CODE_RUN_ART.launch)),label:'Code Run',keywords:['execute','execution','source','runtime','launch']},
 {...def('test-suite','Development','Inspect independent test cases in a shared fixture.',...SUITE_CASES.map(c=>vector(SUITE_ART.glass(c.x,c.top)))),label:'Test Suite',keywords:['tests','visible tests','cases','assertions','compare','samples']},
 {...def('milestone','Learning','Orient toward a capability checkpoint in a Path.',vector(MILESTONE_ART.mast),vector(MILESTONE_ART.base),vector(MILESTONE_ART.root),vector(MILESTONE_ART.free)),label:'Milestone',keywords:['capability','checkpoint','path','flag','goal']},
 {...def('concept-review','Learning','Revisit an earlier idea while preserving its context.',vector(REVIEW_ART.rear),vector(REVIEW_ART.front)),label:'Concept Review',keywords:['recall','revisit','reflection','review view','memory','cards']},
 {...def('learning-rhythm','Learning','Keep a measured learning cadence.',vector(RHYTHM_ART.case),vector(RHYTHM_ART.weight)),label:'Learning Rhythm',keywords:['daily goal','cadence','metronome','time','schedule']},
 {...def('gradient-check','Learning','Inspect a derivative using two neighboring samples.',vector(GRADIENT_ART.band)),label:'Gradient Check',keywords:['centered audit','derivative','finite difference','epsilon','samples']},
 {...def('experiment-compare','Learning','Inspect distinct experiments against one reference.',vector(COMPARE_ART.pane(2.8)),vector(COMPARE_ART.pane(13.1))),label:'Experiment Compare',keywords:['optimizer','comparison','paired','plots','evidence']},
 {...def('training-step','Learning','Advance one bounded optimizer update.',vector(STEP_ART.band)),label:'Training Step',keywords:['optimizer','descent','parameter','loss','update']},
 {...def('tokenize','Learning','Separate text into ordered subword tokens.',...TOKEN_PIECES.map(p=>vector(TOKEN_ART.tile(p.x,p.w)))),label:'Tokenize',keywords:['tokenizer','subword','text','encode','segmentation']},
 {...def('embedding-lookup','Learning','Read a vector by token ID without changing the table.',vector(EMBEDDING_ART.token)),label:'Embedding Lookup',keywords:['embedding table','vector','token id','row','dictionary']},
 {...def('attention-focus','Learning','Inspect query-key relations while retaining every contributor.',vector(ATTENTION_ART.lens),...ATTENTION_KEYS.map(k=>vector(ATTENTION_ART.key(k.y)))),label:'Attention Focus',keywords:['query','key','soft lookup','weights','relation']},
 {...def('batch-sampling','Learning','Copy a subset of records while retaining the dataset.',vector(BATCH_ART.tray)),label:'Batch Sampling',keywords:['mini batch','minibatch','dataset','subset','sample selection']},
 {...def('save-preferences','Interface','Store deliberately edited preferences.',vector(SAVE_ART.shell),vector(SAVE_ART.shutter)),label:'Save Preferences',keywords:['save','settings','persist','disk','profile']},
 {...def('file-explorer','Development','Reveal the file tree while retaining the active file.',vector(EXPLORER_ART.frame)),label:'File Explorer',keywords:['sidebar','panel','files','editor','show explorer']},
 {...def('expand-view','Interface','Make room around the current visualizer.',vector(EXPAND_ART.corner)),label:'Expand View',keywords:['expand','maximize','fullscreen','visualizer','enlarge']},
 {...def('sign-out','Interface','Leave the authenticated account session.',vector(EXIT_ART.frame),vector(EXIT_ART.arrow)),label:'Sign Out',keywords:['logout','log out','account','session','exit']},
] as const;
export type IconName = typeof definitions[number]['name'];

// Curves are independent of the stipple grid: texture never dictates the contour.
const vectors:Record<string,string[]>={
 bell:['M5.5 17.5c1.5-1.7 1.5-3.5 1.5-7.5a5 5 0 0 1 10 0c0 4 0 5.8 1.5 7.5Z','M10 20h4a2 2 0 0 1-4 0Z'],
 heart:['M12 20.5C9.4 18.4 3 13.8 3 8.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 9 1.4c0 5.4-6.4 10-9 12.1Z'],
 sparkles:[SPARKLES_ART.main,SPARKLES_ART.satellite],
 search:['M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14Zm0 2a5 5 0 1 1 0 10a5 5 0 1 1 0-10Z','M14.25 15.75l1.5-1.5 5.75 5.75a1.06 1.06 0 0 1-1.5 1.5Z'],
 home:['M3 10.2 11 3.4a1.5 1.5 0 0 1 2 0l8 6.8v9.3a1.5 1.5 0 0 1-1.5 1.5H15v-7H9v7H4.5A1.5 1.5 0 0 1 3 19.5Z','M10.5 15.5h3V21h-3Z'],
 settings:['M9 2h6l.7 3.1 2.2 1.3L21 5.5l3 5.2-2.4 2.2v2.6L24 18l-3 5-3.1-.9-2.2 1.3L15 26H9l-.7-2.6-2.2-1.3L3 23l-3-5 2.4-2.5v-2.6L0 10.7l3-5.2 3.1.9 2.2-1.3ZM12 9a5 5 0 1 0 0 10a5 5 0 1 0 0-10'],
 check:['M3.5 12.5 9 18l12-12-1.5-1.5L9 15 5 11Z'],
 close:['M5.3 4 12 10.7 18.7 4 20 5.3 13.3 12 20 18.7 18.7 20 12 13.3 5.3 20 4 18.7 10.7 12 4 5.3Z'],
 plus:['M11 3h2v8h8v2h-8v8h-2v-8H3v-2h8Z'],
 'arrow-right':['M3 11h14.2l-5.7-5.7L13 4l8 8-8 8-1.5-1.3 5.7-5.7H3Z'],
 'arrow-up':['M11 21V6.8l-5.7 5.7L4 11l8-8 8 8-1.3 1.5L13 6.8V21Z'],
 'external-link':['M4 5h6v2H5v12h12v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z','M13 3h8v8h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H13Z'],
 download:['M3 16h2v4h14v-4h2v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z','M11 2h2v11.2l4.3-4.3 1.4 1.4L12 17l-6.7-6.7 1.4-1.4 4.3 4.3Z'],
 upload:['M3 16h2v4h14v-4h2v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z','M11 17V5.8L6.7 10 5.3 8.6 12 2l6.7 6.6-1.4 1.4L13 5.8V17Z'],
 folder:['M2 6a2 2 0 0 1 2-2h5l3 3h8a2 2 0 0 1 2 2v10H2Z','M3 10h18a1 1 0 0 1 1 1.2l-1.5 8a1 1 0 0 1-1 .8h-15a1 1 0 0 1-1-.8l-1.5-8A1 1 0 0 1 3 10Z'],
 file:['M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM13.5 2v6.5H20V8l-6-6Z','M14 2v6h6L14 2Z'],
 copy:['M4 2h11a2 2 0 0 1 2 2v2h-2V4H4v11h2v2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z','M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z'],
 trash:['M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Zm4 3v8h1v-8Zm5 0v8h1v-8Z','M3 5h6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h6v2H3Zm8-1v1h2V4Z'],
 mail:['M3 6h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z','M3 5h18l-9 8Z'],
 message:['M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H10l-6 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z','M6 9h2v2H6ZM11 9h2v2h-2ZM16 9h2v2h-2Z'],
 send:['M2.5 10.3 21 2.5a.5.5 0 0 1 .5.5l-7.8 18.5a.5.5 0 0 1-.9 0L9.5 14l7-7-8 6-6-1.8a.5.5 0 0 1 0-.9Z'],
 user:['M12 2a5 5 0 1 0 0 10a5 5 0 1 0 0-10Z','M3 22v-2c0-8 18-8 18 0v2Z'],
 lock:['M6 10V7a6 6 0 0 1 12 0v3h-2V7a4 4 0 0 0-8 0v3Z','M5 10h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1Zm7 4a1.5 1.5 0 0 0-1 2.6V19h2v-2.4a1.5 1.5 0 0 0-1-2.6Z'],
 eye:[EYE_ART.outline+EYE_ART.aperture,EYE_ART.iris+EYE_ART.catchlight],
 play:['M6 4a1 1 0 0 1 1.5-.9l14 8a1 1 0 0 1 0 1.8l-14 8A1 1 0 0 1 6 20Z'],
 pause:['M5 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1ZM14 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1Z'],
 volume:['M2 9h5l6-5v16l-6-5H2Z','M17 6a8 8 0 0 1 0 12l-1.2-1.6a6 6 0 0 0 0-8.8ZM15.5 9a4 4 0 0 1 0 6l-1.2-1.6a2 2 0 0 0 0-2.8Z'],
 sun:['M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10ZM11 1h2v3h-2ZM11 20h2v3h-2ZM1 11h3v2H1ZM20 11h3v2h-3ZM3.5 5l1.5-1.5L7 5.5 5.5 7ZM17 18.5l1.5-1.5 2 2-1.5 1.5ZM17 5.5l2-2L20.5 5l-2 2ZM3.5 19l2-2L7 18.5l-2 2Z'],
 moon:[MOON_ART.crescent],
 code:['M7.5 5 2 12l5.5 7 1.5-1.3L4.6 12 9 6.3Z','M16.5 5 22 12l-5.5 7-1.5-1.3 4.4-5.7L15 6.3Z','M13 3h2l-4 18H9Z'],
 terminal:['M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h16V5Z','M6 8l4 4-4 4-1.4-1.4L7.2 12 4.6 9.4Z','M12 15h6v2h-6Z'],
 layers:['M2 15l10 5 10-5v2l-10 5-10-5Z','M2 11l10 5 10-5v2l-10 5-10-5Z','M2 7l10-5 10 5-10 5Z'],
 cpu:['M5 5h14v14H5ZM8 8h8v8H8ZM2 7h3v2H2ZM2 15h3v2H2ZM19 7h3v2h-3ZM19 15h3v2h-3ZM7 2h2v3H7ZM15 2h2v3h-2ZM7 19h2v3H7ZM15 19h2v3h-2Z','M9 9h6v6H9Z'],
 chart:['M2 3h2v17h18v2H2Z','M6 12h3v6H6Z','M12 7h3v11h-3Z','M18 3h3v15h-3Z'],
 book:['M3 3h5q3 0 4 2q1-2 4-2h5v17h-5q-3 0-4 2q-1-2-4-2H3Z','M11.25 5h1.5v16h-1.5Z'],
 bolt:['M13 2 4 13h7l-1 9 10-13h-7l1-7Z']
};
for(const icon of definitions)icon.parts.forEach((part,i)=>{if(vectors[icon.name]?.[i]){part.path=vectors[icon.name][i];part.stroke=false;}});

const gear=definitions.find(d=>d.name==='settings')!;gear.parts[0].transform='translate(3 1.5) scale(.75)';
