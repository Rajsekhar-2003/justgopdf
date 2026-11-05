import { jsPDF } from 'jspdf';

const SIZES = { a4: [210, 297], letter: [215.9, 279.4] };
const PX_TO_MM = 25.4 / 96;

const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('One of the images could not be read. It may be corrupted.'));
    img.src = url;
  });

/**
 * items: [{ file, url }]
 * options: { size: 'a4' | 'letter' | 'fit', orientation: 'portrait' | 'landscape', margin: number (mm) }
 */
export async function imagesToPdf(items, { size, orientation, margin }, onProgress = () => {}) {
  let doc = null;
  for (let i = 0; i < items.length; i++) {
    const { file, url } = items[i];
    const img = await loadImage(url);
    const iw = img.naturalWidth * PX_TO_MM;
    const ih = img.naturalHeight * PX_TO_MM;

    let pw, ph, w, h;
    if (size === 'fit') {
      w = iw; h = ih;
      pw = iw + margin * 2; ph = ih + margin * 2;
    } else {
      [pw, ph] = SIZES[size];
      if (orientation === 'landscape') [pw, ph] = [ph, pw];
      const ratio = Math.min((pw - margin * 2) / iw, (ph - margin * 2) / ih);
      w = iw * ratio; h = ih * ratio;
    }
    const o = pw > ph ? 'l' : 'p';
    if (!doc) doc = new jsPDF({ unit: 'mm', format: [pw, ph], orientation: o, compress: true });
    else doc.addPage([pw, ph], o);

    const fmt = file.type === 'image/png' ? 'PNG' : 'JPEG';
    doc.addImage(img, fmt, (pw - w) / 2, (ph - h) / 2, w, h, undefined, 'FAST');
    onProgress((i + 1) / items.length);
  }
  return doc.output('blob');
}
