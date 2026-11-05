import { Helmet } from 'react-helmet-async';
import { OG_IMAGE, SITE_NAME, getPage, urlFor } from '../config/site.js';

export default function Seo({ path, jsonLd, noindex = false, title, description }) {
  const p = getPage(path);
  const t = title || p.title;
  const d = description || p.description;
  const url = urlFor(path);
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
