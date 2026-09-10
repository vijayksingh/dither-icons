import { DitherIcon } from '../../src';
import { MotionStudies } from '../MotionStudies';
import { useSite } from '../settings';
import { Link } from '../routing';
import { MaterialControls, PageHeading } from '../PageParts';
import { Glyph } from '../ui';
export default function MotionPage() {
  const { texture, motion } = useSite();
  return <div className="motion-page">
    <PageHeading title="See how each icon moves." description="Replay animations, compare materials, and pause at any frame." />
    <div className="motion-principle-strip">{[{ icon: 'download', title: 'Download', text: 'The arrow lands before the tray responds.' }, { icon: 'bell', title: 'Bell', text: 'The clapper follows the swinging shell.' }, { icon: 'layers', title: 'Layers', text: 'The layers separate, then return to their stack.' }].map(item => <div key={item.icon}><DitherIcon name={item.icon} size={37} texture={texture} animate={false} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div>
    <div className="studio-material-bar"><span>Preview settings</span><MaterialControls /></div>
    <MotionStudies texture={texture} enabled={motion} />
    <div className="studio-outro"><div><h2>Control playback in React.</h2><p>Learn how to trigger, replay, and disable animations.</p></div><Link href="/docs/motion" className="button subtle">Read the motion guide<Glyph name="arrow" size={15} /></Link></div>
  </div>;
}
