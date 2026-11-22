// Данные поиска по сайту и чата с консультантом.
import { CATALOG_PRODUCTS, getCategoryLabel } from './catalog.js';
import { FAQ } from './home.js';

// Статические страницы, участвующие в поиске.
const PAGES = [
  {
    id: 'page-home',
    type: 'page',
    title: 'Главная',
    text: 'Коллекция вещей для рабочего места, преимущества и популярные товары.',
    to: '/',
    keywords: 'главная старт коллекция преимущества',
  },
  {
    id: 'page-catalog',
    type: 'page',
    title: 'Каталог товаров',
    text: 'Все товары с фильтрами по категории, цене и сортировкой.',
    to: '/catalog',
    keywords: 'каталог товары фильтры сортировка цена',
  },
  {
    id: 'page-about',
    type: 'page',
    title: 'О бренде',
    text: 'История ShopProject, ценности, команда и этапы развития.',
    to: '/about',
    keywords: 'о нас бренд история команда ценности',
  },
  {
    id: 'page-cart',
    type: 'page',
    title: 'Корзина и оформление заявки',
    text: 'Несколько товаров в одной заявке, форма с валидацией и итог заказа.',
    to: '/cart',
    keywords: 'корзина заявка оформление заказ доставка возврат',
  },
  {
    id: 'page-contacts',
    type: 'page',
    title: 'Контакты',
    text: 'Телефон, e-mail, адрес шоурума и часы работы.',
    to: '/contacts',
    keywords: 'контакты телефон почта адрес шоурум',
  },
  {
    id: 'page-account',
    type: 'page',
    title: 'Личный кабинет',
    text: 'Заказы, бонусные баллы, избранное и настройки профиля.',
    to: '/account',
    keywords: 'кабинет профиль заказы бонусы избранное настройки',
  },
];

// Документы поиска: страницы, товары и вопросы FAQ.
export const SEARCH_DOCUMENTS = [
  ...PAGES,
  ...CATALOG_PRODUCTS.map((product) => ({
    id: `product-${product.id}`,
    productId: product.id,
    type: 'product',
    title: product.title,
    text: `${product.tagline}. ${product.description}`,
    to: `/product/${product.id}`,
    keywords: `${getCategoryLabel(product.category)} ${product.title}`,
    price: product.price,
    accent: product.accent,
  })),
  ...FAQ.map((item, index) => ({
    id: `faq-${index}`,
    type: 'faq',
    title: item.question,
    text: item.answer.filter((part) => typeof part === 'string').join(' '),
    to: '/?section=faq',
    keywords: 'вопрос помощь faq доставка возврат гарантия баллы',
  })),
];

// Поиск по документам: совпадение в заголовке весит больше.
export function searchSite(query, limit = 8) {
  const normalized = query.trim().toLowerCase();

  if (normalized.length < 2) return [];

  return SEARCH_DOCUMENTS.map((document) => {
    const title = document.title.toLowerCase();
    const textContent = document.text.toLowerCase();
    const keywordContent = document.keywords.toLowerCase();
    let score = 0;

    if (title.includes(normalized)) score += 5;
    if (textContent.includes(normalized)) score += 2;
    if (keywordContent.includes(normalized)) score += 1;

    return { document, score };
  })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.document);
}

// Подсказки под поиском.
export const SEARCH_SUGGESTIONS = ['лампа', 'клавиатура', 'доставка', 'возврат', 'наушники'];

// Чат магазина: приветствие, быстрые кнопки и сценарии ответов.
export const CHAT_GREETING = {
  id: 'greeting',
  from: 'bot',
  text: 'Здесь можно узнать о доставке, возврате и бонусах или подобрать товар.',
};

export const CHAT_QUICK_REPLIES = [
  { id: 'delivery', label: 'Сроки доставки' },
  { id: 'return', label: 'Возврат и обмен' },
  { id: 'pick', label: 'Помогите с выбором' },
  { id: 'bonus', label: 'Бонусные баллы' },
];

export const CHAT_SCENARIOS = [
  {
    id: 'delivery',
    keywords: ['доставк', 'срок', 'когда', 'курьер', 'пункт', 'выдач'],
    replies: [
      'По Москве доставка занимает 1–2 дня и бесплатна от 3 000 ₽. По России — от 3 дней, курьером или в пункт выдачи.',
      'Если оформите заявку до 15:00, отправим заказ в тот же день. Проверить состав заказа можно в корзине.',
    ],
    action: { to: '/cart', label: 'Открыть форму заявки' },
  },
  {
    id: 'return',
    keywords: ['возврат', 'вернуть', 'обмен', 'брак', 'гарант'],
    replies: [
      'На возврат есть 60 дней — даже если упаковка вскрыта. Деньги приходят на карту за 3 рабочих дня.',
      'На технику действует гарантия 24 месяца, на освещение — до 60 месяцев. Гарантийный ремонт бесплатный.',
    ],
    action: { to: '/cart', label: 'Оформить возврат' },
  },
  {
    id: 'pick',
    keywords: ['выбр', 'подбер', 'посовет', 'что лучше', 'как выбрать', 'помощ'],
    replies: [
      'Давайте по шагам: для чего нужна вещь — работа, учёба или отдых? Сколько часов в день вы за ней проводите?',
      'Если для долгой работы, начните с лампы Aurora Desk и клавиатуры Slim Keys — это самая популярная пара в каталоге.',
    ],
    action: { to: '/catalog', label: 'Смотреть каталог' },
  },
  {
    id: 'bonus',
    keywords: ['балл', 'бонус', 'скидк', 'акци', 'промокод'],
    replies: [
      'За каждую покупку начисляем баллы: 1 ₽ = 1 балл. Баллы можно списать при оплате следующего заказа.',
      'Ещё 150 баллов даём за отзыв о товаре. Баланс и история — в личном кабинете.',
    ],
    action: { to: '/account', label: 'Открыть личный кабинет' },
  },
  {
    id: 'stock',
    keywords: ['наличи', 'есть ли', 'остал', 'склад', 'закончил'],
    replies: [
      'Наличие указано в карточке каждого товара. Если позиция закончилась — покажем кнопку «Уведомить о наличии».',
      'Могу проверить конкретный товар: напишите его название, например «лампа» или «клавиатура».',
    ],
  },
  {
    id: 'human',
    keywords: ['человек', 'менеджер', 'позвон', 'телефон', 'оператор'],
    replies: [
      'Позвонить в магазин можно по номеру +7 (495) 123-45-67, ежедневно с 10:00 до 20:00.',
    ],
    action: { to: '/cart', label: 'Открыть корзину' },
  },
];

// Ответ, если ни один сценарий не сработал.
export const CHAT_FALLBACK = {
  replies: [
    'На этот вопрос пока нет ответа. Попробуйте спросить про доставку, возврат, товары или бонусы.',
    'Если нужен человек — менеджер на линии ежедневно с 10:00 до 20:00 по телефону +7 (495) 123-45-67.',
  ],
  action: { to: '/contacts', label: 'Контакты' },
};

// Подбор сценария по тексту сообщения.
export function getChatScenario(text) {
  const normalized = text.toLowerCase();
  return CHAT_SCENARIOS.find((scenario) =>
    scenario.keywords.some((keyword) => normalized.includes(keyword)),
  );
}

