import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

const STORAGE_KEY = 'shopproject-theme';
const ThemeContext = createContext(null);
const darkMode = () => window.matchMedia('(prefers-color-scheme: dark)');

function readPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Системный режим работает и при отключённом localStorage.
  }
  return 'system';
}

export function ThemeProvider({ children }) {
  const [preference, setTheme] = useState(readPreference);
  const [systemDark, setSystemDark] = useState(() => darkMode().matches);
  const system = systemDark ? 'dark' : 'light';
  const resolved = preference === 'system' ? system : preference;

  useEffect(() => {
    const media = darkMode();
    const sync = () => setSystemDark(media.matches);
    media.addEventListener('change', sync);
    sync();
    return () => media.removeEventListener('change', sync);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme === resolved) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Снимок новой темы должен содержать уже окончательные цвета всех блоков.
    function commitPalette() {
      root.classList.add('theme-snapshot');
      root.dataset.theme = resolved;
      void root.offsetWidth;
      root.classList.remove('theme-snapshot');
    }
    if (reduced) {
      commitPalette();
      return;
    }
    if (typeof document.startViewTransition === 'function') {
      let current = true;
      const transition = document.startViewTransition(() => {
        if (current) commitPalette();
      });
      return () => {
        current = false;
        transition.skipTransition();
      };
    }
    root.classList.add('theme-changing');
    root.dataset.theme = resolved;
    const timer = window.setTimeout(() => root.classList.remove('theme-changing'), 300);
    return () => {
      window.clearTimeout(timer);
      root.classList.remove('theme-changing');
    };
  }, [resolved]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Выбранная тема продолжает действовать до перезагрузки.
    }
  }, [preference]);

  function toggleTheme() {
    setTheme((current) => (current === 'system' ? system : current) === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme должен использоваться внутри ThemeProvider');
  return context;
}
