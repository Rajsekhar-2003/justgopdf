import { ShieldCheck } from 'lucide-react';

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-6 pt-10 text-center">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 text-slate-600">{subtitle}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
        <ShieldCheck size={14} /> Your files stay in your browser and are never uploaded.
      </p>
    </div>
  );
}
