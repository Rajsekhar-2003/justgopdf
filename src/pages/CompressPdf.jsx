import Seo from '../components/Seo.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import CompressPdfArticle from '../content/CompressPdfArticle.jsx';
import { toolJsonLd } from '../config/site.js';
import { useEffect, useState } from 'react';
import { ArrowRight, Download, FileText, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import UploadArea from '../components/UploadArea.jsx';
import Loading from '../components/Loading.jsx';
import Notice from '../components/Notice.jsx';
import { compressPdf, LEVELS } from '../utils/compressPdf.js';
import { baseName, formatSize, MAX_PDF_MB } from '../utils/helpers.js';

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('recommended');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(undefined);
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => () => { if (result?.url) URL.revokeObjectURL(result.url); }, [result]);

  const reset = () => { setFile(null); setResult(null); setNotice(null); setProgress(undefined); };

  const run = async () => {
    setBusy(true); setNotice(null); setResult(null); setProgress(level === 'low' ? undefined : 0);
    try {
      const r = await compressPdf(file, level, setProgress);
      setResult({ ...r, url: r.blob ? URL.createObjectURL(r.blob) : null });
      if (!r.smaller) setNotice({ type: 'info', message: 'This PDF could not be made smaller at this level. It is probably already optimized, or mostly text and vector graphics. Your original file is unchanged. Try a higher compression level.' });
      else setNotice({ type: 'success', message: 'Compression complete.' });
    } catch (e) {
      setNotice({ type: 'error', message: e.message || 'Compression failed. The file may be damaged.' });
    } finally { setBusy(false); }
  };

  const saved = result?.smaller ? Math.round((1 - result.size / result.original) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <Seo path="/compress-pdf" jsonLd={toolJsonLd("/compress-pdf", "Compress PDF")} />
      <PageHeader title="Compress PDF Online" subtitle="Reduce your PDF file size for free. See the real size before and after." />
      <div className="space-y-5">
        <Notice notice={notice} onClose={() => setNotice(null)} />
        {!file ? (
          <UploadArea accept={['application/pdf']} extensions={['.pdf']} maxSizeMB={MAX_PDF_MB} title="Drag & drop your PDF here"
            hint={`PDF files up to ${MAX_PDF_MB} MB`} buttonLabel="Browse PDF" onFiles={([f]) => { setFile(f); setResult(null); setNotice(null); }} onError={(m) => setNotice({ type: 'error', message: m })} />
        ) : (
          <>
            <div className="card flex items-center gap-4 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600"><FileText /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-500">Original size: {formatSize(file.size)}</p>
              </div>
            </div>

            <fieldset className="card space-y-2 p-4 sm:p-5" disabled={busy}>
              <legend className="sr-only">Compression level</legend>
              {Object.entries(LEVELS).map(([key, l]) => (
                <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${level === key ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}>
                  <input type="radio" name="level" className="mt-1 accent-indigo-600" checked={level === key} onChange={() => { setLevel(key); setResult(null); setNotice(null); }} />
                  <span><span className="block font-semibold text-slate-900">{l.label}</span><span className="text-sm text-slate-600">{l.desc}</span></span>
                </label>
              ))}
              {level !== 'low' && <p className="px-1 pt-1 text-xs text-slate-500">Recommended and High re-render pages as images. Text will no longer be selectable or searchable.</p>}
            </fieldset>

            {busy ? <div className="card p-4"><Loading message="Compressing your PDF…" progress={progress} /></div> : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1" onClick={run}>Compress PDF</button>
                <button className="btn-secondary" onClick={reset}><RotateCcw size={18} /> Reset</button>
              </div>
            )}

            {result && (
              <div className="card p-5">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div><p className="text-sm text-slate-500">Before</p><p className="text-xl font-bold text-slate-900">{formatSize(result.original)}</p></div>
                  <ArrowRight className="text-slate-400" />
                  <div><p className="text-sm text-slate-500">After</p><p className={`text-xl font-bold ${result.smaller ? 'text-green-600' : 'text-slate-900'}`}>{formatSize(result.size)}</p></div>
                </div>
                <p className="mt-4 text-center font-semibold text-slate-800">{result.smaller ? `${saved}% smaller` : 'No size reduction possible'}</p>
                {result.smaller && (
                  <a href={result.url} download={`${baseName(file.name)}-compressed.pdf`} className="btn-primary mt-4 w-full bg-green-600 hover:bg-green-700"><Download size={18} /> Download compressed PDF</a>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <CompressPdfArticle />
      <RelatedTools current="/compress-pdf" />
    </div>
  );
}
