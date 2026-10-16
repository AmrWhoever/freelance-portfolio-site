import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
// Always deploy only this directory, never the Laravel repository or public/.
await mkdir(output, { recursive: true });
await cp(path.join(root, 'baseline'), output, { recursive: true });
const css = await readFile(path.join(root, 'src/layout.css'), 'utf8');
const digest = createHash('sha256').update(css).digest('hex').slice(0, 12);
const name = `layout-${digest}.css`;
await writeFile(path.join(output, 'assets', name), css);
let html = await readFile(path.join(root, 'baseline/index.html'), 'utf8');
html = html.replace('<body>', '<body class="amrotech-site">');
html = html.replace('</head>', `  <link rel="stylesheet" href="/assets/${name}">\n</head>`);
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output, 'build-info.json'), JSON.stringify({
  project: 'amrotech', baseline: '2026-10-16', layout: digest,
  commit: process.env.GITHUB_SHA || null,
}, null, 2) + '\n');
console.log(`Built frontend/dist; layout ${digest}`);
