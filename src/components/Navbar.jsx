import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/jpg-to-pdf', label: 'JPG to PDF' },
  { to: '/pdf-to-jpg', label: 'PDF to JPG' },
  { to: '/compress-pdf', label: 'Compress PDF' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cls = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-900" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white"><FileText size={20} /></span>
          JustGoPDF
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={cls}>{l.label}</NavLink>)}
        </nav>
        <button className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={(s) => `${cls(s)} py-3 text-base`} onClick={() => setOpen(false)}>{l.label}</NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
