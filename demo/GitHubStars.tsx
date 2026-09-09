import { useEffect, useState } from 'react';
import { SocialMark } from './SocialLinks';

export const REPOSITORY = 'vijayksingh/dither-icons';
const CACHE_KEY = `github-stars:${REPOSITORY}`;
const CACHE_AGE = 60 * 60 * 1000;
type StarCache = { count: number; fetchedAt: number };

export function validStarCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
export function formatStars(count: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count).toLowerCase();
}
function readCache(): StarCache | null {
  try {
    const value = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return value && validStarCount(value.count) && Number.isFinite(value.fetchedAt) ? value : null;
  } catch { return null; }
}

export default function GitHubStars() {
  const [count, setCount] = useState<number | null>(() => readCache()?.count ?? null);
  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.fetchedAt >= 0 && Date.now() - cached.fetchedAt < CACHE_AGE) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    async function refresh() {
      try {
        const response = await fetch(`https://api.github.com/repos/${REPOSITORY}`, {
          headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        if (controller.signal.aborted || !validStarCount(data.stargazers_count)) return;
        setCount(data.stargazers_count);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ count: data.stargazers_count, fetchedAt: Date.now() })); } catch { /* Storage is optional. */ }
      } catch { /* Keep a cached count or the Star label when GitHub is unavailable. */ }
      finally { clearTimeout(timeout); }
    }
    void refresh();
    return () => { controller.abort(); clearTimeout(timeout); };
  }, []);
  const label = count === null ? 'Star Dither Icons on GitHub' : `Dither Icons on GitHub — ${count.toLocaleString('en')} ${count === 1 ? 'star' : 'stars'}`;
  return <a className="github-stars social-link" href={`https://github.com/${REPOSITORY}`} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
    <SocialMark name="github" /><span className="github-count">{count === null ? 'Star' : formatStars(count)}</span>
  </a>;
}
