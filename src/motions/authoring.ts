import type {Frame,Study,Track} from '../choreography';
export const ease={settle:'cubic-bezier(.22,1,.36,1)',smooth:'cubic-bezier(.4,0,.2,1)',accelerate:'cubic-bezier(.55,0,.85,.45)'};
export const pose=(at:number,transform:string,easing=ease.smooth):Frame=>({at,transform,easing});
export const light=(at:number,opacity:number,transform='none'):Frame=>({at,opacity,transform});
export const actor=(part:string,origin:string,frames:Frame[]):Track=>({part,origin,frames});
export const motion=(duration:number,caption:string,stages:string[],tracks:Track[]):Study=>({duration,caption,stages,tracks});
