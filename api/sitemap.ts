// api/sitemap.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jamien-drone-cleaning.vercel.app/</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jamien-drone-cleaning.vercel.app/services</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://jamien-drone-cleaning.vercel.app/about</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://jamien-drone-cleaning.vercel.app/contact</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.status(200).send(sitemapContent);
}
