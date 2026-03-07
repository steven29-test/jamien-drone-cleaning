// api/robots.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://jamien-drone-cleaning.vercel.app/sitemap.xml

# Disallow private/admin paths
Disallow: /api/
Disallow: /admin/

# Crawl delay
Crawl-delay: 1`;

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.status(200).send(robotsContent);
}
