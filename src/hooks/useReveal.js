import { useEffect } from 'react';

// Re-runs the IntersectionObserver reveal + counter animation logic
// against the currently mounted page every time the route changes.
export function useReveal(deps = []) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
    if (reduceMotion) revealEls.forEach(el => el.classList.add('in'));

    const stats = document.querySelectorAll('.stat b');
    const counted = new WeakSet();
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          const target = parseInt(entry.target.dataset.count, 10);
          if (reduceMotion) { entry.target.textContent = target + '+'; return; }
          const duration = 1400;
          const startTime = performance.now();
          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            entry.target.textContent = Math.floor(eased * target) + (progress >= 1 ? '+' : '');
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(s => statIo.observe(s));

    return () => {
      io.disconnect();
      statIo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
