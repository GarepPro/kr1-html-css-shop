// Данные каталога: товары, категории, сортировки, бейджи.
// Один источник данных для каталога, главной, карточки товара и поиска.

// Категории товаров. `slug` используется в фильтрах и карточке товара.
export const CATEGORIES = [
  { slug: 'desk', label: 'Для рабочего места', icon: 'desk' },
  { slug: 'focus', label: 'Фокус и продуктивность', icon: 'bolt' },
  { slug: 'light', label: 'Освещение', icon: 'lamp' },
  { slug: 'audio', label: 'Аудио', icon: 'headphones' },
  { slug: 'print', label: 'Печатные издания', icon: 'book' },
  { slug: 'accessories', label: 'Аксессуары', icon: 'spark' },
];

// Бейджи: модификатор БЭМ + подпись.
export const BADGES = {
  hit: { modifier: 'badge--hit', label: 'Хит продаж' },
  new: { modifier: 'badge--new', label: 'Новинка' },
  sale: { modifier: 'badge--sale', label: 'Скидка' },
  exclusive: { modifier: 'badge--exclusive', label: 'Эксклюзив' },
};

// Каталог: часть 1 записана литералом, часть 2 добавляется ниже.
export const CATALOG_PRODUCTS = [
  {
    id: 'aurora-desk-lamp',
    title: 'Лампа Aurora Desk',
    tagline: 'Тёплый свет без мерцания для вечерней работы',
    description:
      'Настольная лампа с регулировкой температуры света от 2700K до 5000K и плавным изменением яркости. Сенсорная панель, память последнего режима и защита зрения — без мерцания на любой яркости.',
    price: 6490,
    oldPrice: 7690,
    badge: 'hit',
    category: 'light',
    rating: 4.9,
    reviews: 128,
    accent: 'amber',
    stock: 12,
    features: ['Беспроводная зарядка в основании', 'Пять оттенков света', 'Алюминиевый корпус'],
    specs: [
      { name: 'Материал', value: 'Алюминий, матовый пластик' },
      { name: 'Мощность', value: '12 Вт' },
      { name: 'Температура света', value: '2700–5000K' },
      { name: 'Высота', value: '42 см' },
      { name: 'Гарантия', value: '24 месяца' },
    ],
    delivery: 'Доставим за 1–2 дня по Москве, по России — от 3 дней.',
    popularity: 98,
    createdAt: 8,
  },
  {
    id: 'focus-timer',
    title: 'Таймер Focus Cube',
    tagline: 'Метод помодоро в настольном формате',
    description:
      'Механический таймер с вращающимся диском: 5, 15, 25 и 45 минут. Без уведомлений, экранов и лишних звуков — только мягкая мелодия по окончании интервала.',
    price: 2990,
    oldPrice: null,
    badge: 'new',
    category: 'focus',
    rating: 4.7,
    reviews: 64,
    accent: 'indigo',
    stock: 31,
    features: ['Работает от одной батарейки', 'Не требует приложения', 'Пять лет гарантии'],
    specs: [
      { name: 'Материал', value: 'Дуб, алюминий' },
      { name: 'Питание', value: '1 × AA' },
      { name: 'Интервалы', value: '5 / 15 / 25 / 45 мин' },
      { name: 'Диаметр', value: '8 см' },
      { name: 'Гарантия', value: '60 месяцев' },
    ],
    delivery: 'Отправляем в день заказа при оформлении до 15:00.',
    popularity: 87,
    createdAt: 17,
  },
  {
    id: 'notebook-grid',
    title: 'Блокнот Grid Notes',
    tagline: 'Точечная сетка для схем и заметок',
    description:
      'Формат A5, 160 страниц офсетной бумаги плотностью 100 г/м². Прошитый переплёт раскрывается на 180°, обложка из переработанного картона, закладка-ляссе.',
    price: 890,
    oldPrice: null,
    badge: null,
    category: 'desk',
    rating: 4.8,
    reviews: 212,
    accent: 'slate',
    stock: 140,
    features: ['Бумага 100 г/м² без просвета', 'Раскрытие на 180°', 'Второй блокнот в подарок от 3000 ₽'],
    specs: [
      { name: 'Формат', value: 'A5 (148 × 210 мм)' },
      { name: 'Страниц', value: '160' },
      { name: 'Разлиновка', value: 'Точки 5 мм' },
      { name: 'Обложка', value: 'Переработанный картон' },
      { name: 'Гарантия', value: '12 месяцев' },
    ],
    delivery: 'Доступен к самовывозу со склада в Москве.',
    popularity: 74,
    createdAt: 4,
  },
  {
    id: 'stand-lift',
    title: 'Подставка Lift Stand',
    tagline: 'Эргономика на высоте',
    description:
      'Алюминиевая подставка для ноутбука с шестью углами наклона и вентилируемой поверхностью. Поднимает экран до уровня глаз и освобождает место на столе.',
    price: 4290,
    oldPrice: null,
    badge: 'exclusive',
    category: 'desk',
    rating: 4.6,
    reviews: 58,
    accent: 'steel',
    stock: 9,
    features: ['Ноутбуки до 17 дюймов', 'Силиконовые накладки', 'Складная конструкция'],
    specs: [
      { name: 'Материал', value: 'Анодированный алюминий' },
      { name: 'Углы наклона', value: '6 положений' },
      { name: 'Нагрузка', value: 'до 6 кг' },
      { name: 'Вес', value: '780 г' },
      { name: 'Гарантия', value: '24 месяца' },
    ],
    delivery: 'Доставим курьером за 1–3 дня.',
    popularity: 81,
    createdAt: 11,
  },
];

// Вторая половина каталога: остальные товары.
CATALOG_PRODUCTS.push(
  {
    id: 'headphones-echo',
    title: 'Наушники Echo Studio',
    tagline: 'Глубокий звук и тишина вокруг',
    description:
      'Полноразмерные наушники с активным шумоподавлением, 40 часами автономности и режимом прозрачности для разговоров без снятия.',
    price: 12990,
    oldPrice: 14990,
    badge: 'sale',
    category: 'audio',
    rating: 4.5,
    reviews: 96,
    accent: 'violet',
    stock: 4,
    features: ['ANC и режим прозрачности', '40 часов работы', 'Чехол в комплекте'],
    specs: [
      { name: 'Тип', value: 'Накладные, беспроводные' },
      { name: 'Автономность', value: 'до 40 ч' },
      { name: 'Зарядка', value: 'USB-C, 10 мин → 5 ч' },
      { name: 'Вес', value: '268 г' },
      { name: 'Гарантия', value: '24 месяца' },
    ],
    delivery: 'Отправляем в день заказа при оформлении до 15:00.',
    popularity: 92,
    createdAt: 6,
  },
  {
    id: 'webcam-frame',
    title: 'Веб-камера Frame HD',
    tagline: 'Чистая картинка на каждой встрече',
    description:
      'Веб-камера 2K с автофокусом, автоматической коррекцией света и встроенным шторным затвором. Устанавливается на монитор без инструментов.',
    price: 5790,
    oldPrice: null,
    badge: 'new',
    category: 'accessories',
    rating: 4.4,
    reviews: 37,
    accent: 'teal',
    stock: 22,
    features: ['Разрешение 2K', 'Шторка для приватности', 'Микрофон с шумоподавлением'],
    specs: [
      { name: 'Разрешение', value: '2560 × 1440' },
      { name: 'Частота', value: '30 fps' },
      { name: 'Подключение', value: 'USB-A / USB-C' },
      { name: 'Поле зрения', value: '78°' },
      { name: 'Гарантия', value: '12 месяцев' },
    ],
    delivery: 'Доступен к самовывозу со склада в Москве.',
    popularity: 69,
    createdAt: 15,
  },
  {
    id: 'keyboard-slim',
    title: 'Клавиатура Slim Keys',
    tagline: 'Тихая печать в полноразмерном формате',
    description:
      'Низкопрофильная клавиатура с ножничным механизмом, подсветкой и переключением между тремя устройствами. Тихая печать — для open space.',
    price: 8490,
    oldPrice: null,
    badge: 'hit',
    category: 'desk',
    rating: 4.8,
    reviews: 143,
    accent: 'blue',
    stock: 17,
    features: ['Три устройства по Bluetooth', 'Подсветка клавиш', 'USB-C и 30 дней автономности'],
    specs: [
      { name: 'Раскладка', value: 'ISO, рус/англ' },
      { name: 'Переключатели', value: 'Ножничный механизм' },
      { name: 'Подключение', value: 'Bluetooth 5.1 / USB-C' },
      { name: 'Автономность', value: 'до 30 дней' },
      { name: 'Гарантия', value: '24 месяца' },
    ],
    delivery: 'Доставим за 1–2 дня по Москве, по России — от 3 дней.',
    popularity: 95,
    createdAt: 9,
  },
  {
    id: 'book-typography',
    title: 'Книга «Живая типографика»',
    tagline: 'Классика о шрифте и сетке',
    description:
      'Издание о типографике и вёрстке: шрифтовые пары, модульная сетка, правила переносов и примеры из практики. Твёрдый переплёт, 320 страниц.',
    price: 2190,
    oldPrice: null,
    badge: null,
    category: 'print',
    rating: 4.9,
    reviews: 87,
    accent: 'rose',
    stock: 55,
    features: ['320 страниц', 'Твёрдый переплёт', 'Более 300 иллюстраций'],
    specs: [
      { name: 'Объём', value: '320 страниц' },
      { name: 'Переплёт', value: 'Твёрдый' },
      { name: 'Формат', value: '170 × 240 мм' },
      { name: 'Язык', value: 'Русский' },
      { name: 'Гарантия', value: '12 месяцев' },
    ],
    delivery: 'Доступен к самовывозу со склада в Москве.',
    popularity: 78,
    createdAt: 3,
  },
);

// Опции сортировки каталога.
export const SORT_OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешёвые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'new', label: 'Сначала новинки' },
];

// Категории для чекбоксов фильтра: первым идёт «Все товары».
export const CATALOG_CATEGORIES = [
  { value: 'all', label: 'Все товары' },
  ...CATEGORIES.map((category) => ({ value: category.slug, label: category.label })),
];

// Соответствие старых значений фильтра бейджу (совместимость исходных данных).
export const CATALOG_BADGES = {
  popular: 'hit',
  new: 'new',
  sale: 'sale',
};

// Возможные значения бейджа для фильтра.
export const BADGE_OPTIONS = [
  { value: 'all', label: 'Любой' },
  { value: 'hit', label: 'Хит продаж' },
  { value: 'new', label: 'Новинка' },
  { value: 'sale', label: 'Со скидкой' },
  { value: 'exclusive', label: 'Эксклюзив' },
];

// Цена в рублях с пробелами: 12990 → «12 990 ₽».
export function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}

// Название категории по slug.
export function getCategoryLabel(slug) {
  return CATEGORIES.find((category) => category.slug === slug)?.label ?? '';
}

// Поиск товара по id.
export function getProductById(id) {
  return CATALOG_PRODUCTS.find((product) => product.id === id) ?? null;
}

// Товары той же категории (без самого товара).
export function getRelatedProducts(product, limit = 3) {
  if (!product) return [];

  const sameCategory = CATALOG_PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const others = CATALOG_PRODUCTS.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

// Сортировка списка товаров по значению из SORT_OPTIONS.
export function sortProducts(products, sort) {
  const list = [...products];

  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'new':
      return list.sort((a, b) => b.createdAt - a.createdAt);
    default:
      return list.sort((a, b) => b.popularity - a.popularity);
  }
}
