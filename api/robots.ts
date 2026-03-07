// api/robots.ts - Dynamically generate robots.txt based on hostname
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers.host || '';
  
  // Block staging from search engines
  if (host.includes('stage')) {
    const robotsTxt = `User-agent: *
Disallow: /

# Staging environment - do not index
`;
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(robotsTxt);
  }

  // Production robots.txt - allow search engines with sitemap
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://jamien-drone-cleaning.vercel.app/sitemap.xml

# Disallow private/admin paths
Disallow: /api/
Disallow: /admin/

# Crawl delay
Crawl-delay: 1
`;
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(robotsTxt);
}
