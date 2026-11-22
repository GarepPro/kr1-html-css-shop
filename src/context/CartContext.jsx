import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CATALOG_PRODUCTS } from '../data/catalog.js';

// Корзина: список позиций { id, qty }, доступный с любой страницы.
// Хранится в localStorage рядом с другими настройками сайта.
// Бэкенда нет — корзина живёт на клиенте и отправляется вместе с заявкой.
const STORAGE_KEY = 'shopproject-cart';
const CartContext = createContext(null);

// Читаем сохранённую корзину и отбрасываем товары, которых больше нет в каталоге
// или которые закончились на складе.
function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.id === 'string' && Number(item.qty) > 0)
      .map((item) => {
        const product = CATALOG_PRODUCTS.find((entry) => entry.id === item.id);
        const limit = Math.min(Math.max(1, product?.stock ?? 0), 99);
        return { id: item.id, qty: Math.min(Math.floor(Number(item.qty)), limit) };
      })
      .filter((item) => CATALOG_PRODUCTS.some((product) => product.id === item.id && product.stock > 0));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Игнорируем недоступное хранилище.
    }
  }, [items]);

  // Добавляет товар или увеличивает количество. Возвращает новое количество в корзине.
  const addItem = useCallback((id, qty = 1) => {
    const product = CATALOG_PRODUCTS.find((entry) => entry.id === id);
    const maxQty = Math.min(Math.max(1, product?.stock ?? 1), 99);
    let nextQty = qty;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      nextQty = Math.min((existing?.qty ?? 0) + qty, maxQty);

      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: nextQty } : item));
      }
      return [...prev, { id, qty: nextQty }];
    });

    return nextQty;
  }, []);

  const setQty = useCallback((id, qty) => {
    const product = CATALOG_PRODUCTS.find((entry) => entry.id === id);
    const maxQty = Math.min(Math.max(1, product?.stock ?? 1), 99);
    const nextQty = Math.min(Math.max(1, Math.floor(qty)), maxQty);

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: nextQty } : item)));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (id) => items.some((item) => item.id === id),
    [items],
  );

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = CATALOG_PRODUCTS.find((entry) => entry.id === item.id);
          if (!product) return null;
          return { ...item, product, total: product.price * item.qty };
        })
        .filter(Boolean),
    [items],
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.total, 0), [lines]);

  const value = useMemo(
    () => ({
      items,
      lines,
      count,
      subtotal,
      addItem,
      setQty,
      removeItem,
      clearCart,
      isInCart,
    }),
    [items, lines, count, subtotal, addItem, setQty, removeItem, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart должен использоваться внутри CartProvider');
  return context;
}
