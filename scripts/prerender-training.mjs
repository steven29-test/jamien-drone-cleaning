import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

// Render the same React page for all visitors, including crawlers without JS.
export async function prerenderTraining(distDir) {
  const output = path.join(distDir, '.training-render.mjs');
  try {
    await build({
      stdin: {
        contents: `import React from 'react'; import { renderToString } from 'react-dom/server'; import { MemoryRouter } from 'react-router-dom'; import Training from './src/pages/DroneTraining'; export const markup = renderToString(React.createElement(MemoryRouter, {initialEntries:['/drone-training']}, React.createElement(Training)));`,
        resolveDir: process.cwd(),
        loader: 'tsx',
      },
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external',
      jsx: 'automatic',
      loader: { '.css': 'empty' },
      outfile: output,
    });
    const { markup } = await import(pathToFileURL(output).href);
    let html = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
    const title = 'Drone Training Sydney | RePL Courses | Jamien Drone Academy';
    const description = 'Explore RePL drone training in Sydney with Jamien Drone Academy. Ask about beginner courses, licence upgrades, group training, fees and Chinese-language enquiries.';
    const url = 'https://www.jamiendrone.com.au/drone-training';
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
      .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
      .replace(/<noscript>[\s\S]*?<\/noscript>/g, '')
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    for (const [property, value] of Object.entries({ 'og:title': title, 'og:description': description, 'og:url': url, 'og:site_name': 'Jamien Drone', 'twitter:title': title, 'twitter:description': description, 'twitter:url': url })) {
      html = html.replace(new RegExp(`<meta property="${property}"[^>]*>`), `<meta property="${property}" content="${value}" />`);
    }
    const schema = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${url}#page`, url, name: title, description, inLanguage: 'en-AU', isPartOf: { '@id': 'https://www.jamiendrone.com.au/#website' }, about: ['Drone training in Sydney', 'Remote Pilot Licence (RePL) training enquiries'] },
      { '@type': 'WebSite', '@id': 'https://www.jamiendrone.com.au/#website', url: 'https://www.jamiendrone.com.au/', name: 'Jamien Drone' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jamiendrone.com.au/' }, { '@type': 'ListItem', position: 2, name: 'Drone Training Sydney', item: url }] },
    ] };
    html = html.replace('</head>', `<script id="training-page-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`);
    if (!html.includes('id="enquiry"') || !html.includes('悉尼无人机培训咨询')) throw new Error('Training prerender is missing page content');
    await fs.mkdir(path.join(distDir, 'drone-training'), { recursive: true });
    await fs.writeFile(path.join(distDir, 'drone-training/index.html'), html);
    console.log('Prerendered /drone-training with route-specific metadata and visible content');
  } finally {
    await fs.unlink(output).catch(() => {});
  }
}
