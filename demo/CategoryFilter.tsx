import { useLayoutEffect, useRef } from 'react';
import { categories } from './model';

// Selection owns a single moving surface. Repeated clicks continue from the
// currently rendered position; no jumping back to an old animation endpoint.
const SELECTION = { duration: 300, easing: 'cubic-bezier(.22, 1, .36, 1)' };

export function CategoryFilter({ value, onChange, motion }: { value: string; onChange: (value: string) => void; motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const preferenceChanged = () => { if (preference.matches) animation.current?.cancel(); };
    preference.addEventListener('change', preferenceChanged);
    function place(animate: boolean) {
      const element = indicator.current;
      const group = root.current;
      const selected = group?.querySelector<HTMLButtonElement>('[aria-pressed=true]');
      if (!element || !group || !selected) return;
      const current = element.getBoundingClientRect();
      const parent = group.getBoundingClientRect();
      const previousX = current.left - parent.left + group.scrollLeft;
      animation.current?.cancel();
      element.style.width = `${selected.offsetWidth}px`;
      element.style.transform = `translateX(${selected.offsetLeft}px)`;
      if (animate && current.width && motion && !preference.matches) {
        animation.current = element.animate([
          { transform: `translateX(${previousX}px) scaleX(${current.width / selected.offsetWidth})` },
          { transform: `translateX(${selected.offsetLeft}px) scaleX(1)` },
        ], SELECTION);
      }
    }
    place(true);
    let firstObservation = true;
    const observer = new ResizeObserver(() => {
      if (firstObservation) { firstObservation = false; return; }
      place(false);
    });
    if (root.current) observer.observe(root.current);
    const selected = root.current?.querySelector('[aria-pressed=true]');
    if (selected) observer.observe(selected);
    return () => { observer.disconnect(); preference.removeEventListener('change', preferenceChanged); };
  }, [value, motion]);
  useLayoutEffect(() => () => animation.current?.cancel(), []);
  return <div className="categories" aria-label="Icon categories" role="group" ref={root}>
    <span ref={indicator} className="category-indicator" aria-hidden="true" />
    {categories.map(category => <button key={category} aria-pressed={category === value} onClick={() => onChange(category)}>{category}</button>)}
  </div>;
}
