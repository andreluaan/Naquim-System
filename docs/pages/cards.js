import { inkDrop, brushStroke, inkWash, enso } from '../illustrations.js';
import { code, doDont } from '../utils.js';

const VARIANTS = [
  ['default', 'Padrão', 'O de todo dia.'],
  ['elevated', 'Elevado', 'Com sombra, para destacar.'],
  ['outline', 'Contorno', 'Só a borda. Para listas densas.'],
  ['interactive', 'Interativo', 'O card todo é um link.'],
];

const PRODUCTS = [
  [inkDrop, 'Sumi 30 ml', 'R$ 24,90'],
  [brushStroke, 'Pincel nº 4', 'R$ 38,00'],
  [inkWash, 'Bloco aguada', 'R$ 42,50'],
  [() => enso({ id: 'ill-enso-card-produto' }), 'Kit de iniciação', 'R$ 129,00'],
];

const PLAYGROUND = {
  variant: VARIANTS.map(([id, name]) => [id, name]),
  media: [['yes', 'Com imagem'], ['no', 'Sem imagem']],
  layout: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']],
  footer: [['yes', 'Com rodapé'], ['no', 'Sem rodapé']],
};

const LABELS = { variant: 'Variante', media: 'Imagem', layout: 'Layout', footer: 'Rodapé' };

const initialState = { variant: 'interactive', media: 'yes', layout: 'vertical', footer: 'yes' };

function cardHtml({ variant, media, layout, footer }, { forCode = false } = {}) {
  const classes = ['ds-card'];
  if (variant !== 'default') classes.push(`ds-card--${variant}`);
  if (layout === 'horizontal') classes.push('ds-card--horizontal');
  const tag = variant === 'interactive' ? 'a' : 'article';
  const href = tag === 'a' ? ' href="#"' : '';
  const image = forCode ? '<img src="foto.jpg" alt="Descrição da imagem">' : inkWash();

  return `<${tag} class="${classes.join(' ')}"${href}>
${media === 'yes' ? `  <div class="ds-card__media">${image}</div>\n` : ''}  <div class="ds-card__content">
    <p class="ds-card__eyebrow">Diário</p>
    <h3 class="ds-card__title">A aguada como escala de cor</h3>
    <p class="ds-card__body">Como uma única tinta gera os doze tons da interface.</p>
  </div>
${footer === 'yes' ? '  <div class="ds-card__footer"><span class="ds-badge">5 min</span></div>\n' : ''}</${tag}>`;
}

function segmented(key, current) {
  return `
    <div class="btn-play-field">
      <span>${LABELS[key]}</span>
      <div class="doc-segmented" role="radiogroup" aria-label="${LABELS[key]}">
        ${PLAYGROUND[key].map(([id, name]) => `<button role="radio" aria-checked="${id === current}" data-key="${key}" data-value="${id}">${name}</button>`).join('')}
      </div>
    </div>`;
}

const ANATOMY = [
  ['Mídia', '<code>.ds-card__media</code>: imagem no topo, 16:9.'],
  ['Sobretítulo', '<code>.ds-card__eyebrow</code>: categoria.'],
  ['Título', '<code>.ds-card__title</code>: o principal.'],
  ['Texto', '<code>.ds-card__body</code>: resumo de até três linhas.'],
  ['Rodapé', '<code>.ds-card__footer</code>: ações, dados ou preço.'],
];

export default {
  id: 'cards',
  group: 'Componentes',
  title: 'Cards',
  keywords: 'card cartão bloco caixa post produto plano perfil loja vitrine preço favoritar favorito plain simples sem caixa',
  lead: 'Um assunto num bloco que se lê de uma vez.',
  render: () => `
    <section class="doc-section">
      <h2>Anatomia</h2>
      <p>Toda parte é opcional.</p>
      <div class="card-anatomy">
        <article class="ds-card card-anatomy-card">
          <div class="ds-card__media">${brushStroke()}<span class="card-marker" style="top: 12px; right: 12px">1</span></div>
          <div class="ds-card__content">
            <p class="ds-card__eyebrow">Ilustração <span class="card-marker">2</span></p>
            <h3 class="ds-card__title">O traço que não volta atrás <span class="card-marker">3</span></h3>
            <p class="ds-card__body">Por que a arte-final em sumi exige decisões firmes. <span class="card-marker">4</span></p>
          </div>
          <div class="ds-card__footer">
            <button class="ds-btn ds-btn--secondary ds-btn--sm">Ler artigo</button>
            <span class="card-marker">5</span>
          </div>
        </article>
        <ol class="card-anatomy-list">
          ${ANATOMY.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
        </ol>
      </div>
    </section>

    <section class="doc-section">
      <h2>Monte o seu</h2>
      <p>Escolha e copie.</p>
      <div class="btn-play">
        <div class="btn-play-controls">
          ${Object.keys(PLAYGROUND).map((key) => segmented(key, initialState[key])).join('')}
        </div>
        <div class="btn-play-preview card-play-preview" data-preview></div>
        <div class="doc-code btn-play-code">
          <div class="doc-code-head"><span>html</span>
            <button class="doc-code-copy" data-code-copy>Copiar</button>
          </div>
          <pre><code data-code></code></pre>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Variantes</h2>
      <p>Passe o mouse no interativo.</p>
      <div class="card-grid">
        ${VARIANTS.map(([id, name, use]) => `
          <${id === 'interactive' ? 'a href="#cards"' : 'article'} class="ds-card${id === 'default' ? '' : ` ds-card--${id}`}">
            <div class="ds-card__content">
              <p class="ds-card__eyebrow">.ds-card${id === 'default' ? '' : `--${id}`}</p>
              <h3 class="ds-card__title">${name}</h3>
              <p class="ds-card__body">${use}</p>
            </div>
          </${id === 'interactive' ? 'a' : 'article'}>`).join('')}
      </div>
    </section>

    <section class="doc-section">
      <h2>Exemplos</h2>
      <p>As mesmas partes, outros usos.</p>
      <div class="card-examples">
        <a class="ds-card ds-card--interactive" href="#cards">
          <div class="ds-card__media">${inkWash()}<span class="ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Processo</span></div>
          <div class="ds-card__content">
            <p class="ds-card__eyebrow">Blog · 5 min de leitura</p>
            <h3 class="ds-card__title">Uma tinta, doze tons</h3>
            <p class="ds-card__body">Como a técnica da aguada inspirou a escala de cores do sistema.</p>
          </div>
          <div class="ds-card__footer card-author">
            <span class="card-avatar">AL</span>
            <span>André Luan · 22 out</span>
          </div>
        </a>

        <article class="ds-card">
          <div class="ds-card__media">${inkDrop()}<span class="ds-badge ds-badge--success ds-badge--pill">Em estoque</span></div>
          <div class="ds-card__content">
            <p class="ds-card__eyebrow">Papelaria</p>
            <h3 class="ds-card__title">Sumi preto, 30 ml</h3>
            <p class="ds-card__body">Pigmento de carbono, à prova d'água depois de seco.</p>
          </div>
          <div class="ds-card__footer card-price">
            <strong>R$ 24,90</strong>
            <button class="ds-btn ds-btn--primary ds-btn--sm"><ds-icon name="cart"></ds-icon> Comprar</button>
          </div>
        </article>

        <article class="ds-card ds-card--elevated">
          <div class="ds-card__content">
            <div class="card-plan-head">
              <p class="ds-card__eyebrow">Plano</p>
              <span class="ds-badge ds-badge--accent ds-badge--pill">Recomendado</span>
            </div>
            <h3 class="ds-card__title">Profissional</h3>
            <p class="card-plan-price"><strong>R$ 89</strong> /mês</p>
            <ul class="card-plan-list">
              <li><ds-icon name="check"></ds-icon> Até 5 sites</li>
              <li><ds-icon name="check"></ds-icon> Domínio próprio</li>
              <li><ds-icon name="check"></ds-icon> Suporte prioritário</li>
            </ul>
          </div>
          <div class="ds-card__footer">
            <button class="ds-btn ds-btn--primary ds-btn--block">Assinar agora</button>
          </div>
        </article>
      </div>

      <div class="card-examples card-examples--wide">
        <article class="ds-card ds-card--horizontal">
          <div class="ds-card__media">${enso({ id: 'ill-enso-card-profile' })}</div>
          <div class="ds-card__content">
            <p class="ds-card__eyebrow">Equipe</p>
            <h3 class="ds-card__title">Marina Sumi</h3>
            <p class="ds-card__body">Ilustradora e diretora de arte. Desenha à mão antes de abrir qualquer programa.</p>
            <div class="badge-tags">
              <span class="ds-badge ds-badge--pill">Ilustração</span>
              <span class="ds-badge ds-badge--pill">Direção de arte</span>
            </div>
          </div>
        </article>

        <div class="card-stats">
          ${[['Visitas', '12,4 mil', '+18%', 'success'], ['Conversão', '3,2%', '+0,4', 'success'], ['Rejeição', '41%', '+6%', 'danger']].map(([label, value, delta, tone]) => `
            <article class="ds-card ds-card--outline ds-card--compact">
              <div class="ds-card__content">
                <p class="ds-card__eyebrow">${label}</p>
                <p class="card-stat-value">${value}</p>
                <span class="ds-badge ds-badge--${tone} ds-badge--sm">${delta} no mês</span>
              </div>
            </article>`).join('')}
        </div>
      </div>

      ${doDont(
        ['Um assunto por card', 'Mesma estrutura na lista'],
        ['Card dentro de card', 'Texto longo'],
      )}
      ${code(`
<a class="ds-card ds-card--interactive" href="/blog/aguada">
  <div class="ds-card__media"><img src="aguada.jpg" alt=""></div>
  <div class="ds-card__content">
    <p class="ds-card__eyebrow">Blog</p>
    <h3 class="ds-card__title">Uma tinta, doze tons</h3>
    <p class="ds-card__body">Como a aguada inspirou a escala de cores.</p>
  </div>
  <div class="ds-card__footer">André Luan · 22 out</div>
</a>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Produto</h2>
      <p><code>ds-card--plain</code>: sem caixa, só a imagem, o nome e o <code>__price</code>; o <code>__corner</code> põe um botão no canto da foto.</p>
      <div class="ds-grid" style="--grid-min: 11rem">
        ${PRODUCTS.map(([art, title, price]) => `
          <article class="ds-card ds-card--plain">
            <div class="ds-card__media">
              ${art()}
              <button class="ds-btn ds-btn--secondary ds-btn--icon ds-btn--sm ds-card__corner" aria-label="Favoritar ${title}"><ds-icon name="heart"></ds-icon></button>
            </div>
            <div class="ds-card__content">
              <h3 class="ds-card__title">${title}</h3>
              <p class="ds-card__price">${price}</p>
            </div>
          </article>`).join('')}
      </div>
      ${code(`
<article class="ds-card ds-card--plain">
  <div class="ds-card__media">
    <img src="sumi.jpg" alt="Frasco de sumi de 30 ml">
    <button class="ds-btn ds-btn--secondary ds-btn--icon ds-btn--sm ds-card__corner"
      aria-label="Favoritar Sumi 30 ml"><ds-icon name="heart"></ds-icon></button>
  </div>
  <div class="ds-card__content">
    <h3 class="ds-card__title">Sumi 30 ml</h3>
    <p class="ds-card__price">R$ 24,90</p>
  </div>
</article>`, 'html')}
    </section>`,

  mount(el) {
    const state = { ...initialState };
    const preview = el.querySelector('[data-preview]');
    const codeEl = el.querySelector('[data-code]');
    const copyBtn = el.querySelector('[data-code-copy]');

    const update = () => {
      preview.innerHTML = cardHtml(state);
      preview.dataset.layout = state.layout;
      const markup = cardHtml(state, { forCode: true });
      codeEl.textContent = markup;
      copyBtn.dataset.copy = markup;
    };

    el.querySelector('.btn-play-controls').addEventListener('click', (e) => {
      const option = e.target.closest('[data-key]');
      if (!option) return;
      state[option.dataset.key] = option.dataset.value;
      el.querySelectorAll(`[data-key="${option.dataset.key}"]`).forEach((b) => b.setAttribute('aria-checked', String(b === option)));
      update();
    });

    // Cards de exemplo são links para a própria página; evita pular ao topo.
    el.addEventListener('click', (e) => {
      if (e.target.closest('a.ds-card')) e.preventDefault();
    });

    update();
  },
};
