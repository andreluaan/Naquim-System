const ITEMS = [
  { name: 'Fundações (cores, tipografia, espaço, elevação, movimento)', status: 'feito' },
  { name: 'Identidade da casa: tema Sumi', status: 'feito' },
  { name: 'Página de apresentação do conceito', status: 'feito' },
  { name: 'Ícones: set próprio e componente <ds-icon>', status: 'feito' },
  { name: 'Botões e botões de ícone', status: 'feito' },
  { name: 'Badges e cards', status: 'feito' },
  { name: 'Campos de formulário', status: 'feito' },
  { name: 'Carrossel e slides', status: 'feito' },
  { name: 'Modal, gaveta, tooltip', status: 'feito' },
  { name: 'Seções de site: hero, navbar, rodapé, preços, depoimentos', status: 'feito' },
  { name: 'Seções em páginas próprias, perguntas frequentes e visualizador de marca', status: 'feito' },
  { name: 'Documentação enxuta e cópia do valor dos tokens', status: 'feito' },
  { name: 'Modelo editorial do site, novas seções e tela cheia com gaveta de edição', status: 'feito' },
  { name: 'Paletas derivadas do sumi (aguada), Laboratório de paletas e modelos Vitrine e Grade', status: 'feito' },
  { name: 'Site completo organizado por modelo, índice de seções e auditoria de acessibilidade', status: 'feito' },
  { name: 'De Nanquim a Sumi: estética japonesa, logo ensō e selo', status: 'feito' },
  { name: 'Pacote para usar em outros projetos (npm e CDN)', status: 'próximo' },
  { name: 'Primeiro site de cliente feito só com o Sumi', status: 'depois' },
];

const LABEL = { feito: 'Feito', agora: 'Em andamento', 'próximo': 'Próximo', depois: 'Planejado' };

export default {
  id: 'roadmap',
  group: 'Projeto',
  title: 'Roadmap',
  keywords: 'planejamento próximos futuro',
  lead: 'Cresce aos poucos, uma peça de cada vez.',
  render: () => `
    <ol class="roadmap">
      ${ITEMS.map((i) => `
        <li class="roadmap-item is-${i.status === 'próximo' ? 'proximo' : i.status}">
          <span class="roadmap-dot" aria-hidden="true"></span>
          <span>${i.name}</span>
          <span class="roadmap-tag">${LABEL[i.status]}</span>
        </li>`).join('')}
    </ol>`,
};
