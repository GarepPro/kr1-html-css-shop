import { useScrollState } from '../../hooks/useReveal.js';

// Тонкая полоса прогресса чтения страницы под шапкой.
export function ScrollProgress() {
  const { progress } = useScrollState();

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default ScrollProgress;
