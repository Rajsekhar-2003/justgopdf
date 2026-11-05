import { Link } from 'react-router-dom';
import { FileArchive, FileImage, Images } from 'lucide-react';

const all = [
  { to: '/jpg-to-pdf', label: 'JPG to PDF', text: 'Combine images into one PDF.', icon: Images },
  { to: '/pdf-to-jpg', label: 'PDF to JPG', text: 'Turn PDF pages into images.', icon: FileImage },
  { to: '/compress-pdf', label: 'Compress PDF', text: 'Make your PDF smaller.', icon: FileArchive },
];

export default function RelatedTools({ current }) {
  return (
    <section className="mx-auto mt-10 max-w-3xl" aria-labelledby="related">
      <h2 id="related" className="mb-4 text-xl font-bold text-slate-900">More free PDF tools</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {all.filter((t) => t.to !== current).map(({ to, label, text, icon: Icon }) => (
          <Link key={to} to={to} className="card flex items-center gap-4 p-4 transition hover:shadow-md">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={22} /></span>
            <span><span className="block font-semibold text-slate-900">{label}</span><span className="text-sm text-slate-600">{text}</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
