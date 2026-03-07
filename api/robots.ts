import fs from 'fs';
import path from 'path';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(robotsContent);
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send('User-agent: *\nDisallow: /api/\n');
  }
}
