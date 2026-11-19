import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Тема оформления: light / dark / system.
// Как в js/theme-init.js эталона: выбор хранится в localStorage,
// «system» синхронизируется с prefers-color-scheme.
const STORAGE_KEY = 'shopproject-theme';
const ThemeContext = createContext(null);

const systemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Тема, применённая к <html>: полагаемся на inline-скрипт в index.html,
// чтобы не мигать светлой темой до гидрации.
function readInitialPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch {
    // localStorage может быть недоступен (приватный режим).
  }
  return 'system';
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readInitialPreference);
  const [resolved, setResolved] = useState(() =>
    typeof window === 'undefined' ? 'light' : document.documentElement.dataset.theme || systemTheme(),
  );

  // Применяем тему: атрибут на <html> включает CSS-переменные тёмной палитры.
  useEffect(() => {
    const next = preference === 'system' ? systemTheme() : preference;

    document.documentElement.dataset.theme = next;
    setResolved(next);

    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Игнорируем недоступное хранилище.
    }
  }, [preference]);

  // Следим за системной темой, пока выбран режим «как в системе».
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (preference !== 'system') return;
      const next = systemTheme();
      document.documentElement.dataset.theme = next;
      setResolved(next);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [preference]);

  // Плавная «заливка» новой темы через View Transitions API.
  // Если API нет или пользователь просил меньше анимации — просто переставляем тему.
  const applyWithTransition = useCallback((mutate) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof document.startViewTransition !== 'function') {
      mutate();
      return;
    }

    document.startViewTransition(() => mutate());
  }, []);

  const setTheme = useCallback(
    (next) => {
      if (next === preference) return;

      applyWithTransition(() => {
        const value = next === 'system' ? systemTheme() : next;
        document.documentElement.dataset.theme = value;
        setResolved(value);
        setPreference(next);
      });
    },
    [applyWithTransition, preference],
  );

  const toggleTheme = useCallback(() => {
    applyWithTransition(() => {
      const next = resolved === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      setResolved(next);
      setPreference(next);
    });
  }, [applyWithTransition, resolved]);

  const value = useMemo(
    () => ({ preference, resolved, setTheme, toggleTheme }),
    [preference, resolved, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme должен использоваться внутри ThemeProvider');
  return context;
}
