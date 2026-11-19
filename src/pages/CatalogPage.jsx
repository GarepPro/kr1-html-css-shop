import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageMeta from '../components/layout/PageMeta.jsx';
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import {
  BADGE_OPTIONS,
  CATALOG_PRODUCTS,
  CATEGORIES,
  SORT_OPTIONS,
  formatPrice,
  sortProducts,
} from '../data/catalog.js';

// Границы цены для подсказок в фильтре.
const PRICE_MIN = 0;
const PRICE_MAX = 15000;

function CatalogPage() {
  // Категория хранится в адресе (?category=light), чтобы плитки категорий
  // на главной и ссылки подвала сразу открывали нужный раздел.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'all';

  const [query, setQuery] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [badge, setBadge] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const from = Number(priceFrom) || PRICE_MIN;
    const to = Number(priceTo) || PRICE_MAX;

    const filtered = CATALOG_PRODUCTS.filter((product) => {
      const categoryMatches = activeCategory === 'all' || product.category === activeCategory;
      const priceMatches = product.price >= from && product.price <= to;
      const badgeMatches = badge === 'all' || product.badge === badge;
      const stockMatches = !inStockOnly || product.stock > 0;
      const queryMatches =
        !normalizedQuery ||
        `${product.title} ${product.tagline} ${product.description}`
          .toLowerCase()
          .includes(normalizedQuery);

      return categoryMatches && priceMatches && badgeMatches && stockMatches && queryMatches;
    });

    return sortProducts(filtered, sort);
  }, [activeCategory, query, priceFrom, priceTo, badge, inStockOnly, sort]);

  const hasActiveFilters =
    activeCategory !== 'all' ||
    badge !== 'all' ||
    inStockOnly ||
    query.trim() !== '' ||
    priceFrom !== '' ||
    priceTo !== '';

  const selectCategory = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const resetFilters = () => {
    setSearchParams({});
    setQuery('');
    setPriceFrom('');
    setPriceTo('');
    setBadge('all');
    setInStockOnly(false);
    setSort('popular');
  };

  const categoryLabel = CATEGORIES.find((category) => category.slug === activeCategory)?.label;
  const title = activeCategory === 'all' ? 'Каталог товаров' : categoryLabel ?? 'Каталог товаров';

  return (
    <>
      <PageMeta
        title={`${title} — ShopProject`}
        description="Каталог ShopProject: фильтры по категории, цене и наличию, сортировка и карточки товаров с рейтингом."
      />

      <Breadcrumbs current={title} />

      <section className="page-hero">
        <Reveal className="page-hero__content">
          <span className="page-hero__eyebrow">{CATALOG_PRODUCTS.length} товаров в наличии</span>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__text">
            Проверенные предметы для рабочего места: лампы, клавиатуры, блокноты и аудио.
            Фильтруйте по цене и наличию, сравнивайте рейтинги.
          </p>
        </Reveal>

        <Reveal className="page-hero__aside" delay={100}>
          <span className="page-hero__aside-icon">
            <Icon name="truck" size={22} />
          </span>
          <span className="page-hero__aside-body">
            <strong>Бесплатная доставка</strong>
            <span>по Москве от 3 000 ₽</span>
          </span>
        </Reveal>
      </section>

      <section className="catalog-layout" aria-label="Список товаров">
        <aside className={filtersOpen ? 'catalog-filters catalog-filters--open' : 'catalog-filters'}>
          <div className="catalog-filters__head">
            <h2 className="catalog-filters__title">
              <Icon name="filter" size={18} />
              Фильтры
            </h2>
            <button
              className="catalog-filters__close"
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Свернуть фильтры"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <label className="field">
            <span className="field__label">Поиск по каталогу</span>
            <span className="field__control">
              <Icon name="search" size={16} className="field__icon" />
              <input
                className="field__input field__input--icon"
                type="search"
                value={query}
                placeholder="Например, лампа"
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>

          <fieldset className="filter-group">
            <legend className="filter-group__legend">Категория</legend>
            <ul className="filter-list">
              <li>
                <button
                  className={
                    activeCategory === 'all'
                      ? 'filter-list__item filter-list__item--active'
                      : 'filter-list__item'
                  }
                  type="button"
                  aria-pressed={activeCategory === 'all'}
                  onClick={() => selectCategory('all')}
                >
                  Все товары
                  <span className="filter-list__count">{CATALOG_PRODUCTS.length}</span>
                </button>
              </li>
              {CATEGORIES.map((category) => {
                const count = CATALOG_PRODUCTS.filter(
                  (product) => product.category === category.slug,
                ).length;

                return (
                  <li key={category.slug}>
                    <button
                      className={
                        activeCategory === category.slug
                          ? 'filter-list__item filter-list__item--active'
                          : 'filter-list__item'
                      }
                      type="button"
                      aria-pressed={activeCategory === category.slug}
                      onClick={() => selectCategory(category.slug)}
                    >
                      {category.label}
                      <span className="filter-list__count">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <fieldset className="filter-group">
            <legend className="filter-group__legend">Цена, ₽</legend>
            <div className="filter-range">
              <input
                className="field__input"
                type="number"
                min={PRICE_MIN}
                placeholder={String(PRICE_MIN)}
                value={priceFrom}
                aria-label="Цена от"
                onChange={(event) => setPriceFrom(event.target.value)}
              />
              <span className="filter-range__dash" aria-hidden="true">
                —
              </span>
              <input
                className="field__input"
                type="number"
                min={PRICE_MIN}
                placeholder={String(PRICE_MAX)}
                value={priceTo}
                aria-label="Цена до"
                onChange={(event) => setPriceTo(event.target.value)}
              />
            </div>
            <p className="filter-group__hint">
              От {formatPrice(PRICE_MIN)} до {formatPrice(PRICE_MAX)}
            </p>
          </fieldset>

          <fieldset className="filter-group">
            <legend className="filter-group__legend">Метка</legend>
            <div className="filter-chips">
              {BADGE_OPTIONS.map((option) => (
                <button
                  className={
                    badge === option.value
                      ? 'filter-chips__item filter-chips__item--active'
                      : 'filter-chips__item'
                  }
                  type="button"
                  key={option.value}
                  aria-pressed={badge === option.value}
                  onClick={() => setBadge(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="switch">
            <input
              className="switch__input"
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
            />
            <span className="switch__track" aria-hidden="true" />
            <span className="switch__label">Только в наличии</span>
          </label>

          <button
            className="button button--ghost button--block"
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
          >
            Сбросить фильтры
          </button>
        </aside>

        <div className="catalog-products">
          <div className="catalog-toolbar">
            <p className="catalog-toolbar__count">
              Найдено <strong>{visibleProducts.length}</strong> из {CATALOG_PRODUCTS.length}
            </p>

            <div className="catalog-toolbar__actions">
              <button
                className="button button--ghost button--sm catalog-toolbar__filters"
                type="button"
                onClick={() => setFiltersOpen((prev) => !prev)}
                aria-expanded={filtersOpen}
              >
                <Icon name="filter" size={16} />
                Фильтры
              </button>

              <label className="field field--inline">
                <span className="field__label">Сортировка</span>
                <select
                  className="field__input field__select"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="products-grid products-grid--catalog">
              {visibleProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 50}>
                  <ProductCard product={product} index={index} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon">
                <Icon name="search" size={26} />
              </span>
              <h2 className="empty-state__title">По фильтрам ничего не найдено</h2>
              <p className="empty-state__text">
                Попробуйте расширить диапазон цены или сбросить фильтры — либо напишите
                консультанту в чат, поможем подобрать.
              </p>
              <button className="button button--primary" type="button" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>

      <Reveal as="section" className="section section--surface">
        <div className="trust-strip">
          <div className="trust-strip__item">
            <Icon name="truck" size={22} />
            <span className="trust-strip__body">
              <strong>Доставка 1–2 дня</strong>
              <span>по Москве и области</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <Icon name="shield" size={22} />
            <span className="trust-strip__body">
              <strong>Гарантия до 5 лет</strong>
              <span>на всю электронику</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <Icon name="return" size={22} />
            <span className="trust-strip__body">
              <strong>Возврат 60 дней</strong>
              <span>без лишних вопросов</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <Icon name="chat" size={22} />
            <span className="trust-strip__body">
              <strong>Поддержка в чате</strong>
              <span>отвечаем за минуту</span>
            </span>
          </div>
        </div>
      </Reveal>
    </>
  );
}

export default CatalogPage;
