// Набор SVG-иконок интерфейса (24×24, stroke). Используются в шапке, карточках,
// преимуществах и кабинете. Все иконки декоративные: aria-hidden + focusable="false".
const ICONS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 13.4A8.5 8.5 0 1 1 10.6 3a7 7 0 0 0 10.4 10.4z" />,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.4 12 20 12 20z" />,
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11h10.2L20 7H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 5 5L19 7" />,
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />,
  spark: (
    <>
      <path d="M12 3l1.9 4.9L19 9.8l-5.1 1.9L12 16.6l-1.9-4.9L5 9.8l5.1-1.9z" />
      <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  return: <><path d="M4 12V6h8" /><path d="M4 12h13a4 4 0 0 1 0 8h-3" /></>,
  lamp: (
    <>
      <path d="M8 4h8l4 8H4z" />
      <path d="M12 12v7M8 20h8" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v6H5.5A1.5 1.5 0 0 1 4 18.5zM20 14h-3v6h1.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </>
  ),
  book: (
    <>
      <path d="M5 4h9a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4 4z" />
      <path d="M5 4v16" />
    </>
  ),
  desk: <><path d="M3 9h18M5 9v10M19 9v10" /><path d="M7 9V6h10v3" /></>,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6z" />,
  pin: <><path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></>,
  phone: <path d="M7 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.2 2 2 0 0 1 7 3z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  star: <path d="m12 4 2.4 5.1 5.6.7-4.1 3.8 1 5.5-4.9-2.7-4.9 2.7 1-5.5L4 9.8l5.6-.7z" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  box: <><path d="M12 3 4 7v10l8 4 8-4V7z" /><path d="m4 7 8 4 8-4M12 11v10" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" /></>,
  logout: <><path d="M14 4h5v16h-5" /><path d="M11 12H4M7 8l-4 4 4 4" /></>,
  edit: <><path d="M5 19h14" /><path d="M15 5l4 4-9 9H6v-4z" /></>,
  send: <path d="M4 12 20 4l-6 16-3-6z" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  vk: (
    <path fill="currentColor" stroke="none" d="M13.1 18C6.2 18 2.3 13.3 2.1 5.5h3.5c.1 5.7 2.6 8.1 4.5 8.6V5.5h3.3v4.9c1.9-.2 3.9-2.4 4.6-4.9h3.3c-.5 3-2.7 5.2-4.3 6.1 1.6.7 4.1 2.6 5 6.4h-3.6c-.7-2.4-2.5-4.3-5-4.5V18z" />
  ),
  telegram: (
    <path fill="currentColor" stroke="none" d="M21.7 4.2 18.8 20c-.2 1-1 1.2-1.8.7l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.3L6.2 13.2l-5-1.6c-1.1-.3-1.1-1.1.2-1.6l19.3-7.4c.8-.3 1.4.2 1 1.6z" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path fill="currentColor" stroke="none" d="m10 8.8 5.5 3.2-5.5 3.2z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  gift: <><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M4 13h16M12 9v11M9 9a2.5 2.5 0 1 1 3-2.5A2.5 2.5 0 1 1 15 9" /></>,
  info: <><circle cx="12" cy="12" r="8" /><path d="M12 11v5M12 8v.5" /></>,
  eye: <><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  rocket: <><path d="M14 4c3 1 5 3 6 6-3 5-7 8-11 9l-2-2c1-4 4-8 7-13z" /><circle cx="14.5" cy="9.5" r="1.6" /><path d="M7 17l-3 3" /></>,
};

export function Icon({ name, size = 20, className = '', strokeWidth = 1.7, filled = false }) {
  const shape = ICONS[name];

  if (!shape) return null;

  return (
    <svg
      className={`icon${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  );
}

export default Icon;
