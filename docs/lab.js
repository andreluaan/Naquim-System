import { copy } from './utils.js';

// A amostra de uma paleta da aguada sai da mesma conta do CSS (src/themes/aguada.css): fundo, superfície e destaque.
export const aguadaSwatch = ([hue, pigment, water]) => {
  const chroma = 0.003 + pigment * 0.012;
  return [`oklch(0.175 ${chroma} ${hue})`, `oklch(0.3 ${chroma} ${hue})`, `oklch(${water} ${pigment * 0.16} ${hue})`];
};

export const OPTIONS = {
  theme: {
    label: 'Paleta',
    hint: 'O humor das cores.',
    items: [
      { id: 'sumi', name: 'Sumi', desc: 'A tinta-mãe · padrão', swatch: ['oklch(0.175 0 0)', 'oklch(0.3 0 0)', 'oklch(0.95 0 0)'] },
      { id: 'neutro', name: 'Carvão', desc: 'Tinta pura, sem pigmento', aguada: [0, 0, 0.92] },
      { id: 'vitrine', name: 'Vitrine', desc: 'Carvão em papel quente', aguada: [80, 0.15, 0.93] },
      { id: 'grade', name: 'Verde-água', desc: 'Pouco verde, muita água', aguada: [150, 0.45, 0.93] },
      { id: 'marca-exemplo', name: 'Marca de cliente', desc: 'Modelo para copiar', aguada: [300, 0.85, 0.56] },
    ],
  },
  font: {
    label: 'Tipografia',
    hint: 'A voz do texto.',
    items: [
      { id: 'sumi', name: 'Sumi', desc: 'Shippori Mincho + Zen Kaku · padrão', family: "'Shippori Mincho', serif" },
      { id: 'editorial', name: 'Editorial', desc: 'Fraunces + Inter', family: "'Fraunces', serif" },
      { id: 'moderno', name: 'Moderno', desc: 'Geist', family: "'Geist', sans-serif" },
      { id: 'classico', name: 'Clássico', desc: 'Instrument Serif + DM Sans', family: "'Instrument Serif', serif" },
      { id: 'tecnico', name: 'Técnico', desc: 'Space Grotesk + Plex', family: "'Space Grotesk', sans-serif" },
      { id: 'geometrico', name: 'Geométrico', desc: 'Jost, títulos em caixa alta', family: "'Jost', sans-serif" },
      { id: 'condensado', name: 'Condensado', desc: 'Oswald + Inter, caixa alta', family: "'Oswald', sans-serif" },
    ],
  },
  radius: {
    label: 'Cantos',
    hint: 'Reto é sério; redondo, amigável.',
    items: [
      { id: 'reto', name: 'Retos', r: '2px' },
      { id: 'suave', name: 'Suaves', r: '8px' },
      { id: 'arredondado', name: 'Arredondados', r: '16px' },
    ],
  },
  mode: {
    label: 'Modo',
    hint: 'Escuro é o padrão da casa.',
    items: [
      { id: 'dark', name: 'Escuro' },
      { id: 'light', name: 'Claro' },
    ],
  },
};

OPTIONS.theme.items.forEach((item) => { item.swatch ??= aguadaSwatch(item.aguada); });

const STORAGE_KEY = 'sumi-lab-v1';
const root = document.documentElement;
const listeners = new Set();

export function onChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getState() {
  return {
    theme: root.dataset.theme,
    font: root.dataset.font,
    radius: root.dataset.radius,
    mode: root.dataset.mode,
  };
}

export function setOption(key, value) {
  root.dataset[key] = value;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(getState())); } catch {}
  syncButtons();
  listeners.forEach((fn) => fn(getState()));
}

export function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    for (const [k, v] of Object.entries(saved)) {
      if (OPTIONS[k]?.items.some((i) => i.id === v)) root.dataset[k] = v;
    }
  } catch {}
  // Parâmetros da URL têm prioridade sobre o que foi salvo.
  const params = new URLSearchParams(location.search);
  for (const k of Object.keys(OPTIONS)) {
    const v = params.get(k);
    if (OPTIONS[k].items.some((i) => i.id === v)) root.dataset[k] = v;
  }
  if (params.has('print')) root.dataset.print = '';
}

function renderItem(key, item) {
  let preview = '';
  if (key === 'theme') {
    preview = `<span class="lab-swatch">${item.swatch.map((c) => `<i style="background:${c}"></i>`).join('')}</span>`;
  } else if (key === 'font') {
    preview = `<span class="lab-aa" style="font-family:${item.family}">Aa</span>`;
  } else if (key === 'radius') {
    preview = `<span class="lab-corner" style="border-top-left-radius:${item.r}"></span>`;
  }
  return `
    <button class="lab-option" data-key="${key}" data-value="${item.id}" aria-pressed="false">
      ${preview}
      <span class="lab-option-text"><strong>${item.name}</strong>${item.desc ? `<small>${item.desc}</small>` : ''}</span>
    </button>`;
}

function syncButtons() {
  const state = getState();
  document.querySelectorAll('.lab-option').forEach((b) => {
    b.setAttribute('aria-pressed', String(state[b.dataset.key] === b.dataset.value));
  });
}

function summary() {
  const s = getState();
  const name = (k) => OPTIONS[k].items.find((i) => i.id === s[k])?.name;
  return `Minha escolha → Paleta: ${name('theme')} · Tipografia: ${name('font')} · Cantos: ${name('radius')} · Modo: ${name('mode')}\n` +
    `<html data-theme="${s.theme}" data-font="${s.font}" data-radius="${s.radius}" data-mode="${s.mode}">`;
}

export function mountLab() {
  const lab = document.getElementById('lab');
  const scrim = document.getElementById('scrim');
  const openBtn = document.getElementById('lab-btn');

  lab.innerHTML = `
    <header class="lab-head">
      <div>
        <h2>Laboratório de identidade</h2>
        <p>Combine e veja tudo mudar.</p>
      </div>
      <button class="doc-icon-btn" data-close aria-label="Fechar">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </header>
    <div class="lab-body">
      ${Object.entries(OPTIONS).map(([key, group]) => `
        <section class="lab-group">
          <h3>${group.label}</h3>
          <p>${group.hint}</p>
          <div class="lab-options lab-options--${key}">
            ${group.items.map((item) => renderItem(key, item)).join('')}
          </div>
        </section>`).join('')}
    </div>
    <footer class="lab-foot">
      <button class="doc-btn doc-btn--primary" data-copy-choice>Copiar minha escolha</button>
    </footer>`;

  const open = () => {
    lab.classList.add('is-open');
    lab.setAttribute('aria-hidden', 'false');
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add('is-visible'));
    lab.querySelector('[data-close]').focus();
  };
  const close = () => {
    lab.classList.remove('is-open');
    lab.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('is-visible');
    setTimeout(() => (scrim.hidden = true), 220);
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  scrim.addEventListener('click', close);
  lab.querySelector('[data-close]').addEventListener('click', close);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && lab.classList.contains('is-open') && close());

  lab.addEventListener('click', (e) => {
    const opt = e.target.closest('.lab-option');
    if (opt) setOption(opt.dataset.key, opt.dataset.value);
    if (e.target.closest('[data-copy-choice]')) copy(summary(), 'Escolha copiada');
  });

  document.getElementById('mode-btn').addEventListener('click', () => {
    setOption('mode', root.dataset.mode === 'dark' ? 'light' : 'dark');
  });

  syncButtons();
  if (new URLSearchParams(location.search).has('lab')) open();
}
