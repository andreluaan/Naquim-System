import { code } from '../utils.js';

const GROUPS = [
  ['cores', 'Fundações', 'Cor, letra, espaço, sombra e movimento.'],
  ['botoes', 'Componentes', 'Botões, cards, formulários, carrossel, modal…'],
  ['estrutura', 'Seções de site', 'Navegação, hero, preços, rodapé…'],
  ['site-completo', 'Site completo', 'Tudo junto, com um visualizador de marca.'],
];

const STEPS = [
  ['Escolher a marca', 'No <a href="#site-completo">Site completo</a>, vendo o site mudar.'],
  ['Copiar o tema', 'Vira um arquivo em <code>src/themes/</code>.'],
  ['Montar a página', 'Empilhar as seções, cada uma com código pronto.'],
  ['Vestir a marca', 'Um atributo no <code>&lt;html&gt;</code>. Nada mais muda.'],
];

export default {
  id: 'inicio',
  group: 'Começo',
  title: 'Como funciona',
  lead: 'Peças desenhadas uma vez e reusadas em qualquer site. Muda só a roupa da marca.',
  render: () => `
    <div class="doc-callout">
      <span aria-hidden="true">🧪</span>
      <div>Este é o tema Sumi. No <a href="#" data-open-lab>Laboratório</a> você troca a marca da documentação inteira.</div>
    </div>

    <section class="doc-section">
      <h2>Três camadas</h2>
      <p>A estrutura é sempre a mesma. Cada cliente muda só a pintura.</p>
      <div class="home-layers">
        <div class="home-layer">
          <span class="home-layer-num">1</span>
          <h3>Primitivos</h3>
          <p>A caixa de tintas: todos os tons e tamanhos.</p>
          <code>--ds-neutral-3</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer">
          <span class="home-layer-num">2</span>
          <h3>Semânticos</h3>
          <p>Cada tinta ganha uma função: fundo, borda, botão.</p>
          <code>--ds-color-surface</code>
        </div>
        <div class="home-arrow" aria-hidden="true">→</div>
        <div class="home-layer home-layer--accent">
          <span class="home-layer-num">3</span>
          <h3>Tema</h3>
          <p>Um arquivo por cliente. Vale na página ou num trecho.</p>
          <code>data-theme="cliente"</code>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>O que tem dentro</h2>
      <p>Do menor ao maior: fundações formam componentes, que formam seções, que formam o site.</p>
      <div class="home-cards home-cards--pairs">
        ${GROUPS.map(([id, name, text]) => `<a class="home-card" href="#${id}"><strong>${name}</strong><span>${text}</span></a>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Do zero ao site do cliente</h2>
      <ol class="card-anatomy-list">
        ${STEPS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Qualquer projeto</h2>
      <p>CSS puro e Web Components. Sem framework.</p>
      <div class="home-grid">
        ${['HTML puro', 'React', 'Vue', 'Svelte', 'Angular', 'WordPress'].map((f) => `<span class="home-chip">${f}</span>`).join('')}
      </div>
      ${code(`
<link rel="stylesheet" href="design-system/src/index.css">
<script type="module" src="design-system/src/index.js"></script>

<html data-theme="sumi" data-font="sumi" data-radius="reto" data-mode="dark">

<button class="ds-btn ds-btn--primary">Pedir orçamento</button>

<style>
  .meu-card {
    background: var(--ds-color-surface);
    padding: var(--ds-space-6);
  }
</style>

<!-- só num trecho -->
<section class="ds-section" data-theme="vitrine" data-mode="light">…</section>`, 'html')}
    </section>`,
  mount(el) {
    const handler = (e) => {
      if (e.target.closest('[data-open-lab]')) {
        e.preventDefault();
        document.getElementById('lab-btn').click();
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  },
};
