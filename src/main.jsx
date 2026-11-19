import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/chat.css';
import './styles/utilities.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
);

