import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';

function usePrefersDark() {
  const [prefersDark, setPrefersDark] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mql.matches);
    const handler = (e) => setPrefersDark(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return prefersDark;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const prefersDark = usePrefersDark();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return prefersDark;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
  }, [open]);

  const LinkItem = ({ href, children }) => (
    <a
      href={href}
      onClick={() => setOpen(false)}
      className="text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
    >
      {children}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-backdrop-blur:bg-white/60 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/80">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            <div aria-hidden className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-inner" />
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              QBitsMR
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <LinkItem href="#solutions">Solutions</LinkItem>
            <LinkItem href="#industries">Industries</LinkItem>
            <LinkItem href="#cases">Case Studies</LinkItem>
            <div className="relative group">
              <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Resources <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-2">
                <a href="#about" className="block px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">About</a>
                <a href="#careers" className="block px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">Careers</a>
                <a href="#legal" className="block px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">Legal</a>
              </div>
            </div>
            <LinkItem href="#contact">Contact</LinkItem>
            <a href="#panel" className="ml-1 inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
              Panel
            </a>
            <button
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode((d) => !d)}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode((d) => !d)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800">
            <div className="grid gap-2">
              <LinkItem href="#solutions">Solutions</LinkItem>
              <LinkItem href="#industries">Industries</LinkItem>
              <LinkItem href="#cases">Case Studies</LinkItem>
              <LinkItem href="#about">About</LinkItem>
              <LinkItem href="#careers">Careers</LinkItem>
              <LinkItem href="#legal">Legal</LinkItem>
              <a href="#panel" className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2">Panel</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold px-3 py-2">Contact</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
