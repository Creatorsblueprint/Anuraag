import fs from 'fs';
import path from 'path';
import { PAGES } from './src/router/routes.js';

// Runs after "npm run build". Two jobs:
//
// 1. A real file for every page (dist/speaking/index.html, dist/about/...).
//    The site is plain files on GitHub Pages. Without these, opening
//    /speaking directly finds no file, so GitHub answers "404 not found"
//    and 404.html bounces the visitor to the home page and back. People
//    still see the page, but Google may skip it and link previews (WhatsApp,
//    LinkedIn) show the home page. Each file is a copy of index.html with
//    that page's title, description and address filled in.
//
// 2. sitemap.xml, the list of pages Google reads, made from the same list
//    of pages (src/router/routes.js), so a new page is never forgotten.
//
// The event page is left out of job 1: vite-plugin-event-page.js makes its
// file, with its own picture for link previews.

const SITE = 'https://dranuraagguglaani.com';

// One sentence per page, shown by Google and in link previews.
// (The home page keeps the description written in index.html.)
const DESCRIPTIONS = {
  about: 'The story, roles and recognition of Dr. Anuraag Guglaani, Group CEO and Chair of Wazir Holdings and The Family Business Doctor™.',
  speaking: 'Keynotes, panels and talks by Dr. Anuraag Guglaani on family business, governance and enterprise transformation.',
  'board-advisory': 'Board and advisory roles held by Dr. Anuraag Guglaani across business, governance and education.',
  academic: 'Dr. Anuraag Guglaani\'s academic work as Adjunct Professor of Strategy and Enterprise Governance.',
  book: 'You Will Not Fly: Grounded at Twenty, Airborne Ever Since. The book by Dr. Anuraag Guglaani.',
  insights: 'Articles and updates from Dr. Anuraag Guglaani on family business, leadership and governance.',
  'media-kit': 'Biography, honours and awards of Dr. Anuraag Guglaani for press and event organisers.',
  contact: 'Get in touch with Dr. Anuraag Guglaani for speaking, advisory and media enquiries.'
};

// Makes text safe to place inside an HTML attribute or tag ("&" -> "&amp;").
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Replaces one tag in the page's <head>, e.g. the <meta property="og:url" ... />.
// "pattern" finds the old tag; "tag" is the new one.
function replaceTag(html, pattern, tag) {
  return html.replace(pattern, tag);
}

export default function pageFilesPlugin() {
  return {
    name: 'page-files-and-sitemap',
    closeBundle() {
      const distIndex = path.resolve('dist/index.html');
      if (!fs.existsSync(distIndex)) return;
      const html = fs.readFileSync(distIndex, 'utf8');

      // Job 1: one file per page (not the home page, not the event page).
      const made = [];
      for (const [address, { page, title }] of Object.entries(PAGES)) {
        if (address === '' || page === 'event') continue;

        const url = `${SITE}/${address}`;
        const safeTitle = escapeHtml(title);
        const description = escapeHtml(DESCRIPTIONS[address] || '');

        let pageHtml = html;
        pageHtml = replaceTag(pageHtml, /<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
        pageHtml = replaceTag(pageHtml, /<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${url}" />`);
        pageHtml = replaceTag(pageHtml, /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`);
        pageHtml = replaceTag(pageHtml, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${safeTitle}" />`);
        pageHtml = replaceTag(pageHtml, /<meta\s+name="twitter:url"[\s\S]*?\/>/, `<meta name="twitter:url" content="${url}" />`);
        pageHtml = replaceTag(pageHtml, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${safeTitle}" />`);
        if (description) {
          pageHtml = replaceTag(pageHtml, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`);
          pageHtml = replaceTag(pageHtml, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${description}" />`);
          pageHtml = replaceTag(pageHtml, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${description}" />`);
        }

        const dir = path.resolve('dist', address);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), pageHtml, 'utf8');
        made.push(address);
      }
      console.log(`✓ Generated page files: ${made.join(', ')}`);

      // Job 2: sitemap.xml with every page, dated today.
      const today = new Date().toISOString().slice(0, 10);
      const urls = Object.keys(PAGES).map((address) => {
        const loc = address === '' ? `${SITE}/` : `${SITE}/${address}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
      });
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
      fs.writeFileSync(path.resolve('dist/sitemap.xml'), sitemap, 'utf8');
      console.log(`✓ Generated sitemap.xml with ${urls.length} pages`);
    }
  };
}
