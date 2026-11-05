import Seo from '../components/Seo.jsx';
export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Seo path="/privacy-policy" />
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Privacy Policy</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
        <p><strong>Your files stay on your device.</strong> All conversion and compression is done locally in your browser. We do not upload, store or view your files.</p>
        <p>We do not require registration and do not collect personal information through the tools. If you contact us by email, we use your message only to reply.</p>
        <p>The site loads the Inter font from Google Fonts, which may receive your IP address as part of that request. If you add analytics or ads later, update this policy.</p>
        <p>Questions? Visit the Contact page.</p>
      </div>
    </div>
  );
}
