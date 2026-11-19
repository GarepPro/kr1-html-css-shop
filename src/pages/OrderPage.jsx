import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import OrderForm from '../components/order/OrderForm.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { getProductById, formatPrice } from '../data/catalog.js';

// Шаги оформления: подсказывают, что происходит после отправки формы.
const ORDER_STEPS = [
  { icon: 'edit', title: 'Заполните форму', text: 'Имя, телефон и что нужно заказать.' },
  { icon: 'phone', title: 'Перезвоним', text: 'Подтвердим наличие и детали в течение 15 минут.' },
  { icon: 'truck', title: 'Доставим', text: 'Согласуем удобное время и способ получения.' },
];

// Демо-товар для блока «Ваш заказ»: используется, если перешли по ссылке из категории.
const SAMPLE_PRODUCT = getProductById('aurora-desk-lamp');

function OrderPage() {
  const [step, setStep] = useState(1);

  return (
    <>
      <PageMeta
        title="Оформить заявку — ShopProject"
        description="Оформление заявки в ShopProject: доставка, консультация или возврат. Перезвоним в течение 15 минут."
      />

      <Breadcrumbs current="Оформить заявку" />

      <section className="page-hero page-hero--compact">
        <Reveal className="page-hero__content">
          <span className="page-hero__eyebrow">Шаг 1 из 2 · контактные данные</span>
          <h1 className="page-hero__title">Оформление заявки</h1>
          <p className="page-hero__text">
            Заполните форму — менеджер свяжется с вами, подтвердит наличие и предложит
            удобное время доставки. Поля со звёздочкой обязательны.
          </p>

          <ol className="order-steps" aria-label="Этапы оформления">
            {ORDER_STEPS.map((item) => (
              <li className="order-steps__item" key={item.title}>
                <span className="order-steps__icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <span className="order-steps__body">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="order-layout">
        <Reveal className="order-panel">
          <div className="order-panel__head">
            <h2 className="order-panel__title">Данные заявки</h2>
            <div className="order-panel__progress" aria-hidden="true">
              <span className={step >= 1 ? 'order-panel__dot order-panel__dot--done' : 'order-panel__dot'} />
              <span className="order-panel__line" />
              <span className={step >= 2 ? 'order-panel__dot order-panel__dot--done' : 'order-panel__dot'} />
            </div>
          </div>

          <OrderForm variant="page" onSuccess={() => setStep(2)} />

          {step === 2 && (
            <p className="order-panel__sent">
              <Icon name="check" size={16} />
              Заявка принята: менеджер свяжется с вами в течение 15 минут в рабочее время.
            </p>
          )}
        </Reveal>

        <Reveal className="order-aside" delay={100}>
          <div className="order-summary">
            <h2 className="order-summary__title">Ваш заказ</h2>
            {SAMPLE_PRODUCT && (
              <div className="order-summary__item">
                <span
                  className={`order-summary__thumb order-summary__thumb--${SAMPLE_PRODUCT.accent}`}
                  aria-hidden="true"
                >
                  {SAMPLE_PRODUCT.title.slice(0, 1)}
                </span>
                <span className="order-summary__body">
                  <span className="order-summary__name">{SAMPLE_PRODUCT.title}</span>
                  <span className="order-summary__meta">1 шт. · в наличии</span>
                </span>
                <span className="order-summary__price">{formatPrice(SAMPLE_PRODUCT.price)}</span>
              </div>
            )}

            <dl className="order-summary__rows">
              <div>
                <dt>Товары</dt>
                <dd>{formatPrice(SAMPLE_PRODUCT?.price ?? 0)}</dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>Бесплатно</dd>
              </div>
              <div className="order-summary__total">
                <dt>Итого</dt>
                <dd>{formatPrice(SAMPLE_PRODUCT?.price ?? 0)}</dd>
              </div>
            </dl>

            <Link className="order-summary__edit" to="/catalog">
              Изменить состав заказа
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>

          <div className="order-help">
            <h2 className="order-help__title">Нужна помощь?</h2>
            <p className="order-help__text">
              Позвоните или напишите в чат — консультант поможет выбрать и оформить заявку.
            </p>
            <a className="order-help__link" href="tel:+74951234567">
              <Icon name="phone" size={16} />
              +7 (495) 123-45-67
            </a>
            <a className="order-help__link" href="mailto:hello@shopproject.ru">
              <Icon name="mail" size={16} />
              hello@shopproject.ru
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default OrderPage;
