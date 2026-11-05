import Seo from '../components/Seo.jsx';
import { SITE_NAME, SITE_URL } from '../config/site.js';
import { ArrowRight, FileArchive, FileImage, Gift, Images, MousePointerClick, ShieldCheck, Smartphone, Zap, Lock, ChevronDown } from 'lucide-react';
import ToolCard from '../components/ToolCard.jsx';

const tools = [
  { icon: Images, title: 'JPG to PDF', description: 'Convert your JPG and JPEG images into a single PDF document.', button: 'Convert JPG to PDF', to: '/jpg-to-pdf' },
  { icon: FileImage, title: 'PDF to JPG', description: 'Convert PDF pages into high-quality JPG images.', button: 'Convert PDF to JPG', to: '/pdf-to-jpg' },
  { icon: FileArchive, title: 'Compress PDF', description: 'Reduce your PDF file size while maintaining good document quality.', button: 'Compress PDF', to: '/compress-pdf' },
];

const steps = [
  { title: 'JPG to PDF', items: ['Upload your JPG images.', 'Arrange images in your preferred order.', 'Click Convert and download your PDF.'] },
  { title: 'PDF to JPG', items: ['Upload your PDF document.', 'Select the desired page or all pages.', 'Convert and download JPG images.'] },
  { title: 'Compress PDF', items: ['Upload your PDF file.', 'Select compression quality.', 'Compress and download your smaller PDF.'] },
];

const features = [
  { icon: Gift, text: 'Free online PDF tools.' },
  { icon: MousePointerClick, text: 'Easy-to-use interface.' },
  { icon: Zap, text: 'Fast conversion.' },
  { icon: ShieldCheck, text: 'Secure file processing.' },
  { icon: Lock, text: 'No registration required.' },
  { icon: Smartphone, text: 'Mobile and desktop compatible.' },
];

const faqs = [
  ['Are my files uploaded to a server?', 'No. All conversion and compression happens inside your browser on your own device. Your files are never sent to our servers.'],
  ['Is JustGoPDF really free?', 'Yes. All tools are free to use and no account or registration is required.'],
  ['Which image formats can I convert to PDF?', 'JPG, JPEG and PNG images. You can add several images and arrange them in any order.'],
  ['What quality should I choose for PDF to JPG?', '150 DPI is good for screens and sharing. Use 300 DPI for print quality. 72 DPI gives the smallest files.'],
  ['How does PDF compression work?', 'Low compression rewrites the PDF structure without changing content. Recommended and High compression re-render each page as a compressed image, which gives much smaller files but makes text non-selectable.'],
  ['Why did my PDF not get smaller?', 'Some PDFs are already optimized, or contain mostly text and vector graphics that are already small. When no real reduction is possible, we tell you and keep your original file.'],
  ['Is there a file size limit?', 'PDFs can be up to 50 MB and images up to 20 MB each, to keep processing fast on your device.'],
];

const homeLd = [
  { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL + '/' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
];

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={homeLd} />
      <section className="bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">All Your PDF Tools in One Place</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">Convert images to PDF, extract images from PDF, and compress PDF files easily. Free, fast, and simple online tools.</p>
          <a href="#tools" className="btn-primary mt-8 px-8 text-lg">Explore PDF Tools <ArrowRight size={20} /></a>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">{tools.map((t) => <ToolCard key={t.to} {...t} />)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="mb-4 text-lg font-bold text-indigo-700">{s.title}</h3>
              <ol className="space-y-3">
                {s.items.map((it, i) => (
                  <li key={it} className="flex gap-3 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{i + 1}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Why JustGoPDF</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="card flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={22} /></span>
              <span className="font-medium text-slate-800">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                {q}<ChevronDown size={20} className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
