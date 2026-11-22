import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { CATALOG_PRODUCTS, formatPrice } from '../data/catalog.js';
import {
  ACCOUNT_ADDRESSES,
  ACCOUNT_NOTIFICATIONS,
  ACCOUNT_ORDERS,
  ACCOUNT_POINTS_HISTORY,
  ACCOUNT_USER,
} from '../data/contacts.js';

// Вкладки личного кабинета. id совпадает с hash в адресе (#orders).
const TABS = [
  { id: 'overview', label: 'Обзор', icon: 'grid' },
  { id: 'orders', label: 'Заказы', icon: 'box' },
  { id: 'favorites', label: 'Избранное', icon: 'heart' },
  { id: 'points', label: 'Баллы', icon: 'gift' },
  { id: 'settings', label: 'Настройки', icon: 'settings' },
];

function AccountPage() {
  const { hash } = useLocation();
  const { favorites, toggleFavorite } = useFavorites();
  const { notify } = useToast();
  const { preference, setTheme } = useTheme();
  const [tab, setTab] = useState('overview');
  const [notificationsOn, setNotificationsOn] = useState(true);

  // Вкладка синхронизирована с hash: /account#favorites открывает избранное.
  useEffect(() => {
    const next = hash.replace('#', '');
    if (TABS.some((item) => item.id === next)) setTab(next);
  }, [hash]);

  const favoriteProducts = CATALOG_PRODUCTS.filter((product) => favorites.includes(product.id));
  const unread = ACCOUNT_NOTIFICATIONS.filter((item) => item.unread).length;

  const handleToggleFavorite = (product) => {
    const added = toggleFavorite(product.id);
    notify({
      title: added ? 'Добавлено в избранное' : 'Удалено из избранного',
      text: product.title,
      tone: added ? 'success' : 'default',
    });
  };

  const handleDemoAction = (title) => {
    notify({ title, text: 'Демонстрационный режим: действие недоступно.', tone: 'default' });
  };

  return (
    <>
      <PageMeta
        title="Личный кабинет — ShopProject"
        description="Личный кабинет ShopProject: заказы, бонусные баллы, избранное, адреса доставки и настройки профиля."
      />

      <Breadcrumbs current="Личный кабинет" />

      <section className="account-hero">
        <Reveal className="account-profile">
          <span className="account-profile__avatar" aria-hidden="true">
            {ACCOUNT_USER.initials}
          </span>
          <div className="account-profile__body">
            <h1 className="account-profile__name">{ACCOUNT_USER.name}</h1>
            <p className="account-profile__membership">
              Клиент с {ACCOUNT_USER.memberSince}, уровень {ACCOUNT_USER.level}
            </p>
            <p className="account-profile__contacts">
              <span>{ACCOUNT_USER.email}</span>
              <span>{ACCOUNT_USER.phone}</span>
            </p>

            <div className="level-bar">
              <span className="level-bar__track">
                <span
                  className="level-bar__fill"
                  style={{ width: `${ACCOUNT_USER.levelProgress}%` }}
                />
              </span>
              <span className="level-bar__hint">
                {ACCOUNT_USER.pointsToNext} баллов до уровня {ACCOUNT_USER.nextLevel}
              </span>
            </div>
          </div>

          <button
            className="button button--ghost button--sm account-profile__edit"
            type="button"
            onClick={() => handleDemoAction('Редактирование профиля')}
          >
            <Icon name="edit" size={16} />
            Редактировать
          </button>
        </Reveal>

        <ul className="account-metrics">
          <Reveal as="li" className="account-metric">
            <span className="account-metric__label">Баллы</span>
            <span className="account-metric__value">{ACCOUNT_USER.points}</span>
            <span className="account-metric__note">1 балл = 1 ₽</span>
          </Reveal>
          <Reveal as="li" className="account-metric">
            <span className="account-metric__label">Заказы</span>
            <span className="account-metric__value">{ACCOUNT_USER.ordersTotal}</span>
            <span className="account-metric__note">за всё время</span>
          </Reveal>
          <Reveal as="li" className="account-metric">
            <span className="account-metric__label">Избранное</span>
            <span className="account-metric__value">{favorites.length}</span>
            <span className="account-metric__note">товаров</span>
          </Reveal>
          <Reveal as="li" className="account-metric">
            <span className="account-metric__label">Уведомления</span>
            <span className="account-metric__value">{unread}</span>
            <span className="account-metric__note">новых</span>
          </Reveal>
        </ul>
      </section>

      <section className="account-layout">
        <nav className="account-tabs" aria-label="Разделы кабинета">
          <ul className="account-tabs__list">
            {TABS.map((item) => (
              <li key={item.id}>
                <button
                  className={
                    tab === item.id
                      ? 'account-tabs__item account-tabs__item--active'
                      : 'account-tabs__item'
                  }
                  type="button"
                  aria-pressed={tab === item.id}
                  onClick={() => setTab(item.id)}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="account-tabs__help">
            <Icon name="chat" size={18} />
            <p>Вопросы по заказам принимаем в чате.</p>
          </div>
        </nav>

        <div className="account-content">
          {tab === 'overview' && (
            <div className="account-grid">
              <Reveal className="account-card account-card--wide">
                <header className="account-card__head">
                  <h2 className="account-card__title">Последние заказы</h2>
                  <Link className="account-card__link" to="/account#orders">
                    Все заказы
                  </Link>
                </header>

                {ACCOUNT_ORDERS.slice(0, 2).map((order) => (
                  <article className="order-row" key={order.id}>
                    <span className={`order-row__status order-row__status--${order.status}`}>
                      {order.statusLabel}
                    </span>
                    <span className="order-row__body">
                      <span className="order-row__id">{order.id}</span>
                      <span className="order-row__items">{order.items.join(', ')}</span>
                    </span>
                    <span className="order-row__meta">
                      <span>{order.date}</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </span>
                  </article>
                ))}
              </Reveal>

              <Reveal className="account-card">
                <header className="account-card__head">
                  <h2 className="account-card__title">Уведомления</h2>
                </header>
                <ul className="notice-list">
                  {ACCOUNT_NOTIFICATIONS.map((item) => (
                    <li
                      className={
                        item.unread ? 'notice-list__item notice-list__item--unread' : 'notice-list__item'
                      }
                      key={item.id}
                    >
                      <span className="notice-list__title">{item.title}</span>
                      <span className="notice-list__text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="account-card">
                <header className="account-card__head">
                  <h2 className="account-card__title">Адреса доставки</h2>
                </header>
                <ul className="address-list">
                  {ACCOUNT_ADDRESSES.map((address) => (
                    <li className="address-list__item" key={address.id}>
                      <span className="address-list__icon">
                        <Icon name="pin" size={16} />
                      </span>
                      <span className="address-list__body">
                        <strong>{address.title}</strong>
                        <span>{address.text}</span>
                      </span>
                      {address.isDefault && (
                        <span className="address-list__badge">по умолчанию</span>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  className="button button--ghost button--block button--sm"
                  type="button"
                  onClick={() => handleDemoAction('Добавление адреса')}
                >
                  <Icon name="plus" size={16} />
                  Добавить адрес
                </button>
              </Reveal>
            </div>
          )}

          {tab === 'orders' && (
            <div className="account-card">
              <header className="account-card__head">
                <h2 className="account-card__title">История заказов</h2>
                <span className="account-card__hint">{ACCOUNT_ORDERS.length} заказа за год</span>
              </header>

              <ul className="orders-list">
                {ACCOUNT_ORDERS.map((order) => (
                  <li className="orders-list__item" key={order.id}>
                    <div className="orders-list__head">
                      <span className="order-row__id">{order.id}</span>
                      <span className={`order-row__status order-row__status--${order.status}`}>
                        {order.statusLabel}
                      </span>
                      <span className="orders-list__total">{formatPrice(order.total)}</span>
                    </div>
                    <p className="orders-list__items">{order.items.join(', ')}</p>
                    <div className="orders-list__footer">
                      <span className="orders-list__date">{order.date}</span>
                      <button
                        className="button button--ghost button--sm"
                        type="button"
                        onClick={() => handleDemoAction('Повтор заказа')}
                      >
                        Повторить заказ
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'favorites' && (
            <div className="account-card" id="favorites-panel">
              <header className="account-card__head">
                <h2 className="account-card__title">Избранное</h2>
                <span className="account-card__hint">{favoriteProducts.length} товаров</span>
              </header>

              {favoriteProducts.length > 0 ? (
                <div className="products-grid products-grid--compact">
                  {favoriteProducts.map((product) => (
                    <div className="account-favorite" key={product.id}>
                      <ProductCard product={product} />
                      <button
                        className="account-favorite__remove"
                        type="button"
                        onClick={() => handleToggleFavorite(product)}
                      >
                        <Icon name="close" size={14} />
                        Убрать из избранного
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state__icon">
                    <Icon name="heart" size={26} />
                  </span>
                  <h3 className="empty-state__title">Пока пусто</h3>
                  <p className="empty-state__text">
                    Нажмите на сердце в карточке товара, чтобы добавить его в избранное.
                  </p>
                  <Link className="button button--primary" to="/catalog">
                    Перейти в каталог
                  </Link>
                </div>
              )}
            </div>
          )}

          {tab === 'points' && (
            <div className="account-grid">
              <div className="account-card account-card--balance">
                <span className="account-card__label">Бонусный баланс</span>
                <span className="account-card__balance">
                  {formatPrice(ACCOUNT_USER.bonusBalance)}
                </span>
                <p className="account-card__text">
                  Баллы начисляются за покупки и отзывы, списываются при оплате следующего заказа.
                </p>
                <button
                  className="button button--primary button--sm"
                  type="button"
                  onClick={() => handleDemoAction('Списание баллов')}
                >
                  Потратить баллы
                </button>
              </div>

              <div className="account-card">
                <header className="account-card__head">
                  <h2 className="account-card__title">История баллов</h2>
                </header>
                <ul className="points-list">
                  {ACCOUNT_POINTS_HISTORY.map((item) => (
                    <li className="points-list__item" key={item.id}>
                      <span className="points-list__date">{item.date}</span>
                      <span className="points-list__title">{item.title}</span>
                      <span
                        className={
                          item.points.startsWith('+')
                            ? 'points-list__value points-list__value--plus'
                            : 'points-list__value'
                        }
                      >
                        {item.points}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="account-card">
              <header className="account-card__head">
                <h2 className="account-card__title">Настройки профиля</h2>
              </header>

              <div className="settings-list">
                <div className="settings-row">
                  <span className="settings-row__body">
                    <strong>Тема оформления</strong>
                    <span>Светлая, тёмная или как в системе</span>
                  </span>
                  <div className="segmented" role="group" aria-label="Тема оформления">
                    {[
                      { value: 'light', label: 'Светлая' },
                      { value: 'dark', label: 'Тёмная' },
                      { value: 'system', label: 'Системная' },
                    ].map((option) => (
                      <button
                        className={
                          preference === option.value
                            ? 'segmented__item segmented__item--active'
                            : 'segmented__item'
                        }
                        type="button"
                        key={option.value}
                        aria-pressed={preference === option.value}
                        onClick={() => setTheme(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-row">
                  <span className="settings-row__body">
                    <strong>Уведомления</strong>
                    <span>Напоминания о заказах и бонусах</span>
                  </span>
                  <label className="switch">
                    <input
                      className="switch__input"
                      type="checkbox"
                      checked={notificationsOn}
                      onChange={(event) => setNotificationsOn(event.target.checked)}
                    />
                    <span className="switch__track" aria-hidden="true" />
                    <span className="visually-hidden">Уведомления о заказах</span>
                  </label>
                </div>

                <div className="settings-row">
                  <span className="settings-row__body">
                    <strong>E-mail</strong>
                    <span>{ACCOUNT_USER.email}</span>
                  </span>
                  <button
                    className="button button--ghost button--sm"
                    type="button"
                    onClick={() => handleDemoAction('Изменение e-mail')}
                  >
                    Изменить
                  </button>
                </div>

                <div className="settings-row">
                  <span className="settings-row__body">
                    <strong>Пароль</strong>
                    <span>Последнее изменение в августе 2026 года</span>
                  </span>
                  <button
                    className="button button--ghost button--sm"
                    type="button"
                    onClick={() => handleDemoAction('Смена пароля')}
                  >
                    Сменить
                  </button>
                </div>
              </div>

              <button
                className="button button--ghost button--block"
                type="button"
                onClick={() => handleDemoAction('Выход из аккаунта')}
              >
                <Icon name="logout" size={16} />
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AccountPage;
