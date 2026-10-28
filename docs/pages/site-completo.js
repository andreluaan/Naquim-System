import { OPTIONS } from '../lab.js';
import { contrast, contrastLabel, resolveVarColor, toast, copy } from '../utils.js';
import { frame, fullSite, mountSiteDemos, setFrameWidth, siteSections, TEMPLATES, TEMPLATE_BRANDS, TEMPLATE_INFO } from '../site-kit.js';

const MENU_ID = 'sumi-menu-completo';
const DEFAULTS = { template: 'vitrine', ...TEMPLATE_BRANDS.vitrine, text: 1, space: 1 };

// Cada controle deslizante escreve uma variável no site de exemplo; os tokens recalculam o resto.
const SLIDERS = {
  pigmentHue: { label: 'Pigmento', variable: '--ds-pigment-hue', min: 0, max: 360, step: 1, custom: true, fallback: 265 },
  pigment: { label: 'Concentração', variable: '--ds-pigment', min: 0, max: 1, step: 0.05, custom: true, fallback: 0.1 },
  water: { label: 'Água', variable: '--ds-water', min: 0.3, max: 0.95, step: 0.01, custom: true, fallback: 0.9 },
  radius: { label: 'Cantos', variable: '--ds-radius-factor', min: 0, max: 2.5, step: 0.05, format: (v) => `${Math.round(v * 8)}px` },
  text: { label: 'Texto', variable: '--ds-text-scale', min: 0.85, max: 1.25, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
  space: { label: 'Espaço', variable: '--ds-space-scale', min: 0.75, max: 1.3, step: 0.05, format: (v) => `${Math.round(v * 100)}%` },
};

const CONTRASTS = [
  ['Texto', '--ds-color-text', '--ds-color-bg'],
  ['Texto suave', '--ds-color-text-muted', '--ds-color-bg'],
  ['Botão principal', '--ds-color-on-accent', '--ds-color-accent'],
  ['Destaque no texto', '--ds-color-accent-text', '--ds-color-bg'],
];

const slider = (key) => {
  const s = SLIDERS[key];
  return `
    <label class="viz-range">
      <span><span>${s.label}</span><output data-output="${key}"></output></span>
      <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" data-slider="${key}">
    </label>`;
};

const segmented = (key, items, label) => `
  <div class="doc-segmented" role="radiogroup" aria-label="${label}">
    ${items.map(([id, name]) => `<button role="radio" aria-checked="false" data-choice="${key}" data-value="${id}">${name}</button>`).join('')}
  </div>`;

const swatches = () => `
  <div class="viz-swatches">
    ${OPTIONS.theme.items.map((item) => `
      <button class="viz-swatch" data-choice="theme" data-value="${item.id}" aria-pressed="false" aria-label="${item.name}" title="${item.name}"
        style="--a: ${item.swatch[0]}; --b: ${item.swatch[2]}"></button>`).join('')}
  </div>`;

const fonts = () => `
  <div class="viz-fonts">
    ${OPTIONS.font.items.map((item) => `
      <button class="viz-font" data-choice="font" data-value="${item.id}" aria-pressed="false" style="font-family: ${item.family}">
        ${item.name}
      </button>`).join('')}
  </div>`;

const models = () => `
  <div class="viz-models" role="radiogroup" aria-label="Modelo do site">
    ${TEMPLATES.map(([id, name]) => `
      <button class="viz-model" role="radio" aria-checked="false" data-choice="template" data-value="${id}">
        <strong>${name}</strong>
        <span>${TEMPLATE_INFO[id]}</span>
      </button>`).join('')}
  </div>`;

const tool = (action, icon, label) => `
  <button class="ds-btn ds-btn--ghost ds-btn--sm viz-tool" data-action="${action}"><ds-icon name="${icon}"></ds-icon> <span>${label}</span></button>`;

export default {
  id: 'site-completo',
  group: 'Seções de site',
  title: 'Site completo',
  wide: true,
  keywords: 'site completo landing page exemplo modelo template editorial visualizador marca tema cores fonte cantos tela cheia',
  lead: 'Quatro modelos de site montados só com o Nanquim. Escolha um, vista-o com a sua marca e copie o tema.',
  render: () => `
    <div class="viz" data-viz>
      ${models()}
      <aside class="viz-panel" id="viz-panel" aria-label="Ajustes da marca">
        <header class="viz-panel-head">
          <strong>Editar marca</strong>
          <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-action="panel" aria-label="Fechar painel"><ds-icon name="x"></ds-icon></button>
        </header>
        <section class="viz-group viz-group--fullscreen">
          <h2>Modelo</h2>
          ${segmented('template', TEMPLATES, 'Modelo do site')}
        </section>
        <section class="viz-group">
          <h2>Marca <small data-name="theme"></small></h2>
          ${swatches()}
          <details class="viz-more" data-custom>
            <summary>Cor própria</summary>
            ${slider('pigmentHue')}${slider('pigment')}${slider('water')}
          </details>
        </section>
        <section class="viz-group">
          <h2>Modo</h2>
          ${segmented('mode', OPTIONS.mode.items.map((item) => [item.id, item.name]), 'Modo')}
        </section>
        <section class="viz-group">
          <h2>Fonte</h2>
          ${fonts()}
        </section>
        <section class="viz-group">
          <h2>Forma</h2>
          ${slider('radius')}${slider('text')}${slider('space')}
        </section>
        <details class="viz-more viz-contrast-box">
          <summary>Contraste <span data-contrast-summary></span></summary>
          <dl class="viz-contrast" data-contrast></dl>
        </details>
        <div class="viz-actions">
          <button class="ds-btn ds-btn--primary ds-btn--sm" data-action="copy"><ds-icon name="copy"></ds-icon> Copiar tema</button>
          <button class="ds-btn ds-btn--secondary ds-btn--sm" data-action="reset"><ds-icon name="refresh"></ds-icon> Restaurar</button>
        </div>
      </aside>
      <div class="viz-stage">
        <nav class="viz-sections" aria-label="Seções deste modelo">
          <span class="viz-sections-label">Seções deste modelo</span>
          <ol data-sections></ol>
        </nav>
        ${frame({
          content: fullSite(MENU_ID, DEFAULTS.template),
          className: 'site-frame--scroll',
          attrs: 'data-site data-scale',
          tools: `<span class="viz-tools">${tool('panel', 'sliders', 'Editar')}${tool('fullscreen', 'external-link', 'Tela cheia')}</span>`,
        })}
      </div>
    </div>`,

  mount(el) {
    const viz = el.querySelector('[data-viz]');
    const page = viz.querySelector('[data-site]');
    const frameEl = viz.querySelector('[data-frame]');
    const state = { ...DEFAULTS };
    let renderedTemplate = state.template;

    const readVar = (name, fallback) => {
      const value = Number.parseFloat(getComputedStyle(page).getPropertyValue(name));
      return Number.isNaN(value) ? fallback : value;
    };
    const nameOf = (key) => OPTIONS[key].items.find((item) => item.id === state[key])?.name ?? '';

    function syncControls() {
      viz.querySelectorAll('[data-choice]').forEach((button) => {
        const selected = String(state[button.dataset.choice]) === button.dataset.value;
        button.setAttribute(button.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-pressed', String(selected));
      });
      Object.entries(SLIDERS).forEach(([key, s]) => {
        const value = state[key] ?? readVar(s.variable, s.fallback);
        viz.querySelector(`[data-slider="${key}"]`).value = value;
        viz.querySelector(`[data-output="${key}"]`).textContent = s.format ? s.format(value) : Number(value.toFixed(3));
      });
      viz.querySelector('[data-name="theme"]').textContent = state.custom ? 'Cor própria' : nameOf('theme');
    }

    function measureContrast() {
      const ratios = CONTRASTS.map(([label, fg, bg]) => [label, contrast(resolveVarColor(fg, page), resolveVarColor(bg, page))]);
      viz.querySelector('[data-contrast]').innerHTML = ratios.map(([label, ratio]) => {
        const rating = contrastLabel(ratio);
        return `<div><dt>${label}</dt><dd class="${rating.cls}">${ratio.toFixed(1)} · ${rating.text}</dd></div>`;
      }).join('');
      const worst = contrastLabel(Math.min(...ratios.map(([, ratio]) => ratio)));
      const summary = viz.querySelector('[data-contrast-summary]');
      summary.className = worst.cls;
      summary.textContent = worst.text;
    }

    function renderTemplate() {
      if (state.template === renderedTemplate) return;
      page.querySelectorAll('dialog[open]').forEach((d) => d.close());
      page.innerHTML = fullSite(MENU_ID, state.template);
      page.scrollTop = 0;
      renderedTemplate = state.template;
      renderSections();
    }

    function renderSections() {
      viz.querySelector('[data-sections]').innerHTML = siteSections(state.template)
        .map((name) => `<li><button class="viz-section-link" data-section="${name}">${name}</button></li>`).join('');
    }

    // Na tela cheia o site rola dentro da moldura; fora dela quem rola é a página, abaixo da barra de seções fixa.
    function scrollToSection(name) {
      const target = page.querySelector(`[data-site-section="${name}"]`);
      if (!target) return;
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      if (page.scrollHeight > page.clientHeight) {
        const top = target.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop;
        page.scrollTo({ top, behavior });
      } else {
        const bar = viz.querySelector('.viz-sections');
        const barBottom = Number.parseFloat(getComputedStyle(bar).top) + bar.offsetHeight;
        window.scrollBy({ top: target.getBoundingClientRect().top - barBottom, behavior });
      }
    }

    function apply() {
      renderTemplate();
      Object.assign(page.dataset, { theme: state.custom ? 'aguada' : state.theme, font: state.font, mode: state.mode });
      page.querySelectorAll('[data-invert]').forEach((el) => { el.dataset.mode = state.mode === 'dark' ? 'light' : 'dark'; });
      ['radius', 'text', 'space'].forEach((key) => page.style.setProperty(SLIDERS[key].variable, state[key]));
      syncControls();
      measureContrast();
    }

    // Mexer na cor cria uma paleta própria da aguada: o site passa a usar só pigmento, concentração e água,
    // e os trechos invertidos herdam os três números.
    const CUSTOM = Object.keys(SLIDERS).filter((key) => SLIDERS[key].custom);

    function setCustomColor(key, value) {
      if (!state.custom) {
        CUSTOM.forEach((k) => { state[k] = readVar(SLIDERS[k].variable, SLIDERS[k].fallback); });
        state.custom = true;
      }
      state[key] = value;
      CUSTOM.forEach((k) => page.style.setProperty(SLIDERS[k].variable, state[k]));
    }

    function clearCustomColor() {
      CUSTOM.forEach((k) => {
        page.style.removeProperty(SLIDERS[k].variable);
        delete state[k];
      });
      state.custom = false;
    }

    function themeCss() {
      const value = (key) => Number(readVar(SLIDERS[key].variable, SLIDERS[key].fallback).toFixed(3));
      return `/* Marca gerada no visualizador do Nanquim System: o nanquim com um pigmento e água.
   Salve como src/themes/minha-marca.css, importe em src/index.css e use:
   <html data-theme="minha-marca" data-font="${state.font}" data-mode="${state.mode}"> */
[data-theme="minha-marca"] {
  --ds-pigment-hue: ${value('pigmentHue')};
  --ds-pigment: ${value('pigment')};
  --ds-water: ${value('water')};
  --ds-radius-factor: ${state.radius};
  --ds-text-scale: ${state.text};
  --ds-space-scale: ${state.space};
}`;
    }

    // Fora da tela cheia o painel fica sempre ao lado; na tela cheia ele vira uma gaveta que abre e fecha.
    const fullscreenButton = viz.querySelector('[data-action="fullscreen"]');
    const panelButton = viz.querySelector('.viz-tools [data-action="panel"]');
    panelButton.setAttribute('aria-controls', 'viz-panel');

    function setPanel(open) {
      viz.toggleAttribute('data-panel-open', open);
      panelButton.setAttribute('aria-expanded', String(open));
    }

    function setFullscreen(on) {
      viz.toggleAttribute('data-fullscreen', on);
      fullscreenButton.querySelector('ds-icon').setAttribute('name', on ? 'x' : 'external-link');
      fullscreenButton.querySelector('span').textContent = on ? 'Sair' : 'Tela cheia';
      setPanel(on);
    }

    viz.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-choice]');
      if (choice) {
        if (choice.dataset.choice === 'theme') clearCustomColor();
        state[choice.dataset.choice] = choice.dataset.value;
        if (choice.dataset.choice === 'template') {
          clearCustomColor();
          Object.assign(state, TEMPLATE_BRANDS[state.template]);
        }
        apply();
      }

      const section = e.target.closest('[data-section]');
      if (section) scrollToSection(section.dataset.section);

      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'copy') copy(themeCss(), 'Tema copiado');
      if (action === 'reset') {
        clearCustomColor();
        Object.assign(state, DEFAULTS);
        setFrameWidth(frameEl, 'full');
        apply();
        toast('Site de exemplo restaurado');
      }
      if (action === 'fullscreen') setFullscreen(!viz.hasAttribute('data-fullscreen'));
      if (action === 'panel') setPanel(!viz.hasAttribute('data-panel-open'));
    });

    viz.addEventListener('input', (e) => {
      const key = e.target.dataset.slider;
      if (!key) return;
      const value = Number(e.target.value);
      if (SLIDERS[key].custom) setCustomColor(key, value);
      else state[key] = value;
      apply();
    });

    // Esc fecha primeiro a gaveta e, depois, a tela cheia.
    const onKeydown = (e) => {
      if (e.key !== 'Escape' || !viz.hasAttribute('data-fullscreen') || document.querySelector('dialog[open]')) return;
      if (viz.hasAttribute('data-panel-open')) setPanel(false);
      else setFullscreen(false);
    };
    document.addEventListener('keydown', onKeydown);

    // ?modelo=vitrine&marca=neutro&modo=light (ou ?pigmento=&concentracao=&agua=, vindo do Laboratório de paletas)
    // já abre o exemplo assim: serve para links diretos e para os prints do diário.
    const params = new URLSearchParams(location.search);
    if (TEMPLATES.some(([id]) => id === params.get('modelo'))) Object.assign(state, { template: params.get('modelo') }, TEMPLATE_BRANDS[params.get('modelo')]);
    if (OPTIONS.theme.items.some((item) => item.id === params.get('marca'))) state.theme = params.get('marca');
    if (OPTIONS.mode.items.some((item) => item.id === params.get('modo'))) state.mode = params.get('modo');
    if (params.has('pigmento')) {
      setCustomColor('pigmentHue', Number(params.get('pigmento')));
      setCustomColor('pigment', Number(params.get('concentracao') ?? 0.5));
      setCustomColor('water', Number(params.get('agua') ?? 0.8));
    }
    renderSections();
    apply();
    if (params.has('tela-cheia')) setFullscreen(true);

    const cleanupDemos = mountSiteDemos(el);
    return () => {
      cleanupDemos();
      document.removeEventListener('keydown', onKeydown);
    };
  },
};
