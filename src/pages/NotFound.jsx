import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <Seo path="/" noindex title="Page not found | JustGoPDF" description="This page does not exist." />
      <h1 className="text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you are looking for does not exist. Pick a tool to continue.</p>
      <Link to="/" className="btn-primary mt-6">Go to homepage</Link>
    </div>
  );
}
