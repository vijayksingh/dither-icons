import {useState} from 'react';
import {DitherIcon,studies,type Texture} from '../src';
const ORDER=['bell','heart','download','layers'];
export function MotionStudies({texture,enabled}:{texture:Texture;enabled:boolean}){
 const [speed,setSpeed]=useState(1),[replay,setReplay]=useState(0),[progress,setProgress]=useState<number|undefined>();
 return <section className="motion-studies" id="motion-studies" aria-labelledby="studies-heading">
  <div className="studies-heading"><div><span className="eyebrow">FOUR MOTION STUDIES</span><h2 id="studies-heading">Small gestures. A little soul.</h2></div><div className="study-controls"><label><span className="sr-only">Playback speed</span><select aria-label="Playback speed" value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={1}>Actual speed</option><option value={.5}>Half speed</option></select></label><button aria-pressed={progress!==undefined} onClick={()=>setProgress(progress===undefined?0:undefined)}>Inspect timing</button><button onClick={()=>{setProgress(undefined);setReplay(n=>n+1)}} disabled={!enabled}>↻ Replay four</button></div></div>
  {progress!==undefined&&<label className="study-timeline"><span>Rest</span><input type="range" aria-label="Motion timeline" min="0" max="100" value={Math.round(progress*100)} onChange={e=>setProgress(Number(e.target.value)/100)}/><span>Settle</span><output>{Math.round(progress*100)}%</output></label>}
  <div className="study-grid">{ORDER.map((name,index)=><article className="study" key={name}>
   <button className="study-stage di-trigger" aria-label={`Play ${name} study`} style={{'--study-time':`${studies[name].duration/speed}ms`} as React.CSSProperties}>
    <span className="study-number">0{index+1}</span><span className="study-play">↻</span>
    <DitherIcon name={name} size={112} texture={texture} animate={enabled} speed={speed} replayKey={replay} progress={progress}/>
    <span className="study-progress"/>
   </button><div className="study-copy"><h3>{name}</h3><p>{studies[name].caption}</p><div className="study-beats">{studies[name].stages.map((stage,i)=><span key={stage}><small>{i+1}</small>{stage}</span>)}</div></div>
  </article>)}</div><p className="study-hint">Hover, focus, or tap to play. Each gesture finishes before another begins.</p>
 </section>
}
