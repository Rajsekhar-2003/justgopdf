import Seo from '../components/Seo.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import JpgToPdfArticle from '../content/JpgToPdfArticle.jsx';
import { toolJsonLd } from '../config/site.js';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, RotateCcw, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import UploadArea from '../components/UploadArea.jsx';
import Loading from '../components/Loading.jsx';
import Notice from '../components/Notice.jsx';
import { imagesToPdf } from '../utils/jpgToPdf.js';
import { formatSize, MAX_IMAGE_MB, uid } from '../utils/helpers.js';

const ACCEPT = ['image/jpeg', 'image/png'];
const EXT = ['.jpg', '.jpeg', '.png'];

export default function JpgToPdf() {
  const [items, setItems] = useState([]);
  const [size, setSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState(10);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const itemsRef = useRef([]);
  itemsRef.current = items;

  useEffect(() => () => itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url)), []);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  const addFiles = (files) => {
    setResult(null);
    setItems((prev) => [...prev, ...files.map((file) => ({ id: uid(), file, url: URL.createObjectURL(file) }))]);
    setNotice(null);
  };
  const remove = (id) => {
    setResult(null);
    setItems((prev) => { const t = prev.find((i) => i.id === id); if (t) URL.revokeObjectURL(t.url); return prev.filter((i) => i.id !== id); });
  };
  const move = (from, to) => {
    if (to < 0 || to >= items.length || from === to) return;
    setResult(null);
    setItems((prev) => { const next = [...prev]; const [it] = next.splice(from, 1); next.splice(to, 0, it); return next; });
  };
  const reset = () => { items.forEach((i) => URL.revokeObjectURL(i.url)); setItems([]); setResult(null); setNotice(null); setProgress(0); };

  const convert = async () => {
    setBusy(true); setNotice(null); setProgress(0);
    try {
      const blob = await imagesToPdf(items, { size, orientation, margin }, setProgress);
      setResult({ url: URL.createObjectURL(blob), size: blob.size });
      setNotice({ type: 'success', message: 'Your PDF is ready to download.' });
    } catch (e) {
      setNotice({ type: 'error', message: e.message || 'Conversion failed. Please try again.' });
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-8">
      <Seo path="/jpg-to-pdf" jsonLd={toolJsonLd("/jpg-to-pdf", "JPG to PDF Converter")} />
      <PageHeader title="JPG to PDF Converter" subtitle="Combine JPG, JPEG and PNG images into one PDF for free. Drag to reorder pages." />
      <div className="space-y-5">
        <Notice notice={notice} onClose={() => setNotice(null)} />
        <UploadArea accept={ACCEPT} extensions={EXT} multiple maxSizeMB={MAX_IMAGE_MB} disabled={busy}
          title={items.length ? 'Add more images' : 'Drag & drop images here'} hint={`JPG, JPEG or PNG · up to ${MAX_IMAGE_MB} MB each`}
          buttonLabel="Browse images" onFiles={addFiles} onError={(m) => setNotice({ type: 'error', message: m })} />

        {items.length > 0 && (
          <>
            <div className="card p-4 sm:p-5">
              <h2 className="mb-1 font-semibold text-slate-900">{items.length} image{items.length > 1 ? 's' : ''}</h2>
              <p className="mb-4 text-sm text-slate-500">Drag images or use the arrows to change the page order.</p>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {items.map((it, i) => (
                  <li key={it.id} draggable onDragStart={() => setDragIndex(i)} onDragOver={(e) => e.preventDefault()}
                    onDrop={() => { move(dragIndex, i); setDragIndex(null); }} onDragEnd={() => setDragIndex(null)}
                    className={`relative cursor-grab overflow-hidden rounded-xl border bg-slate-50 ${dragIndex === i ? 'opacity-40' : ''}`}>
                    <img src={it.url} alt={it.file.name} className="h-32 w-full object-cover" draggable={false} />
                    <button onClick={() => remove(it.id)} aria-label={`Remove ${it.file.name}`}
                      className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow hover:bg-white"><X size={16} /></button>
                    <div className="p-2">
                      <p className="truncate text-xs font-medium text-slate-700">{i + 1}. {it.file.name}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-slate-500">{formatSize(it.file.size)}</span>
                        <span className="flex gap-1">
                          <button onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Move earlier" className="rounded p-1 hover:bg-slate-200 disabled:opacity-30"><ChevronLeft size={16} /></button>
                          <button onClick={() => move(i, i + 1)} disabled={i === items.length - 1} aria-label="Move later" className="rounded p-1 hover:bg-slate-200 disabled:opacity-30"><ChevronRight size={16} /></button>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
              <label className="text-sm font-medium">Page size
                <select className="field mt-1" value={size} onChange={(e) => { setSize(e.target.value); setResult(null); }}>
                  <option value="a4">A4</option><option value="letter">Letter</option><option value="fit">Fit to image</option>
                </select>
              </label>
              <label className="text-sm font-medium">Orientation
                <select className="field mt-1" value={orientation} disabled={size === 'fit'} onChange={(e) => { setOrientation(e.target.value); setResult(null); }}>
                  <option value="portrait">Portrait</option><option value="landscape">Landscape</option>
                </select>
              </label>
              <label className="text-sm font-medium">Margin
                <select className="field mt-1" value={margin} onChange={(e) => { setMargin(Number(e.target.value)); setResult(null); }}>
                  <option value={0}>None</option><option value={5}>Small (5 mm)</option><option value={10}>Medium (10 mm)</option><option value={20}>Large (20 mm)</option>
                </select>
              </label>
            </div>

            {busy ? <div className="card p-4"><Loading message="Creating your PDF…" progress={progress} /></div> : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1" onClick={convert}>Convert to PDF</button>
                {result && <a className="btn-primary flex-1 bg-green-600 hover:bg-green-700" href={result.url} download="images.pdf"><Download size={18} /> Download PDF ({formatSize(result.size)})</a>}
                <button className="btn-secondary" onClick={reset}><RotateCcw size={18} /> Reset</button>
              </div>
            )}
          </>
        )}
      </div>
      <JpgToPdfArticle />
      <RelatedTools current="/jpg-to-pdf" />
    </div>
  );
}
