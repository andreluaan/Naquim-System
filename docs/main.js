import '../src/index.js';
import { pages, groups } from './registry.js';
import { mountLab, restore, onChange } from './lab.js';
import { copy, copyToken } from './utils.js';

restore();

const nav = document.getElementById('nav');
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const search = document.getElementById('nav-search');
let cleanup = null;

function renderNav(filter = '') {
  const q = filter.trim().toLowerCase();
  nav.innerHTML = groups
    .map((group) => {
      const items = pages.filter(
        (p) => p.group === group && (!q || `${p.title} ${p.keywords ?? ''}`.toLowerCase().includes(q)),
      );
      if (!items.length) return '';
      return `
        <div class="doc-nav-group">
          <p class="doc-nav-label">${group}</p>
          ${items
            .map(
              (p) => `<a href="#${p.id}" class="doc-nav-link" data-id="${p.id}">
                ${p.title}${p.status ? `<span class="doc-nav-status">${p.status}</span>` : ''}
              </a>`,
            )
            .join('')}
        </div>`;
    })
    .join('');
  highlightNav();
}

function highlightNav() {
  const id = currentId();
  nav.querySelectorAll('.doc-nav-link').forEach((a) => {
    a.toggleAttribute('aria-current', a.dataset.id === id);
  });
}

const currentId = () => location.hash.slice(1) || 'apresentacao';

function render() {
  const page = pages.find((p) => p.id === currentId()) ?? pages[0];
  cleanup?.();
  content.innerHTML = `
    <article class="doc-page${page.wide ? ' doc-page--wide' : ''}">
      <header class="doc-page-head">
        <p class="doc-eyebrow">${page.group}</p>
        <h1>${page.title}</h1>
        ${page.lead ? `<p class="doc-lead">${page.lead}</p>` : ''}
      </header>
      ${page.render()}
    </article>`;
  cleanup = page.mount?.(content) ?? null;
  document.title = `${page.title} — Nanquim System`;
  highlightNav();
  sidebar.classList.remove('is-open');
  content.scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-copy]');
  if (el) copy(el.dataset.copy, el.dataset.copyLabel || 'Copiado');
  const token = e.target.closest('[data-copy-token]');
  if (token) copyToken(token.dataset.copyToken);
});

// O link de pular aponta para #content, mas o hash é a rota: foca o conteúdo sem trocar de página.
document.getElementById('skip-link').addEventListener('click', (e) => {
  e.preventDefault();
  content.focus();
});

document.getElementById('menu-btn').addEventListener('click', () => sidebar.classList.toggle('is-open'));
search.addEventListener('input', () => renderNav(search.value));
window.addEventListener('hashchange', render);

// Páginas com valores calculados precisam re-renderizar quando o tema muda.
onChange(() => {
  const page = pages.find((p) => p.id === currentId());
  if (page?.rerenderOnThemeChange) render();
});

mountLab();
renderNav();
render();
