import { pages, groups } from '../registry.js';

const LAYERS = [
  ['Primitivos', 'Os valores crus: escalas de tinta, espaço, tipo e movimento.'],
  ['Semânticos', 'Os nomes por função: fundo, texto, destaque, sombra de folha e grão do papel.'],
  ['Temas', 'Pigmento e água sobre o sumi, escolhidos por atributos no HTML.'],
];

const groupList = (group) => `
  <section class="doc-section">
    <h2>${group}</h2>
    <ol class="card-anatomy-list">
      ${pages.filter((page) => page.group === group && page.id !== 'recapitulacao').map((page) => `
        <li><strong><a href="#${page.id}">${page.title}</a></strong><span>${page.lead ?? ''}</span></li>`).join('')}
    </ol>
  </section>`;

export default {
  id: 'recapitulacao',
  group: 'Começo',
  title: 'Recapitulação',
  keywords: 'resumo visão geral tudo sistema mapa índice papel',
  lead: 'O sistema inteiro em uma folha.',
  render: () => `
    <section class="doc-section">
      <h2>A ideia</h2>
      <p>Tudo aqui é tinta sobre papel: folhas recortadas e empilhadas, em preto e branco.</p>
      <p>A profundidade vem da sombra de cada folha, nunca de brilho.</p>
      <span class="ds-seal" lang="ja" role="img" aria-label="Selo: sumi">墨</span>
    </section>

    <section class="doc-section">
      <h2>Três camadas</h2>
      <ol class="card-anatomy-list">
        ${LAYERS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    ${groups.filter((group) => group !== 'Começo').map(groupList).join('')}`,
};
