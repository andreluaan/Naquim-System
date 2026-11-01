import { OPTIONS } from '../lab.js';
import { contrast, contrastLabel, resolveVarColor, copy } from '../utils.js';

const CONTROLS = [
  ['hue', 'Pigmento', '--ds-pigment-hue', 0, 360, 1],
  ['pigment', 'Concentração', '--ds-pigment', 0, 1, 0.05],
  ['water', 'Água', '--ds-water', 0.3, 0.95, 0.01],
];

const PRESETS = OPTIONS.theme.items.filter((item) => item.aguada);

const CONTRASTS = [
  ['Texto', '--ds-color-text', '--ds-color-bg'],
  ['Texto suave', '--ds-color-text-muted', '--ds-color-bg'],
  ['Botão principal', '--ds-color-on-accent', '--ds-color-accent'],
  ['Link', '--ds-color-accent-text', '--ds-color-bg'],
];

const strip = (name) => `
  <div class="pal-strip" aria-hidden="true">
    ${Array.from({ length: 12 }, (_, i) => `<span style="background: var(--ds-${name}-${i + 1})"></span>`).join('')}
  </div>`;

export default {
  id: 'paletas',
  group: 'Fundações',
  title: 'Laboratório de paletas',
  keywords: 'paleta laboratório criar cor marca pigmento água aguada concentração gerar tema',
  lead: 'Toda paleta é o sumi com um pigmento e água. Ajuste os três e veja a sua nascer.',
  render: () => `
    <section class="doc-section">
      <div class="pal" data-pal>
        <div class="pal-controls">
          <div class="pal-presets">
            ${PRESETS.map((item) => `
              <button class="viz-swatch" data-preset="${item.id}" aria-label="${item.name}" title="${item.name}"
                style="--a: ${item.swatch[0]}; --b: ${item.swatch[2]}"></button>`).join('')}
          </div>
          ${CONTROLS.map(([key, label, , min, max, step]) => `
            <label class="viz-range pal-range pal-range--${key}">
              <span><span>${label}</span><output data-out="${key}"></output></span>
              <input type="range" min="${min}" max="${max}" step="${step}" data-control="${key}">
            </label>`).join('')}
          <div class="doc-segmented" role="radiogroup" aria-label="Modo">
            <button role="radio" aria-checked="true" data-mode-option="dark">Tinta</button>
            <button role="radio" aria-checked="false" data-mode-option="light">Papel</button>
          </div>
          <div class="pal-actions">
            <button class="ds-btn ds-btn--primary ds-btn--sm" data-pal-copy><ds-icon name="copy"></ds-icon> Copiar tema</button>
            <a class="ds-btn ds-btn--ghost ds-btn--sm" data-pal-site href="#site-completo">Ver no site <ds-icon name="arrow-right"></ds-icon></a>
          </div>
        </div>

        <div class="pal-preview" data-theme="aguada" data-mode="dark" data-preview>
          <div class="pal-scales">
            <p>Cinzas</p>${strip('neutral')}
            <p>Destaque</p>${strip('accent')}
          </div>
          <article class="pal-sample">
            <p class="ds-section__eyebrow">Ateliê Sumi</p>
            <h3>Uma tinta, muitas marcas</h3>
            <p>Texto suave de apoio, para ver a leitura sobre o fundo. <a href="#paletas">Um link</a>.</p>
            <div class="pal-sample-actions">
              <button class="ds-btn ds-btn--primary">Pedir orçamento</button>
              <button class="ds-btn ds-btn--secondary">Ver projetos</button>
              <span class="ds-badge ds-badge--accent">Novo</span>
            </div>
          </article>
          <dl class="viz-contrast pal-contrast" data-contrast></dl>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Como a água funciona</h2>
      <ol class="card-anatomy-list">
        <li><strong>Cinzas</strong><span>O sumi com um toque do pigmento. Mais concentração, cinzas mais coloridos.</span></li>
        <li><strong>Destaque</strong><span>O pigmento diluído. Mais água, mais claro.</span></li>
        <li><strong>No papel</strong><span>No modo claro, a tinta aparece com menos água, para continuar legível.</span></li>
        <li><strong>Texto do botão</strong><span>Escuro sobre destaque claro, claro sobre destaque escuro. Sozinho.</span></li>
      </ol>
    </section>`,

  mount(el) {
    const preview = el.querySelector('[data-preview]');
    const state = { hue: 265, pigment: 0.3, water: 0.85, mode: 'dark' };

    function measure() {
      el.querySelector('[data-contrast]').innerHTML = CONTRASTS.map(([label, fg, bg]) => {
        const ratio = contrast(resolveVarColor(fg, preview), resolveVarColor(bg, preview));
        const rating = contrastLabel(ratio);
        return `<div><dt>${label}</dt><dd class="${rating.cls}">${ratio.toFixed(1)} · ${rating.text}</dd></div>`;
      }).join('');
    }

    function apply() {
      CONTROLS.forEach(([key, , variable]) => {
        preview.style.setProperty(variable, state[key]);
        el.querySelector(`[data-control="${key}"]`).value = state[key];
        el.querySelector(`[data-out="${key}"]`).textContent = key === 'hue' ? `${state.hue}°` : `${Math.round(state[key] * 100)}%`;
      });
      preview.dataset.mode = state.mode;
      el.querySelectorAll('[data-mode-option]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.modeOption === state.mode)));
      el.querySelectorAll('[data-preset]').forEach((b) => {
        const [hue, pigment, water] = PRESETS.find((item) => item.id === b.dataset.preset).aguada;
        b.setAttribute('aria-pressed', String(hue === state.hue && pigment === state.pigment && water === state.water));
      });
      el.querySelector('[data-pal-site]').href = `?${new URLSearchParams({ pigmento: state.hue, concentracao: state.pigment, agua: state.water, modo: state.mode })}#site-completo`;
      measure();
    }

    el.addEventListener('input', (e) => {
      const key = e.target.dataset.control;
      if (!key) return;
      state[key] = Number(e.target.value);
      apply();
    });

    el.addEventListener('click', (e) => {
      const preset = e.target.closest('[data-preset]');
      if (preset) [state.hue, state.pigment, state.water] = PRESETS.find((item) => item.id === preset.dataset.preset).aguada;
      const mode = e.target.closest('[data-mode-option]');
      if (mode) state.mode = mode.dataset.modeOption;
      if (e.target.closest('[data-pal-copy]')) {
        copy(`/* Paleta criada no Laboratório de paletas do Sumi System: o sumi com um pigmento e água. */
[data-theme="minha-marca"] {
  --ds-pigment-hue: ${state.hue};
  --ds-pigment: ${state.pigment};
  --ds-water: ${state.water};
}`, 'Tema copiado');
      }
      if (e.target.closest('a[href="#paletas"]')) e.preventDefault();
      if (preset || mode) apply();
    });

    apply();
  },
};
