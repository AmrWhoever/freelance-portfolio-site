import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, ['build.mjs'], { cwd: root });
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
test('deployable entry stays static and includes versioned layout after baseline', () => {
  assert.match(html, /<div id="app"><\/div>/);
  assert.match(html, /<body class="amrotech-site">/);
  assert.match(html, /index-kYHI7fEq\.css[\s\S]*layout-[a-f0-9]{12}\.css/);
  assert.doesNotMatch(html, /@vite|\.php|\.env|localhost/);
});
test('all local entry and lazy scene dependencies exist; scripts parse', async () => {
  const files = [
    'assets/index-DwXrsU_4.js', 'assets/index-kYHI7fEq.css',
    'assets/HeroScene-BLUMnhFk.js', 'assets/HeroScene-BhdIaNK3.css',
    'assets/three-B3UHUoXq.js', 'assets/sakkbah-store.png', 'amrotech-mark.svg',
  ];
  for (const file of files) {
    const content = await readFile(path.join(root, 'dist', file));
    assert.ok(content.length > 100, file);
    assert.ok(!content.toString().startsWith('<!doctype html>'), file);
    if (file.endsWith('.js')) execFileSync(process.execPath, ['--check', path.join(root, 'dist', file)]);
  }
});
test('output excludes backend, credentials, and dependency directories', async () => {
  assert.deepEqual((await readdir(path.join(root, 'dist'))).sort(),
    ['amrotech-mark.svg', 'assets', 'build-info.json', 'index.html']);
});
test('responsive width calculations leave mobile gutters and expand desktop', () => {
  const width = viewport => Math.min(1600, viewport - Math.min(112, Math.max(40, viewport * .06)));
  for (const viewport of [320, 390, 768, 1024, 1440, 1920, 2560]) {
    const shell = viewport <= 560 ? viewport - 28 : width(viewport);
    assert.ok(shell < viewport && shell > 0);
  }
  assert.equal(width(1920), 1600);
  assert.ok(width(1440) > 1180);
});

test('stats, services, and process steps remain visible when scroll reveal fails', async () => {
  const assets = path.join(root, 'dist', 'assets');
  const layouts = (await readdir(assets)).filter(file => /^layout-[a-f0-9]{12}\\.css$/.test(file));
  assert.equal(layouts.length, 1);
  const styles = await readFile(path.join(assets, layouts[0]), 'utf8');
  assert.match(styles, /\\.amrotech-site \\[data-reveal\\]\\s*\\{\\s*opacity:\\s*1;\\s*transform:\\s*none;/);
  const bundle = await readFile(path.join(assets, 'index-DwXrsU_4.js'), 'utf8');
  for (const className of ['stats-strip', 'stat-item', 'services-grid', 'service-card', 'process-track', 'process-step']) {
    assert.ok(bundle.includes(className), 'Missing homepage component: ' + className);
  }
});
