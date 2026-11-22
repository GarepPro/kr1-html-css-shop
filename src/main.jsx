import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import {
  CATALOG_PRODUCTS,
  calculateDiscount,
  createProductSummary,
  formatPrice,
  getProductStatus,
} from './data/catalog.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/chat.css';
import './styles/utilities.css';

const product = CATALOG_PRODUCTS[0];
console.log('Практика №15', {
  цена: formatPrice(product.price),
  скидка: formatPrice(calculateDiscount(product)),
  статус: getProductStatus(product),
  описание: createProductSummary(product),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
);

