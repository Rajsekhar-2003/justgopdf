import Seo from '../components/Seo.jsx';
import { SITE_NAME, SITE_URL } from '../config/site.js';
import { ArrowRight, FileArchive, FileImage, Gift, Images, MousePointerClick, ShieldCheck, Smartphone, Zap, Lock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  ['Can I convert multiple JPG images into one PDF?', 'Yes. You can upload several images and combine them into a single PDF document in your preferred order.'],
  ['Can I compress PDF to 100KB, 200KB, 500KB, or 1MB?', 'Yes. JustGoPDF offers different target size options to help you reduce PDF file sizes according to your requirements.'],
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
  <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:py-16">
    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
      All Your PDF Tools in One Place
    </h1>

    <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
      Convert images to PDF, extract images from PDF, and compress PDF files easily.
      Free, fast, and simple online tools.
    </p>

    <a href="#tools" className="btn-primary mt-6 px-7 py-2.5 text-base">
      Explore PDF Tools <ArrowRight size={18} />
    </a>
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

      {/* ===== Article / Detailed Guide ===== */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <article className="space-y-10 text-slate-700 leading-relaxed">
          <header>
            <h2 className="text-3xl font-bold text-slate-900">
              Free Online PDF Tools – Convert JPG to PDF, PDF to JPG &amp; Compress PDF Without Login
            </h2>
            <p className="mt-4">
              In today&apos;s digital world, PDF files are essential for students, job applicants, office employees, and businesses.
              Whether you are filling out a government examination form, applying for a job, submitting educational documents,
              or managing office paperwork, you often need to convert images into PDF files or reduce PDF file sizes.
            </p>
            <p className="mt-4">
              <strong>JustGoPDF</strong> makes these tasks simple, fast, and convenient. It is a free online PDF tools platform
              that allows you to convert JPG to PDF, PDF to JPG, and compress PDF files without downloading any software or
              creating an account.
            </p>
            <p className="mt-4">
              Simply visit JustGoPDF, upload your file, select the required option, and get your converted or compressed document.
            </p>
          </header>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Why Choose JustGoPDF?</h3>
            <p className="mt-3">
              JustGoPDF is designed to make everyday document management easier for everyone. Whether you are a student,
              cyber café owner, or government job applicant, you can use our online PDF tools whenever you need them.
            </p>
            <p className="mt-3">Here are some of the key benefits:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>100% Free to Use:</strong> Convert and compress documents without paying for basic services.</li>
              <li><strong>No Login Required:</strong> Start using the tools without registration or creating an account.</li>
              <li><strong>No Software Installation:</strong> Everything works directly through your web browser.</li>
              <li><strong>Easy to Use:</strong> A simple interface makes document conversion accessible to everyone.</li>
              <li><strong>Multiple PDF Tools:</strong> Convert JPG to PDF, PDF to JPG, and compress PDF files.</li>
              <li><strong>Different File Size Options:</strong> Reduce PDF file sizes to 100KB, 200KB, 500KB, or 1MB.</li>
              <li><strong>Accessible Anywhere:</strong> Use the tools on your computer, laptop, tablet, or smartphone.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">1. How to Convert JPG to PDF Online for Free?</h3>
            <p className="mt-3">
              Do you have JPG images, photographs, or scanned documents that you need to convert into a PDF file?
            </p>
            <p className="mt-3">
              With JustGoPDF, you can easily convert JPG to PDF online without installing additional software.
            </p>
            <p className="mt-3">
              This tool is particularly useful when submitting photographs, educational certificates, identity documents,
              and scanned pages for online applications.
            </p>
            <h4 className="mt-4 font-semibold text-slate-800">Steps to Convert JPG to PDF</h4>
            <p className="mt-2">Converting an image into a PDF is very simple:</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Visit the JustGoPDF website.</li>
              <li>Select the <strong>JPG to PDF Converter</strong> tool.</li>
              <li>Upload your JPG or image files.</li>
              <li>Arrange your images if needed.</li>
              <li>Click the Convert button.</li>
              <li>Get your PDF document.</li>
            </ol>
            <p className="mt-3">That&apos;s it! Your images are converted into a PDF document in just a few simple steps.</p>
            <p className="mt-3">You don&apos;t need to install any software or create an account.</p>
            <p className="mt-3 text-sm text-slate-500">
              Related searches: JPG to PDF, convert JPG to PDF online, image to PDF converter, convert picture to PDF,
              photo to PDF converter, convert image to PDF free, change JPG to PDF, convert pic to PDF.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">2. How to Convert PDF to JPG Online?</h3>
            <p className="mt-3">
              Sometimes, you may need to convert PDF pages into individual images for uploading, sharing, editing, or other purposes.
            </p>
            <p className="mt-3">
              JustGoPDF provides an easy PDF to JPG conversion tool that helps you turn PDF pages into image files.
            </p>
            <h4 className="mt-4 font-semibold text-slate-800">Steps to Convert PDF to JPG</h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Open JustGoPDF in your browser.</li>
              <li>Select the <strong>PDF to JPG Converter</strong> option.</li>
              <li>Upload your PDF document.</li>
              <li>Click the Convert button.</li>
              <li>Download your converted JPG images.</li>
            </ol>
            <p className="mt-3">
              Your PDF pages can be converted into image files without requiring additional desktop software.
            </p>
            <p className="mt-3">
              This feature is useful for students, office workers, designers, and anyone who regularly works with digital documents.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Related searches: PDF to JPG, convert PDF to JPG online, PDF to image converter, convert PDF pages to images,
              PDF to JPG converter free.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">3. How to Compress PDF Online for Free?</h3>
            <p className="mt-3">
              Are you trying to upload a PDF document to a government examination website, college admission portal,
              scholarship application, or job application portal?
            </p>
            <p className="mt-3">
              Sometimes, these websites have strict file size requirements. For example, they may accept PDF documents
              only within 100KB, 200KB, 500KB, or 1MB.
            </p>
            <p className="mt-3">If your PDF file is too large, you may face difficulties uploading it.</p>
            <p className="mt-3"><strong>JustGoPDF makes PDF compression easier.</strong></p>
            <p className="mt-3">
              With our PDF Compressor, you can reduce the size of your PDF documents to help meet the required upload limits.
            </p>
            <h4 className="mt-4 font-semibold text-slate-800">Available PDF Compression Size Options</h4>
            <p className="mt-2">Depending on the original document and its contents, you can choose your desired target file size:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Compress PDF to 100KB</li>
              <li>Compress PDF to 200KB</li>
              <li>Compress PDF to 500KB</li>
              <li>Compress PDF to 1MB</li>
            </ul>
            <p className="mt-3">
              Please note that the final file size depends on the original PDF, its images, content, and compression settings.
              Very small target sizes may not always be achievable while maintaining acceptable document quality.
            </p>
            <h4 className="mt-4 font-semibold text-slate-800">Steps to Compress PDF</h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Visit JustGoPDF.</li>
              <li>Select the <strong>Compress PDF</strong> tool.</li>
              <li>Upload your PDF document.</li>
              <li>Select your required file size, such as 100KB, 200KB, 500KB, or 1MB.</li>
              <li>Click the Compress button.</li>
              <li>Download your compressed PDF.</li>
            </ol>
            <p className="mt-3">
              It&apos;s that simple! You can reduce PDF file sizes online without installing any software.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Related searches: PDF compress, reduce PDF size, compress PDF online, compress PDF free, reduce PDF file size,
              compress PDF online free, compress PDF to 1MB free, compress PDF to 100KB.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">4. Very Useful for Cyber Café Owners</h3>
            <p className="mt-3">
              Cyber cafés regularly help customers with government examination applications, job applications, scholarship
              registrations, college admissions, and other online services.
            </p>
            <p className="mt-3">
              Document conversion and compression are common requirements during these processes.
            </p>
            <p className="mt-3">JustGoPDF can make these tasks easier for cyber café owners.</p>
            <p className="mt-3">For example:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Convert scanned photographs into PDF documents.</li>
              <li>Compress certificates to meet upload requirements.</li>
              <li>Reduce document sizes for government application portals.</li>
              <li>Convert PDF documents into JPG images.</li>
              <li>Prepare documents for online registration.</li>
              <li>Save time without installing additional PDF software.</li>
            </ul>
            <p className="mt-3">
              Instead of searching for different applications, cyber café operators can use one convenient online platform
              for their everyday PDF requirements.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">5. Helpful for Students and Government Exam Applicants</h3>
            <p className="mt-3">
              Students and government job aspirants frequently need to upload documents during online applications.
            </p>
            <p className="mt-3">
              Whether you are applying for SSC, UPSC, Railway, Banking, state government recruitment, college admission,
              or scholarship programmes, document size and format requirements can sometimes become a challenge.
            </p>
            <p className="mt-3">JustGoPDF helps make these tasks easier.</p>
            <p className="mt-3">You can use it to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Convert passport-size photographs into PDF files.</li>
              <li>Convert scanned educational certificates into PDF.</li>
              <li>Compress documents to 100KB or 200KB.</li>
              <li>Reduce PDF size to 500KB or 1MB.</li>
              <li>Convert PDF pages into JPG images.</li>
              <li>Prepare documents for online form submissions.</li>
            </ul>
            <p className="mt-3"><strong>One simple platform for your everyday document conversion needs.</strong></p>
            <p className="mt-3">
              Always check the specific application portal&apos;s accepted file formats, size limits, and image dimensions before uploading.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">6. No Software Download and No Registration Required</h3>
            <p className="mt-3">
              Why install additional software when you can perform common PDF tasks directly through your browser?
            </p>
            <p className="mt-3">
              JustGoPDF is designed for convenience. Open the website, select your preferred tool, upload your document,
              and complete the process.
            </p>
            <p className="mt-3">
              There is no need to create an account or download a desktop application.
            </p>
            <p className="mt-3">
              Whether you are using Windows, Linux, Android, or another supported device, you can access the website
              through a compatible browser.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">7. Make Your Daily Document Work Easier with JustGoPDF</h3>
            <p className="mt-3">
              From students and teachers to cyber café operators and working professionals, everyone needs simple
              document management tools.
            </p>
            <p className="mt-3">JustGoPDF brings essential PDF utilities together in one place.</p>
            <p className="mt-3">
              Whether you want to convert JPG to PDF, PDF to JPG, or compress PDF files to 100KB, 200KB, 500KB, or 1MB,
              you can complete these tasks through a simple online process.
            </p>
            <p className="mt-3">Stop wasting time installing different applications for basic document work.</p>
            <p className="mt-3 font-semibold text-slate-800">
              Visit JustGoPDF and make your PDF tasks easier, faster, and more convenient.
            </p>
          </div>
        </article>
      </section>

      {/* ===== FAQ (unified) ===== */}
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

      {/* ===== Final CTA ===== */}
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-4">
        <div className="rounded-2xl bg-indigo-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Try JustGoPDF Today – Your Free Online PDF Toolkit</h2>
          <p className="mt-3 text-slate-700">
            Need to convert an image into a PDF? Want to reduce your PDF file size? Or need to convert PDF pages into JPG images?
          </p>
          <p className="mt-3 font-semibold text-slate-800">JustGoPDF is here to help.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/jpg-to-pdf" className="btn-primary">JPG to PDF Converter</Link>
            <Link to="/pdf-to-jpg" className="btn-primary">PDF to JPG Converter</Link>
            <Link to="/compress-pdf" className="btn-primary">Free PDF Compressor</Link>
          </div>
          <p className="mt-6 text-sm text-slate-600">No login. No software installation. Just simple online PDF tools.</p>
          <p className="mt-2 font-semibold text-indigo-700">JustGoPDF – Your Everyday PDF Solution.</p>
        </div>
      </section>
    </>
  );
}
