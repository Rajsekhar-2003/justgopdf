// Single place for domain, brand and per-page SEO data.
// Used by the React app AND by scripts/prerender.mjs (keep this file free of JSX/imports).
export const SITE_URL = 'https://justgopdf.com'; // change here if your domain differs (no trailing slash)
export const SITE_NAME = 'IFeelPDF';
export const CONTACT_EMAIL = 'contact@justgopdf.com'; // make sure this mailbox exists
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const PAGES = [
  { path: '/', priority: '1.0', title: 'Free Online PDF Tools – JPG to PDF, PDF to JPG, Compress PDF | IFeelPDF',
    description: 'Free online PDF tools: convert JPG to PDF, convert PDF to JPG and compress PDF files. Fast, private, no signup. Files never leave your device.' },
  { path: '/jpg-to-pdf', priority: '0.9', title: 'JPG to PDF Converter – Combine Images into One PDF Free | IFeelPDF',
    description: 'Convert JPG, JPEG and PNG images to one PDF online for free. Arrange pages, choose A4 or Letter, set margins. No signup, no upload.' },
  { path: '/pdf-to-jpg', priority: '0.9', title: 'PDF to JPG Converter – Convert PDF Pages to Images Free | IFeelPDF',
    description: 'Convert PDF pages to high-quality JPG images online for free. Pick pages, choose 72, 150 or 300 DPI, download as ZIP. No signup, no upload.' },
  { path: '/compress-pdf', priority: '0.9', title: 'Compress PDF Online – Reduce PDF File Size Free | IFeelPDF',
    description: 'Reduce PDF file size online for free. Choose low, recommended or high compression and see the real before and after size. Files stay on your device.' },
  { path: '/about', priority: '0.4', title: 'About IFeelPDF – Free Private Online PDF Tools',
    description: 'IFeelPDF offers simple, fast and free PDF tools that run in your browser. Learn how we keep your documents private.' },
  { path: '/contact', priority: '0.4', title: 'Contact IFeelPDF – Questions and Feedback',
    description: 'Contact the IFeelPDF team with questions, feedback or suggestions about our free online PDF tools.' },
  { path: '/privacy-policy', priority: '0.3', title: 'Privacy Policy | IFeelPDF',
    description: 'IFeelPDF processes your files in your browser. Read our privacy policy to see what we do and do not collect.' },
  { path: '/terms', priority: '0.3', title: 'Terms and Conditions | IFeelPDF',
    description: 'Terms and conditions for using the free IFeelPDF online PDF tools.' },
];

export const getPage = (path) => PAGES.find((p) => p.path === path) || PAGES[0];
export const urlFor = (path) => SITE_URL + (path === '/' ? '/' : path);

export function toolJsonLd(path, name) {
  const p = getPage(path);
  return [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name, url: urlFor(path), description: p.description,
      applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: urlFor('/') },
      { '@type': 'ListItem', position: 2, name, item: urlFor(path) } ] },
  ];
}
