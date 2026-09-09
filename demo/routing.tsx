import { createContext, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

export function canonicalPath(path: string, hash = '') {
  path = path.replace(/\/+$/, '') || '/';
  if (path === '/' && hash === '#motion-studies') return '/motion';
  if (path === '/docs/ai') return '/ai';
  return path;
}
type Route = { path: string; hash: string; key: string; restore: boolean };
type Position = { x: number; y: number; focus?: string | null };
const RouterContext = createContext<{ route: Route; navigate: (href: string) => void; settle: () => void } | null>(null);
const entryKey = () => crypto.randomUUID();

export function Router({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => {
    const path = canonicalPath(location.pathname, location.hash);
    const hash = path === location.pathname ? location.hash : '';
    const key = history.state?.ditherKey ?? entryKey();
    history.replaceState({ ...history.state, ditherKey: key }, '', path + location.search + hash);
    return { path, hash, key, restore: false };
  });
  const current = useRef(route); current.current = route;
  const positions = useRef(new Map<string, Position>());
  function remember() {
    positions.current.set(current.current.key, { x: scrollX, y: scrollY, focus: document.activeElement?.getAttribute('data-route-focus') });
  }
  function navigate(href: string) {
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) { location.assign(url.href); return; }
    remember();
    const path = canonicalPath(url.pathname, url.hash);
    const hash = path === url.pathname ? url.hash : '';
    const key = entryKey();
    history.pushState({ ditherKey: key }, '', path + url.search + hash);
    setRoute({ path, hash, key, restore: false });
  }
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    function back() {
      remember();
      setRoute({ path: canonicalPath(location.pathname, location.hash), hash: location.hash, key: history.state?.ditherKey ?? entryKey(), restore: true });
    }
    addEventListener('popstate', back);
    return () => { removeEventListener('popstate', back); history.scrollRestoration = previous; };
  }, []);
  function settle() {
    const position = route.restore ? positions.current.get(route.key) : undefined;
    let anchor: HTMLElement | null = null;
    try { anchor = route.hash ? document.getElementById(decodeURIComponent(route.hash.slice(1))) : null; } catch { /* Unknown fragment: open the page itself. */ }
    if (position) {
      scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
      if (position.focus) document.querySelector<HTMLElement>(`[data-route-focus="${CSS.escape(position.focus)}"]`)?.focus({ preventScroll: true });
    } else if (anchor) anchor.scrollIntoView({ behavior: 'instant' });
    else { scrollTo({ top: 0, behavior: 'instant' }); document.querySelector<HTMLElement>('[data-page-heading]')?.focus({ preventScroll: true }); }
  }

  return <RouterContext.Provider value={{ route, navigate, settle }}>{children}</RouterContext.Provider>;
}
export function useRouter() { return useContext(RouterContext)!; }
export function Link({ href = '/', onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();
  return <a {...props} href={href} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !props.download && (!props.target || props.target === '_self')) {
      event.preventDefault(); navigate(href);
    }
  }}>{children}</a>;
}
