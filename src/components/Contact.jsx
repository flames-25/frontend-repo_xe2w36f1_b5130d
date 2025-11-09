import { useState } from 'react';

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) errors.name = 'Please enter your full name';
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address';
  if (!values.company || values.company.trim().length < 2) errors.company = 'Enter your company name';
  if (!values.message || values.message.trim().length < 20) errors.message = 'Tell us a bit more (min 20 chars)';
  if (values.website && /https?:\/\//i.test(values.website)) errors.website = 'No URLs please';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '', bot: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.bot) return; // honeypot
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setStatus('loading');
      // No backend yet; simulate send. This can be wired later.
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      setValues({ name: '', email: '', company: '', message: '', bot: '', website: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Contact / RFP</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Share some details and our team will reach out within one business day.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid lg:grid-cols-2 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur p-6">
          <div className="grid gap-6">
            <Field label="Full name" error={errors.name}>
              <input name="name" id="name" value={values.name} onChange={onChange} autoComplete="name" className="input" placeholder="Jane Doe" required aria-invalid={!!errors.name} />
            </Field>
            <Field label="Work email" error={errors.email}>
              <input name="email" id="email" type="email" value={values.email} onChange={onChange} autoComplete="email" className="input" placeholder="jane@company.com" required aria-invalid={!!errors.email} />
            </Field>
            <Field label="Company" error={errors.company}>
              <input name="company" id="company" value={values.company} onChange={onChange} autoComplete="organization" className="input" placeholder="Acme Inc." required aria-invalid={!!errors.company} />
            </Field>
          </div>

          <div className="grid gap-6">
            <Field label="What can we help with?" error={errors.message}>
              <textarea name="message" id="message" value={values.message} onChange={onChange} rows={6} className="input min-h-[160px]" placeholder="Tell us about your goals, timelines, and constraints." required aria-invalid={!!errors.message} />
            </Field>
            <div className="hidden">
              <label htmlFor="bot">Do not fill this</label>
              <input id="bot" name="bot" value={values.bot} onChange={onChange} />
              <label htmlFor="website">Website</label>
              <input id="website" name="website" value={values.website} onChange={onChange} />
            </div>
            <div className="flex items-center gap-3">
              <button disabled={status==='loading'} className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                {status === 'loading' ? 'Sending…' : status === 'success' ? 'Sent ✓' : 'Send message'}
              </button>
              <p className="text-sm text-slate-600 dark:text-slate-400">We’ll process your data per our <a href="#legal" className="underline">privacy policy</a>.</p>
            </div>
          </div>
        </form>
      </div>
      <style>{`
        .input { @apply w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950/40 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500; }
      `}</style>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
