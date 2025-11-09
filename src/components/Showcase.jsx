import { useState } from 'react';

const items = [
  {
    title: 'Retail Demand Sensing',
    blurb: 'Fused POS, clickstream, and panel data to forecast demand with 23% lower error and 11% higher promo ROI.',
  },
  {
    title: 'B2B ABM Optimization',
    blurb: 'Identified high-propensity accounts and causal levers to lift conversion by 18% in 90 days.',
  },
  {
    title: 'Media Mix for OTT',
    blurb: 'Causal MMM for streaming provider cut CAC by 21% while growing subs by 8%.',
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  return (
    <section id="cases" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Case Studies</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Proven impact across industries.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 flex lg:flex-col gap-3 overflow-x-auto no-scrollbar" role="tablist" aria-orientation="vertical">
            {items.map((it, i) => (
              <button
                key={it.title}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-xl border text-left px-4 py-3 min-w-[260px] lg:min-w-0 transition-colors ${
                  active === i
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="font-semibold">{it.title}</div>
                <div className={`text-sm mt-1 ${active === i ? 'text-blue-50' : 'text-slate-600 dark:text-slate-300'}`}>{it.blurb}</div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50/60 to-cyan-50/40 dark:from-slate-900 dark:to-slate-950 p-8">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{items[active].title}</h3>
            <p className="mt-3 text-slate-700 dark:text-slate-300 max-w-2xl">{items[active].blurb}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">Outcome: measurable lift with rigorous holdouts.</li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">Speed: deployed in weeks, not quarters.</li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">Scale: production-grade pipelines and MLOps.</li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/60">Trust: privacy-by-design and governance.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
