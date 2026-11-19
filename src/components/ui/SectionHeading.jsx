import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Reveal } from './Reveal.jsx';

// Заголовок раздела: надзаголовок (eyebrow), h2 с нужным уровнем, описание и ссылка «все».
export function SectionHeading({
  eyebrow,
  title,
  text,
  link,
  id,
  level = 2,
  align = 'left',
  className = '',
}) {
  const Heading = `h${level}`;

  return (
    <Reveal className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      <Heading className="section-heading__title" id={id}>
        {title}
      </Heading>
      {text && <p className="section-heading__text">{text}</p>}
      {link && (
        <Link className="section-heading__link" to={link.to}>
          {link.label}
          <Icon name="arrowRight" size={18} />
        </Link>
      )}
    </Reveal>
  );
}

export default SectionHeading;
