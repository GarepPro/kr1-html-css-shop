// Векторные силуэты товаров — заглушки на случай, когда фотографии ещё нет.
// Рисуются в палитре сайта, поэтому карточка выглядит аккуратно и «богато»
// даже без файлов в images/. Набор покрывает все категории каталога.
import { CATEGORIES } from '../../data/catalog.js';

// penny: каждая категория получает свой силуэт.
const SHAPES = {
  // Освещение: лампа с абажуром.
  lamp: (
    <>
      <path d="M60 30h22l16 26H44z" />
      <path d="M71 56v42" />
      <path d="M54 102h34" />
      <path d="M71 30v-6" />
    </>
  ),
  // Аудио: полноразмерные наушники.
  headphones: (
    <>
      <path d="M34 74V62a36 36 0 0 1 72 0v12" />
      <rect x="24" y="70" width="18" height="30" rx="8" />
      <rect x="98" y="70" width="18" height="30" rx="8" />
    </>
  ),
  // Печатные издания: раскрытая книга.
  book: (
    <>
      <path d="M70 36c-12-6-24-7-32-4v56c8-3 20-2 32 4 12-6 24-7 32-4V32c-8-3-20-2-32 4z" />
      <path d="M70 36v56" />
    </>
  ),
  // Фокус и продуктивность: таймер с метками.
  bolt: (
    <>
      <circle cx="70" cy="66" r="34" />
      <path d="M70 44v24l16 10" />
      <path d="M70 22v6M70 104v6M26 66h-6M120 66h-6" />
    </>
  ),
  // Аксессуары: кружка с паром.
  spark: (
    <>
      <path d="M40 56h50v32a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16z" />
      <path d="M90 64h8a10 10 0 0 1 0 20h-8" />
      <path d="M56 44c0-6 6-8 6-14M70 44c0-6 6-8 6-14" />
    </>
  ),
  // Рабочее место: клавиатура с блокнотом.
  desk: (
    <>
      <rect x="30" y="70" width="80" height="30" rx="6" />
      <path d="M40 79h60M40 88h44" />
      <rect x="82" y="34" width="28" height="28" rx="4" />
    </>
  ),
};

// Силуэт по категории товара; для неизвестной категории — «desk».
export function silhouetteForCategory(category) {
  const found = CATEGORIES.find((item) => item.slug === category);
  return SHAPES[found?.slug ?? 'desk'] ?? SHAPES.desk;
}

// Сама картинка-заглушка: прозрачный фон, тонкие контуры в цвете текста.
// className передаётся как есть (БЭМ-блок задаёт вызывающий компонент).
export function ProductSilhouette({ category, className = '', title }) {
  return (
    <svg
      className={className || 'product-silhouette'}
      viewBox="0 0 140 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {title && <title>{title}</title>}
      {silhouetteForCategory(category)}
    </svg>
  );
}

export default ProductSilhouette;
