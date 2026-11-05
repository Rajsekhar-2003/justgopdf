import * as pdfjs from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import JSZip from 'jszip';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export async function openPdf(file) {
  try {
    return await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  } catch (err) {
    if (err?.name === 'PasswordException') {
      throw new Error('This PDF is password protected. Remove the password and try again.');
    }
    throw new Error('This file could not be read as a PDF. It may be damaged.');
  }
}

export async function renderPageToCanvas(pdf, pageNumber, scale) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  page.cleanup();
  return canvas;
}

const toBlob = (canvas, quality) =>
  new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Image is too large for this device. Try a lower resolution.'))), 'image/jpeg', quality)
  );

export async function renderPageToJpg(pdf, pageNumber, dpi, quality) {
  const canvas = await renderPageToCanvas(pdf, pageNumber, dpi / 72);
  const blob = await toBlob(canvas, quality);
  canvas.width = canvas.height = 0; // release memory
  return blob;
}

export const renderThumbnail = (pdf, pageNumber) => renderPageToJpg(pdf, pageNumber, 40, 0.6);

export async function zipImages(images, baseName) {
  const zip = new JSZip();
  images.forEach(({ page, blob }) => zip.file(`${baseName}-page-${page}.jpg`, blob));
  return zip.generateAsync({ type: 'blob' });
}
