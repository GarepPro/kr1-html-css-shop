// Постобработка production-сборки для GitHub Pages.
// Pages — статический хостинг: адрес вида /kr1-html-css-shop/catalog ищет файл
// catalog/index.html и без него отдаёт 404. Копируем index.html в 404.html —
// Pages отдаст его для любого неизвестного пути, и React Router отрисует нужную
// страницу по basename (VITE_APP_BASE). Относительные пути в index.html
// (base: './' в vite.config.js) внутри 404.html разрешаются от корня сайта,
// то есть указывают на /kr1-html-css-shop/assets/... — верно для любой глубины.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('dist/index.html не найден — сначала запустите vite build.');
  process.exitCode = 1;
} else {
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));

  // .nojekyll: отключает обработку Jekyll, чтобы Pages не фильтровал файлы сборки.
  writeFileSync(join(distDir, '.nojekyll'), '');

  console.log('GitHub Pages: dist/404.html и dist/.nojekyll добавлены.');
}
