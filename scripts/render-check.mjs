// Рендер-проверка React-приложения в jsdom.
// Собирает бандл в формате IIFE, подставляет его в index.html и проверяет,
// что каждая страница действительно отрисовывает заголовок, шапку, подвал и свои блоки.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';
import { build } from 'vite';

// Отдельная сборка в один самовыполняющийся скрипт — jsdom исполняет его как обычный <script>.
rmSync('.render-check', { recursive: true, force: true });

// URL страницы: GitHub Pages отдаёт сайт из подкаталога репозитория.
// Базу задаём и при сборке (define), и в адресах jsdom, чтобы basename из
// src/router.jsx совпадал с путём проверяемой страницы.
const BASE = '/kr1-html-css-shop/';

await build({
  logLevel: 'silent',
  define: {
    'import.meta.env.VITE_APP_BASE': JSON.stringify(BASE),
  },
  build: {
    outDir: '.render-check',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.jsx',
      output: { format: 'iife', entryFileNames: 'bundle.js', inlineDynamicImports: true },
    },
  },
});

const bundleCode = readFileSync('.render-check/bundle.js', 'utf8');
// Убираем тег module-скрипта: бандл исполним вручную через window.eval —
// jsdom не загружает внешние файлы скриптов.
const indexHtml = readFileSync('index.html', 'utf8').replace(
  /<script[^>]*src="[^"]*"[^>]*><\/script>/,
  '',
);

const checks = [
  {
    route: '/',
    h1: 'Предметы для рабочего стола',
    selectors: [
      '.site-header',
      '.site-header__cart',
      '.hero',
      'img.hero__photo',
      '.category-grid',
      '.products-grid .product-card',
      '.product-card__media img[src]',
      '.review-grid',
      'details.faq-item',
      'button.scroll-top',
      '.chat__toggle',
    ],
  },
  {
    route: '/catalog',
    h1: 'Каталог товаров',
    selectors: [
      '.catalog-layout',
      '.catalog-filters',
      '.filter-list__item',
      '.product-card',
      '.breadcrumbs',
      '.trust-strip',
    ],
  },
  {
    route: '/product/aurora-desk-lamp',
    h1: 'Лампа Aurora Desk',
    selectors: ['.product-detail', '.buy-box', 'table.product-table', '.reviews-layout', '.review'],
  },
  {
    route: '/about',
    h1: 'Мы делаем вещи, которыми пользуемся сами',
    selectors: ['.about-stats', '.story-layout', '.timeline', '.team-grid', '.cta'],
  },
  {
    route: '/cart',
    h1: 'Корзина и заявка',
    // .success-message здесь намеренно НЕ проверяется: сообщение об успешной
    // отправке должно появляться только после отправки формы, а не сразу.
    selectors: [
      'form.order-form--page',
      '#page-name',
      '#page-phone',
      '.order-form__hint',
      '.cart-empty',
      '.order-summary',
    ],
  },
  {
    // Старый адрес формы открывает корзину: ссылки из поиска и чата не ломаются.
    route: '/order',
    h1: 'Корзина и заявка',
    selectors: ['form.order-form--page', '.cart-empty'],
  },
  {
    route: '/contacts',
    h1: 'Контакты',
    selectors: [
      '.contact-grid',
      '.contact-card',
      '.showroom-map',
      'iframe.showroom-map__frame',
      '.showroom-info',
      '.showroom-point',
      'a[href^="tel:"]',
    ],
  },
  {
    route: '/account',
    h1: 'Александра Смирнова',
    selectors: ['.account-profile', '.account-metrics', '.account-tabs', '.account-tabs__item'],
  },
  {
    route: '/nope',
    h1: 'Страница не найдена',
    selectors: ['.site-header', '.site-footer', '.not-found__code', '.button--primary'],
  },
];

const errors = [];
let failed = 0;

for (const check of checks) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (error) => errors.push(`${check.route}: ${error.message}`));

  // Главная — это сам подкаталог с завершающим слэшем, остальные — вложенные пути.
  // Путь склеиваем через снятый и добавленный слэш, иначе получается «...shopcatalog».
  const basePath = BASE.endsWith('/') ? BASE : `${BASE}/`;
  const routePath = check.route === '/' ? '' : check.route.replace(/^\//, '');
  const url = `https://gareppro.github.io${basePath}${routePath}`;

  const dom = new JSDOM(indexHtml, {
    url,
    runScripts: 'outside-only',
    virtualConsole,
    pretendToBeVisual: true,
    beforeParse(window) {
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.matchMedia =
        window.matchMedia ||
        ((query) => ({
          matches: false,
          media: query,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
        }));
      window.HTMLDialogElement.prototype.showModal = function showModal() {
        this.setAttribute('open', '');
      };
      window.HTMLDialogElement.prototype.close = function close() {
        this.removeAttribute('open');
      };
    },
  });

  // Исполняем собранный бандл в контексте окна jsdom.
  const { window } = dom;
  try {
    window.eval(bundleCode);
  } catch (error) {
    errors.push(`${check.route}: ${error.message}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 150));

  const root = window.document.getElementById('root');
  const h1 = root?.querySelector('h1')?.textContent.trim() ?? '';
  const missing = check.selectors.filter((selector) => !root?.querySelector(selector));
  const isOk = h1 === check.h1 && missing.length === 0;

  if (!isOk && process.env.DEBUG_RENDER) {
    console.log(`[debug ${check.route}] rootHTML:`, JSON.stringify(root?.innerHTML.slice(0, 400)));
  }

  if (!isOk) failed += 1;
  console.log(
    `${check.route} -> ${isOk ? 'OK' : 'FAIL'}; h1: "${h1}"` +
      (missing.length ? `; нет блоков: ${missing.join(', ')}` : ''),
  );

  // jsdom не загружает изображения и содержимое сторонних iframe.
  // Проверяем файлы подкаталога сборки и адрес, который передаётся Яндекс Картам.
  const afterClick = () => new Promise((resolve) => setTimeout(resolve, 20));
  try {
    for (const img of root.querySelectorAll('img')) {
      const path = new URL(img.src).pathname;
      assert.ok(path.startsWith(`${BASE}images/`), path);
      assert.ok(existsSync(`.render-check/${path.slice(BASE.length)}`), path);
    }
    if (check.route === '/') {
      for (const theme of ['dark', 'light']) {
        root.querySelector('button[aria-label$="тему"]').click();
        await afterClick();
        assert.equal(window.document.documentElement.dataset.theme, theme);
        assert.equal(window.localStorage.getItem('shopproject-theme'), theme);
      }
      assert.equal(root.querySelector('.scroll-top').textContent.trim(), 'Наверх');
    }
    if (check.route === '/contacts') {
      const points = root.querySelectorAll('button.showroom-point');
      assert.equal(points.length, 3);
      for (const point of points) {
        point.click();
        await afterClick();
        const map = root.querySelector('.showroom-map__frame');
        const address = new URL(map.src).searchParams.get('text');
        assert.ok(address && point.textContent.includes(address));
        assert.equal(point.getAttribute('aria-pressed'), 'true');
        assert.equal(new URL(root.querySelector('.showroom-map__link').href).searchParams.get('text'), address);
      }
      root.querySelector('button.contact-card__value').click();
      await afterClick();
      assert.ok(root.querySelector('.chat__panel'));
    }
    if (check.route === '/product/aurora-desk-lamp') {
      const thumbs = root.querySelectorAll('button.product-detail__thumb');
      assert.ok(thumbs.length > 1);
      thumbs[1].click();
      await afterClick();
      assert.equal(root.querySelector('.product-detail__media img').src, thumbs[1].querySelector('img').src);
    }
  } catch (error) {
    errors.push(`${check.route}: ${error.message}`);
  }

  window.close();
}

if (errors.length) {
  failed += 1;
  console.log('Ошибки выполнения:', errors);
}

console.log(failed === 0 ? 'ИТОГ: все страницы отрисованы без ошибок' : `ИТОГ: ошибок ${failed}`);
process.exitCode = failed === 0 ? 0 : 1;

