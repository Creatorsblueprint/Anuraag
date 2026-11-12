import fs from 'fs';
import path from 'path';

export default function multiPageHtmlPlugin() {
  return {
    name: 'event-html-generator',
    closeBundle() {
      const distIndex = path.resolve('dist/index.html');
      if (!fs.existsSync(distIndex)) return;

      const html = fs.readFileSync(distIndex, 'utf8');

      const eventHtml = html
        .replace(/<title>[\s\S]*?<\/title>/, '<title>Digital Book Launch & World Record Attempt | Dr. Anuraag Guglaani</title>')
        .replace(/<meta\s+name="description"[\s\S]*?\/>/, '<meta name="description" content="Register for the official World Record Attempt: Most Nationalities in a Digital Book Launch on 22 Nov 2026, hosted by Dr. Anuraag Guglaani." />')
        .replace(/<link\s+rel="canonical"[\s\S]*?\/>/, '<link rel="canonical" href="https://dranuraagguglaani.com/event" />')
        .replace(/<meta\s+property="og:url"[\s\S]*?\/>/, '<meta property="og:url" content="https://dranuraagguglaani.com/event" />')
        .replace(/<meta\s+property="og:title"[\s\S]*?\/>/, '<meta property="og:title" content="Digital Book Launch & World Record Attempt | Dr. Anuraag Guglaani" />')
        .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, '<meta property="og:description" content="Join the official World Record Attempt for Most Nationalities in a Digital Book Launch on 22 Nov 2026 at 3:00 PM GST." />')
        .replace(/<meta\s+property="og:image"[\s\S]*?\/>/, '<meta property="og:image" content="https://dranuraagguglaani.com/event_og_image.jpg" />')
        .replace(/<meta\s+property="og:image:alt"[\s\S]*?\/>/, '<meta property="og:image:alt" content="World Record Attempt - Digital Book Launch by Dr. Anuraag Guglaani" />')
        .replace(/<meta\s+name="twitter:url"[\s\S]*?\/>/, '<meta name="twitter:url" content="https://dranuraagguglaani.com/event" />')
        .replace(/<meta\s+name="twitter:title"[\s\S]*?\/>/, '<meta name="twitter:title" content="Digital Book Launch & World Record Attempt | Dr. Anuraag Guglaani" />')
        .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/, '<meta name="twitter:description" content="Join the official World Record Attempt for Most Nationalities in a Digital Book Launch on 22 Nov 2026 at 3:00 PM GST." />')
        .replace(/<meta\s+name="twitter:image"[\s\S]*?\/>/, '<meta name="twitter:image" content="https://dranuraagguglaani.com/event_og_image.jpg" />');

      const eventDir = path.resolve('dist/event');
      fs.mkdirSync(eventDir, { recursive: true });
      fs.writeFileSync(path.join(eventDir, 'index.html'), eventHtml, 'utf8');
      console.log('✓ Generated dist/event/index.html with dedicated event OG metadata');
    }
  };
}
