import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Избранное товаров: хранится в localStorage, доступно из любого места сайта
// (карточка товара, каталог, личный кабинет, шапка).
const STORAGE_KEY = 'shopproject-favorites';
const FavoritesContext = createContext(null);

function readStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Игнорируем недоступное хранилище.
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    let added = false;

    setFavorites((prev) => {
      added = !prev.includes(id);
      return added ? [...prev, id] : prev.filter((item) => item !== id);
    });

    return added;
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, count: favorites.length }),
    [favorites, toggleFavorite, isFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites должен использоваться внутри FavoritesProvider');
  return context;
}
