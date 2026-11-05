// Post-build: writes route-specific HTML (title, description, canonical, Open Graph, noscript text),
// plus sitemap.xml and robots.txt, so crawlers and link previews see correct tags without running JS.
import fs from 'node:fs';
import path from 'node:path';
import { PAGES, SITE_URL, OG_IMAGE, SITE_NAME, urlFor } from '../src/config/site.js';

const dist = path.resolve('dist');
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const h1s = { '/': 'All Your PDF Tools in One Place', '/jpg-to-pdf': 'JPG to PDF Converter', '/pdf-to-jpg': 'PDF to JPG Converter', '/compress-pdf': 'Compress PDF Online' };

for (const p of PAGES) {
  const url = urlFor(p.path);
  const meta = [
    `<meta name="robots" content="index, follow, max-image-preview:large" data-rh="true" />`,
    `<link rel="canonical" href="${url}" data-rh="true" />`,
    `<meta property="og:type" content="website" data-rh="true" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(p.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(p.description)}" data-rh="true" />`,
    `<meta property="og:url" content="${url}" data-rh="true" />`,
    `<meta property="og:image" content="${OG_IMAGE}" data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" data-rh="true" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" data-rh="true" />`,
  ].join('\n    ');
  let html = tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(p.description)}" data-rh="true" />`)
    .replace('</head>', `    ${meta}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    <noscript><h1>${esc(h1s[p.path] || p.title)}</h1><p>${esc(p.description)}</p><p>JavaScript is required to use these PDF tools.</p></noscript>`);
  const out = p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PAGES.map((p) => `  <url><loc>${urlFor(p.path)}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n') + `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Prerendered ${PAGES.length} pages, sitemap.xml and robots.txt`);
