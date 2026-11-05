import Seo from '../components/Seo.jsx';
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Seo path="/about" />
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">About JustGoPDF</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>JustGoPDF offers simple, fast and free PDF tools: convert JPG to PDF, convert PDF to JPG, and compress PDF files.</p>
        <p>Everything runs inside your browser. Your documents are processed on your own device and are never uploaded to a server.</p>
        <p>We built JustGoPDF so anyone, even first-time users, can finish a PDF task in a few clicks on any phone, tablet or computer.</p>
      </div>
    </div>
  );
}
