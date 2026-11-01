// Uso: npm run evolucao -- [v0.1.0 v0.2.0 ...]   (sem argumentos: todas as tags v*)
// Cada versão é aberta numa cópia temporária do repositório (git worktree) e fotografada nas mesmas telas.
import { execFile, execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = process.env.BROWSER_PATH ?? BROWSERS.find(existsSync);
if (!browser) throw new Error('Nenhum Chrome/Edge encontrado. Defina BROWSER_PATH.');

const DESKTOP = [1440, 900];
const MOBILE = [390, 844];
const FULL_PAGE = [1440, 4200];

// [arquivo, página ('' = abertura da versão), parâmetros, tamanho]
const SHOTS = [
  ['01-abertura', '', {}, DESKTOP],
  ['02-cores', 'cores', {}, DESKTOP],
  ['03-botoes', 'botoes', {}, DESKTOP],
  ['03b-icones', 'icones', {}, DESKTOP],
  ['03c-badges', 'badges', {}, DESKTOP],
  ['03d-cards', 'cards', {}, DESKTOP],
  ['03e-formularios', 'formularios', {}, DESKTOP],
  ['03f-carrossel', 'carrossel', {}, DESKTOP],
  ['03g-modal', 'sobreposicoes', { abrir: 'modal-newsletter' }, DESKTOP],
  ['03h-secoes', 'secoes', {}, DESKTOP],
  ['03i-site-completo', 'site-completo', {}, DESKTOP],
  ['04-modo-claro', '', { mode: 'light' }, DESKTOP],
  ['05-laboratorio', '', { lab: '' }, DESKTOP],
  ['06-mobile', '', {}, MOBILE],
  ['07-pagina-completa', '', {}, FULL_PAGE],
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
};

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function serve(root, port) {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(root, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise((done) => server.listen(port, () => done(server)));
}

// Assíncrono de propósito: o servidor roda neste mesmo processo e precisa responder ao navegador.
function screenshot(url, [width, height], file) {
  return execFileAsync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    '--virtual-time-budget=5000',
    `--screenshot=${file}`,
    url,
  ]);
}

const versions = process.argv.slice(2).length
  ? process.argv.slice(2)
  : git('tag', '--list', 'v*', '--sort=version:refname').split('\n').filter(Boolean);

const workRoot = join(tmpdir(), 'sumi-evolucao');
let port = 5300;

for (const version of versions) {
  const worktree = join(workRoot, version);
  rmSync(worktree, { recursive: true, force: true });
  git('worktree', 'prune');
  git('worktree', 'add', '--detach', worktree, version);

  const server = await serve(worktree, port);
  const base = `http://localhost:${port}/`;
  const outDir = resolve('diario', 'evolucao', version);
  mkdirSync(outDir, { recursive: true });

  for (const [name, page, params, size] of SHOTS) {
    if (page && !existsSync(join(worktree, 'docs', 'pages', `${page}.js`))) continue;
    const qs = new URLSearchParams({ print: '', ...params }).toString();
    let url = `${base}?${qs}${page ? `#${page}` : ''}`;
    // O modo headless não abre janelas estreitas, então telas pequenas usam uma moldura.
    if (size[0] < 600) url = `${base}scripts/frame.html?` + new URLSearchParams({ w: size[0], h: size[1], src: url });
    await screenshot(url, size, join(outDir, `${name}.png`));
  }

  server.close();
  git('worktree', 'remove', '--force', worktree);
  console.log(`✓ ${version}`);
  port++;
}

console.log(`\nCapturas em ${resolve('diario', 'evolucao')}`);
