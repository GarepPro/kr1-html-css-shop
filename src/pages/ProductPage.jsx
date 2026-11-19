import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Rating from '../components/product/Rating.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import {
  BADGES,
  CATALOG_PRODUCTS,
  formatPrice,
  getCategoryLabel,
  getProductById,
  getRelatedProducts,
} from '../data/catalog.js';
import {
  DEFAULT_REVIEWS,
  PRODUCT_BENEFITS,
  PRODUCT_REVIEWS,
  RATING_BREAKDOWN,
} from '../data/product.js';

// На старом адресе /product открывается первый товар каталога.
const DEFAULT_PRODUCT_ID = CATALOG_PRODUCTS[0].id;

function ProductPage() {
  const { id } = useParams();
  const productId = id ?? DEFAULT_PRODUCT_ID;
  const product = getProductById(productId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { notify } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  if (!product) {
    return (
      <>
        <PageMeta title="Товар не найден — ShopProject" description="Товар не найден в каталоге." />
        <section className="section">
          <h1 className="page-hero__title">Товар не найден</h1>
          <p className="page-hero__text">
            Возможно, он снят с продажи. Посмотрите другие позиции в каталоге.
          </p>
          <Link className="button button--primary" to="/catalog">
            Перейти в каталог
          </Link>
        </section>
      </>
    );
  }

  const badge = product.badge ? BADGES[product.badge] : null;
  const favorite = isFavorite(product.id);
  const reviews = PRODUCT_REVIEWS[product.id] ?? DEFAULT_REVIEWS;
  const related = getRelatedProducts(product, 3);
  const inStock = product.stock > 0;
  const total = formatPrice(product.price * quantity);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const handleFavorite = () => {
    const added = toggleFavorite(product.id);
    notify({
      title: added ? 'Добавлено в избранное' : 'Удалено из избранного',
      text: product.title,
      tone: added ? 'success' : 'default',
    });
  };

  const handleNotify = () => {
    notify({
      title: 'Мы сообщим о поступлении',
      text: `Уведомление о «${product.title}» придёт на e-mail из профиля.`,
      tone: 'default',
    });
  };

  return (
    <>
      <PageMeta
        title={`${product.title} — ShopProject`}
        description={`${product.tagline}. ${product.description}`}
      />

      <Breadcrumbs trail={[{ to: '/catalog', label: 'Каталог' }]} current={product.title} />

      <article className="product-detail">
        <Reveal className="product-detail__gallery">
          <div className={`product-detail__media product-detail__media--${product.accent}`}>
            {badge && <span className={`badge ${badge.modifier}`}>{badge.label}</span>}
            <span className="product-detail__monogram" aria-hidden="true">
              {product.title.slice(0, 1)}
            </span>
            <span className="product-detail__media-caption">
              ShopProject · {getCategoryLabel(product.category)}
            </span>
          </div>

          <ul className="product-detail__thumbs" aria-label="Дополнительные изображения">
            {['front', 'side', 'detail'].map((view) => (
              <li key={view}>
                <span
                  className={`product-detail__thumb product-detail__thumb--${product.accent}`}
                  aria-hidden="true"
                >
                  <Icon name="eye" size={16} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="product-detail__info" delay={100}>
          <div className="product-detail__meta">
            <Link
              className="product-detail__category"
              to={`/catalog?category=${product.category}`}
            >
              {getCategoryLabel(product.category)}
            </Link>
            <Rating value={product.rating} size={15} showValue reviews={product.reviews} />
          </div>

          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-detail__tagline">{product.tagline}</p>
          <p className="product-detail__description">{product.description}</p>

          <ul className="product-detail__features">
            {product.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={16} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="buy-box">
            <div className="buy-box__prices">
              <span className="buy-box__price">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="buy-box__old-price">{formatPrice(product.oldPrice)}</span>
                  <span className="buy-box__discount">−{discount}%</span>
                </>
              )}
            </div>

            <p className={inStock ? 'buy-box__stock' : 'buy-box__stock buy-box__stock--out'}>
              <Icon name={inStock ? 'check' : 'info'} size={16} />
              {inStock ? `В наличии · ${product.stock} шт.` : 'Нет в наличии'}
            </p>

            <div className="buy-box__controls">
              <div className="quantity" role="group" aria-label="Количество">
                <button
                  className="quantity__button"
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  aria-label="Уменьшить количество"
                >
                  <Icon name="minus" size={16} />
                </button>
                <span className="quantity__value" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="quantity__button"
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}
                  disabled={quantity >= 9}
                  aria-label="Увеличить количество"
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>

              <Link className="button button--primary buy-box__submit" to="/order">
                Оформить заявку · {total}
              </Link>

              <button
                className={favorite ? 'icon-button icon-button--active' : 'icon-button'}
                type="button"
                onClick={handleFavorite}
                aria-pressed={favorite}
                aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <Icon name="heart" size={19} filled={favorite} />
              </button>
            </div>

            {!inStock && (
              <button
                className="button button--ghost button--block"
                type="button"
                onClick={handleNotify}
              >
                <Icon name="bell" size={16} />
                Уведомить о наличии
              </button>
            )}
          </div>

          <ul className="product-benefits">
            {PRODUCT_BENEFITS.map((benefit) => (
              <li className="product-benefits__item" key={benefit.title}>
                <Icon name={benefit.icon} size={18} />
                <span>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </article>

      <section className="section" id="specs" aria-labelledby="specs-title">
        <SectionHeading
          eyebrow="Характеристики"
          title="Технические детали"
          text="Полные параметры товара — без размытых формулировок."
          id="specs-title"
        />

        <div className="spec-layout">
          <Reveal>
            <table className="product-table">
              <caption className="product-table__caption">
                Основные параметры «{product.title}»
              </caption>
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.name}>
                    <th scope="row">{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="delivery-card" delay={100}>
            <span className="delivery-card__icon">
              <Icon name="truck" size={22} />
            </span>
            <h3 className="delivery-card__title">Доставка и оплата</h3>
            <p className="delivery-card__text">{product.delivery}</p>
            <ul className="delivery-card__list">
              <li>
                <Icon name="check" size={15} />
                Бесплатно от 3 000 ₽ по Москве
              </li>
              <li>
                <Icon name="check" size={15} />
                Оплата при получении или картой
              </li>
              <li>
                <Icon name="check" size={15} />
                Самовывоз со склада за 2 часа
              </li>
            </ul>
            <Link className="button button--ghost button--block" to="/contacts">
              Условия доставки
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="reviews" aria-labelledby="reviews-title">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят покупатели"
          text={`${product.reviews} отзывов, средняя оценка ${String(product.rating).replace('.', ',')} из 5.`}
          id="reviews-title"
        />

        <div className="reviews-layout">
          <Reveal className="rating-summary">
            <span className="rating-summary__value">{String(product.rating).replace('.', ',')}</span>
            <Rating value={product.rating} size={18} />
            <span className="rating-summary__count">{product.reviews} отзывов</span>

            <ul className="rating-summary__bars">
              {RATING_BREAKDOWN.map((row) => (
                <li className="rating-summary__row" key={row.stars}>
                  <span className="rating-summary__star">{row.stars}</span>
                  <span className="rating-summary__bar">
                    <span style={{ width: `${row.percent}%` }} />
                  </span>
                  <span className="rating-summary__percent">{row.percent}%</span>
                </li>
              ))}
            </ul>

            <Link className="button button--primary button--block" to="/order">
              Написать отзыв
            </Link>
          </Reveal>

          <div className="reviews-list">
            {reviews.map((review, index) => (
              <Reveal as="article" className="review" key={review.id} delay={index * 60}>
                <header className="review__header">
                  <span className="review__avatar" aria-hidden="true">
                    {review.author.slice(0, 1)}
                  </span>
                  <span className="review__meta">
                    <span className="review__author">{review.author}</span>
                    <span className="review__date">{review.date}</span>
                  </span>
                  <Rating value={review.rating} size={13} />
                </header>
                <p className="review__text">{review.text}</p>
                {(review.pros || review.cons) && (
                  <ul className="review__pros-cons">
                    {review.pros && (
                      <li className="review__pros">
                        <span>Плюсы:</span> {review.pros}
                      </li>
                    )}
                    {review.cons && (
                      <li className="review__cons">
                        <span>Минусы:</span> {review.cons}
                      </li>
                    )}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="related" aria-labelledby="related-title">
        <SectionHeading
          eyebrow="С этим покупают"
          title="Похожие товары"
          link={{ to: '/catalog', label: 'Весь каталог' }}
          id="related-title"
        />

        <div className="products-grid">
          {related.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <ProductCard product={item} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductPage;
