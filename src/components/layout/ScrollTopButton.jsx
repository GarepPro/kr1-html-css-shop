import { useEffect, useState } from 'react';

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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <button
      className={isVisible ? 'scroll-top scroll-top--visible' : 'scroll-top'}
      type="button"
      aria-label="Наверх"
      hidden={!isVisible}
      onClick={handleClick}
    >
      Наверх
    </button>
  );
}

export default ScrollTopButton;

