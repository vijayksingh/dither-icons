import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {FOLDER_ART} from './motions/folder';
import {FILE_ART} from './motions/file';
import {COPY_ART} from './motions/copy';
import {TRASH_ART} from './motions/trash';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.55)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.55)=><g data-part={part} opacity="0">{line(d,width)}</g>;

/** Physical layers occlude one another before their transparent grain is drawn.
 * The moving occluders use the same authored tracks as their visible planes. */
export function FileArtwork({name,draw,texture}:Props){
  const id=useId().replace(/:/g,'')+'-file-layers';
  if(name==='folder'){
    const occluders=[
      {key:'cover',path:FOLDER_ART.cover},
      {key:'rear',path:FOLDER_ART.rear},
      {key:'front',path:FOLDER_ART.front},
    ];
    return <>
      <defs>{occluders.map(({key,path})=><mask key={key} id={`${id}-${key}`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        <g data-part={`${key}-occlusion`}><path d={path} fill="black" stroke="black" strokeWidth={FOLDER_ART.separation} strokeLinejoin="round"/></g>
      </mask>)}</defs>
      <g mask={`url(#${id}-cover)`}>
        <g mask={`url(#${id}-front)`}>
          <g mask={`url(#${id}-rear)`}><g opacity=".45">{draw(FOLDER_ART.back)}</g></g>
          <g data-part="rear-paper" opacity=".6">{draw(FOLDER_ART.rear)}</g>
        </g>
        <g data-part="front-paper" opacity=".9">{draw(FOLDER_ART.front)}{accent('paper-edge',FOLDER_ART.edge,.48)}</g>
      </g>
      <g data-part="cover">{draw(FOLDER_ART.cover)}</g>
      {accent('reveal-rays',FOLDER_ART.rays,.6)}
    </>;
  }
  if(name==='file')return <>
    <defs><mask id={`${id}-fold`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="white"/>
      <g data-part="fold-occlusion"><path d={FILE_ART.fold} fill="black" stroke="black" strokeWidth={FILE_ART.separation}/></g>
    </mask></defs>
    {draw(FILE_ART.page+(texture==='solid'?FILE_ART.cutouts:''))}
    <g mask={`url(#${id}-fold)`} opacity=".58">{draw(FILE_ART.underside)}</g>
    {texture!=='solid'&&<g opacity=".4">{line(FILE_ART.lines,.6)}</g>}
    <g opacity=".45">{line(FILE_ART.crease,.5)}</g>
    <g data-part="fold">{draw(FILE_ART.fold)}{accent('fold-edge',FILE_ART.lip,.5)}</g>
    {accent('crease-light',FILE_ART.glint,.7)}
    {accent('curl-air',FILE_ART.curl,.55)}
  </>;
  if(name==='copy')return <>
    <defs><mask id={`${id}-duplicate`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="white"/>
      <g data-part="duplicate-occlusion"><path d={COPY_ART.sheet} fill="black" stroke="black" strokeWidth={COPY_ART.separation}/></g>
    </mask></defs>
    <g mask={`url(#${id}-duplicate)`}><g transform={COPY_ART.sourceOffset} opacity=".5">{draw(COPY_ART.sheet)}</g></g>
    {accent('source-glint',COPY_ART.sourceMark,.55)}
    <g data-part="duplicate">{draw(COPY_ART.sheet)}{accent('duplicate-edge',COPY_ART.edge,.55)}</g>
    {accent('registration-right',COPY_ART.rightMark,.6)}
    {accent('registration-bottom',COPY_ART.bottomMark,.6)}
  </>;
  if(name==='trash')return <>
    <g data-part="bin">{draw(TRASH_ART.bin)}{accent('rim-light',TRASH_ART.rim,.6)}</g>
    <g data-part="lid">{draw(TRASH_ART.lid)}<g data-part="handle">{draw(TRASH_ART.handle)}</g></g>
    {accent('impact-left',TRASH_ART.leftTick,.6)}
    {accent('impact-right',TRASH_ART.rightTick,.6)}
  </>;
  return null;
}
