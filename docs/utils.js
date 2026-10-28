const toastEl = () => document.getElementById('toast');
let toastTimer;

export function toast(message) {
  const el = toastEl();
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 1800);
}

export async function copy(text, label = 'Copiado') {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(`${label}: ${text.length > 64 ? text.slice(0, 64) + '…' : text}`);
}

// "token" copia var(--nome), para usar dentro do sistema; "valor" copia a declaração resolvida, para recriar fora dele.
let copyMode = 'token';
try {
  copyMode = localStorage.getItem('ds-copy-mode') || copyMode;
} catch {}

export const getCopyMode = () => copyMode;

export function setCopyMode(mode) {
  copyMode = mode;
  try {
    localStorage.setItem('ds-copy-mode', mode);
  } catch {}
}

function resolveVarLength(name) {
  const probe = document.createElement('span');
  probe.style.cssText = `position: absolute; visibility: hidden; width: var(${name})`;
  document.body.append(probe);
  const value = getComputedStyle(probe).width;
  probe.remove();
  return value;
}

export function tokenDeclaration(name) {
  const raw = getComputedStyle(document.body).getPropertyValue(name).trim().replace(/\s+/g, ' ');
  if (CSS.supports('color', raw)) {
    const color = resolveVarColor(name);
    return `${name}: ${color};${color.includes('/') ? '' : ` /* ${toHex(color)} */`}`;
  }
  if (/^calc\(|^-?[\d.]+(rem|px|em)$/.test(raw)) return `${name}: ${resolveVarLength(name)};`;
  return `${name}: ${raw};`;
}

export function copyToken(name) {
  if (copyMode === 'valor') copy(tokenDeclaration(name), 'Valor copiado');
  else copy(`var(${name})`, 'Token copiado');
}

export function copyModeSwitch() {
  const options = [['token', 'Token'], ['valor', 'Valor']];
  return `
    <div class="doc-copy-mode">
      <span>Ao clicar, copiar</span>
      <div class="doc-segmented" role="radiogroup" aria-label="Formato da cópia">
        ${options.map(([id, name]) => `<button role="radio" aria-checked="${id === copyMode}" data-copy-mode="${id}">${name}</button>`).join('')}
      </div>
      <code data-copy-mode-example></code>
    </div>`;
}

export function mountCopyModeSwitch(el, sampleToken) {
  const example = el.querySelector('[data-copy-mode-example]');
  const sync = () => {
    el.querySelectorAll('[data-copy-mode]').forEach((b) => b.setAttribute('aria-checked', b.dataset.copyMode === copyMode));
    example.textContent = copyMode === 'valor' ? tokenDeclaration(sampleToken) : `var(${sampleToken})`;
  };
  el.addEventListener('click', (e) => {
    const button = e.target.closest('[data-copy-mode]');
    if (!button) return;
    setCopyMode(button.dataset.copyMode);
    sync();
  });
  sync();
}

export const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function code(source, lang = 'css') {
  const trimmed = source.replace(/^\n/, '').replace(/\s+$/, '');
  return `
    <div class="doc-code">
      <div class="doc-code-head"><span>${lang}</span>
        <button class="doc-code-copy" data-copy="${escapeHtml(trimmed)}">Copiar</button>
      </div>
      <pre><code>${escapeHtml(trimmed)}</code></pre>
    </div>`;
}

export function doDont(dos, donts) {
  const li = (arr) => arr.map((t) => `<li>${t}</li>`).join('');
  return `
    <div class="doc-dodont">
      <div class="doc-do"><h3>✓ Faça</h3><ul>${li(dos)}</ul></div>
      <div class="doc-dont"><h3>✕ Evite</h3><ul>${li(donts)}</ul></div>
    </div>`;
}

// Um canvas 1x1 converte qualquer cor CSS (inclusive oklch) em RGB.
const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

export function resolveRgb(cssColor) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

export function resolveVarColor(name, scope = document.body) {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  scope.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}

const lum = ([r, g, b]) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

export function contrast(a, b) {
  const [l1, l2] = [lum(resolveRgb(a)), lum(resolveRgb(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function contrastLabel(ratio) {
  if (ratio >= 7) return { text: 'Ótimo', cls: 'is-great' };
  if (ratio >= 4.5) return { text: 'Legível', cls: 'is-ok' };
  if (ratio >= 3) return { text: 'Só textos grandes', cls: 'is-warn' };
  return { text: 'Decorativo', cls: 'is-bad' };
}

export function toHex(cssColor) {
  return '#' + resolveRgb(cssColor).map((v) => v.toString(16).padStart(2, '0')).join('');
}
