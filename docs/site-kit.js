// Conteúdo do site de exemplo (Ateliê Sumi) e a moldura de navegador usada nas páginas de "Seções de site".
import { enso, inkLandscape, inkDrop, brushStroke, inkWash } from './illustrations.js';

export const LINKS = ['Início', 'Projetos', 'Processo', 'Preços', 'Contato'];

const FEATURES = [
  ['pen', 'Identidade visual', 'Logo, cores e tipografia que contam quem você é, prontas para usar em tudo.'],
  ['grid', 'Sites sob medida', 'Páginas rápidas, fáceis de editar e que funcionam bem no celular.'],
  ['image', 'Ilustração', 'Desenhos feitos à mão para dar personalidade ao que é só seu.'],
  ['check-circle', 'Para todo mundo ler', 'Contraste, tamanho de letra e teclado pensados desde o primeiro traço.'],
];

const PLANS = [
  { name: 'Essencial', desc: 'Para quem está começando.', monthly: 89, yearly: 74, features: ['1 site de até 5 páginas', 'Domínio e hospedagem', 'Suporte por e-mail'], missing: ['Ilustrações sob medida'] },
  { name: 'Profissional', desc: 'O mais escolhido por pequenos negócios.', monthly: 189, yearly: 157, featured: true, features: ['Site de até 15 páginas', 'Blog e formulários', 'Suporte prioritário', '2 ilustrações por mês'] },
  { name: 'Estúdio', desc: 'Marca e site cuidados de perto.', monthly: 349, yearly: 290, features: ['Páginas ilimitadas', 'Loja virtual', 'Reunião mensal', 'Ilustrações ilimitadas'] },
];

const TESTIMONIALS = [
  ['A marca nova fez a gente parecer do tamanho que sempre quis ter.', 'Marina Costa', 'Café Aguada'],
  ['O site carrega rápido e meus clientes acham tudo sem me ligar.', 'Rafael Lima', 'Papelaria Traço'],
  ['Pela primeira vez, minha mãe consegue ler o cardápio no celular.', 'Lúcia Pena', 'Cantina Pena'],
  ['Trocamos as cores para a marca nova numa tarde, não num mês.', 'Caio Bico', 'Bico de Pena Arquitetura'],
];

const QUESTIONS = [
  ['Quanto tempo leva um projeto?', 'Uma identidade leva de 3 a 4 semanas; um site, de 4 a 6. Você acompanha cada etapa e aprova antes de seguirmos.'],
  ['Eu mesmo consigo editar o site depois?', 'Sim. Textos, fotos e preços ficam num painel simples, e gravamos um vídeo curto mostrando como fazer.'],
  ['Vocês fazem só o site, sem a identidade?', 'Fazemos. Se você já tem uma marca, partimos dela e montamos o site com as suas cores e fontes.'],
  ['Como funciona o pagamento?', 'Metade para começar e metade na entrega, no Pix ou no cartão em até 6 vezes.'],
];

const initials = (name) => name.split(' ').map((part) => part[0]).join('');

const brand = (editorial = false) => editorial
  ? '<a class="ds-navbar__brand" href="#">sumi.</a>'
  : '<a class="ds-navbar__brand" href="#"><ds-icon name="ink"></ds-icon> Ateliê Sumi</a>';

export const navbar = ({ menuId = 'sumi-menu', sticky = true, action = true, editorial = false } = {}) => `
  <header class="ds-navbar${sticky ? ' ds-navbar--sticky' : ''}${editorial ? ' ds-navbar--editorial' : ''}">
    <div class="ds-container ds-navbar__inner">
      ${brand(editorial)}
      <nav class="ds-navbar__links" aria-label="Principal">
        ${LINKS.map((link, i) => `<a href="#"${i === 0 ? ' aria-current="page"' : ''}>${link}</a>`).join('')}
      </nav>
      ${action ? '<div class="ds-navbar__actions"><a class="ds-btn ds-btn--primary ds-btn--sm" href="#">Pedir orçamento</a></div>' : ''}
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="${menuId}" aria-haspopup="dialog" aria-label="Abrir menu"><ds-icon name="menu"></ds-icon></button>
    </div>
  </header>
  ${menuDrawer(menuId)}`;

export const menuDrawer = (id) => `
  <dialog class="ds-dialog ds-dialog--drawer ds-dialog--start" id="${id}" aria-labelledby="${id}-titulo">
    <header class="ds-dialog__header">
      <h2 class="ds-dialog__title" id="${id}-titulo">Ateliê Sumi</h2>
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-dialog-close aria-label="Fechar"><ds-icon name="x"></ds-icon></button>
    </header>
    <div class="ds-dialog__body">
      <nav class="overlay-menu" aria-label="Menu do site">${LINKS.map((link) => `<a href="#">${link}</a>`).join('')}</nav>
    </div>
    <footer class="ds-dialog__footer"><a class="ds-btn ds-btn--primary ds-btn--block" href="#">Pedir orçamento</a></footer>
  </dialog>`;

export const hero = ({ center = false, id = 'ill-enso-hero' } = {}) => `
  <section class="ds-section ds-hero${center ? ' ds-hero--center' : ''}">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
        <h1 class="ds-hero__title">Marcas desenhadas à mão, sites feitos para durar</h1>
        <p class="ds-hero__lead">Criamos a identidade e o site do seu negócio num processo só, do primeiro rascunho ao ar.</p>
        <div class="ds-hero__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
          <a class="ds-btn ds-btn--ghost ds-btn--lg" href="#">Ver projetos <ds-icon name="arrow-right"></ds-icon></a>
        </div>
        <p class="ds-hero__note"><ds-icon name="star"></ds-icon> 4,9 de média em 120 avaliações</p>
      </div>
      ${center ? '' : `<div class="ds-hero__media">${enso({ id })}</div>`}
    </div>
  </section>`;

const sectionHeader = (eyebrow, title, { lead = '', center = false, extra = '' } = {}) => `
  <header class="ds-section__header${center ? ' ds-section__header--center' : ''}">
    <p class="ds-section__eyebrow">${eyebrow}</p>
    <h2 class="ds-section__title">${title}</h2>
    ${lead ? `<p class="ds-section__lead">${lead}</p>` : ''}
    ${extra}
  </header>`;

export const features = ({ alt = true } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('O que fazemos', 'Tudo que a sua marca precisa para aparecer bem')}
      <div class="ds-grid" style="--grid-min: 12rem">
        ${FEATURES.map(([icon, title, text]) => `
          <article class="ds-feature">
            <span class="ds-feature__icon"><ds-icon name="${icon}"></ds-icon></span>
            <h3 class="ds-feature__title">${title}</h3>
            <p class="ds-feature__text">${text}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

const billingToggle = `
  <div class="ds-btn-group" role="group" aria-label="Forma de pagamento">
    <button class="ds-btn ds-btn--sm" aria-pressed="true" data-billing-option="monthly">Mensal</button>
    <button class="ds-btn ds-btn--sm" aria-pressed="false" data-billing-option="yearly">Anual · 2 meses grátis</button>
  </div>`;

export const plan = (item) => `
  <article class="ds-plan${item.featured ? ' ds-plan--featured' : ''}">
    ${item.featured ? '<span class="ds-plan__badge ds-badge ds-badge--accent ds-badge--solid ds-badge--pill">Mais escolhido</span>' : ''}
    <h3 class="ds-plan__name">${item.name}</h3>
    <p class="ds-plan__desc">${item.desc}</p>
    <p class="ds-plan__price">R$ <strong data-monthly="${item.monthly}" data-yearly="${item.yearly}">${item.monthly}</strong> /mês</p>
    <ul class="ds-plan__features">
      ${item.features.map((feature) => `<li><ds-icon name="check"></ds-icon> ${feature}</li>`).join('')}
      ${(item.missing ?? []).map((feature) => `<li aria-disabled="true"><ds-icon name="minus"></ds-icon> ${feature}</li>`).join('')}
    </ul>
    <a class="ds-btn ${item.featured ? 'ds-btn--primary' : 'ds-btn--secondary'} ds-btn--block" href="#">Escolher ${item.name}</a>
  </article>`;

export const pricing = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Preços', 'Planos de manutenção do site', { lead: 'Sem fidelidade. Troque de plano quando quiser.', center: true, extra: billingToggle })}
      <div class="ds-grid" style="--grid-min: 15rem">${PLANS.map(plan).join('')}</div>
    </div>
  </section>`;

export const testimonial = ([quote, name, company]) => `
  <figure class="ds-testimonial">
    <blockquote class="ds-testimonial__quote">${quote}</blockquote>
    <figcaption class="ds-testimonial__author">
      <span class="ds-testimonial__avatar" aria-hidden="true">${initials(name)}</span>
      <span><span class="ds-testimonial__name">${name}</span><span class="ds-testimonial__role">${company}</span></span>
    </figcaption>
  </figure>`;

export const testimonials = ({ alt = true, carousel = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Depoimentos', 'Quem já tirou a marca do papel')}
      ${carousel
        ? `<ds-carousel label="Depoimentos" per-view="2" loop><div class="ds-carousel__track">${TESTIMONIALS.map(testimonial).join('')}</div></ds-carousel>`
        : `<div class="ds-grid">${TESTIMONIALS.slice(0, 3).map(testimonial).join('')}</div>`}
    </div>
  </section>`;

export const faq = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container ds-container--narrow">
      ${sectionHeader('Dúvidas', 'Perguntas frequentes', { center: true })}
      <div class="ds-faq">
        ${QUESTIONS.map(([question, answer], i) => `
          <details class="ds-faq__item"${i === 0 ? ' open' : ''}>
            <summary class="ds-faq__question">${question}</summary>
            <div class="ds-faq__answer"><p>${answer}</p></div>
          </details>`).join('')}
      </div>
    </div>
  </section>`;

export const cta = () => `
  <section class="ds-section">
    <div class="ds-container">
      <div class="ds-cta">
        <div>
          <h2 class="ds-cta__title">Vamos desenhar a sua marca?</h2>
          <p class="ds-cta__text">Conte sobre o seu negócio e receba uma proposta em até 2 dias úteis.</p>
        </div>
        <div class="ds-cta__actions">
          <a class="ds-btn ds-btn--ghost ds-btn--lg" href="#">Falar no WhatsApp</a>
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
        </div>
      </div>
    </div>
  </section>`;

export const footer = ({ wordmark = false } = {}) => `
  <footer class="ds-footer">
    <div class="ds-container">
      <div class="ds-footer__inner">
        <div class="ds-footer__brand">
          ${brand()}
          <p>Identidade visual, sites e ilustração para pequenos negócios com personalidade.</p>
          <div class="ds-footer__social">
            ${[['mail', 'E-mail'], ['phone', 'Telefone'], ['map-pin', 'Endereço']].map(([icon, label]) => `<a class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" href="#" aria-label="${label}"><ds-icon name="${icon}"></ds-icon></a>`).join('')}
          </div>
        </div>
        ${[['Estúdio', ['Sobre', 'Processo', 'Projetos']], ['Serviços', ['Identidade', 'Sites', 'Ilustração']], ['Ajuda', ['Contato', 'Perguntas', 'Preços']]].map(([heading, items]) => `
          <nav aria-label="${heading}">
            <h2 class="ds-footer__heading">${heading}</h2>
            <ul class="ds-footer__links">${items.map((item) => `<li><a href="#">${item}</a></li>`).join('')}</ul>
          </nav>`).join('')}
      </div>
      <div class="ds-footer__bottom">
        <p>© 2026 Ateliê Sumi. Feito com o Nanquim System.</p>
        <ul class="ds-footer__links"><li><a href="#">Privacidade</a></li><li><a href="#">Termos</a></li></ul>
      </div>
      ${wordmark ? '<p class="ds-footer__wordmark" aria-hidden="true">sumi.</p>' : ''}
    </div>
  </footer>`;

export const heroEditorial = ({ id = 'ill-landscape-hero' } = {}) => `
  <section class="ds-section ds-hero ds-hero--editorial">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Ateliê de nanquim · desde 2014</p>
        <h1 class="ds-hero__title">sumi.</h1>
        <div class="ds-hero__meta">
          <p><strong>Identidade</strong> Marcas desenhadas à mão, uma tinta de cada vez.</p>
          <p><strong>Sites</strong> Feitos para durar e para todo mundo ler.</p>
        </div>
        <div class="ds-hero__actions">
          <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Pedir orçamento</a>
          <a class="ds-btn ds-btn--link" href="#">Ver projetos <ds-icon name="arrow-right"></ds-icon></a>
        </div>
      </div>
      <div class="ds-hero__media">
        ${inkLandscape({ id })}
        <a class="ds-hero__corner" href="#" aria-label="Ver projetos"><ds-icon name="arrow-right"></ds-icon></a>
      </div>
      <p class="ds-hero__vertical">Materiais de criação<br>Coleção 2026</p>
    </div>
  </section>`;

export const statement = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      <p class="ds-statement__label">(Manifesto)</p>
      <p class="ds-statement">Desenhamos marcas com <em>uma tinta só</em>. <span>O resto é ritmo, silêncio e um traço que não volta atrás.</span></p>
    </div>
  </section>`;

const SERVICES = [
  ['Identidade visual', 'Logo, cores e letras que contam quem você é.'],
  ['Sites sob medida', 'Rápidos, fáceis de editar e bons no celular.'],
  ['Ilustração', 'Desenhos à mão para o que é só seu.'],
  ['Acessibilidade', 'Contraste e teclado desde o primeiro traço.'],
];

export const services = ({ alt = false } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Serviços', 'O que fazemos')}
      <ol class="ds-index">
        ${SERVICES.map(([title, text], i) => `
          <li class="ds-index__item">
            <span class="ds-index__number">0${i + 1}</span>
            <h3 class="ds-index__title">${title}</h3>
            <p class="ds-index__text">${text}</p>
            <ds-icon class="ds-index__icon" name="arrow-right"></ds-icon>
          </li>`).join('')}
      </ol>
    </div>
  </section>`;

const WORKS = [
  [inkWash, 'Café Aguada', 'Identidade · 2026'],
  [inkDrop, 'Papelaria Traço', 'Site · 2025'],
  [brushStroke, 'Cantina Pena', 'Cardápio · 2025'],
  [() => enso({ id: 'ill-enso-work' }), 'Bico de Pena', 'Identidade e site · 2024'],
];

export const works = ({ alt = true } = {}) => `
  <section class="ds-section${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      ${sectionHeader('Projetos', 'Trabalhos recentes')}
      <div class="ds-works">
        ${WORKS.map(([art, title, tags], i) => `
          <a class="ds-work" href="#">
            <div class="ds-work__media">${art()}</div>
            <div class="ds-work__meta">
              <span class="ds-work__number">0${i + 1}</span>
              <h3 class="ds-work__title">${title}</h3>
              <span class="ds-work__tags">${tags}</span>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>`;

export const stats = ({ alt = false } = {}) => `
  <section class="ds-section ds-section--compact${alt ? ' ds-section--alt' : ''}">
    <div class="ds-container">
      <dl class="ds-stats">
        ${[['Anos de estúdio', '12'], ['Marcas desenhadas', '340'], ['Média de avaliação', '4,9<small>/5</small>'], ['Prazo de um site', '6<small> sem.</small>']].map(([label, value]) => `
          <div class="ds-stats__item"><dt class="ds-stats__label">${label}</dt><dd class="ds-stats__value">${value}</dd></div>`).join('')}
      </dl>
    </div>
  </section>`;

// Vitrine: extraído de lojas de moda. Faixa de aviso, marca no centro, nome gigante atrás da imagem,
// faixa invertida de categorias, vantagens com ícone e vitrine de produtos.
const CATEGORIES = [
  [inkDrop, 'Tintas', 'Nanquim, sépia e índigo.'],
  [brushStroke, 'Penas', 'Bicos de aço e pincéis.'],
  [inkWash, 'Papéis', 'Algodão de 300 g.'],
];

const PRODUCTS = [
  [inkDrop, 'Nanquim 30 ml', 'R$ 24,90'],
  [brushStroke, 'Pincel nº 4', 'R$ 38,00'],
  [inkWash, 'Bloco aguada', 'R$ 42,50'],
  [() => enso({ id: 'ill-enso-produto' }), 'Kit iniciante', 'R$ 129,00'],
];

const PERKS = [
  ['cart', 'Entrega rápida', 'Para todo o Brasil'],
  ['refresh', 'Troca fácil', 'Em até 15 dias'],
  ['check-circle', 'Feito à mão', 'Testado lote a lote'],
  ['lock', 'Pagamento seguro', 'Pix e cartão'],
];

export const announcement = () => `
  <div class="ds-announcement">
    <div class="ds-container ds-announcement__inner">
      <p>Frete grátis acima de R$ 150</p>
      <ul class="ds-announcement__links"><li><a href="#">Rastrear pedido</a></li><li><a href="#">Ajuda</a></li></ul>
    </div>
  </div>`;

export const navbarCenter = ({ menuId = 'sumi-menu-loja' } = {}) => `
  <header class="ds-navbar ds-navbar--sticky ds-navbar--editorial ds-navbar--center">
    <div class="ds-container ds-navbar__inner">
      <nav class="ds-navbar__links" aria-label="Principal">
        ${['Tintas', 'Penas', 'Papéis', 'Kits'].map((link) => `<a href="#">${link}</a>`).join('')}
      </nav>
      <a class="ds-navbar__brand" href="#">sumi</a>
      <div class="ds-navbar__actions">
        ${[['search', 'Buscar'], ['user', 'Entrar'], ['cart', 'Sacola (0)']].map(([icon, label]) => `<a class="ds-btn ds-btn--ghost ds-btn--sm" href="#"><ds-icon name="${icon}"></ds-icon> ${label}</a>`).join('')}
      </div>
      <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="${menuId}" aria-haspopup="dialog" aria-label="Abrir menu"><ds-icon name="menu"></ds-icon></button>
    </div>
  </header>
  ${menuDrawer(menuId)}`;

export const heroPoster = ({ id = 'ill-enso-poster' } = {}) => `
  <section class="ds-section ds-hero ds-hero--poster">
    <div class="ds-container ds-hero__inner">
      <p class="ds-hero__tagline">Tinta que<br>acompanha<br>o traço.</p>
      <h1 class="ds-hero__title" style="--hero-poster-size: 30cqi"><b>sumi</b></h1>
      <div class="ds-hero__media">${enso({ id, color: 'currentColor', withPaper: false })}</div>
      <div class="ds-hero__actions">
        <a class="ds-btn ds-btn--primary" href="#">Comprar agora</a>
        <a class="ds-btn ds-btn--link" href="#">Ver novidades</a>
      </div>
      <p class="ds-hero__aside">Nova<br>coleção<br>2026</p>
    </div>
  </section>`;

// data-invert: o visualizador põe o modo oposto ao da página, para a faixa continuar invertida nos dois modos.
export const categories = () => `
  <section class="ds-section ds-section--compact" data-invert data-mode="dark">
    <div class="ds-container">
      <div class="ds-grid" style="--grid-min: 15rem">
        ${CATEGORIES.map(([art, title, text]) => `
          <article class="ds-card ds-card--plain ds-card--horizontal">
            <div class="ds-card__media">${art()}</div>
            <div class="ds-card__content">
              <h3 class="ds-card__title">${title}</h3>
              <p class="ds-card__body">${text}</p>
              <a class="ds-btn ds-btn--link ds-btn--sm" href="#">Ver ${title.toLowerCase()} <ds-icon name="arrow-right"></ds-icon></a>
            </div>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

export const banner = ({ id = 'ill-landscape-banner' } = {}) => `
  <section class="ds-section ds-section--alt ds-hero">
    <div class="ds-container ds-hero__inner">
      <div class="ds-hero__content">
        <p class="ds-hero__eyebrow">Nova estação</p>
        <h2 class="ds-hero__title">Nova aguada</h2>
        <p class="ds-hero__lead">Doze tons de uma tinta só.</p>
        <div class="ds-hero__actions"><a class="ds-btn ds-btn--primary" href="#">Ver coleção</a></div>
      </div>
      <div class="ds-hero__media">${inkLandscape({ id })}</div>
    </div>
  </section>`;

export const perks = () => `
  <section class="ds-section ds-section--compact">
    <div class="ds-container">
      <div class="ds-grid" style="--grid-min: 12rem">
        ${PERKS.map(([icon, title, text]) => `
          <article class="ds-feature ds-feature--inline">
            <span class="ds-feature__icon"><ds-icon name="${icon}"></ds-icon></span>
            <h3 class="ds-feature__title">${title}</h3>
            <p class="ds-feature__text">${text}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

export const products = () => `
  <section class="ds-section">
    <div class="ds-container">
      <header class="ds-section__header ds-section__header--split">
        <h2 class="ds-section__title">O melhor do ateliê</h2>
        <div class="ds-section__aside"><a class="ds-btn ds-btn--link" href="#">Ver tudo <ds-icon name="arrow-right"></ds-icon></a></div>
      </header>
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
    </div>
  </section>`;

// Grade: extraído de um site de consultório. Fundo quadriculado, hero num cartão claro com menu em células,
// título dividido ao redor da imagem, cabeçalhos com título à esquerda e texto à direita, cards espalhados.
const SCATTER = [
  [() => enso({ id: 'ill-enso-grade' }), 'Conversa sem pressa'],
  [inkDrop, 'Raiz antes do traço'],
  [inkWash, 'Rascunho à mão'],
  [brushStroke, 'Marca que cresce'],
  [() => enso({ id: 'ill-enso-grade-2' }), 'Você no comando'],
];

export const heroFramed = ({ menuId = 'sumi-menu-grade', id = 'ill-landscape-grade' } = {}) => `
  <section class="ds-section ds-section--grid ds-hero ds-hero--poster ds-hero--framed">
    <div class="ds-container">
      <div class="ds-hero__frame" data-invert data-mode="light">
        <header class="ds-navbar ds-navbar--cells">
          <div class="ds-navbar__inner">
            <a class="ds-navbar__brand" href="#">sumi</a>
            <nav class="ds-navbar__links" aria-label="Principal">
              ${['Missão', 'Sobre', 'Serviços', 'Contato'].map((link) => `<a href="#">${link}</a>`).join('')}
            </nav>
            <button class="ds-btn ds-btn--ghost ds-btn--icon ds-navbar__toggle" data-dialog-open="${menuId}" aria-haspopup="dialog" aria-label="Abrir menu"><ds-icon name="menu"></ds-icon></button>
          </div>
        </header>
        <div class="ds-hero__inner">
          <p class="ds-hero__tagline">Ateliê de nanquim</p>
          <h1 class="ds-hero__title" style="--hero-poster-size: 14cqi"><b>Tinta</b> <span>viva</span></h1>
          <div class="ds-hero__media">${inkLandscape({ id })}</div>
          <div class="ds-hero__actions"><a class="ds-btn ds-btn--primary" href="#">[ Contato ]</a></div>
          <p class="ds-hero__aside">Aqui o traço<br>pode errar.</p>
        </div>
      </div>
    </div>
  </section>
  ${menuDrawer(menuId)}`;

const splitHeader = (eyebrow, title, text, action) => `
  <header class="ds-section__header ds-section__header--split">
    <p class="ds-section__eyebrow">[ ${eyebrow} ]</p>
    <h2 class="ds-section__title">${title}</h2>
    <div class="ds-section__aside">
      <p>${text}</p>
      <a class="ds-btn ds-btn--primary ds-btn--sm" href="#">[ ${action} ]</a>
    </div>
  </header>`;

export const philosophy = () => `
  <section class="ds-section ds-section--grid">
    <div class="ds-container">
      ${splitHeader('filosofia', 'Você não precisa acertar de primeira. Precisa começar o traço.', 'Nosso trabalho não é corrigir, é acompanhar: do primeiro rascunho à marca no ar.', 'Etapas')}
      <div class="ds-works ds-works--scatter">
        ${SCATTER.map(([art, title]) => `
          <a class="ds-work" href="#">
            <div class="ds-work__media">${art()}</div>
            <div class="ds-work__meta"><h3 class="ds-work__title">${title}</h3></div>
          </a>`).join('')}
      </div>
    </div>
  </section>`;

export const resources = () => `
  <section class="ds-section ds-section--grid">
    <div class="ds-container">
      ${splitHeader('recursos', 'Investir na marca é investir no que dura.', 'Guias curtos para cuidar da sua identidade depois da entrega.', 'Materiais')}
    </div>
  </section>`;

export const TEMPLATES = [['editorial', 'Editorial'], ['vitrine', 'Vitrine'], ['grade', 'Grade'], ['classico', 'Clássico']];

// Para quem cada modelo serve: aparece no seletor de modelos do visualizador.
export const TEMPLATE_INFO = {
  editorial: 'Estúdio ou portfólio: manifesto, serviços e projetos.',
  vitrine: 'Loja: categorias, vantagens e produtos.',
  grade: 'Produto ou ferramenta: ideias e recursos em grade.',
  classico: 'Serviço direto: recursos, preços e chamada.',
};

// A identidade que cada modelo pede: escolher o modelo no visualizador aplica isto, e tudo continua editável.
export const TEMPLATE_BRANDS = {
  editorial: { theme: 'nanquim', font: 'editorial', mode: 'dark', radius: 1 },
  vitrine: { theme: 'vitrine', font: 'geometrico', mode: 'light', radius: 0 },
  grade: { theme: 'grade', font: 'condensado', mode: 'dark', radius: 2 },
  classico: { theme: 'nanquim', font: 'editorial', mode: 'dark', radius: 1 },
};

// Cada modelo é uma lista de seções com nome: o nome vira o índice "Seções deste modelo".
const SITES = {
  classico: [
    ['Menu', (menuId) => navbar({ menuId })],
    ['Abertura', () => hero()],
    ['Recursos', () => features()],
    ['Preços', () => pricing()],
    ['Depoimentos', () => testimonials()],
    ['Perguntas', () => faq()],
    ['Chamada', () => cta()],
    ['Rodapé', () => footer()],
  ],
  editorial: [
    ['Menu', (menuId) => navbar({ menuId, editorial: true })],
    ['Abertura', () => heroEditorial()],
    ['Manifesto', () => statement()],
    ['Serviços', () => services()],
    ['Projetos', () => works()],
    ['Números', () => stats()],
    ['Depoimentos', () => testimonials({ alt: true, carousel: true })],
    ['Preços', () => pricing()],
    ['Perguntas', () => faq({ alt: true })],
    ['Chamada', () => cta()],
    ['Rodapé', () => footer({ wordmark: true })],
  ],
  vitrine: [
    ['Aviso', () => announcement()],
    ['Menu', (menuId) => navbarCenter({ menuId })],
    ['Abertura', () => heroPoster()],
    ['Categorias', () => categories()],
    ['Destaque', () => banner()],
    ['Vantagens', () => perks()],
    ['Produtos', () => products()],
    ['Depoimentos', () => testimonials({ alt: true, carousel: true })],
    ['Perguntas', () => faq()],
    ['Rodapé', () => footer({ wordmark: true })],
  ],
  grade: [
    ['Abertura', (menuId) => heroFramed({ menuId })],
    ['Ideias', () => philosophy()],
    ['Recursos', () => resources()],
    ['Depoimentos', () => testimonials({ alt: false, carousel: true })],
    ['Perguntas', () => faq({ alt: true })],
    ['Chamada', () => cta()],
    ['Rodapé', () => footer()],
  ],
};

const siteOf = (template) => SITES[template] ?? SITES.editorial;

export const fullSite = (menuId, template = 'editorial') => siteOf(template)
  .map(([name, section]) => section(menuId).replace(/<([a-z]+)/, `<$1 data-site-section="${name}"`))
  .join('');

export const siteSections = (template) => siteOf(template).map(([name]) => name);

export const WIDTHS = [['full', 'Computador'], ['768', 'Tablet'], ['390', 'Celular']];

export const frame = ({ content, url = 'ateliesumi.com.br', className = '', attrs = '', widths = true, tools = '' }) => `
  <div class="site-frame ${className}" data-frame>
    <div class="site-frame-bar">
      <span class="site-frame-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="site-frame-url" aria-hidden="true">${url}</span>
      ${widths ? `<div class="doc-segmented site-frame-widths" role="radiogroup" aria-label="Largura da prévia">
        ${WIDTHS.map(([value, label], i) => `<button role="radio" aria-checked="${i === 0}" data-frame-width="${value}">${label}</button>`).join('')}
      </div>` : ''}
      ${tools}
    </div>
    <div class="site-frame-stage">
      <div class="site-frame-page" ${attrs}>${content}</div>
    </div>
  </div>`;

export function setFrameWidth(frameEl, value) {
  frameEl.querySelector('.site-frame-page').style.maxWidth = value === 'full' ? '' : `${value}px`;
  frameEl.querySelectorAll('[data-frame-width]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.frameWidth === value)));
}

// Comportamento comum das prévias: largura, alternância mensal/anual e links que não saem da página.
export function mountSiteDemos(el) {
  const onClick = (e) => {
    const widthOption = e.target.closest('[data-frame-width]');
    if (widthOption) setFrameWidth(widthOption.closest('[data-frame]'), widthOption.dataset.frameWidth);

    const billing = e.target.closest('[data-billing-option]');
    if (billing) {
      const section = billing.closest('.ds-section');
      section.querySelectorAll('[data-billing-option]').forEach((b) => b.setAttribute('aria-pressed', String(b === billing)));
      section.querySelectorAll('[data-monthly]').forEach((price) => {
        price.textContent = price.dataset[billing.dataset.billingOption];
      });
    }

    if (e.target.closest('.site-frame a, .ds-dialog a')) e.preventDefault();
  };
  el.addEventListener('click', onClick);
  return () => {
    el.removeEventListener('click', onClick);
    el.querySelectorAll('dialog[open]').forEach((d) => d.close());
  };
}
