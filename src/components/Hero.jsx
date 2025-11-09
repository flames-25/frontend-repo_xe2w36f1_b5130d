import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const fallbackRef = useRef(null);

  useEffect(() => {
    if (!reduced) return;
    // Subtle animated gradient for reduced motion users
    const el = fallbackRef.current;
    if (!el) return;
    let raf;
    let t = 0;
    const animate = () => {
      t += 0.003;
      el.style.background = `radial-gradient(1200px 600px at ${50 + Math.sin(t) * 10}% ${50 + Math.cos(t * 1.2) * 10}%, rgba(59,130,246,0.25), transparent 60%), linear-gradient(120deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section id="home" className="relative isolate">
      <div className="relative h-[70vh] min-h-[540px] w-full overflow-hidden">
        {!reduced ? (
          <div className="absolute inset-0" aria-hidden>
            <Spline scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-slate-950 dark:via-slate-950/20" />
          </div>
        ) : (
          <div ref={fallbackRef} className="absolute inset-0" aria-hidden />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Quantum-grade Insights for a Classical World
            </h1>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              QBitsMR blends advanced modeling, machine intelligence, and human expertise to decode markets, anticipate shifts, and accelerate confident decisions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#solutions" className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                Explore Solutions
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const getInitial = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const prefers = useRef(getInitial());
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => (prefers.current = mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return prefers.current;
}
