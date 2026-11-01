import { inkWash } from '../illustrations.js';
import { code, doDont } from '../utils.js';

const closeButton = '<button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-dialog-close aria-label="Fechar"><ds-icon name="x"></ds-icon></button>';

function dialog({ id, classes = '', isStatic = false, title, body, footer = '' }) {
  return `
    <dialog class="ds-dialog ${classes}" id="${id}" aria-labelledby="${id}-titulo"${isStatic ? ' data-static' : ''}>
      <header class="ds-dialog__header">
        <h2 class="ds-dialog__title" id="${id}-titulo">${title}</h2>
        ${closeButton}
      </header>
      <div class="ds-dialog__body">${body}</div>
      ${footer ? `<footer class="ds-dialog__footer">${footer}</footer>` : ''}
    </dialog>`;
}

const MODALS = [
  ['modal-confirmar', 'Confirmação', 'Duas saídas.', 'ds-btn--secondary'],
  ['modal-newsletter', 'Com formulário', 'Um dado rápido.', 'ds-btn--secondary'],
  ['modal-excluir', 'Ação perigosa', 'Só fecha pelos botões.', 'ds-btn--danger'],
  ['modal-termos', 'Conteúdo longo', 'O meio rola.', 'ds-btn--secondary'],
];

const DRAWERS = [
  ['gaveta-menu', 'Menu', 'Pela esquerda.', 'menu'],
  ['gaveta-carrinho', 'Carrinho', 'Pela direita.', 'cart'],
  ['gaveta-filtros', 'Filtros', 'Sobe de baixo.', 'filter'],
];

const PLACEMENTS = [['top', 'Em cima'], ['right', 'À direita'], ['bottom', 'Embaixo'], ['left', 'À esquerda']];

const TOOLBAR = [['edit', 'Editar'], ['copy', 'Duplicar'], ['share', 'Compartilhar'], ['download', 'Baixar'], ['trash', 'Excluir']];

const MENU = [['home', 'Início'], ['grid', 'Projetos'], ['pen', 'Processo'], ['user', 'Sobre'], ['mail', 'Contato']];

const CART = [['Sumi preto, 30 ml', 'R$ 24,90'], ['Pena caligráfica nº 3', 'R$ 18,00'], ['Bloco de papel 300 g', 'R$ 42,50']];

const TERMS = Array.from({ length: 8 }, (_, i) => `
  <h3>${i + 1}. ${['Quem somos', 'Dados que coletamos', 'Para que usamos', 'Com quem compartilhamos', 'Por quanto tempo guardamos', 'Seus direitos', 'Cookies', 'Contato'][i]}</h3>
  <p>Como o site trata os seus dados, em linguagem simples. Nada é vendido e você pode pedir a exclusão quando quiser.</p>`).join('');

export default {
  id: 'sobreposicoes',
  group: 'Componentes',
  title: 'Modal, gaveta e tooltip',
  keywords: 'modal dialog diálogo janela popup gaveta drawer menu lateral carrinho tooltip dica balão sobreposição overlay',
  lead: 'O que aparece por cima: o modal pede decisão, a gaveta abre ao lado, o tooltip dá nome.',
  render: () => `
    <section class="doc-section">
      <h2>Modal</h2>
      <p>Escurece o resto e pede atenção. Teste <kbd>Tab</kbd> e <kbd>Esc</kbd>.</p>
      <div class="overlay-grid">
        ${MODALS.map(([id, name, text, button]) => `
          <div class="overlay-tile">
            <strong>${name}</strong>
            <span>${text}</span>
            <button class="ds-btn ${button} ds-btn--sm" data-dialog-open="${id}" aria-haspopup="dialog">Abrir</button>
          </div>`).join('')}
      </div>
      ${code(`
<button class="ds-btn" data-dialog-open="confirmar" aria-haspopup="dialog">Publicar</button>

<dialog class="ds-dialog" id="confirmar" aria-labelledby="confirmar-titulo">
  <header class="ds-dialog__header">
    <h2 class="ds-dialog__title" id="confirmar-titulo">Publicar o site?</h2>
    <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" data-dialog-close aria-label="Fechar">…</button>
  </header>
  <div class="ds-dialog__body">A nova versão fica no ar em poucos minutos.</div>
  <footer class="ds-dialog__footer">
    <button class="ds-btn ds-btn--ghost" data-dialog-close>Agora não</button>
    <button class="ds-btn ds-btn--primary" data-dialog-close="publicar">Publicar</button>
  </footer>
</dialog>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Gaveta</h2>
      <p>O modal preso a um lado. Para consultar e fechar.</p>
      <div class="overlay-grid overlay-grid--three">
        ${DRAWERS.map(([id, name, text, icon]) => `
          <div class="overlay-tile">
            <strong><ds-icon name="${icon}"></ds-icon> ${name}</strong>
            <span>${text}</span>
            <button class="ds-btn ds-btn--secondary ds-btn--sm" data-dialog-open="${id}" aria-haspopup="dialog">Abrir</button>
          </div>`).join('')}
      </div>
      ${code(`
<dialog class="ds-dialog ds-dialog--drawer">…</dialog>                     <!-- direita -->
<dialog class="ds-dialog ds-dialog--drawer ds-dialog--start">…</dialog>    <!-- esquerda -->
<dialog class="ds-dialog ds-dialog--drawer ds-dialog--bottom">…</dialog>   <!-- de baixo -->`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Tooltip</h2>
      <p>Dá nome a botões de ícone. Nunca esconde o essencial.</p>
      <div class="doc-demo overlay-tooltips">
        ${PLACEMENTS.map(([side, name]) => `
          <ds-tooltip text="Balão ${name.toLowerCase()}" placement="${side}">
            <button class="ds-btn ds-btn--outline ds-btn--sm">${name}</button>
          </ds-tooltip>`).join('')}
      </div>

      <h3>Na prática: barra de ferramentas</h3>
      <div class="doc-demo overlay-toolbar-demo">
        <div class="overlay-toolbar" role="toolbar" aria-label="Ações do arquivo">
          ${TOOLBAR.map(([icon, label]) => `
            <ds-tooltip text="${label}">
              <button class="ds-btn ds-btn--ghost ds-btn--icon" aria-label="${label}"><ds-icon name="${icon}"></ds-icon></button>
            </ds-tooltip>`).join('')}
        </div>
        <p class="overlay-field-help">
          Senha
          <ds-tooltip text="Mínimo de 8 caracteres, com pelo menos um número." placement="right">
            <button class="ds-btn ds-btn--ghost ds-btn--icon ds-btn--sm" aria-label="Regras da senha"><ds-icon name="info"></ds-icon></button>
          </ds-tooltip>
        </p>
      </div>
      ${code(`
<ds-tooltip text="Excluir" placement="top">
  <button class="ds-btn ds-btn--ghost ds-btn--icon" aria-label="Excluir">…</button>
</ds-tooltip>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Acessibilidade</h2>
      <ul class="carousel-a11y">
        <li><ds-icon name="lock"></ds-icon> o <kbd>Tab</kbd> fica preso no modal;</li>
        <li><ds-icon name="x"></ds-icon> <kbd>Esc</kbd> fecha tudo;</li>
        <li><ds-icon name="arrow-left"></ds-icon> ao fechar, o foco volta a quem abriu;</li>
        <li><ds-icon name="eye"></ds-icon> o tooltip abre também pelo teclado.</li>
      </ul>
      ${doDont(
        ['Modal só para decidir agora', 'Título que diz o que acontece'],
        ['Modal ao abrir a página', 'Modal sobre modal'],
      )}
    </section>

    ${dialog({
      id: 'modal-confirmar',
      classes: 'ds-dialog--sm',
      title: 'Publicar o site?',
      body: '<p>A nova versão fica no ar em poucos minutos. Você pode voltar para a anterior quando quiser.</p>',
      footer: '<button class="ds-btn ds-btn--ghost" data-dialog-close>Agora não</button><button class="ds-btn ds-btn--primary" data-dialog-close="publicar">Publicar</button>',
    })}

    ${dialog({
      id: 'modal-newsletter',
      title: 'Receba as novidades',
      body: `<div class="overlay-media">${inkWash()}</div>
        <p>Um e-mail por mês com o que saiu de novo no estúdio. Sem spam.</p>
        <form class="form-inline" method="dialog">
          <input class="ds-input" type="email" placeholder="voce@email.com" aria-label="Seu e-mail" required autofocus>
          <button class="ds-btn ds-btn--primary">Assinar</button>
        </form>`,
    })}

    ${dialog({
      id: 'modal-excluir',
      classes: 'ds-dialog--sm',
      isStatic: true,
      title: 'Excluir o projeto “Ateliê Sumi”?',
      body: '<p>As páginas, imagens e formulários deste projeto serão apagados. <strong>Isso não pode ser desfeito.</strong></p>',
      footer: '<button class="ds-btn ds-btn--ghost" data-dialog-close>Cancelar</button><button class="ds-btn ds-btn--danger" data-dialog-close="excluir"><ds-icon name="trash"></ds-icon> Excluir</button>',
    })}

    ${dialog({
      id: 'modal-termos',
      classes: 'ds-dialog--lg',
      title: 'Política de privacidade',
      body: TERMS,
      footer: '<button class="ds-btn ds-btn--primary" data-dialog-close>Entendi</button>',
    })}

    ${dialog({
      id: 'gaveta-menu',
      classes: 'ds-dialog--drawer ds-dialog--start',
      title: 'Sumi Estúdio',
      body: `<nav class="overlay-menu" aria-label="Menu do site">
        ${MENU.map(([icon, label]) => `<a href="#sobreposicoes"><ds-icon name="${icon}"></ds-icon> ${label}</a>`).join('')}
      </nav>`,
    })}

    ${dialog({
      id: 'gaveta-carrinho',
      classes: 'ds-dialog--drawer',
      title: 'Seu carrinho',
      body: `<ul class="overlay-cart">
        ${CART.map(([item, price]) => `<li><span>${item}</span><strong>${price}</strong></li>`).join('')}
      </ul>
      <p class="overlay-cart-total"><span>Total</span><strong>R$ 85,40</strong></p>`,
      footer: '<button class="ds-btn ds-btn--primary ds-btn--block">Finalizar compra</button>',
    })}

    ${dialog({
      id: 'gaveta-filtros',
      classes: 'ds-dialog--drawer ds-dialog--bottom',
      title: 'Filtrar projetos',
      body: `<fieldset class="ds-fieldset">
        <legend>Tipo de projeto</legend>
        ${['Site institucional', 'Loja virtual', 'Landing page'].map((label, i) => `<label class="ds-check"><input type="checkbox"${i === 0 ? ' checked' : ''}> ${label}</label>`).join('')}
      </fieldset>`,
      footer: '<button class="ds-btn ds-btn--ghost" data-dialog-close>Limpar</button><button class="ds-btn ds-btn--primary" data-dialog-close>Ver 12 projetos</button>',
    })}`,

  mount(el) {
    // ?abrir=<id> já abre um modal ou gaveta: serve para links diretos e para os prints do diário.
    const startOpen = new URLSearchParams(location.search).get('abrir');
    if (startOpen) el.querySelector(`dialog#${CSS.escape(startOpen)}`)?.showModal();

    // Os links de exemplo apontam para a própria página; evita pular ao topo.
    el.addEventListener('click', (e) => {
      if (e.target.closest('.overlay-menu a')) e.preventDefault();
    });
    // Ao trocar de página com algo aberto, nada pode ficar travando a tela.
    return () => el.querySelectorAll('dialog[open]').forEach((d) => d.close());
  },
};
