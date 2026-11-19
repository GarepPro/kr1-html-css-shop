import { useEffect, useState } from 'react';
import Icon from '../ui/Icon.jsx';

// Кнопка «Наверх» (position: fixed): появляется после прокрутки на 600px.
function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleScrollTop = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    toggleScrollTop();

    return () => {
      window.removeEventListener('scroll', toggleScrollTop);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={isVisible ? 'scroll-top scroll-top--visible' : 'scroll-top'}
      type="button"
      aria-label="Наверх"
      tabIndex={isVisible ? 0 : -1}
      onClick={handleClick}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}

export default ScrollTopButton;

