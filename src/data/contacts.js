// Данные страниц «Контакты» и «Личный кабинет».
// Демо-данные личного кабинета: вход не реализуется, только оформление интерфейса.

export const CONTACT_CHANNELS = [
  {
    icon: 'phone',
    label: 'Телефон',
    value: '+7 (495) 123-45-67',
    href: 'tel:+74951234567',
    note: 'Ежедневно с 10:00 до 20:00',
  },
  {
    icon: 'mail',
    label: 'E-mail',
    value: 'hello@shopproject.ru',
    href: 'mailto:hello@shopproject.ru',
    note: 'Отвечаем в течение часа',
  },
  {
    icon: 'chat',
    label: 'Чат на сайте',
    value: 'Открыть чат',
    note: 'Подбор товара и вопросы о заказе',
  },
];

export const SHOWROOM_POINTS = [
  {
    id: 'showroom-moscow',
    title: 'Московский шоурум',
    address: 'Москва, Большая Новодмитровская улица, 36',
    note: 'Вход со двора, второй этаж. Можно попробовать технику и забрать заказ.',
    hours: 'Ежедневно, 10:00–21:00',
  },
  {
    id: 'point-khimki',
    title: 'Пункт выдачи в Химках',
    address: 'Химки, Ленинградская улица, 16',
    note: 'Получение и проверка заказов.',
    hours: 'Ежедневно, 10:00–20:00',
  },
  {
    id: 'point-mytishchi',
    title: 'Пункт выдачи в Мытищах',
    address: 'Мытищи, Новомытищинский проспект, 26',
    note: 'Получение заказов и оформление возврата.',
    hours: 'Пн–сб, 11:00–20:00',
  },
];

export const CONTACT_FAQ = [
  {
    question: 'Как добраться до шоурума?',
    answer: ['5 минут пешком от метро «Дмитровская», вход со стороны двора, второй этаж.'],
  },
  {
    question: 'Можно ли приехать без предварительной записи?',
    answer: ['Да, но если хотите протестировать технику — лучше написать в чат: подготовим всё заранее.'],
  },
  {
    question: 'Работаете ли с юридическими лицами?',
    answer: ['Да, выставляем счёт и работаем по договору. Напишите на hello@shopproject.ru.'],
  },
];

// Данные личного кабинета (демонстрационный профиль).
export const ACCOUNT_USER = {
  name: 'Александра Смирнова',
  email: 'a.smirnova@example.com',
  phone: '+7 (900) 123-45-67',
  initials: 'АС',
  memberSince: 'март 2021',
  level: 'Silver',
  nextLevel: 'Gold',
  points: 2480,
  pointsToNext: 1520,
  // Сколько процентов пути до следующего уровня пройдено.
  levelProgress: 62,
  bonusBalance: 2480,
  ordersTotal: 14,
  favoritesTotal: 7,
};

export const ACCOUNT_ORDERS = [
  {
    id: 'SP-2026-0148',
    date: '12 ноября 2026',
    status: 'delivered',
    statusLabel: 'Доставлен',
    total: 9380,
    items: ['Лампа Aurora Desk', 'Блокнот Grid Notes'],
  },
  {
    id: 'SP-2026-0117',
    date: '28 октября 2026',
    status: 'shipping',
    statusLabel: 'В пути',
    total: 8490,
    items: ['Клавиатура Slim Keys'],
  },
  {
    id: 'SP-2026-0093',
    date: '3 октября 2026',
    status: 'processing',
    statusLabel: 'Собирается',
    total: 12780,
    items: ['Наушники Echo Studio', 'Таймер Focus Cube'],
  },
  {
    id: 'SP-2025-0871',
    date: '19 декабря 2025',
    status: 'delivered',
    statusLabel: 'Доставлен',
    total: 3080,
    items: ['Книга «Живая типографика»', 'Коврик Desk Pad'],
  },
];

// Адреса доставки.
export const ACCOUNT_ADDRESSES = [
  { id: 1, title: 'Дом', text: 'Москва, ул. Лесная, 8, кв. 24', isDefault: true },
  { id: 2, title: 'Офис', text: 'Москва, Большая Новодмитровская, 36, офис 212', isDefault: false },
];

// Баллы бонусной программы.
export const ACCOUNT_POINTS_HISTORY = [
  { id: 1, date: '12 ноября', title: 'Заказ SP-2026-0148', points: '+938' },
  { id: 2, date: '3 ноября', title: 'Отзыв на клавиатуру Slim Keys', points: '+150' },
  { id: 3, date: '28 октября', title: 'Заказ SP-2026-0117', points: '+849' },
  { id: 4, date: '14 октября', title: 'Списание при оплате', points: '−400' },
  { id: 5, date: '3 октября', title: 'Заказ SP-2026-0093', points: '+1278' },
];

// Уведомления кабинета.
export const ACCOUNT_NOTIFICATIONS = [
  { id: 1, title: 'Заказ в пути', text: 'Курьер доставит клавиатуру Slim Keys 20 ноября.', unread: true },
  { id: 2, title: 'Новые баллы', text: 'Начислено 150 баллов за отзыв.', unread: true },
  { id: 3, title: 'Скидка на комплект', text: 'Соберите рабочий набор со скидкой 10% до конца ноября.', unread: false },
];
