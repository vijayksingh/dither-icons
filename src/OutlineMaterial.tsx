import {createContext, createElement, useContext, useId, type SVGProps} from 'react';
import {READER_CONTROLS_STYLE} from './motions/reader-controls-style';

// Adopt the reader's existing transparent-core material, without changing
// the authored Solid geometry or any actor's coordinate frame (MOT-07/12).
export const correctedOutlineIcons = new Set([
  'terminal','cpu','test-suite','file-explorer','arrow-left','history',
  'workspace','experiment-compare','search','zoom-out','path','gradient-check',
  'batch-sampling','sigma','save-preferences','panel-left-close','network','hint',
  'gauge','sliders','expand-view','plus','retry','close','check','training-step',
  'trash','code','target','lifebuoy','sign-out','learning-rhythm','layers',
]);
export const OutlineMaterial = createContext(false);
export const outlineEdge = READER_CONTROLS_STYLE.outlineEdge;

type ShapeProps = SVGProps<SVGElement> & {'data-part'?: string};
function useMaterialShape(tag: 'path' | 'circle' | 'rect', props: ShapeProps) {
  const outline = useContext(OutlineMaterial);
  const id = useId().replace(/:/g, '') + '-outline';
  const original = () => createElement(tag, props);
  // Definition geometry and occlusion fields are never visible material.
  if (!outline || props.fill === 'black' || props.fill === 'white' ||
      props.stroke === 'black' || props.stroke === 'white') return original();

  if (props.fill === 'none') {
    const width = Number(props.strokeWidth ?? 1);
    const core = width - 2 * outlineEdge;
    // Small text, witness marks and fine responses remain single strokes.
    if (!props.stroke || core <= 0) return original();
    const {'data-part': part, ...ink} = props;
    const knockout = {...ink, fill: 'none', stroke: 'black', strokeWidth: core,
      opacity: 1, mask: undefined, clipPath: undefined};
    return <g data-part={part}>
      <defs><mask id={id} maskUnits="userSpaceOnUse" x="-24" y="-24" width="72" height="72">
        <rect x="-24" y="-24" width="72" height="72" fill="white"/>
        {createElement(tag, knockout)}
      </mask></defs>
      <g mask={`url(#${id})`}>{createElement(tag, ink)}</g>
    </g>;
  }

  // Semantic dots stay dots. Larger filled actors expose their own contour.
  if (tag === 'circle' && Number(props.r ?? 0) <= outlineEdge) return original();
  return createElement(tag, {...props, fill: 'none', stroke: 'currentColor',
    strokeWidth: outlineEdge, strokeLinecap: 'round', strokeLinejoin: 'round'});
}

export function MaterialPath(props: SVGProps<SVGPathElement> & {'data-part'?: string}) {
  return useMaterialShape('path', props as ShapeProps);
}
export function MaterialCircle(props: SVGProps<SVGCircleElement> & {'data-part'?: string}) {
  return useMaterialShape('circle', props as ShapeProps);
}
export function MaterialRect(props: SVGProps<SVGRectElement> & {'data-part'?: string}) {
  return useMaterialShape('rect', props as ShapeProps);
}
