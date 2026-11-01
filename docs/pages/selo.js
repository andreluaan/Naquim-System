import { code, doDont } from '../utils.js';

const SIZES = [['ds-seal--sm', 'Pequeno'], ['', 'Médio'], ['ds-seal--lg', 'Grande']];

export default {
  id: 'selo',
  group: 'Componentes',
  title: 'Selo',
  keywords: 'selo carimbo hanko assinatura marca japonês preto branco',
  lead: 'O carimbo que assina uma pintura japonesa, aqui só em tinta e papel.',
  render: () => `
    <section class="doc-section">
      <h2>Quando usar</h2>
      <p>Para assinar uma peça: uma abertura, um rodapé, um certificado.</p>
      <p>Sempre um por tela. Ele inverte junto com o modo.</p>
    </section>

    <section class="doc-section">
      <h2>Tamanhos</h2>
      <div class="home-grid">
        ${SIZES.map(([modifier, name]) => `<span class="ds-seal ${modifier}" lang="ja" role="img" aria-label="Selo ${name.toLowerCase()}: sumi">墨</span>`).join('')}
      </div>
      ${code(`
<span class="ds-seal" lang="ja" role="img" aria-label="Selo: sumi">墨</span>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Faça e evite</h2>
      ${doDont(
        ['Use um selo só, pequeno, perto da assinatura.'],
        ['Não use o selo como botão ou aviso.'],
      )}
    </section>`,
};
