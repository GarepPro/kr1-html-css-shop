import { getImageSrcSet, getProductImage } from '../../data/images.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { SEARCH_SUGGESTIONS, searchSite } from '../../data/search.js';
import { formatPrice } from '../../data/catalog.js';

// Модальное окно поиска по сайту. Открывается кнопкой в шапке или Ctrl/Cmd+K.
// Навигация по результатам — стрелками, выбор — Enter.
export function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchSite(query), [query]);

  // Синхронизируем состояние React с нативным <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // При закрытии сбрасываем строку поиска.
  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = (to) => {
    onClose();
    navigate(to);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      go(results[activeIndex].to);
    }
  };

  const showEmpty = query.trim().length >= 2 && results.length === 0;

  return (
    <dialog
      className="search-dialog"
      ref={dialogRef}
      aria-labelledby="search-dialog-title"
      onClose={onClose}
    >
      <div className="search-dialog__head">
        <Icon name="search" size={20} />
        <input
          className="search-dialog__input"
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Товар, страница или вопрос…"
          role="combobox"
          aria-label="Поиск по сайту"
          aria-expanded={results.length > 0}
          aria-controls={results.length > 0 ? 'search-results' : undefined}
          aria-activedescendant={results[activeIndex] ? `search-result-${activeIndex}` : undefined}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-dialog__close" type="button" onClick={onClose} aria-label="Закрыть поиск">
          <Icon name="close" size={18} />
        </button>
      </div>

      <h2 className="visually-hidden" id="search-dialog-title">
        Поиск по сайту
      </h2>

      {!query && (
        <div className="search-dialog__hints">
          <span className="search-dialog__hints-title">Популярные запросы</span>
          <div className="search-dialog__chips">
            {SEARCH_SUGGESTIONS.map((suggestion) => (
              <button
                className="search-dialog__chip"
                type="button"
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <ul id="search-results" className="search-results" role="listbox" aria-label="Результаты поиска">
          {results.map((result, index) => (
            <li key={result.id} role="presentation">
              <button
                className={
                  index === activeIndex
                    ? 'search-results__item search-results__item--active'
                    : 'search-results__item'
                }
                type="button"
                id={`search-result-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => go(result.to)}
              >
                <span className={`search-results__icon search-results__icon--${result.type}`}>
                  {result.type === 'product' ? (
                    <img src={getProductImage(result.productId)} srcSet={getImageSrcSet(getProductImage(result.productId))} sizes="48px" alt="" />
                  ) : (
                    <Icon name={result.type === 'faq' ? 'chat' : 'grid'} size={16} />
                  )}
                </span>
                <span className="search-results__body">
                  <span className="search-results__title">{result.title}</span>
                  <span className="search-results__text">
                    {result.price ? formatPrice(result.price) : result.text}
                  </span>
                </span>
                <Icon name="arrowRight" size={16} className="search-results__arrow" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showEmpty && (
        <p className="search-dialog__empty">
          По запросу «{query}» ничего не найдено. Попробуйте «лампа», «доставка» или напишите в чат.
        </p>
      )}
    </dialog>
  );
}

export default SearchDialog;
