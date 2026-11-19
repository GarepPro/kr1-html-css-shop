import Icon from '../ui/Icon.jsx';

// Звёздный рейтинг: showValue добавляет числовое значение, reviews — количество отзывов.
export function Rating({ value, max = 5, reviews, showValue = false, size = 14 }) {
  const rounded = Math.round(value);

  return (
    <span className="rating" aria-label={`Оценка ${value} из ${max}`}>
      <span className="rating__stars" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => (
          <Icon
            key={index}
            name="star"
            size={size}
            strokeWidth={1.2}
            filled={index < rounded}
            className={index < rounded ? 'rating__star rating__star--filled' : 'rating__star'}
          />
        ))}
      </span>
      {showValue && <span className="rating__value">{String(value).replace('.', ',')}</span>}
      {reviews !== undefined && <span className="rating__reviews">{reviews} отзывов</span>}
    </span>
  );
}

export default Rating;

