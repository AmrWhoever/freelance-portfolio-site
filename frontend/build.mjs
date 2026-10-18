import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Unexpected output directory');
await rm(output, { recursive: true, force: true });
// Always deploy only this directory, never the Laravel repository or public/.
await mkdir(output, { recursive: true });
await cp(path.join(root, 'baseline'), output, { recursive: true });
const css = await readFile(path.join(root, 'src/layout.css'), 'utf8');
const digest = createHash('sha256').update(css).digest('hex').slice(0, 12);
const name = `layout-${digest}.css`;
await writeFile(path.join(output, 'assets', name), css);
let html = await readFile(path.join(root, 'baseline/index.html'), 'utf8');
html = html.replace('<body>', '<body class="amrotech-site">');
html = html.replace(/<title>[^<]*<\/title>/, '<title>عمرو تك AmroTech | تطوير مواقع ومتاجر وأنظمة مخصصة</title>');
html = html.replace('</head>', `  <link rel="stylesheet" href="/assets/${name}">\n</head>`);
const home = await readFile(path.join(root, 'src/home-content.html'), 'utf8');
html = html.replace('<div id="app"></div>', `<div id="app">${home.trim()}</div>`);
const { google } = JSON.parse(await readFile(path.join(root, 'src/search-verification.json'), 'utf8'));
if (google && !/^[A-Za-z0-9_-]+$/.test(google)) throw new Error('Invalid Search Console verification value');
const structured = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://amrotech.pages.dev/#organization',
      name: 'AmroTech', alternateName: 'عمرو تك', url: 'https://amrotech.pages.dev/',
      logo: 'https://amrotech.pages.dev/amrotech-mark.svg' },
    { '@type': 'WebSite', '@id': 'https://amrotech.pages.dev/#website',
      url: 'https://amrotech.pages.dev/', name: 'AmroTech | عمرو تك',
      inLanguage: ['ar', 'en'], publisher: { '@id': 'https://amrotech.pages.dev/#organization' } },
  ],
};
const seo = await readFile(path.join(root, 'src/search-metadata.js'), 'utf8');
const seoDigest = createHash('sha256').update(seo).digest('hex').slice(0, 12);
await writeFile(path.join(output, 'assets', `search-${seoDigest}.js`), seo);
html = html.replace('</head>', `
  <link rel="canonical" href="https://amrotech.pages.dev/">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:url" content="https://amrotech.pages.dev/">
  <meta property="og:site_name" content="AmroTech">
  <meta property="og:locale" content="ar_SA">
  <meta property="og:locale:alternate" content="en_US">
  <meta name="twitter:card" content="summary">
  ${google ? `<meta name="google-site-verification" content="${google}">` : ''}
  <script type="application/ld+json">${JSON.stringify(structured)}</script>
  <script type="module" src="/assets/search-${seoDigest}.js"></script>
</head>`);
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://amrotech.pages.dev/sitemap.xml\n');
await writeFile(path.join(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://amrotech.pages.dev/</loc></url></urlset>\n');
await writeFile(path.join(output, '404.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | AmroTech</title></head><body style="margin:0;padding:3rem 1.5rem;background:#020910;color:#ecf7ff;font-family:system-ui"><main style="max-width:40rem;margin:auto"><h1>Page not found · الصفحة غير موجودة</h1><p>This address does not exist. هذا الرابط غير موجود.</p><a href="/" style="color:#8ce2d5">AmroTech · العودة للرئيسية</a></main></body></html>');
await writeFile(path.join(output, '_headers'), '/robots.txt\n  Content-Type: text/plain; charset=utf-8\n/sitemap.xml\n  Content-Type: application/xml; charset=utf-8\n/build-info.json\n  X-Robots-Tag: noindex\n');
await writeFile(path.join(output, 'build-info.json'), JSON.stringify({
  project: 'amrotech', baseline: '2026-10-16', layout: digest,
  commit: process.env.GITHUB_SHA || null,
  search: seoDigest,
}, null, 2) + '\n');
console.log(`Built frontend/dist; layout ${digest}`);

