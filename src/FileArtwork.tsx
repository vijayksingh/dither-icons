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
          <g data-part="rear-paper" opacity=".58">{draw(FOLDER_ART.rear)}</g>
        </g>
        <g data-part="front-paper" opacity=".85">{draw(FOLDER_ART.front)}</g>
      </g>
      <g data-part="cover">{draw(FOLDER_ART.cover)}</g>
      {accent('reveal-rays',FOLDER_ART.rays,.6)}
    </>;
  }
  if(name==='file')return <>
    {draw(FILE_ART.page+(texture==='solid'?FILE_ART.cutouts:''))}
    {texture!=='solid'&&<g opacity=".4">{line(FILE_ART.lines,.6)}</g>}
    <g opacity=".45">{line(FILE_ART.crease,.5)}</g>
    <g data-part="fold">{draw(FILE_ART.fold)}</g>
    {accent('crease-light',FILE_ART.glint,.7)}
    {accent('curl-air',FILE_ART.curl,.55)}
  </>;
  if(name==='copy')return <>
    {draw(COPY_ART.source)}
    {accent('source-glint',COPY_ART.sourceMark,.55)}
    <g data-part="duplicate">{draw(COPY_ART.duplicate)}</g>
    {accent('registration-ticks',COPY_ART.targetMarks,.65)}
  </>;
  if(name==='trash')return <>
    <g data-part="bin">{draw(TRASH_ART.bin)}</g>
    <g data-part="lid">{draw(TRASH_ART.lid)}<g data-part="handle">{draw(TRASH_ART.handle)}</g></g>
    {accent('rim-light',TRASH_ART.rim,.65)}
    {accent('impact-ticks',TRASH_ART.ticks,.65)}
  </>;
  return null;
}
