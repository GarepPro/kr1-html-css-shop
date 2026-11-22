import { formatCounter, useCountUp, useReveal } from '../../hooks/useReveal.js';

// `as` позволяет рендерить section/li/article, не теряя семантику.
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-reveal-pending={!isVisible && typeof IntersectionObserver !== 'undefined' ? '' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Счётчик из hero-блока и страницы «О бренде».
// plain — значения без разделения разрядов (год основания).
export function Counter({ value, suffix = '', decimals = 0, label, plain = false, className = '' }) {
  const { ref, isVisible } = useReveal({ threshold: 0.4 });
  const current = useCountUp(value, { decimals, enabled: isVisible });
  const text = plain
    ? `${Math.round(current)}${suffix}`
    : formatCounter(current, decimals) + suffix;

  return (
    <div ref={ref} className={`counter ${className}`.trim()}>
      <span className="counter__value">{text}</span>
      {label && <span className="counter__label">{label}</span>}
    </div>
  );
}

export default Reveal;
