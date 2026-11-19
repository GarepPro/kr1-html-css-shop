import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import OrderDialog from '../components/order/OrderDialog.jsx';
import Icon from '../components/ui/Icon.jsx';
import Rating from '../components/product/Rating.jsx';
import { Reveal, Counter } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { formatPrice } from '../data/catalog.js';
import {
  ADVANTAGES,
  CTA,
  EDITOR_PICK,
  FAQ,
  HERO,
  HERO_STATS,
  HOME_CATEGORIES,
  HOME_REVIEWS,
  POPULAR_PRODUCTS,
  STEPS,
} from '../data/home.js';

// Ответ FAQ — массив строк и ссылок: { link: { to, label } }.
function renderAnswer(parts) {
  return parts.map((part, index) =>
    typeof part === 'string' ? (
      part
    ) : (
      <Link key={index} to={part.link.to}>
        {part.link.label}
      </Link>
    ),
  );
}

function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Клик по «Заказать» в карточке: запоминаем товар и открываем модалку.
  const handleOrder = (product) => {
    setSelectedProduct(product.title);
    setDialogOpen(true);
  };

  const chips = HOME_CATEGORIES.filter((category) => HERO.chips.includes(category.slug));

  return (
    <>
      <PageMeta
        title="ShopProject — предметы для ясной работы"
        description="ShopProject: лампы, клавиатуры, блокноты и аудио для рабочего места. Доставка за 1–2 дня, гарантия до 5 лет, возврат 60 дней."
      />

      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__inner">
          <Reveal className="hero__content">
            <span className="hero__eyebrow">{HERO.eyebrow}</span>
            <h1 className="hero__title">{HERO.title}</h1>
            <p className="hero__text">{HERO.text}</p>

            <div className="hero__actions">
              <Link className="button button--primary" to={HERO.primaryAction.to}>
                {HERO.primaryAction.label}
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link className="button button--ghost" to={HERO.secondaryAction.to}>
                {HERO.secondaryAction.label}
              </Link>
            </div>

            <ul className="hero__chips" aria-label="Популярные категории">
              {chips.map((category) => (
                <li key={category.slug}>
                  <Link className="hero__chip" to={`/catalog?category=${category.slug}`}>
                    <Icon name={category.icon} size={15} />
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="hero__visual" delay={120} variant="scale">
            <div className="hero__showcase">
              <article className="hero__card hero__card--main">
                <span className="hero__card-badge">Выбор редакции</span>
                <span className="hero__card-media" aria-hidden="true">
                  {EDITOR_PICK?.title.slice(0, 1)}
                </span>
                <h2 className="hero__card-title">{EDITOR_PICK?.title}</h2>
                <p className="hero__card-text">{EDITOR_PICK?.tagline}</p>
                <span className="hero__card-price">{formatPrice(EDITOR_PICK?.price ?? 0)}</span>
              </article>

              <article className="hero__card hero__card--float">
                <Rating value={4.8} size={13} />
                <p className="hero__card-text">«Тихий свет, который не устаёт»</p>
                <span className="hero__card-author">Ксения, дизайнер</span>
              </article>

              <div className="hero__orb" aria-hidden="true" />
            </div>
          </Reveal>
        </div>

        <Reveal className="hero__stats" delay={200}>
          {HERO_STATS.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
            />
          ))}
        </Reveal>
      </section>

      <section className="section" id="categories" aria-labelledby="categories-title">
        <SectionHeading
          eyebrow="Коллекция"
          title="Выберите свою категорию"
          text="Шесть направлений — от освещения до печатных изданий. В каждой категории только проверенные позиции."
          link={{ to: '/catalog', label: 'Весь каталог' }}
          id="categories-title"
        />

        <ul className="category-grid">
          {HOME_CATEGORIES.map((category, index) => (
            <Reveal as="li" className="category-tile" key={category.slug} delay={index * 60}>
              <Link className="category-tile__link" to={`/catalog?category=${category.slug}`}>
                <span className="category-tile__icon">
                  <Icon name={category.icon} size={24} />
                </span>
                <span className="category-tile__label">{category.label}</span>
                <span className="category-tile__count">{category.count} товара</span>
                <Icon name="arrowRight" size={18} className="category-tile__arrow" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        className="section section--surface"
        id="advantages"
        aria-labelledby="advantages-title"
      >
        <SectionHeading
          eyebrow="Почему мы"
          title="Сервис, который не приходится просить"
          id="advantages-title"
        />

        <ul className="advantages-list">
          {ADVANTAGES.map((advantage, index) => (
            <Reveal as="li" className="advantage" key={advantage.title} delay={index * 70}>
              <span className="advantage__icon">
                <Icon name={advantage.icon} size={22} />
              </span>
              <h3 className="advantage__title">{advantage.title}</h3>
              <p className="advantage__text">{advantage.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section" id="how" aria-labelledby="how-title">
        <SectionHeading eyebrow="Как это работает" title="Три шага до нового стола" id="how-title" />

        <ol className="steps">
          {STEPS.map((step, index) => (
            <Reveal as="li" className="step" key={step.step} delay={index * 80}>
              <span className="step__number">{step.step}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" id="popular" aria-labelledby="popular-title">
        <SectionHeading
          eyebrow="Хиты сезона"
          title="Популярные товары"
          text="Позиции, которые чаще всего добавляют в заказ."
          link={{ to: '/catalog', label: 'Все товары' }}
          id="popular-title"
        />

        <div className="products-grid">
          {POPULAR_PRODUCTS.map((product, index) => (
            <Reveal key={product.id} delay={index * 60}>
              <ProductCard product={product} index={index} onOrder={handleOrder} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="reviews" aria-labelledby="reviews-title">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят покупатели"
          text="Средняя оценка 4,8 из 5 по итогам 1 240 отзывов за год."
          id="reviews-title"
        />

        <ul className="review-grid">
          {HOME_REVIEWS.map((review, index) => (
            <Reveal as="li" className="review-card" key={review.id} delay={index * 70}>
              <Rating value={review.rating} size={14} />
              <p className="review-card__text">«{review.text}»</p>
              <footer className="review-card__author">
                <span className="review-card__avatar" aria-hidden="true">
                  {review.author.slice(0, 1)}
                </span>
                <span>
                  <strong className="review-card__name">{review.author}</strong>
                  <span className="review-card__role">{review.role}</span>
                </span>
              </footer>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title">
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          text="Если не нашли ответ — напишите в чат, консультант на связи."
          id="faq-title"
        />

        <div className="faq-list">
          {FAQ.map((item, index) => (
            <Reveal delay={index * 50} key={item.question}>
              <details className="faq-item">
                <summary className="faq-item__question">
                  {item.question}
                  <Icon name="plus" size={18} className="faq-item__icon" />
                </summary>
                <p className="faq-item__answer">{renderAnswer(item.answer)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="section cta">
        <div className="cta__inner">
          <div className="cta__copy">
            <h2 className="cta__title">{CTA.title}</h2>
            <p className="cta__text">{CTA.text}</p>
          </div>
          <Link className="button button--primary" to={CTA.action.to}>
            {CTA.action.label}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </Reveal>

      <OrderDialog
        open={dialogOpen}
        productName={selectedProduct}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

export default HomePage;

