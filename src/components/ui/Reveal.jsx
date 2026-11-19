import { useReveal, useCountUp, formatCounter } from '../../hooks/useReveal.js';

// Обёртка с плавным появлением при прокрутке (БЭМ-блок reveal).
// `as` позволяет рендерить section/li/article, не теряя семантику.
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
  ...rest
}) {
  const { ref, isVisible } = useReveal();

  const classes = [
    'reveal',
    `reveal--${variant}`,
    isVisible ? 'reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ '--reveal-delay': `${delay}ms` }}
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
    <div className={`counter ${className}`.trim()} ref={ref}>
      <span className="counter__value">{text}</span>
      {label && <span className="counter__label">{label}</span>}
    </div>
  );
}

export default Reveal;
