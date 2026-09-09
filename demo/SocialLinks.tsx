export function SocialMark({ name }: { name: 'github' | 'x' | 'linkedin' }) {
  const paths = {
    github: 'M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.12-1.25-5.12-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.78 10.78 0 0 1 5.64 0c2.15-1.46 3.09-1.16 3.09-1.16.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.13 5.55.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z',
    x: 'M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-7.42L5.57 22H2.44l8.17-9.34L.8 2h6.4l4.42 6.75L18.9 2ZM17.8 20h1.73L6.3 3.87H4.44L17.8 20Z',
    linkedin: 'M5.3 7.6H1.7V22h3.6V7.6ZM3.5 1a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM22 13.7c0-4.2-2.2-6.2-5.1-6.2-2.3 0-3.3 1.3-3.9 2.2V7.6H9.4V22H13v-8c0-2.1.4-4.1 3-4.1 2.5 0 2.5 2.4 2.5 4.2V22H22v-8.3Z',
  };
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function SocialLinks({ mobile = false }: { mobile?: boolean }) {
  return <div className={mobile ? 'mobile-social-links' : 'header-social-links'} role="group" aria-label="Creator social profiles">
    <a className="social-link" href="https://twitter.com/dprophecyguy" target="_blank" rel="noopener noreferrer" aria-label="Vijay Singh on X (Twitter)" title="Vijay Singh on X (Twitter)"><SocialMark name="x" />{mobile && <span>X / Twitter</span>}</a>
    <a className="social-link" href="https://www.linkedin.com/in/iamvijaysingh/" target="_blank" rel="noopener noreferrer" aria-label="Vijay Singh on LinkedIn" title="Vijay Singh on LinkedIn"><SocialMark name="linkedin" />{mobile && <span>LinkedIn</span>}</a>
  </div>;
}
