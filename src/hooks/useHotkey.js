import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

// Подписка на горячую клавишу (Ctrl/Cmd+K — поиск, Esc — закрыть).
export function useHotkey(matches, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (matches(event)) {
        event.preventDefault();
        callbackRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matches]);
}

// Готовые матчеры горячих клавиш.
export const hotkeys = {
  search: (event) => (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k',
  escape: (event) => event.key === 'Escape',
};

// Блокировка прокрутки страницы, пока открыто модальное окно/панель.
export function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return undefined;

    const root = document.documentElement;
    root.classList.add('scroll-locked');

    return () => root.classList.remove('scroll-locked');
  }, [active]);
}

// Стабильная ссылка на колбэк (для обработчиков в эффектах).
export function useEventCallback(fn) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args) => ref.current(...args), []);
}
