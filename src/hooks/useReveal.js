import { useEffect, useRef, useState } from 'react';

// Аналог js/reveal.js эталона: элемент плавно появляется, когда попадает во вьюпорт.
// Подключается к контейнеру группы: каскадная задержка детей считается через CSS (--i).
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    // jsdom и старые браузеры: показываем сразу, без наблюдения.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// Позиция прокрутки страницы: нужно для прогресс-бара и «сжатия» шапки.
export function useScrollState() {
  const [state, setState] = useState({ y: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({ y, progress: max > 0 ? Math.min(y / max, 1) : 0 });
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return state;
}

// Подписка на медиазапрос (например, мобильная ширина).
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// Анимированный счётчик (аналог js/counters.js): плавно «докручивает» число,
// когда элемент появляется на экране.
export function useCountUp(target, { duration = 1400, decimals = 0, enabled = true } = {}) {
  const [value, setValue] = useState(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!enabled || reducedMotion) return undefined;

    let frame = 0;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — плавное замедление к концу.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, decimals, enabled, reducedMotion]);

  return reducedMotion ? target : value;
}

// Форматирование числа для счётчиков: 12400 → «12 400», 4.8 → «4,8».
export function formatCounter(value, decimals = 0) {
  const fixed =
    decimals > 0 ? value.toFixed(decimals).replace('.', ',') : Math.round(value).toString();

  return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/(\d)[ ,](\d{3})$/, '$1 $2');
}
