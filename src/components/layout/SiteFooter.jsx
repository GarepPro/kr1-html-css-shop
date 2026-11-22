import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { CATEGORIES } from '../../data/catalog.js';

// Колонки ссылок подвала: разделы сайта и категории каталога.
const FOOTER_LINKS = [
  {
    title: 'Магазин',
    links: [
      { to: '/catalog', label: 'Каталог' },
      { to: '/product/aurora-desk-lamp', label: 'Лампа Aurora Desk' },
      { to: '/product/keyboard-slim', label: 'Клавиатура Slim Keys' },
      { to: '/cart', label: 'Корзина и заявка' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { to: '/about', label: 'О бренде' },
      { to: '/about#team', label: 'Команда' },
      { to: '/contacts', label: 'Контакты' },
      { to: '/account', label: 'Личный кабинет' },
    ],
  },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" to="/">
              <span className="site-footer__logo-mark" aria-hidden="true">
                S
              </span>
              ShopProject
            </Link>
            <p className="site-footer__tagline">
              Предметы для рабочего места, которые мы выбираем и тестируем сами.
            </p>

            <div className="site-footer__contacts">
              <a className="site-footer__contact" href="tel:+74951234567">
                <Icon name="phone" size={16} />
                +7 (495) 123-45-67
              </a>
              <span className="site-footer__contact">
                <Icon name="clock" size={16} />
                Ежедневно с 10:00 до 20:00
              </span>
              <a className="site-footer__contact" href="mailto:hello@shopproject.ru">
                <Icon name="mail" size={16} />
                hello@shopproject.ru
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((column) => (
            <nav className="site-footer__column" key={column.title} aria-label={column.title}>
              <h2 className="site-footer__title">{column.title}</h2>
              <ul className="site-footer__list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link className="site-footer__link" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav className="site-footer__column" aria-label="Категории">
            <h2 className="site-footer__title">Категории</h2>
            <ul className="site-footer__list">
              {CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link className="site-footer__link" to={`/catalog?category=${category.slug}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 ShopProject. Все права защищены.</p>
          <p className="site-footer__meta">Москва, Большая Новодмитровская, 36</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;

