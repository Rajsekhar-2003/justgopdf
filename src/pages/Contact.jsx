import Seo from '../components/Seo.jsx';
import { useState } from 'react';
import { Mail } from 'lucide-react';

import { CONTACT_EMAIL } from '../config/site.js';

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('JustGoPDF contact')}&body=${encodeURIComponent(body)}`;
  };
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Seo path="/contact" />
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-slate-600">Questions or feedback? Send us a message. It opens in your email app.</p>
      <form onSubmit={submit} className="card mt-6 space-y-4 p-5">
        <label className="block text-sm font-medium">Name<input required className="field mt-1" value={f.name} onChange={set('name')} /></label>
        <label className="block text-sm font-medium">Email<input required type="email" className="field mt-1" value={f.email} onChange={set('email')} /></label>
        <label className="block text-sm font-medium">Message<textarea required rows={5} className="field mt-1" value={f.message} onChange={set('message')} /></label>
        <button className="btn-primary w-full"><Mail size={18} /> Send message</button>
      </form>
    </div>
  );
}
