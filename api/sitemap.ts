// api/sitemap.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.jamiendrone.com.au/</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.jamiendrone.com.au/services</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url><loc>https://www.jamiendrone.com.au/drone-training</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.jamiendrone.com.au/equipment</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url>
    <loc>https://www.jamiendrone.com.au/about</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.jamiendrone.com.au/contact</loc>
    <lastmod>2026-03-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>

  <url><loc>https://www.jamiendrone.com.au/services/residential/roof-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/residential/driveway-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/residential/house-washing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/residential/solar-panel-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/residential/window-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>

  <url><loc>https://www.jamiendrone.com.au/services/commercial/warehouse-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/commercial/apartment-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/commercial/school-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/commercial/office-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.jamiendrone.com.au/services/commercial/strata-cleaning</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.status(200).send(sitemapContent);
}
