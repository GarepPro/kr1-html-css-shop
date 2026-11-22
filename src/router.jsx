import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Маршруты сайта: каждая ссылка меню — отдельная страница.
// Карточка товара открывается по id: /product/aurora-desk-lamp.
// Старый адрес /product оставлен как алиас (редирект на товар по умолчанию).
// /cart — корзина с встроенной формой заявки; /order — старый адрес формы,
// он перенаправляет в корзину, чтобы ссылки из поиска и чата не ломались.
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <PageLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'catalog', element: <CatalogPage /> },
        { path: 'product', element: <ProductPage /> },
        { path: 'product/:id', element: <ProductPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'order', element: <CartPage /> },
        { path: 'contacts', element: <ContactsPage /> },
        { path: 'account', element: <AccountPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  // basename — подкаталог, в котором открыт сайт.
  // По умолчанию '/', для GitHub Pages задаётся VITE_APP_BASE=/kr1-html-css-shop/.
  // Важно: base из vite.config.js ('./') здесь не подходит — React Router
  // сравнивает basename с началом window.location.pathname.
  { basename: import.meta.env.VITE_APP_BASE || '/' },
);

