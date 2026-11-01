// Os quatro modelos do mundo de papel: uma editora, um festival, uma casa de chá e uma revista.
const SCENES = {
  montanhas: [
    'M0 320 L140 210 L280 300 L430 170 L600 290 L800 200 V600 H0Z',
    'M0 390 L190 280 L350 380 L520 260 L800 380 V600 H0Z',
    'M0 450 L160 370 L330 450 L560 350 L800 450 V600 H0Z',
    'M0 510 C150 440 300 540 470 470 S700 480 800 500 V600 H0Z',
    'M0 560 C200 500 380 590 560 530 S740 540 800 560 V600 H0Z',
  ],
  ondas: [
    'M0 300 q100 -70 200 0 t200 0 t200 0 t200 0 V600 H0Z',
    'M0 370 q100 -70 200 0 t200 0 t200 0 t200 0 V600 H0Z'.replace('M0', 'M-60'),
    'M0 440 q100 -70 200 0 t200 0 t200 0 t200 0 V600 H0Z',
    'M0 500 q100 -60 200 0 t200 0 t200 0 t200 0 V600 H0Z'.replace('M0', 'M-90'),
    'M0 555 q100 -50 200 0 t200 0 t200 0 t200 0 V600 H0Z',
  ],
  tigela: [
    'M0 420 H800 V600 H0Z',
    'M170 250 H630 C630 400 540 480 400 480 S170 400 170 250Z',
    'M210 250 H590 C590 300 500 330 400 330 S210 300 210 250Z',
    'M320 480 H480 L500 520 H300Z',
    'M0 540 C200 510 600 570 800 530 V600 H0Z',
  ],
};

const diorama = (scene, sun = [590, 150, 62]) => `
  <div class="ds-diorama">
    <svg viewBox="0 0 800 600" role="img" aria-label="Paisagem de papel recortado em camadas">
      <circle class="ds-diorama__sun" cx="${sun[0]}" cy="${sun[1]}" r="${sun[2]}" />
      ${SCENES[scene].map((d) => `<path class="ds-diorama__layer" d="${d}" />`).join('')}
    </svg>
  </div>`;

const nav = (brand, links, action) => `
  <header class="ds-sheet--raised">
    <nav class="ds-container ds-paper-nav" aria-label="${brand}">
      <a class="ds-paper-nav__brand" href="#">${brand}</a>
      <div class="ds-paper-nav__links">${links.map((link) => `<a href="#">${link}</a>`).join('')}</div>
      <a class="ds-btn ds-btn--primary ds-btn--sm" href="#">${action}</a>
    </nav>
  </header>`;

const ledger = (title, rows) => `
  <section class="ds-sheet">
    <div class="ds-container">
      <h2 class="ds-sheet__title">${title}</h2>
      <ol class="ds-ledger">
        ${rows.map(([key, name, note]) => `
          <li class="ds-ledger__row">
            <span class="ds-ledger__key">${key}</span>
            <span class="ds-ledger__name">${name}</span>
            <span class="ds-ledger__note">${note}</span>
          </li>`).join('')}
      </ol>
    </div>
  </section>`;

const stack = (title, sheets) => `
  <section class="ds-sheet ds-sheet--raised">
    <div class="ds-container">
      <h2 class="ds-sheet__title">${title}</h2>
      <div class="ds-stack">
        ${sheets.map(([name, note], i) => `
          <article class="ds-stack__sheet ${i % 3 === 1 ? 'ds-stack__sheet--ink' : ''}">
            <h3 class="ds-stack__title">${name}</h3>
            <p>${note}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>`;

const signup = (title, text, label, button) => `
  <section class="ds-sheet">
    <div class="ds-container">
      <h2 class="ds-sheet__title">${title}</h2>
      <p class="ds-sheet__text">${text}</p>
      <form class="ds-paper-form" style="margin-top: var(--ds-space-6)">
        <label>${label}<input class="ds-input" type="email" autocomplete="email" /></label>
        <button class="ds-btn ds-btn--primary" type="button">${button}</button>
      </form>
    </div>
  </section>`;

const closing = (name, text) => `
  <footer class="ds-sheet ds-sheet--raised">
    <div class="ds-container">
      <p class="ds-sheet__title">${name}</p>
      <p class="ds-sheet__text">${text}</p>
      <span class="ds-seal ds-seal--sm" lang="ja" role="img" aria-label="Selo: sumi" style="margin-top: var(--ds-space-6)">墨</span>
    </div>
  </footer>`;

export const PAPER_TEMPLATES = [['editora', 'Editora'], ['festival', 'Festival'], ['casa-de-cha', 'Casa de chá'], ['revista', 'Revista']];

export const PAPER_INFO = {
  editora: 'Editora ou livraria: catálogo e lançamentos.',
  festival: 'Evento: programação e ingressos.',
  'casa-de-cha': 'Restaurante ou café: cardápio e reserva.',
  revista: 'Publicação: edições e assinatura.',
};

export const PAPER_BRANDS = {
  editora: { theme: 'sumi', font: 'sumi', mode: 'light', radius: 0 },
  festival: { theme: 'neutro', font: 'condensado', mode: 'dark', radius: 0 },
  'casa-de-cha': { theme: 'grade', font: 'classico', mode: 'light', radius: 0 },
  revista: { theme: 'vitrine', font: 'sumi', mode: 'light', radius: 0 },
};

export const PAPER_SITES = {
  editora: [
    ['Menu', () => nav('Dobra Edições', ['Catálogo', 'Autores', 'Livraria'], 'Ver catálogo')],
    ['Abertura', () => `
      <section class="ds-paper-hero ds-paper-hero--center">
        <div class="ds-container ds-paper-hero__layout">
          <div class="ds-paper-hero__copy">
            <h1 class="ds-paper-hero__title">Livros feitos à mão</h1>
            <p class="ds-paper-hero__text">Tiragens curtas, costuradas uma a uma.</p>
            <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Ver catálogo</a>
          </div>
          ${diorama('montanhas')}
        </div>
      </section>`],
    ['Catálogo', () => ledger('Neste ano', [
      ['Poesia', 'Cem vistas do rio', 'Capa em papel de arroz'],
      ['Ensaio', 'O vazio entre as coisas', 'Costura japonesa aparente'],
      ['Infantil', 'A garça que dobrava o céu', 'Com folha para dobrar'],
    ])],
    ['Coleções', () => stack('Três coleções', [
      ['Folha', 'Poemas curtos.'], ['Vinco', 'Ensaios sobre fazer.'], ['Corte', 'Livros para crianças.'],
    ])],
    ['Novidades', () => signup('Um aviso a cada livro', 'Só quando sair uma tiragem nova.', 'Seu e-mail', 'Quero receber')],
    ['Rodapé', () => closing('Dobra Edições', 'Exemplo fictício do Sumi System.')],
  ],
  festival: [
    ['Menu', () => nav('Kamishibai', ['Programa', 'Lugares'], 'Garantir lugar')],
    ['Abertura', () => `
      <section class="ds-paper-hero ds-paper-hero--stage">
        <div class="ds-container ds-paper-hero__layout">
          ${diorama('ondas', [160, 150, 80])}
          <div>
            <h1 class="ds-paper-hero__title">Teatro de papel</h1>
            <p class="ds-paper-hero__text">Três noites de histórias contadas em folhas.</p>
            <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Garantir lugar</a>
          </div>
        </div>
      </section>`],
    ['Programa', () => ledger('Programa', [
      ['Sexta, 19h', 'A onda e o pescador', 'Palco do pátio'],
      ['Sábado, 19h', 'O gato da lanterna', 'Sala de papel'],
      ['Domingo, 17h', 'Oficina de recorte', 'Para todas as idades'],
    ])],
    ['Como funciona', () => stack('Uma noite aqui', [
      ['Chegue', 'As portas abrem meia hora antes.'], ['Sente', 'Almofadas no chão, perto do palco.'], ['Recorte', 'Leve uma folha para casa.'],
    ])],
    ['Rodapé', () => closing('Kamishibai', 'Exemplo fictício do Sumi System.')],
  ],
  'casa-de-cha': [
    ['Menu', () => nav('Casa Shoji', ['Cardápio', 'Horários'], 'Reservar')],
    ['Abertura', () => `
      <section class="ds-paper-hero ds-paper-hero--scroll">
        <div class="ds-container ds-paper-hero__layout">
          <span class="ds-paper-hero__kanji" lang="ja" aria-hidden="true">茶</span>
          <div>
            <h1 class="ds-paper-hero__title">Sente. O chá espera.</h1>
            <p class="ds-paper-hero__text">Chás japoneses servidos sem pressa.</p>
            <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Reservar mesa</a>
          </div>
          ${diorama('tigela', [640, 130, 50])}
        </div>
      </section>`],
    ['Cardápio', () => ledger('Cardápio', [
      ['Verde', 'Sencha', 'R$ 22'], ['Batido', 'Matcha cerimonial', 'R$ 32'], ['Torrado', 'Hojicha', 'R$ 20'], ['Doce', 'Wagashi da estação', 'R$ 18'],
    ])],
    ['Reserva', () => signup('Guarde sua mesa', 'Confirmamos por e-mail.', 'Seu e-mail', 'Pedir reserva')],
    ['Rodapé', () => closing('Casa Shoji', 'Exemplo fictício do Sumi System.')],
  ],
  revista: [
    ['Menu', () => nav('Vinco', ['Edições', 'Sobre'], 'Assinar')],
    ['Abertura', () => `
      <section class="ds-paper-hero ds-paper-hero--split">
        <div class="ds-container ds-paper-hero__layout">
          <div>
            <h1 class="ds-paper-hero__title">Vinco</h1>
            <p class="ds-paper-hero__text">Uma revista impressa sobre coisas feitas devagar.</p>
            <a class="ds-btn ds-btn--primary ds-btn--lg" href="#">Assinar</a>
          </div>
          <div class="ds-stack">
            <article class="ds-stack__sheet ds-stack__sheet--ink"><h2 class="ds-stack__title">Edição Papel</h2><p>Quem ainda faz à mão.</p></article>
            <article class="ds-stack__sheet"><h2 class="ds-stack__title">Edição Tinta</h2><p>A cor antes da cor.</p></article>
          </div>
        </div>
      </section>`],
    ['Nesta edição', () => ledger('Nesta edição', [
      ['Reportagem', 'Os últimos papeleiros de Echizen', 'Um vale e seu ofício'],
      ['Ensaio', 'Por que dobrar', 'Sobre o vinco'],
      ['Visita', 'Uma oficina de carimbos', 'Pedra, faca e paciência'],
    ])],
    ['Paisagem', () => `<section class="ds-sheet ds-sheet--raised"><div class="ds-container">${diorama('montanhas', [200, 140, 70])}</div></section>`],
    ['Assinatura', () => signup('Receba em casa', 'Quatro edições por ano, pelo correio.', 'Seu e-mail', 'Assinar')],
    ['Rodapé', () => closing('Vinco', 'Exemplo fictício do Sumi System.')],
  ],
};
