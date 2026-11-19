import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { CONTACT_CHANNELS, CONTACT_FAQ } from '../data/contacts.js';

function ContactsPage() {
  return (
    <>
      <PageMeta
        title="Контакты — ShopProject"
        description="Контакты ShopProject: телефон, e-mail, адрес шоурума в Москве, часы работы и чат с консультантом."
      />

      <Breadcrumbs current="Контакты" />

      <section className="page-hero page-hero--compact">
        <Reveal className="page-hero__content">
          <span className="page-hero__eyebrow">На связи каждый день</span>
          <h1 className="page-hero__title">Контакты</h1>
          <p className="page-hero__text">
            Ответим в чате за минуту, позвоним в течение 15 минут в рабочее время или встретим
            в шоуруме. Выбирайте удобный способ.
          </p>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="channels-title">
        <h2 className="visually-hidden" id="channels-title">
          Способы связи
        </h2>

        <ul className="contact-grid">
          {CONTACT_CHANNELS.map((channel, index) => (
            <Reveal as="li" className="contact-card" key={channel.label} delay={index * 70}>
              <span className="contact-card__icon">
                <Icon name={channel.icon} size={22} />
              </span>
              <span className="contact-card__label">{channel.label}</span>
              {channel.href ? (
                <a className="contact-card__value" href={channel.href}>
                  {channel.value}
                </a>
              ) : (
                <span className="contact-card__value">{channel.value}</span>
              )}
              <span className="contact-card__note">{channel.note}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section section--surface" id="showroom" aria-labelledby="showroom-title">
        <SectionHeading
          eyebrow="Шоурум"
          title="Посмотрите вещи вживую"
          text="Москва, Большая Новодмитровская, 36. Второй этаж, вход со стороны двора."
          id="showroom-title"
        />

        <div className="showroom-layout">
          <Reveal className="showroom-map" variant="scale">
            <span className="showroom-map__pin">
              <Icon name="pin" size={22} />
            </span>
            <span className="showroom-map__grid" aria-hidden="true" />
            <span className="showroom-map__caption">Схема проезда · 5 минут от метро «Дмитровская»</span>
          </Reveal>

          <Reveal className="showroom-info" delay={100}>
            <h3 className="showroom-info__title">Часы работы</h3>
            <ul className="showroom-info__hours">
              <li>
                <span>Пн–Пт</span>
                <strong>10:00 – 21:00</strong>
              </li>
              <li>
                <span>Сб–Вс</span>
                <strong>11:00 – 20:00</strong>
              </li>
              <li>
                <span>Самовывоз</span>
                <strong>до 20:00</strong>
              </li>
            </ul>

            <p className="showroom-info__text">
              Хотите протестировать технику перед покупкой — напишите в чат, подготовим всё
              к вашему приезду.
            </p>

            <Link className="button button--primary" to="/order">
              Записаться на визит
              <Icon name="arrowRight" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="feedback" aria-labelledby="feedback-title">
        <SectionHeading
          eyebrow="FAQ"
          title="Вопросы о визите и связи"
          id="feedback-title"
        />

        <div className="faq-list">
          {CONTACT_FAQ.map((item, index) => (
            <Reveal delay={index * 60} key={item.question}>
              <details className="faq-item">
                <summary className="faq-item__question">
                  {item.question}
                  <Icon name="plus" size={18} className="faq-item__icon" />
                </summary>
                <p className="faq-item__answer">{item.answer.join(' ')}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="section cta">
        <div className="cta__inner">
          <div className="cta__copy">
            <h2 className="cta__title">Не нашли нужный ответ?</h2>
            <p className="cta__text">
              Напишите в чат — консультант на связи с 10:00 до 20:00 и ответит за минуту.
            </p>
          </div>
          <Link className="button button--primary" to="/order">
            Оставить заявку
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

export default ContactsPage;
