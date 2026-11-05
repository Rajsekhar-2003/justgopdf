import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const col = 'space-y-2 text-sm text-slate-600';
const a = 'hover:text-indigo-600';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"><FileText size={18} /></span>
            JustGoPDF
          </div>
          <p className="mt-3 text-sm text-slate-600">Simple, fast, and free online PDF tools.</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-slate-900">PDF Tools</h3>
          <ul className={col}>
            <li><Link className={a} to="/jpg-to-pdf">JPG to PDF</Link></li>
            <li><Link className={a} to="/pdf-to-jpg">PDF to JPG</Link></li>
            <li><Link className={a} to="/compress-pdf">Compress PDF</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-slate-900">Information</h3>
          <ul className={col}>
            <li><Link className={a} to="/about">About Us</Link></li>
            <li><Link className={a} to="/contact">Contact Us</Link></li>
            <li><Link className={a} to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className={a} to="/terms">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">© 2026 JustGoPDF. All Rights Reserved.</div>
    </footer>
  );
}
