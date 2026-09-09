import { DitherIcon } from '../../src';
import { MotionStudies } from '../MotionStudies';
import { useSite } from '../settings';
import { Link } from '../routing';
import { MaterialControls, PageHeading } from '../PageParts';
import { Glyph } from '../ui';
export default function MotionPage() {
  const { texture, motion } = useSite();
  return <div className="motion-page">
    <PageHeading eyebrow="MOTION STUDIO" title="Good motion has a reason." description="Look a little closer. Every gesture has an intention, a response, and a moment to settle." />
    <div className="motion-principle-strip">{[{ icon: 'download', title: 'Keep the identity.', text: 'An arrow stays an arrow.' }, { icon: 'bell', title: 'Let the parts respond.', text: 'A ring follows a strike.' }, { icon: 'layers', title: 'Find the way home.', text: 'Every gesture returns to rest.' }].map(item => <div key={item.icon}><DitherIcon name={item.icon} size={37} texture={texture} animate={false} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div>
    <div className="studio-material-bar"><span>Make it yours</span><MaterialControls /></div>
    <MotionStudies texture={texture} enabled={motion} />
    <div className="studio-outro"><div><h2>Bring that feeling into your interface.</h2><p>The same drawings and timelines are ready in React and SVG.</p></div><Link href="/docs/motion" className="button subtle">Read the motion guide<Glyph name="arrow" size={15} /></Link></div>
  </div>;
}
