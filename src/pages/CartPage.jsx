import { Link } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import OrderForm from '../components/order/OrderForm.jsx';
import ProductImage from '../components/product/ProductImage.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../data/catalog.js';
import { DELIVERY_PRICE, FREE_DELIVERY_FROM } from '../data/home.js';

function CartPage() {
  const { lines, count, subtotal, setQty, removeItem, clearCart } = useCart();
  const { notify } = useToast();

  const delivery = subtotal >= FREE_DELIVERY_FROM || subtotal === 0 ? 0 : DELIVERY_PRICE;
  const total = subtotal + delivery;

  const handleRemove = (line) => {
    removeItem(line.id);
    notify({
      title: 'Товар удалён из корзины',
      text: line.product.title,
      tone: 'default',
    });
  };

  const handleClear = () => {
    clearCart();
    notify({ title: 'Корзина очищена', text: 'Добавьте товары из каталога.', tone: 'default' });
  };

  return (
    <>
      <PageMeta
        title="Корзина и оформление — ShopProject"
        description="Корзина ShopProject: товары, количество, стоимость доставки и форма заявки."
      />

      <Breadcrumbs current="Корзина" />

      <section className="page-hero page-hero--compact">
        <Reveal className="page-hero__content">
          <h1 className="page-hero__title">Корзина и заявка</h1>
          <p className="page-hero__text">
            Проверьте товары и итоговую стоимость, затем заполните заявку. Поля со звёздочкой обязательны.
          </p>
        </Reveal>
      </section>

      <section className="order-layout cart-layout">
        <Reveal className="order-panel">
          <div className="order-panel__head">
            <h2 className="order-panel__title">
              {lines.length > 0 ? 'Ваш заказ' : 'Данные заявки'}
            </h2>
          </div>

          {lines.length > 0 ? (
            <>
              <ul className="cart-list">
                {lines.map((line) => (
                  <Reveal as="li" className="cart-line" key={line.id}>
                    <Link className="cart-line__media" to={`/product/${line.product.id}`}>
                      <ProductImage product={line.product} sizes="96px" />
                    </Link>

                    <div className="cart-line__body">
                      <Link className="cart-line__title" to={`/product/${line.product.id}`}>
                        {line.product.title}
                      </Link>
                      <span className="cart-line__meta">
                        {formatPrice(line.product.price)}, в наличии {line.product.stock} шт.
                      </span>

                      <div className="cart-line__controls">
                        <div
                          className="quantity"
                          role="group"
                          aria-label={`Количество «${line.product.title}»`}
                        >
                          <button
                            className="quantity__button"
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            disabled={line.qty <= 1}
                            aria-label="Уменьшить количество"
                          >
                            <Icon name="minus" size={16} />
                          </button>
                          <span className="quantity__value" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            className="quantity__button"
                            type="button"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            disabled={line.qty >= Math.min(line.product.stock, 99)}
                            aria-label="Увеличить количество"
                          >
                            <Icon name="plus" size={16} />
                          </button>
                        </div>

                        <button
                          className="cart-line__remove"
                          type="button"
                          onClick={() => handleRemove(line)}
                        >
                          <Icon name="close" size={14} />
                          Удалить
                        </button>
                      </div>
                    </div>

                    <span className="cart-line__price">{formatPrice(line.total)}</span>
                  </Reveal>
                ))}
              </ul>

              <div className="cart-list__footer">
                <Link className="cart-list__more" to="/catalog">
                  <Icon name="arrowLeft" size={16} />
                  Добавить ещё товары
                </Link>
                <button className="cart-list__clear" type="button" onClick={handleClear}>
                  Очистить корзину
                </button>
              </div>
            </>
          ) : (
            <div className="cart-empty">
              <span className="cart-empty__icon">
                <Icon name="cart" size={26} />
              </span>
              <p className="cart-empty__title">В корзине пока ничего нет</p>
              <p className="cart-empty__text">
                Добавьте товары из каталога, чтобы оформить их одной заявкой.
              </p>
              <Link className="button button--primary" to="/catalog">
                Перейти в каталог
              </Link>
            </div>
          )}

          <h3 className="cart-form__title">
            <Icon name="edit" size={18} />
            Контактные данные
          </h3>

          <OrderForm orderLines={lines} />
        </Reveal>

        <Reveal className="order-aside">
          <div className="order-summary">
            <h2 className="order-summary__title">Итого</h2>

            <dl className="order-summary__rows">
              <div>
                <dt>Товары ({count})</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</dd>
              </div>
              <div className="order-summary__total">
                <dt>Итого</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <p className="order-summary__note">
              {delivery === 0
                ? 'Бесплатная доставка по Москве за один или два дня.'
                : `До бесплатной доставки осталось ${formatPrice(FREE_DELIVERY_FROM - subtotal)}.`}
            </p>

            <Link className="order-summary__edit" to="/catalog">
              Изменить состав заказа
            </Link>
          </div>

          <div className="order-help">
            <h2 className="order-help__title">Нужна помощь?</h2>
            <p className="order-help__text">
              Позвоните или напишите в чат, если нужна помощь с заказом.
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

export default CartPage;
