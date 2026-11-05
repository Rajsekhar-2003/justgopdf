import { PDFDocument } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import { openPdf, renderPageToCanvas } from './pdfToJpg.js';

/**
 * low         – lossless: rewrites the file structure with object streams. Text stays selectable.
 * recommended – re-renders pages as JPEG at ~108 DPI, quality 70%.
 * high        – re-renders pages as JPEG at 72 DPI, quality 50%.
 * Re-rendering gives the biggest savings but turns text into images.
 */
export const LEVELS = {
  low: { label: 'Low compression', desc: 'Better quality, smaller reduction. Keeps text selectable.', scale: null },
  recommended: { label: 'Recommended compression', desc: 'Balanced quality and file size.', scale: 1.5, quality: 0.7 },
  high: { label: 'High compression', desc: 'Maximum size reduction. Lower image quality.', scale: 1, quality: 0.5 },
};

async function losslessOptimize(file) {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  const bytes = await doc.save({ useObjectStreams: true });
  return new Blob([bytes], { type: 'application/pdf' });
}

async function rasterize(file, { scale, quality }, onProgress) {
  const pdf = await openPdf(file);
  let doc = null;
  try {
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const canvas = await renderPageToCanvas(pdf, n, scale);
      const data = canvas.toDataURL('image/jpeg', quality);
      canvas.width = canvas.height = 0;
      const o = base.width > base.height ? 'l' : 'p';
      if (!doc) doc = new jsPDF({ unit: 'pt', format: [base.width, base.height], orientation: o, compress: true });
      else doc.addPage([base.width, base.height], o);
      doc.addImage(data, 'JPEG', 0, 0, base.width, base.height, undefined, 'FAST');
      onProgress(n / pdf.numPages);
    }
  } finally {
    pdf.destroy();
  }
  return doc.output('blob');
}

/** Returns { blob, size, original, smaller }. blob is null when no size reduction was possible. */
export async function compressPdf(file, level, onProgress = () => {}) {
  const cfg = LEVELS[level];
  let blob;
  try {
    blob = cfg.scale ? await rasterize(file, cfg, onProgress) : await losslessOptimize(file);
  } catch (err) {
    if (/encrypt/i.test(err.message || '')) throw new Error('This PDF is password protected. Remove the password and try again.');
    throw err;
  }
  const smaller = blob.size < file.size;
  return { blob: smaller ? blob : null, size: smaller ? blob.size : file.size, original: file.size, smaller };
}
