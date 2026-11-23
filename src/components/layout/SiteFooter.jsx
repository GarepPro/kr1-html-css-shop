import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { SHOWROOM_POINTS, SUPPORT_EMAIL, SUPPORT_PHONE } from '../../data/contacts.js';

const FOOTER_LINKS = [
  {
    title: 'Магазин',
    links: [
      { to: '/about', label: 'О бренде' },
      { to: '/contacts', label: 'Контакты' },
      { to: '/about#team', label: 'Команда' },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { to: '/account', label: 'Личный кабинет' },
      { to: '/catalog', label: 'Каталог' },
      { to: '/cart', label: 'Корзина' },
      { to: '/cart#request', label: 'Заявка' },
    ],
  },
];

const SOCIAL_NETWORKS = [
  { icon: 'vk', label: 'ВКонтакте' },
  { icon: 'telegram', label: 'Telegram' },
  { icon: 'youtube', label: 'YouTube' },
  { icon: 'instagram', label: 'Instagram' },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" to="/">
              <span className="site-footer__logo-mark" aria-hidden="true">
                С
              </span>
              Стол и дело
            </Link>
            <p className="site-footer__tagline">
              Предметы для рабочего места, которые мы выбираем и тестируем сами.
            </p>
            <div className="site-footer__socials" role="group" aria-label="Социальные сети">
              {SOCIAL_NETWORKS.map(({ icon, label }) => (
                <button className="icon-button" key={icon} type="button" aria-label={label} disabled>
                  <Icon name={icon} size={18} />
                </button>
              ))}
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

          <section className="site-footer__column" aria-labelledby="footer-contacts-title">
            <h2 className="site-footer__title" id="footer-contacts-title">Контакты</h2>
            <div className="site-footer__contacts">
              <Link className="site-footer__contact" to="/contacts#showroom">
                <Icon name="pin" size={16} />
                {SHOWROOM_POINTS[0].address}
              </Link>
              <a className="site-footer__contact" href={SUPPORT_PHONE.href}>
                <Icon name="phone" size={16} />
                {SUPPORT_PHONE.value}
              </a>
              <span className="site-footer__contact">
                <Icon name="clock" size={16} />
                {SUPPORT_PHONE.note}
              </span>
              <a className="site-footer__contact" href={SUPPORT_EMAIL.href}>
                <Icon name="mail" size={16} />
                {SUPPORT_EMAIL.value}
              </a>
            </div>
          </section>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 «Стол и дело». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;

