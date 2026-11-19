import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Rating from './Rating.jsx';
import { BADGES, formatPrice } from '../../data/catalog.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Карточка товара (БЭМ-блок product-card).
// Пропсы:
// - product: товар из data/catalog.js;
// - index: позиция в сетке для каскадной задержки появления;
// - onOrder: если передан, вместо ссылки на каталог показывается кнопка заказа.
export function ProductCard({ product, index = 0, onOrder }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { notify } = useToast();
  const badge = product.badge ? BADGES[product.badge] : null;
  const favorite = isFavorite(product.id);
  const inStock = product.stock > 0;

  const handleFavorite = () => {
    const added = toggleFavorite(product.id);

    notify({
      title: added ? 'Добавлено в избранное' : 'Удалено из избранного',
      text: product.title,
      tone: added ? 'success' : 'default',
    });
  };

  return (
    <article
      className="product-card"
      style={{ '--reveal-delay': `${Math.min(index, 8) * 70}ms` }}
    >
      <div className={`product-card__media product-card__media--${product.accent}`}>
        {badge && <span className={`badge ${badge.modifier}`}>{badge.label}</span>}

        <button
          className={`product-card__favorite${favorite ? ' product-card__favorite--active' : ''}`}
          type="button"
          onClick={handleFavorite}
          aria-pressed={favorite}
          aria-label={
            favorite ? `Убрать «${product.title}» из избранного` : `Добавить «${product.title}» в избранное`
          }
        >
          <Icon name="heart" size={18} filled={favorite} />
        </button>

        {/* Визуальная заглушка товара: градиент + монограмма категории. */}
        <span className="product-card__monogram" aria-hidden="true">
          {product.title.slice(0, 1)}
        </span>
      </div>

      <div className="product-card__body">
        <Rating value={product.rating} size={13} showValue reviews={product.reviews} />

        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-card__description">{product.tagline}</p>

        <div className="product-card__footer">
          <p className="product-card__prices">
            <span className="product-card__price">
              {product.oldPrice && (
                <span className="product-card__old-price">{formatPrice(product.oldPrice)}</span>
              )}
              {formatPrice(product.price)}
            </span>
            <span
              className={
                inStock ? 'product-card__stock' : 'product-card__stock product-card__stock--out'
              }
            >
              {inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </p>

          {onOrder ? (
            <button
              className="button button--primary button--sm"
              type="button"
              onClick={() => onOrder(product)}
            >
              Заказать
            </button>
          ) : (
            <Link className="button button--secondary button--sm" to={`/product/${product.id}`}>
              Подробнее
              <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

