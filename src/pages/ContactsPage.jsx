import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import {
  CONTACT_CHANNELS,
  CONTACT_FAQ,
  SHOWROOM_POINTS,
} from '../data/contacts.js';

function ContactsPage() {
  const { openChat } = useOutletContext();
  const [selected, setSelected] = useState(SHOWROOM_POINTS[0]);
  const query = new URLSearchParams({ mode: 'search', text: selected.address, z: '16' });

  return (
    <>
      <PageMeta
        title="Контакты — ShopProject"
        description="Контакты ShopProject: телефон, e-mail, адрес шоурума в Москве, часы работы и чат с консультантом."
      />

      <Breadcrumbs current="Контакты" />

      <section className="page-hero page-hero--compact">
        <Reveal className="page-hero__content">
          <h1 className="page-hero__title">Контакты</h1>
          <p className="page-hero__text">
            Поможем выбрать вещь, уточнить наличие в шоуруме и договориться о самовывозе.
          </p>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="channels-title">
        <h2 className="visually-hidden" id="channels-title">
          Способы связи
        </h2>

        <ul className="contact-grid">
          {CONTACT_CHANNELS.map((channel) => (
            <Reveal as="li" className="contact-card" key={channel.label}>
              <span className="contact-card__icon">
                <Icon name={channel.icon} size={22} />
              </span>
              <span className="contact-card__label">{channel.label}</span>
              {channel.href ? (
                <a className="contact-card__value" href={channel.href}>
                  {channel.value}
                </a>
              ) : (
                <button className="contact-card__value" type="button" onClick={openChat}>{channel.value}</button>
              )}
              <span className="contact-card__note">{channel.note}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section section--surface" id="showroom" aria-labelledby="showroom-title">
        <SectionHeading
          title="Шоурум и самовывоз"
          text="Коллекцию можно посмотреть в Москве, а заказ забрать в Химках или Мытищах."
          id="showroom-title"
        />

        <div className="showroom-layout">
          <div className="showroom-info">
            <h3 className="showroom-info__title">Выберите адрес на карте</h3>
            <ul className="showroom-points">
              {SHOWROOM_POINTS.map((point) => (
                <li key={point.id}>
                  <button
                    className="showroom-point"
                    type="button"
                    aria-pressed={selected.id === point.id}
                    aria-controls="showroom-map"
                    onClick={() => setSelected(point)}
                  >
                    <Icon name="pin" size={20} />
                    <span className="showroom-point__body">
                      <strong className="showroom-point__title">{point.title}</strong>
                      <span>{point.address}</span>
                      <span>{point.note}</span>
                      <span className="showroom-point__hours">{point.hours}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="showroom-map" id="showroom-map">
              <iframe
                className="showroom-map__frame"
                src={`https://yandex.ru/map-widget/v1/?${query}`}
                width="540" height="540"
                title={`Яндекс Карты — ${selected.title}`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a className="showroom-map__link" href={`https://yandex.ru/maps/?${query}`} target="_blank" rel="noreferrer">
              {selected.title} в Яндекс Картах
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="visit-title">
        <SectionHeading title="Перед поездкой" id="visit-title" />
        <div className="visit-guide">
          <div>
            <h3>Если выбираете в шоуруме</h3>
            <p>Напишите, какие модели хотите сравнить. Подготовим их к визиту, чтобы вы могли проверить свет лампы, ход клавиш или посадку наушников.</p>
            <button type="button" className="visit-guide__action" onClick={openChat}>Уточнить наличие в чате</button>
          </div>
          <div>
            <h3>Если забираете заказ</h3>
            <p>При оформлении укажите удобный пункт в комментарии. Дождитесь подтверждения от менеджера и сохраните номер заказа. При получении можно проверить комплектность и внешний вид.</p>
          </div>
        </div>
      </section>

      <section className="section" id="feedback" aria-labelledby="feedback-title">
        <SectionHeading
          title="Вопросы о визите и связи"
          id="feedback-title"
        />

        <div className="faq-list">
          {CONTACT_FAQ.map((item) => (
            <Reveal key={item.question}>
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

    </>
  );
}

export default ContactsPage;
