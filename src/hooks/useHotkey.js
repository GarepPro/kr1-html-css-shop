import { useCallback, useEffect, useRef } from 'react';

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
  useEffect(() => {
    if (!active) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
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
