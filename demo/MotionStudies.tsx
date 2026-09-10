import {useState} from 'react';
import {DitherIcon,studies,type Texture} from '../src';
import {labelFor} from './model';
export const SETS:Record<string,string[]>={'Visibility and appearance':['eye','sparkles','sun','moon'],'Actions and access':['close','plus','lock','unlock'],'Everyday essentials':['search','home','settings','user'],'Application controls':['save-preferences','file-explorer','expand-view','sign-out'],'Data processing':['tokenize','embedding-lookup','attention-focus','batch-sampling'],'Training workflows':['learning-rhythm','gradient-check','experiment-compare','training-step'],'Learning workflows':['code-run','test-suite','milestone','concept-review'],'Learning tools':['sigma','bug','sliders','graduation-cap'],'Workspace tools':['workspace','gauge','orbit','lifebuoy'],'Model development':['tensor','network','checkpoint','hint'],'Learning navigation':['path','flask','target','retry'],'Essential interactions':['bell','heart','download','layers'],Navigation:['arrow-right','arrow-up','external-link'],'File transfer':['upload','copy','file'],'Folders and documents':['folder','trash','book'],Communication:['mail','message','send'],Media:['play','pause','volume'],Development:['code','terminal','cpu','chart'],'Action controls':['check','close','plus'],'Account and privacy':['lock','unlock','eye'],'Appearance and status':['sparkles','sun','moon','bolt']};
export function MotionStudies({texture,enabled}:{texture:Texture;enabled:boolean}){
 const [set,setSet]=useState('Visibility and appearance');
 const ORDER=SETS[set].filter(name=>studies[name]);
 const [speed,setSpeed]=useState(1),[replay,setReplay]=useState(0),[progress,setProgress]=useState<number|undefined>();
 return <section className="motion-studies" id="motion-studies-panel" aria-labelledby="studies-heading">
  <div className="studies-heading"><div><span className="eyebrow">MOTION STUDIES</span><h2 id="studies-heading">Small gestures. A little soul.</h2></div><div className="study-controls"><select aria-label="Icon category" value={set} onChange={e=>{setSet(e.target.value);setProgress(undefined);setReplay(0)}}>{Object.keys(SETS).map(name=><option key={name}>{name}</option>)}</select><label><span className="sr-only">Playback speed</span><select aria-label="Playback speed" value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={1}>Actual speed</option><option value={.5}>Half speed</option></select></label><button disabled={!enabled} aria-pressed={progress!==undefined} onClick={()=>setProgress(progress===undefined?0:undefined)}>Inspect timing</button><button onClick={()=>{setProgress(undefined);setReplay(n=>n+1)}} disabled={!enabled}>↻ Replay set</button></div></div>
  {progress!==undefined&&<label className="study-timeline"><span>Rest</span><input type="range" disabled={!enabled} aria-label="Motion timeline" min="0" max="100" value={Math.round(progress*100)} onChange={e=>setProgress(Number(e.target.value)/100)}/><span>Settle</span><output>{Math.round(progress*100)}%</output></label>}
  <div className="study-grid">{ORDER.map((name,index)=><article className="study" key={name}>
   <button disabled={!enabled} className="study-stage di-trigger" aria-label={`Play ${name} study`} style={{'--study-time':`${studies[name].duration/speed}ms`} as React.CSSProperties}>
    <span className="study-number">0{index+1}</span><span className="study-play">↻</span>
    <DitherIcon name={name} size={112} texture={texture} animate={enabled} speed={speed} replayKey={replay} progress={progress}/>
    <span className="study-progress"/>
   </button><div className="study-copy"><h3>{labelFor(name)}</h3><p>{studies[name].caption}</p><div className="study-beats">{studies[name].stages.map((stage,i)=><span key={stage}><small>{i+1}</small>{stage}</span>)}</div></div>
  </article>)}</div><p className="study-hint">Hover, focus, or tap to play. Each gesture finishes before another begins.</p>
 </section>
}
