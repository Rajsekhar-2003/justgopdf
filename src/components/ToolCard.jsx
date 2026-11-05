import { useNavigate } from 'react-router-dom';

export default function ToolCard({ icon: Icon, title, description, button, to }) {
  const navigate = useNavigate();
  return (
    <div className="card flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><Icon size={28} /></div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-slate-600">{description}</p>
      <button className="btn-primary mt-6 w-full" onClick={() => navigate(to)}>{button}</button>
    </div>
  );
}
