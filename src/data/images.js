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

export const HERO_IMAGE = {
  src: `${PUBLIC_IMAGE_BASE}/hero.jpg`,
  alt: 'Деревянный стол у окна с монитором и белой настольной лампой',
};

export const STUDIO_IMAGE = {
  src: `${PUBLIC_IMAGE_BASE}/studio.jpg`,
  alt: 'Длинный рабочий стол с ноутбуком и растениями у панорамных окон',
};

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
