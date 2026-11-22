import { formatCounter } from '../../hooks/useReveal.js';

// `as` позволяет рендерить section/li/article, не теряя семантику.
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  return (
    <Tag className={className || undefined} {...rest}>
      {children}
    </Tag>
  );
}

// Счётчик из hero-блока и страницы «О бренде».
// plain — значения без разделения разрядов (год основания).
export function Counter({ value, suffix = '', decimals = 0, label, plain = false, className = '' }) {
  const text = plain
    ? `${Math.round(value)}${suffix}`
    : formatCounter(value, decimals) + suffix;

  return (
    <div className={`counter ${className}`.trim()}>
      <span className="counter__value">{text}</span>
      {label && <span className="counter__label">{label}</span>}
    </div>
  );
}

export default Reveal;
