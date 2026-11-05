# IFeelPDF

React + Vite + Tailwind PDF tools: JPG to PDF, PDF to JPG, Compress PDF. All processing runs in the browser.

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # builds, then generates per-page HTML, sitemap.xml and robots.txt in dist/

## SEO setup
- Domain, brand name and contact email: `src/config/site.js` (default domain https://justgopdf.com)
- Titles and descriptions for every page: `PAGES` in `src/config/site.js`
- Article text: `src/content/`
- After deploying: add the site in Google Search Console and submit https://justgopdf.com/sitemap.xml
- `public/_redirects` (Netlify) and `vercel.json` (Vercel) handle SPA routing.
