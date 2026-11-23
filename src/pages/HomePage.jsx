import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import Rating from '../components/product/Rating.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { HERO_IMAGE, getImageSrcSet, getProductImage, getProductImageAlt } from '../data/images.js';
import {
  ADVANTAGES,
  CTA,
  FAQ,
  HERO,
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
  return (
    <>
      <PageMeta
        title="Стол и дело — предметы для рабочего стола"
        description="Стол и дело: лампы, клавиатуры, блокноты и аудио для рабочего места. Доставка за 1–2 дня, гарантия до 5 лет, возврат 60 дней."
      />

      <section className="hero">
        <div className="hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">{HERO.title}</h1>
            <p className="hero__text">{HERO.text}</p>
            <div className="hero__actions">
              <Link className="button button--primary" to={HERO.primaryAction.to}>
                {HERO.primaryAction.label}
              </Link>
              <Link className="hero__studio-link" to="/contacts#showroom">Посетить шоурум</Link>
            </div>
          </div>
          <img className="hero__photo" src={HERO_IMAGE.src} srcSet={getImageSrcSet(HERO_IMAGE.src)} sizes="(max-width: 760px) calc(100vw - 32px), 560px" alt={HERO_IMAGE.alt} fetchPriority="high" />
        </div>
      </section>

      <section className="section" id="categories" aria-labelledby="categories-title">
        <SectionHeading
          title="Категории"
          link={{ to: '/catalog', label: 'Весь каталог' }}
          id="categories-title"
        />

        <ul className="category-grid">
          {HOME_CATEGORIES.map((category) => (
            <Reveal as="li" className="category-tile" key={category.slug}>
              <Link className="category-tile__link" to={`/catalog?category=${category.slug}`}>
                <img className="category-tile__photo" src={getProductImage(category.cover)} srcSet={getImageSrcSet(getProductImage(category.cover))} sizes="(max-width: 480px) 45vw, (max-width: 1080px) 30vw, 200px" alt={getProductImageAlt(getProductImage(category.cover))} loading="lazy" />
                <span className="category-tile__label">{category.label}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section" id="popular" aria-labelledby="popular-title">
        <SectionHeading
          title="Популярные товары"
          link={{ to: '/catalog', label: 'Все товары' }}
          id="popular-title"
        />

        <div className="products-grid">
          {POPULAR_PRODUCTS.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="section section--surface"
        id="advantages"
        aria-labelledby="advantages-title"
      >
        <SectionHeading
          title="Доставка и обслуживание"
          id="advantages-title"
        />

        <ul className="advantages-list">
          {ADVANTAGES.map((advantage) => (
            <Reveal as="li" className="advantage" key={advantage.title}>
              <span className="advantage__icon">
                <Icon name={advantage.icon} size={33} />
              </span>
              <h3 className="advantage__title">{advantage.title}</h3>
              <p className="advantage__text">{advantage.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section" id="how" aria-labelledby="how-title">
        <SectionHeading title="Как оформить заказ" id="how-title" />

        <ol className="steps">
          {STEPS.map((step) => (
            <Reveal as="li" className="step" key={step.step}>
              <span className="step__number" aria-hidden="true">{step.step}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" id="reviews" aria-labelledby="reviews-title">
        <SectionHeading
          title="Отзывы покупателей"
          text="Средняя оценка 4,8 из 5 по итогам 1 240 отзывов за год."
          id="reviews-title"
        />

        <ul className="review-grid">
          {HOME_REVIEWS.map((review) => (
            <Reveal as="li" className="review-card" key={review.id}>
              <Rating value={review.rating} size={14} />
              <p className="review-card__text">«{review.text}»</p>
              <footer className="review-card__author">
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
          title="Частые вопросы"
          id="faq-title"
        />

        <div className="faq-list">
          {FAQ.map((item) => (
            <Reveal key={item.question}>
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
          <Link className="button button--ghost" to={CTA.action.to}>
            {CTA.action.label}
          </Link>
        </div>
      </Reveal>
    </>
  );
}

export default HomePage;

