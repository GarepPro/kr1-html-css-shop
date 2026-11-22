import { Link } from 'react-router-dom';
import { Reveal } from './Reveal.jsx';

// Заголовок раздела с описанием и ссылкой на полный список.
export function SectionHeading({
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
      <Heading className="section-heading__title" id={id}>
        {title}
      </Heading>
      {text && <p className="section-heading__text">{text}</p>}
      {link && (
        <Link className="section-heading__link" to={link.to}>
          {link.label}
        </Link>
      )}
    </Reveal>
  );
}

export default SectionHeading;
