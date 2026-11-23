import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import SearchDialog from '../search/SearchDialog.jsx';
import { ScrollProgress } from './ScrollProgress.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useScrollState } from '../../hooks/useReveal.js';
import { hotkeys, useHotkey, useScrollLock } from '../../hooks/useHotkey.js';

// Основная навигация: только отдельные страницы, без якорных ссылок.
export const PAGES = [
  { to: '/', label: 'Главная', end: true },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О бренде' },
  { to: '/contacts', label: 'Контакты' },
];

const navLinkClass = ({ isActive }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link';

function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { y } = useScrollState();
  const { resolved, toggleTheme } = useTheme();
  const { count } = useFavorites();
  const { count: cartCount } = useCart();
  const location = useLocation();

  // Ctrl/Cmd+K открывает поиск на любой странице.
  useHotkey(hotkeys.search, () => setSearchOpen(true));
  useScrollLock(menuOpen);

  // Мобильное меню закрывается при переходе между страницами.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass = [
    'site-header',
    y > 8 ? 'site-header--scrolled' : '',
    menuOpen ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="site-header__inner">
          <Link className="site-header__logo" to="/">
            <span className="site-header__logo-mark" aria-hidden="true">
              С
            </span>
            <span className="site-header__logo-text">
              Стол <span>и дело</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Основная навигация">
            <ul className="site-nav__list">
              {PAGES.map((page) => (
                <li className="site-nav__item" key={page.to}>
                  <NavLink className={navLinkClass} end={page.end} to={page.to}>
                    {page.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <button
              className="icon-button site-header__search"
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Открыть поиск по сайту"
            >
              <Icon name="search" size={19} />
              <span className="site-header__search-hint">Поиск</span>
              <kbd className="site-header__kbd">⌘K</kbd>
            </button>

            <button
              className="icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={resolved === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              title={resolved === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            >
              <Icon name={resolved === 'dark' ? 'sun' : 'moon'} size={19} />
            </button>

            <Link
              className="icon-button"
              to="/account#favorites"
              aria-label={`Избранное: ${count}`}
              title="Избранное"
            >
              <Icon name="heart" size={19} />
              {count > 0 && <span className="icon-button__badge">{count}</span>}
            </Link>

            <Link
              className="site-header__cart"
              to="/cart"
              aria-label={`Корзина: ${cartCount}`}
              title="Корзина"
            >
              <Icon name="cart" size={19} />
              {cartCount > 0 && <span className="icon-button__badge">{cartCount}</span>}
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'site-header__account site-header__account--active'
                  : 'site-header__account'
              }
              to="/account"
            >
              <Icon name="user" size={18} />
              <span className="site-header__account-label">Кабинет</span>
            </NavLink>

            <button
              className="icon-button site-header__burger"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={21} />
            </button>
          </div>
        </div>

        <ScrollProgress />
      </header>

      {/* Мобильное меню: те же страницы в виде крупных строк. */}
      <div
        className={menuOpen ? 'mobile-menu mobile-menu--open' : 'mobile-menu'}
        id="mobile-menu"
        hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
          <ul className="mobile-menu__list">
            {PAGES.map((page) => (
              <li key={page.to}>
                <NavLink className={navLinkClass} end={page.end} to={page.to}>
                  {page.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink className={navLinkClass} to="/account">
                Личный кабинет
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/cart">
                Корзина{cartCount > 0 ? ` (${cartCount})` : ''}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <a className="mobile-menu__phone" href="tel:+74951234567">
            +7 (495) 123-45-67
          </a>
          <span className="mobile-menu__note">Ежедневно с 10:00 до 20:00</span>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default SiteHeader;

