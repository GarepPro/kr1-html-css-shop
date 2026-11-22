import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Rating from './Rating.jsx';
import ProductImage from './ProductImage.jsx';
import { BADGES, formatPrice, getProductStatus } from '../../data/catalog.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
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

  // Товар попадает в корзину, после чего можно сразу уйти к оформлению.
  const handleAddToCart = () => {
    addItem(product.id, 1);

    notify({
      title: 'Товар в корзине',
      text: `${product.title}, ${formatPrice(product.price)}`,
      tone: 'success',
      action: { to: '/cart', label: 'Перейти в корзину' },
    });
  };

  return (
    <article className="product-card">
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

        <Link className="product-card__photo-link" to={`/product/${product.id}`}>
          <ProductImage product={product} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 46vw, 380px" />
        </Link>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <Rating value={product.rating} size={13} showValue reviews={product.reviews} />
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
              {getProductStatus(product)}
            </span>
          </p>

          <div className="product-card__actions">
            <button
              className="button button--primary button--sm"
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <Icon name="cart" size={16} />
              В корзину
            </button>
            <Link className="product-card__details" to={`/product/${product.id}`}>
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

