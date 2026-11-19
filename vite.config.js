import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — относительные пути к ассетам, чтобы сборку можно было открыть
// и локально из dist/, и на GitHub Pages в подкаталоге.
// Подкаталог сайта (basename для React Router) задаётся отдельно
// через VITE_APP_BASE — см. .env.example и src/router.jsx.
export default defineConfig({
  base: './',
  plugins: [react()],
});
