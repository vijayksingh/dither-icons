import {useEffect,useRef,type RefObject} from 'react';
import {studies,keyframesFor} from './choreography';

export function useChoreography(ref:RefObject<SVGSVGElement|null>,name:string,enabled:boolean,active:boolean,replayKey:number,speed:number,progress?:number){
 const progressRef=useRef(progress);progressRef.current=progress;
 const seekRef=useRef<(progress?:number)=>void>(()=>{});
 const playRef=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const svg=ref.current,study=studies[name];
  if(!svg||!study||!enabled||typeof svg.animate!=='function')return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const target=svg.closest('.di-trigger')||svg;
  let running:Animation[]=[];let disposed=false;
  svg.dataset.motionRuntime='true';
  const cancel=()=>{running.forEach(a=>a.cancel());running=[];delete svg.dataset.playing;};
  const play=()=>{
   if(disposed||media.matches||typeof progressRef.current==='number'||running.length||target.matches(':disabled,[aria-disabled="true"]'))return;
   svg.dataset.playing='true';
   running=study.tracks.flatMap(track=>{
    const element=svg.querySelector<SVGElement>(`[data-part="${track.part}"]`);
    return element?[element.animate(keyframesFor(study,track),{duration:study.duration/Math.max(.1,speed),fill:'both',easing:'linear'})]:[];
   });
   const batch=running;
   Promise.allSettled(batch.map(a=>a.finished)).then(()=>{
    if(running!==batch)return;
    // Cancel only after every part reaches its resting frame; no exit snapping.
    cancel();
   });
  };
  seekRef.current=(position)=>{
   cancel();
   if(position===undefined||media.matches)return;
   running=study.tracks.flatMap(track=>{
    const element=svg.querySelector<SVGElement>(`[data-part="${track.part}"]`);
    if(!element)return [];
    const animation=element.animate(keyframesFor(study,track),{duration:study.duration,fill:'both',easing:'linear'});
    animation.pause();animation.currentTime=Math.min(1,Math.max(0,position))*study.duration;
    return [animation];
   });
  };
  playRef.current=play;
  const pointer=(event:Event)=>{if((event as PointerEvent).pointerType!=='touch')play();};
  const focus=()=>{if(target.matches(':focus-visible'))play();};
  const changed=()=>{if(media.matches)cancel();else if(progressRef.current!==undefined)seekRef.current(progressRef.current);};
  target.addEventListener('pointerenter',pointer);target.addEventListener('focusin',focus);target.addEventListener('click',play);media.addEventListener('change',changed);
  return()=>{disposed=true;cancel();playRef.current=()=>{};seekRef.current=()=>{};delete svg.dataset.motionRuntime;target.removeEventListener('pointerenter',pointer);target.removeEventListener('focusin',focus);target.removeEventListener('click',play);media.removeEventListener('change',changed);};
 },[ref,name,enabled,speed]);
 useEffect(()=>{seekRef.current(progress);},[progress,name,enabled,speed]);
 useEffect(()=>{if(active||replayKey>0)playRef.current();},[active,replayKey,name,enabled]);
}
