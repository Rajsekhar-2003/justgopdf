import Seo from '../components/Seo.jsx';
export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Seo path="/terms" />
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Terms and Conditions</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p>By using JustGoPDF you agree to these terms. The tools are provided free of charge and "as is", without warranties of any kind.</p>
        <p>You are responsible for the files you process and must have the right to use them. Do not use the service for unlawful purposes.</p>
        <p>Always keep a copy of your original files. We are not liable for any loss or damage resulting from use of the tools, including changes to quality or text selectability caused by compression.</p>
        <p>We may update these terms at any time. Continued use means you accept the updated terms.</p>
      </div>
    </div>
  );
}
