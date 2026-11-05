import Seo from '../components/Seo.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import PdfToJpgArticle from '../content/PdfToJpgArticle.jsx';
import { toolJsonLd } from '../config/site.js';
import { useEffect, useRef, useState } from 'react';
import { Check, Download, FileText, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import UploadArea from '../components/UploadArea.jsx';
import Loading from '../components/Loading.jsx';
import Notice from '../components/Notice.jsx';
import { openPdf, renderPageToJpg, renderThumbnail, zipImages } from '../utils/pdfToJpg.js';
import { baseName, downloadBlob, formatSize, MAX_PDF_MB } from '../utils/helpers.js';

export default function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [thumbs, setThumbs] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [dpi, setDpi] = useState(150);
  const [quality, setQuality] = useState(85);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [notice, setNotice] = useState(null);
  const pdfRef = useRef(null);
  const token = useRef(0);
  const thumbsRef = useRef([]);
  const resultsRef = useRef([]);
  thumbsRef.current = thumbs;
  resultsRef.current = results;

  const revokeAll = () => {
    thumbsRef.current.forEach((u) => URL.revokeObjectURL(u));
    resultsRef.current.forEach((r) => URL.revokeObjectURL(r.url));
  };
  useEffect(() => () => { token.current++; revokeAll(); pdfRef.current?.destroy(); }, []);

  const reset = () => {
    token.current++;
    revokeAll();
    pdfRef.current?.destroy(); pdfRef.current = null;
    setFile(null); setNumPages(0); setThumbs([]); setSelected(new Set()); setResults([]); setNotice(null); setProgress(0);
  };

  const onFiles = async ([f]) => {
    reset();
    const my = ++token.current;
    setLoadingPdf(true);
    try {
      const pdf = await openPdf(f);
      if (my !== token.current) { pdf.destroy(); return; }
      pdfRef.current = pdf;
      setFile(f); setNumPages(pdf.numPages);
      setSelected(new Set(Array.from({ length: pdf.numPages }, (_, i) => i + 1)));
      setLoadingPdf(false);
      for (let n = 1; n <= pdf.numPages; n++) {
        const blob = await renderThumbnail(pdf, n);
        if (my !== token.current) return;
        setThumbs((t) => [...t, URL.createObjectURL(blob)]);
      }
    } catch (e) {
      setLoadingPdf(false);
      setNotice({ type: 'error', message: e.message });
    }
  };

  const toggle = (n) => setSelected((s) => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });
  const allSelected = selected.size === numPages;
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(Array.from({ length: numPages }, (_, i) => i + 1)));

  const convert = async () => {
    const pages = [...selected].sort((a, b) => a - b);
    if (!pages.length) return setNotice({ type: 'error', message: 'Select at least one page to convert.' });
    setBusy(true); setNotice(null); setProgress(0);
    resultsRef.current.forEach((r) => URL.revokeObjectURL(r.url));
    setResults([]);
    try {
      const out = [];
      for (let i = 0; i < pages.length; i++) {
        const blob = await renderPageToJpg(pdfRef.current, pages[i], dpi, quality / 100);
        out.push({ page: pages[i], blob, url: URL.createObjectURL(blob) });
        setProgress((i + 1) / pages.length);
      }
      setResults(out);
      setNotice({ type: 'success', message: `${out.length} image${out.length > 1 ? 's' : ''} ready to download.` });
    } catch (e) {
      setNotice({ type: 'error', message: e.message || 'Conversion failed. Try a lower resolution.' });
    } finally { setBusy(false); }
  };

  const downloadZip = async () => {
    try { downloadBlob(await zipImages(results, baseName(file.name)), `${baseName(file.name)}-images.zip`); }
    catch { setNotice({ type: 'error', message: 'Could not create the ZIP file.' }); }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8">
      <Seo path="/pdf-to-jpg" jsonLd={toolJsonLd("/pdf-to-jpg", "PDF to JPG Converter")} />
      <PageHeader title="PDF to JPG Converter" subtitle="Convert PDF pages into JPG images for free. Choose pages, resolution and quality." />
      <div className="space-y-5">
        <Notice notice={notice} onClose={() => setNotice(null)} />
        {!file && (loadingPdf ? <div className="card p-6"><Loading message="Reading your PDF…" /></div> : (
          <UploadArea accept={['application/pdf']} extensions={['.pdf']} maxSizeMB={MAX_PDF_MB} title="Drag & drop your PDF here"
            hint={`PDF files up to ${MAX_PDF_MB} MB`} buttonLabel="Browse PDF" onFiles={onFiles} onError={(m) => setNotice({ type: 'error', message: m })} />
        ))}

        {file && (
          <>
            <div className="card flex items-center gap-4 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600"><FileText /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-500">{formatSize(file.size)} · {numPages} page{numPages > 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="card p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Select pages ({selected.size}/{numPages})</h2>
                <button className="text-sm font-semibold text-indigo-600 hover:underline" onClick={toggleAll}>{allSelected ? 'Deselect all' : 'Select all'}</button>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <button onClick={() => toggle(n)} aria-pressed={selected.has(n)}
                      className={`relative w-full overflow-hidden rounded-xl border-2 bg-slate-50 text-left transition ${selected.has(n) ? 'border-indigo-600' : 'border-slate-200'}`}>
                      {thumbs[n - 1] ? <img src={thumbs[n - 1]} alt={`Page ${n}`} className="aspect-[3/4] w-full object-contain" /> : <div className="aspect-[3/4] animate-pulse bg-slate-200" />}
                      {selected.has(n) && <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white"><Check size={14} /></span>}
                      <span className="block py-1 text-center text-xs font-medium text-slate-600">Page {n}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <label className="text-sm font-medium">Resolution
                <select className="field mt-1" value={dpi} onChange={(e) => setDpi(Number(e.target.value))}>
                  <option value={72}>72 DPI (smallest)</option><option value={150}>150 DPI (recommended)</option><option value={300}>300 DPI (print quality)</option>
                </select>
              </label>
              <label className="text-sm font-medium">JPG quality: {quality}%
                <input type="range" min={40} max={100} step={5} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="mt-3 w-full accent-indigo-600" />
              </label>
            </div>

            {busy ? <div className="card p-4"><Loading message="Converting pages…" progress={progress} /></div> : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1" onClick={convert} disabled={!selected.size}>Convert PDF to JPG</button>
                <button className="btn-secondary" onClick={reset}><RotateCcw size={18} /> Reset</button>
              </div>
            )}

            {results.length > 0 && (
              <div className="card p-4 sm:p-5">
                <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <h2 className="font-semibold text-slate-900">Your JPG images</h2>
                  <button className="btn-primary bg-green-600 hover:bg-green-700" onClick={downloadZip}><Download size={18} /> Download all as ZIP</button>
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {results.map((r) => (
                    <li key={r.page} className="overflow-hidden rounded-xl border">
                      <img src={r.url} alt={`Converted page ${r.page}`} className="aspect-[3/4] w-full object-contain bg-slate-50" />
                      <a href={r.url} download={`${baseName(file.name)}-page-${r.page}.jpg`} className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
                        <Download size={16} /> Page {r.page} · {formatSize(r.blob.size)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <PdfToJpgArticle />
      <RelatedTools current="/pdf-to-jpg" />
    </div>
  );
}
