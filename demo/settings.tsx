import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Texture } from '../src';
import { palettes } from './model';
function useSettingsState() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('dither-theme') !== 'light'; } catch { return true; } });
  const [palette, setPalette] = useState('Iris');
  const [texture, setTexture] = useState<Texture>('dither');
  const [motion, setMotion] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All icons');
  const [showAll, setShowAll] = useState(false);
  const colors = palettes.find(item => item.name === palette)!;
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem('dither-theme', dark ? 'dark' : 'light'); } catch { /* Optional preference storage. */ }
  }, [dark]);
  return { dark, setDark, palette, setPalette, color: dark ? colors.dark : colors.light, texture, setTexture, motion, setMotion, query, setQuery, category, setCategory, showAll, setShowAll };
}
const SiteContext = createContext<ReturnType<typeof useSettingsState> | null>(null);
export function SiteProvider({ children }: { children: ReactNode }) { return <SiteContext.Provider value={useSettingsState()}>{children}</SiteContext.Provider>; }
export function useSite() { return useContext(SiteContext)!; }
