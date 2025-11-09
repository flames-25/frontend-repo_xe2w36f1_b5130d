import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import { useEffect } from 'react';

function App() {
  // Inject essential SEO/OG/JSON-LD progressively without altering index.html
  useEffect(() => {
    const title = 'QBitsMR – Quantum-grade Market Research & Predictive Intelligence';
    const desc = 'Futuristic research and analytics: AI-accelerated insights, data trust, predictive & causal models, and omnichannel panels. Trusted by enterprises to move with confidence.';
    const url = window.location.origin;

    document.title = title;

    const ensure = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      l.setAttribute('href', url);
      return l;
    }).setAttribute('href', url);

    ensure('meta[name="description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', desc);
      return m;
    }).setAttribute('content', desc);

    const og = [
      ['og:title', title],
      ['og:description', desc],
      ['og:type', 'website'],
      ['og:url', url],
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', title],
      ['twitter:description', desc],
    ];
    og.forEach(([name, content]) => {
      ensure(`meta[property="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('property', name);
        m.setAttribute('content', content);
        return m;
      }).setAttribute('content', content);
    });

    const ldOrg = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'QBitsMR',
      url,
      logo: url + '/favicon.svg',
      sameAs: []
    };
    const ldSite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'QBitsMR',
      url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    const ldService = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'QBitsMR Insights',
      url,
      areaServed: 'Global',
      serviceType: 'Market Research & Analytics',
      audience: { '@type': 'BusinessAudience', businessRole: 'Enterprise' }
    };

    const injectJSONLD = (id, json) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(json);
    };

    injectJSONLD('ld-org', ldOrg);
    injectJSONLD('ld-site', ldSite);
    injectJSONLD('ld-service', ldService);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-200 dark:selection:bg-blue-800/60 selection:text-slate-900 dark:selection:text-white">
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-2 rounded">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Showcase />
        <Contact />
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <div aria-hidden className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-inner" />
                <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">QBitsMR</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">Designing research systems that are private by default, scientifically rigorous, and operationally resilient.</p>
            </div>
            <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2 text-sm">
              <a href="#industries" className="link">Industries</a>
              <a href="#about" className="link">About</a>
              <a href="#careers" className="link">Careers</a>
              <a href="#legal" className="link">Legal</a>
              <a href="#panel" className="link">Panel</a>
              <a href="#contact" className="link">Contact</a>
            </nav>
          </div>
          <p className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} QBitsMR. All rights reserved.</p>
        </div>
        <style>{`
          .link { @apply text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400; }
        `}</style>
      </footer>
    </div>
  );
}

export default App;
