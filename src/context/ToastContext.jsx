import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Всплывающие уведомления (тосты): «добавлено в избранное», «услуга недоступна» и т.п.
// Очередь с автоматическим скрытием и кнопкой закрытия.
const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    ({ title, text, tone = 'default' }, duration = 3600) => {
      const id = nextId++;
      setToasts((prev) => [...prev.slice(-2), { id, title, text, tone }]);

      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );

      return id;
    },
    [dismiss],
  );

  // Очищаем таймеры при размонтировании провайдера.
  useEffect(() => {
    const current = timers.current;
    return () => {
      current.forEach((timer) => clearTimeout(timer));
      current.clear();
    };
  }, []);

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast должен использоваться внутри ToastProvider');
  return context;
}
