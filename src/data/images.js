import { IMAGE_WIDTHS } from './image-widths.js';

// Статические фотографии Vite копирует из public/images в сборку.
// Используем тот же корень, что и React Router, в том числе на вложенных страницах.
export const IMAGE_DIR = 'images';
const appBase = (import.meta.env?.VITE_APP_BASE || '/').replace(/\/+$/, '');
export const PUBLIC_IMAGE_BASE = `${appBase}/${IMAGE_DIR}`;

export const PRODUCT_IMAGE_FILES = {
  'aurora-desk-lamp': ['aurora-desk-lamp.jpg', 'aurora-desk-lamp-2.jpg'],
  'focus-timer': ['focus-timer.jpg'],
  'notebook-grid': ['notebook-grid.jpg'],
  'stand-lift': ['stand-lift.jpg'],
  'headphones-echo': ['headphones-echo.jpg'],
  'webcam-frame': ['webcam-frame.jpg'],
  'keyboard-slim': ['keyboard-slim.jpg'],
  'book-typography': ['book-typography.jpg'],
  'desk-pad': ['desk-pad.jpg'],
  'pen-roll': ['pen-roll.jpg'],
  'cable-clips': ['cable-clips.jpg'],
  'candle-focus': ['candle-focus.jpg'],
  'speaker-mini': ['speaker-mini.jpg'],
  'lamp-pen': ['lamp-pen.jpg'],
  'stand-phone': ['stand-phone.jpg'],
  'mug-keep': ['mug-keep.webp'],
  'planner-week': ['planner-week.jpg'],
  'lamp-book': ['lamp-book.jpg'],
};

// У каждого ракурса своё описание. Варианты srcSet показывают тот же кадр.
const PRODUCT_IMAGE_ALTS = {
  'aurora-desk-lamp.jpg': 'Чёрная лампа с двумя шарнирами и круглым основанием освещает блокноты и вазу с сухими ветками на белом столе.',
  'aurora-desk-lamp-2.jpg': 'Чёрная лампа сбоку на белом фоне: цилиндрический плафон наклонён вниз, от круглого основания вправо тянется провод.',
  'focus-timer.jpg': 'Квадратный таймер в деревянном корпусе стоит на стопке книг. На белом циферблате с минутной шкалой выделен красный сектор.',
  'notebook-grid.jpg': 'Раскрытый блокнот со светлыми страницами в мелкую точку. Справа по диагонали лежит тёмная ручка.',
  'stand-lift.jpg': 'Серебристая складная подставка поднимает раскрытый ноутбук над деревянным столом. Рядом показана вторая подставка без ноутбука.',
  'headphones-echo.jpg': 'Чёрные полноразмерные наушники с мягкими амбушюрами лежат на светлом столе между белой клавиатурой и мышью. Вид сверху.',
  'webcam-frame.jpg': 'Чёрная прямоугольная веб-камера закреплена на верхней кромке монитора. Объектив смотрит прямо вперёд.',
  'keyboard-slim.jpg': 'Тонкая белая клавиатура с низкими клавишами и цифровым блоком справа на белом фоне. Вид сверху.',
  'book-typography.jpg': 'Рука держит раскрытую книгу о типографике. На развороте видны образцы шрифтов и красно-белая иллюстрация с рукописной надписью.',
  'desk-pad.jpg': 'На сером прямоугольном коврике с закруглёнными углами стоят раскрытый ноутбук и белая мышь. Слева лежат ручка и белые наушники.',
  'pen-roll.jpg': 'Развёрнутый коричневый пенал с красной подкладкой. В узких карманах лежат карандаши, справа виден небольшой блокнот.',
  'cable-clips.jpg': 'Ряд светло-коричневых зажимов на деревянной планке удерживает кабели. Разъёмы лежат на столе перед зажимами.',
  'candle-focus.jpg': 'Светлая свеча с плоским деревянным фитилём в невысокой крапчатой чаше. Фитиль не зажжён.',
  'speaker-mini.jpg': 'Чёрная цилиндрическая колонка с круглой решёткой сверху, кнопками у основания и тканевой петлёй сбоку.',
  'lamp-pen.jpg': 'Чёрная лампа с длинным узким плафоном и гибкой ножкой закреплена зажимом на краю деревянного стола. Под ней открыт ноутбук.',
  'stand-phone.jpg': 'На деревянной подставке с тёмным наклонным основанием закреплена круглая зарядная площадка. Провод проходит через выемку под ней.',
  'mug-keep.webp': 'Серый стакан без ручки с белой крышкой и широким белым ободком посередине. Снят чуть сверху на белом фоне.',
  'planner-week.jpg': 'Раскрытый недельный планер с колонками для дней лежит на деревянном столе. На правой половине по диагонали лежит бордовая ручка.',
  'lamp-book.jpg': 'Чёрная лампа для чтения зажата на раскрытой книге. Узкий светильник на гибкой ножке расположен горизонтально над страницами.',
};

export const HERO_IMAGE = {
  src: `${PUBLIC_IMAGE_BASE}/hero.jpg`,
  alt: 'Деревянный стол у окна со светлыми шторами. На полке стоят монитор и белая настольная лампа, под полкой лежит клавиатура.',
};

export const STUDIO_IMAGE = {
  src: `${PUBLIC_IMAGE_BASE}/studio.jpg`,
  alt: 'Длинный стол со светлыми стульями вдоль панорамных окон. На столе открыт ноутбук, слева стоит высокое растение, за окнами видны здания.',
};

export function getProductImageAlt(src) {
  return PRODUCT_IMAGE_ALTS[src?.split('/').at(-1)] ?? '';
}

export function getImageSrcSet(src) {
  const file = src?.split('/').at(-1);
  const widths = IMAGE_WIDTHS[file];
  if (!widths) return undefined;

  const variantBase = src.slice(0, src.lastIndexOf('.'));
  return widths.map((width) => {
    const url = width === widths.at(-1) ? src : `${variantBase}-${width}.webp`;
    return `${url} ${width}w`;
  }).join(', ');
}

export function getProductImage(productId, index = 0) {
  const file = PRODUCT_IMAGE_FILES[productId]?.[index];
  return file ? `${PUBLIC_IMAGE_BASE}/${file}` : null;
}

export function getProductGallery(productId) {
  return (PRODUCT_IMAGE_FILES[productId] ?? []).map(file => `${PUBLIC_IMAGE_BASE}/${file}`);
}

export default PRODUCT_IMAGE_FILES;
