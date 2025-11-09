import { Cpu, Shield, ChartBar, Network } from 'lucide-react';

const pillars = [
  {
    icon: Cpu,
    title: 'AI-Accelerated Research',
    desc: 'From survey design to synthesis, intelligent agents accelerate insights while preserving rigor and representativeness.'
  },
  {
    icon: Shield,
    title: 'Data Trust & Governance',
    desc: 'Privacy-first pipelines, consent orchestration, and verifiable provenance for enterprise-grade compliance.'
  },
  {
    icon: ChartBar,
    title: 'Predictive & Causal Models',
    desc: 'Marketing mix, uplift, time-series, and causal inference calibrated to your unique context.'
  },
  {
    icon: Network,
    title: 'Omnichannel Panels',
    desc: 'Always-on human panels with fraud protection, deduplication, and adaptive incentives at scale.'
  }
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Solutions</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Four pillars that power outcomes from exploration to execution.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur p-6 hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-blue-500">
              <div className="h-12 w-12 rounded-lg grid place-items-center bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{desc}</p>
              <a href="#industries" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
