import { forwardRef, useId, useRef, useImperativeHandle, type SVGProps } from 'react';
import {CraftedArtwork} from './CraftedArtwork';
import {studies,styleForStudy} from './choreography';
import {useChoreography} from './useChoreography';
export {studies} from './choreography';
import {definitions,type IconDefinition} from './shapes';
export {definitions} from './shapes';
export type {IconDefinition,Motion,Part} from './shapes';
export type Texture = 'dither'|'solid'|'outline';
export interface DitherIconProps extends SVGProps<SVGSVGElement> { name?:string; size?:number|string; texture?:Texture; animate?:boolean; active?:boolean; replayKey?:number; speed?:number; progress?:number; title?:string; }
export const motionStyles = `
.di-part{transform-box:fill-box;transform-origin:center}
.di-icon:not([data-crafted=true])[data-animate=true]:is(:hover,:focus-visible) .di-part,.di-trigger:is(:hover,:focus-visible) .di-icon:not([data-crafted=true])[data-animate=true] .di-part,.di-icon:not([data-crafted=true])[data-active=true] .di-part{animation-duration:600ms;animation-timing-function:cubic-bezier(.22,1,.36,1);animation-iteration-count:1}
.di-icon:not([data-crafted=true])[data-animate=true]:is(:hover,:focus-visible) .di-part,.di-trigger:is(:hover,:focus-visible) .di-icon:not([data-crafted=true])[data-animate=true] .di-part,.di-icon:not([data-crafted=true])[data-active=true] .di-part{animation-name:var(--di-motion)}
@keyframes di-ring{20%{transform:rotate(12deg)}44%{transform:rotate(-8deg)}68%{transform:rotate(3deg)}88%{transform:rotate(-1deg)}}
@keyframes di-rise{40%{transform:translateY(-3px)}}
@keyframes di-fall{40%{transform:translateY(3px)}}
@keyframes di-slide{40%{transform:translateX(3px)}}
@keyframes di-pulse{24%{transform:scale(1.08)}48%{transform:scale(.99)}72%{transform:scale(1.035)}}
@keyframes di-turn{65%,100%{transform:rotate(90deg)}}
@keyframes di-blink{35%{opacity:.3}70%{opacity:1}}
@keyframes di-draw{0%{opacity:.4;transform:translateY(-2px)}60%{opacity:1;transform:translateY(1px)}}
.di-icon[data-icon=bell] .di-part{transform-origin:50% 6%}
.di-icon[data-icon=layers] .di-part:nth-of-type(2){animation-delay:35ms}
.di-icon[data-icon=layers] .di-part:nth-of-type(3){animation-delay:70ms}
@media(prefers-reduced-motion:reduce){.di-icon .di-part{animation:none!important}}
`;
export function cellPaths(cells:number[][],texture:Texture) {
 const occupied=new Set(cells.map(([x,y])=>`${x},${y}`));let ink='',grain='';
 for(const [x,y] of cells){const edge=[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>!occupied.has(`${x+a},${y+b}`));const command=`M${x} ${y}h1v1h-1z`;
 if(texture==='solid'||edge)ink+=command;
 else if(texture==='dither'&&(x+y)%2===0)grain+=command;
 }
 return {ink,grain};
}
// Bayer thresholds turn a directional tonal field into stable binary marks.
const bayer=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];
export const ditherField=Array.from({length:96*96},(_,i)=>{const x=i%96,y=Math.floor(i/96);const tone=.12+.8*(.35*x/95+.65*y/95);return (bayer[(y%8)*8+x%8]+.5)/64<tone?`M${x/4} ${y/4}h.25v.25h-.25z`:''}).join('');
export const DitherIcon=forwardRef<SVGSVGElement,DitherIconProps>(function DitherIcon({name='sparkles',size=24,texture='dither',animate=true,active=false,title,className='',...props},ref){
 const definition=definitions.find(d=>d.name===name);
 if(!definition)throw new Error(`Unknown Dither icon: ${name}`);
 return <IconArtwork ref={ref} definition={definition} size={size} texture={texture} animate={animate} active={active} title={title} className={className} {...props}/>;
});
export const IconArtwork=forwardRef<SVGSVGElement,DitherIconProps&{definition:IconDefinition}>(function IconArtwork({definition,size=24,texture='dither',animate=true,active=false,replayKey=0,speed=1,progress,title,className='',...props},ref){
 const id=useId().replace(/:/g,'');
 const svgRef=useRef<SVGSVGElement>(null);
 useImperativeHandle(ref,()=>svgRef.current!,[]);
 useChoreography(svgRef,definition.name,animate,active,replayKey,speed,progress,texture);
 const crafted=Boolean(studies[definition.name]);
 const draw=(path:string)=><g>{texture==='dither'?<><path d={path} fillRule="evenodd" opacity=".16"/><path d={path} fillRule="evenodd" mask={`url(#${id}-grain)`}/></>:<path d={path} fillRule="evenodd" fill={texture==='outline'?'none':'currentColor'} stroke={texture==='outline'?'currentColor':'none'} strokeWidth={1.4} strokeLinejoin="round"/>}</g>;
 return <svg xmlns="http://www.w3.org/2000/svg" ref={svgRef} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role={title?'img':undefined} aria-label={title} aria-hidden={title?undefined:true} {...props} className={`di-icon ${className}`} data-crafted={crafted} data-icon={definition.name} data-animate={animate} data-active={animate&&active}>
 {title&&<title>{title}</title>}<style>{motionStyles}{crafted?styleForStudy(definition.name):''}</style>
 {texture==='dither'&&<defs><mask id={`${id}-grain`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={ditherField} fill="white"/></mask></defs>}
 {crafted?<CraftedArtwork name={definition.name} draw={draw} texture={texture}/>:definition.parts.map((part,i)=>{const path=part.path||cellPaths(part.cells,'solid').ink;const shapeProps={d:path,transform:part.transform,fillRule:'evenodd' as const,strokeLinejoin:'round' as const,strokeLinecap:'round' as const};return <g key={i} className={part.motion?'di-part':undefined} style={part.motion?{'--di-motion':`di-${part.motion}`} as React.CSSProperties:undefined}>
 {texture==='dither'?<><path {...shapeProps} fill={part.stroke?'none':'currentColor'} stroke={part.stroke?'currentColor':'none'} strokeWidth={2} opacity=".16"/><path {...shapeProps} fill={part.stroke?'none':'currentColor'} stroke={part.stroke?'currentColor':'none'} strokeWidth={2} mask={`url(#${id}-grain)`}/></>:<path {...shapeProps} fill={part.stroke||texture==='outline'?'none':'currentColor'} stroke={part.stroke||texture==='outline'?'currentColor':'none'} strokeWidth={texture==='outline'?1.4:2}/>}
 </g>})}
 </svg>;
});
export const BellIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function BellIcon(props,ref){return <DitherIcon {...props} name="bell" ref={ref}/>;});
export const HeartIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function HeartIcon(props,ref){return <DitherIcon {...props} name="heart" ref={ref}/>;});
export const SparklesIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SparklesIcon(props,ref){return <DitherIcon {...props} name="sparkles" ref={ref}/>;});
export const SearchIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SearchIcon(props,ref){return <DitherIcon {...props} name="search" ref={ref}/>;});
export const HomeIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function HomeIcon(props,ref){return <DitherIcon {...props} name="home" ref={ref}/>;});
export const SettingsIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SettingsIcon(props,ref){return <DitherIcon {...props} name="settings" ref={ref}/>;});
export const CheckIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CheckIcon(props,ref){return <DitherIcon {...props} name="check" ref={ref}/>;});
export const CloseIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CloseIcon(props,ref){return <DitherIcon {...props} name="close" ref={ref}/>;});
export const PlusIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function PlusIcon(props,ref){return <DitherIcon {...props} name="plus" ref={ref}/>;});
export const ArrowRightIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ArrowRightIcon(props,ref){return <DitherIcon {...props} name="arrow-right" ref={ref}/>;});
export const ArrowUpIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ArrowUpIcon(props,ref){return <DitherIcon {...props} name="arrow-up" ref={ref}/>;});
export const ExternalLinkIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ExternalLinkIcon(props,ref){return <DitherIcon {...props} name="external-link" ref={ref}/>;});
export const DownloadIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function DownloadIcon(props,ref){return <DitherIcon {...props} name="download" ref={ref}/>;});
export const UploadIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function UploadIcon(props,ref){return <DitherIcon {...props} name="upload" ref={ref}/>;});
export const FolderIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function FolderIcon(props,ref){return <DitherIcon {...props} name="folder" ref={ref}/>;});
export const FileIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function FileIcon(props,ref){return <DitherIcon {...props} name="file" ref={ref}/>;});
export const CopyIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CopyIcon(props,ref){return <DitherIcon {...props} name="copy" ref={ref}/>;});
export const TrashIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TrashIcon(props,ref){return <DitherIcon {...props} name="trash" ref={ref}/>;});
export const MailIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function MailIcon(props,ref){return <DitherIcon {...props} name="mail" ref={ref}/>;});
export const MessageIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function MessageIcon(props,ref){return <DitherIcon {...props} name="message" ref={ref}/>;});
export const SendIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SendIcon(props,ref){return <DitherIcon {...props} name="send" ref={ref}/>;});
export const UserIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function UserIcon(props,ref){return <DitherIcon {...props} name="user" ref={ref}/>;});
export const LockIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function LockIcon(props,ref){return <DitherIcon {...props} name="lock" ref={ref}/>;});
export const EyeIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function EyeIcon(props,ref){return <DitherIcon {...props} name="eye" ref={ref}/>;});
export const PlayIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function PlayIcon(props,ref){return <DitherIcon {...props} name="play" ref={ref}/>;});
export const PauseIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function PauseIcon(props,ref){return <DitherIcon {...props} name="pause" ref={ref}/>;});
export const VolumeIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function VolumeIcon(props,ref){return <DitherIcon {...props} name="volume" ref={ref}/>;});
export const SunIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SunIcon(props,ref){return <DitherIcon {...props} name="sun" ref={ref}/>;});
export const MoonIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function MoonIcon(props,ref){return <DitherIcon {...props} name="moon" ref={ref}/>;});
export const CodeIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CodeIcon(props,ref){return <DitherIcon {...props} name="code" ref={ref}/>;});
export const TerminalIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TerminalIcon(props,ref){return <DitherIcon {...props} name="terminal" ref={ref}/>;});
export const LayersIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function LayersIcon(props,ref){return <DitherIcon {...props} name="layers" ref={ref}/>;});
export const CpuIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CpuIcon(props,ref){return <DitherIcon {...props} name="cpu" ref={ref}/>;});
export const ChartIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ChartIcon(props,ref){return <DitherIcon {...props} name="chart" ref={ref}/>;});
export const BookIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function BookIcon(props,ref){return <DitherIcon {...props} name="book" ref={ref}/>;});
export const BoltIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function BoltIcon(props,ref){return <DitherIcon {...props} name="bolt" ref={ref}/>;});

export const PathIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function PathIcon(props,ref){return <DitherIcon {...props} name="path" ref={ref}/>;});
export const FlaskIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function FlaskIcon(props,ref){return <DitherIcon {...props} name="flask" ref={ref}/>;});
export const TargetIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TargetIcon(props,ref){return <DitherIcon {...props} name="target" ref={ref}/>;});
export const RetryIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function RetryIcon(props,ref){return <DitherIcon {...props} name="retry" ref={ref}/>;});

export const TensorIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TensorIcon(props,ref){return <DitherIcon {...props} name="tensor" ref={ref}/>;});
export const NetworkIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function NetworkIcon(props,ref){return <DitherIcon {...props} name="network" ref={ref}/>;});
export const CheckpointIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CheckpointIcon(props,ref){return <DitherIcon {...props} name="checkpoint" ref={ref}/>;});
export const HintIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function HintIcon(props,ref){return <DitherIcon {...props} name="hint" ref={ref}/>;});
export const WorkspaceIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function WorkspaceIcon(props,ref){return <DitherIcon {...props} name="workspace" ref={ref}/>;});
export const GaugeIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function GaugeIcon(props,ref){return <DitherIcon {...props} name="gauge" ref={ref}/>;});
export const OrbitIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function OrbitIcon(props,ref){return <DitherIcon {...props} name="orbit" ref={ref}/>;});
export const LifebuoyIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function LifebuoyIcon(props,ref){return <DitherIcon {...props} name="lifebuoy" ref={ref}/>;});

export const SigmaIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SigmaIcon(props,ref){return <DitherIcon {...props} name="sigma" ref={ref}/>;});

export const BugIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function BugIcon(props,ref){return <DitherIcon {...props} name="bug" ref={ref}/>;});

export const SlidersIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function SlidersIcon(props,ref){return <DitherIcon {...props} name="sliders" ref={ref}/>;});

export const GraduationCapIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function GraduationCapIcon(props,ref){return <DitherIcon {...props} name="graduation-cap" ref={ref}/>;});

export const CodeRunIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function CodeRunIcon(props,ref){return <DitherIcon {...props} name="code-run" ref={ref}/>;});

export const TestSuiteIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TestSuiteIcon(props,ref){return <DitherIcon {...props} name="test-suite" ref={ref}/>;});

export const MilestoneIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function MilestoneIcon(props,ref){return <DitherIcon {...props} name="milestone" ref={ref}/>;});

export const ConceptReviewIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ConceptReviewIcon(props,ref){return <DitherIcon {...props} name="concept-review" ref={ref}/>;});

export const LearningRhythmIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function LearningRhythmIcon(props,ref){return <DitherIcon {...props} name="learning-rhythm" ref={ref}/>;});

export const GradientCheckIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function GradientCheckIcon(props,ref){return <DitherIcon {...props} name="gradient-check" ref={ref}/>;});

export const ExperimentCompareIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function ExperimentCompareIcon(props,ref){return <DitherIcon {...props} name="experiment-compare" ref={ref}/>;});

export const TrainingStepIcon=forwardRef<SVGSVGElement,Omit<DitherIconProps,'name'>>(function TrainingStepIcon(props,ref){return <DitherIcon {...props} name="training-step" ref={ref}/>;});
