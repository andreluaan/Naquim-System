// Uso: npm run evolucao:pdf   → diario/Sumi-System-Evolucao.pdf
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { marked } from 'marked';

const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = process.env.BROWSER_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error('Nenhum Chrome/Edge encontrado. Defina BROWSER_PATH.');

const source = resolve('diario', 'EVOLUCAO.md');
const htmlFile = resolve('diario', '.evolucao-print.html');
const pdfFile = resolve('diario', 'Sumi-System-Evolucao.pdf');

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

// O título do Markdown vira a capa; o resto vira o corpo.
const markdown = readFileSync(source, 'utf8').replace(/^# .*\r?\n/, '');
const body = marked.parse(markdown);

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Sumi System — Evolução do projeto</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  @page {
    size: A4;
    margin: 16mm 14mm;
  }

  @page :first {
    margin: 0;
  }

  :root {
    --paper: oklch(0.96 0.02 85);
    --paper-deep: oklch(0.92 0.025 85);
    --ink: oklch(0.2 0.02 265);
    --ink-muted: oklch(0.42 0.02 265);
    --rule: oklch(0.84 0.02 85);
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    margin: 0;
    color: var(--ink);
    font: 10.5pt/1.55 "Inter", system-ui, sans-serif;
  }

  .cover {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: 297mm;
    padding: 24mm 20mm 18mm;
    background: var(--paper);
    page-break-after: always;
  }

  .cover-mark {
    width: 56px;
    fill: var(--ink);
  }

  .cover h1 {
    margin: 0;
    font: 500 54pt/1 "Fraunces", serif;
    letter-spacing: -0.02em;
  }

  .cover-subtitle {
    margin-top: 6mm;
    font: 400 20pt/1.3 "Fraunces", serif;
    color: var(--ink-muted);
  }

  .cover-meta {
    border-top: 1px solid var(--rule);
    padding-top: 4mm;
    font-size: 9pt;
    color: var(--ink-muted);
  }

  h2 {
    margin: 0 0 3mm;
    font: 500 22pt/1.15 "Fraunces", serif;
    letter-spacing: -0.01em;
    page-break-after: avoid;
  }

  h2:not(:first-of-type) {
    page-break-before: always;
  }

  h3 {
    margin: 6mm 0 2mm;
    font: 600 11pt/1.3 "Inter", sans-serif;
    page-break-after: avoid;
  }

  p, li {
    color: var(--ink);
  }

  p em {
    color: var(--ink-muted);
  }

  a {
    color: var(--ink);
  }

  code {
    padding: 0 3px;
    border-radius: 3px;
    background: var(--paper-deep);
    font: 9pt "JetBrains Mono", monospace;
  }

  hr {
    display: none;
  }

  img {
    display: block;
    max-width: 100%;
    border: 1px solid var(--rule);
    border-radius: 4px;
    page-break-inside: avoid;
  }

  p > img {
    margin: 2mm 0 4mm;
  }

  table {
    width: 100%;
    margin: 3mm 0 5mm;
    border-collapse: collapse;
    font-size: 9pt;
    page-break-inside: avoid;
  }

  th, td {
    padding: 1.5mm 2mm;
    border-bottom: 1px solid var(--rule);
    text-align: left;
    vertical-align: top;
  }

  th {
    font-weight: 600;
  }

  td img {
    width: auto;
    max-width: 100%;
    max-height: 110mm;
  }

  td:nth-child(2) {
    white-space: nowrap;
  }

  td:has(img) {
    width: 50%;
    padding: 1.5mm;
    border-bottom: 0;
  }
</style>
</head>
<body>
  <section class="cover">
    <svg class="cover-mark" viewBox="0 0 24 24"><path d="M12 2.5S6.5 10.2 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 10.2 12 2.5 12 2.5Z" /></svg>
    <div>
      <h1>Sumi System</h1>
      <p class="cover-subtitle">Evolução do projeto, versão a versão</p>
    </div>
    <div class="cover-meta">Versão atual ${version} · gerado em ${today} · andreluaan.github.io/Nanquim-System</div>
  </section>
  ${body}
</body>
</html>`;

writeFileSync(htmlFile, html);

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=8000',
  '--allow-file-access-from-files',
  `--print-to-pdf=${pdfFile}`,
  pathToFileURL(htmlFile).href,
], { stdio: 'ignore' });

rmSync(htmlFile);
console.log(`PDF gerado em ${pdfFile}`);
