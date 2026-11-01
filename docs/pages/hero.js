import { code, doDont } from '../utils.js';
import { frame, hero, heroEditorial, heroFramed, heroPoster, mountSiteDemos } from '../site-kit.js';

const PARTS = [
  ['Sobretítulo', '<code>.ds-hero__eyebrow</code>: o que é.'],
  ['Título', '<code>.ds-hero__title</code>: a promessa.'],
  ['Texto', '<code>.ds-hero__lead</code>: como, em uma linha.'],
  ['Ações', '<code>.ds-hero__actions</code>: um principal, no máximo um secundário.'],
  ['Nota', '<code>.ds-hero__note</code>: uma prova rápida.'],
  ['Mídia', '<code>.ds-hero__media</code>: desce no celular.'],
  ['Editorial', '<code>__meta</code>, <code>__corner</code> e <code>__vertical</code>: só no <code>--editorial</code>.'],
  ['Pôster', '<code>__tagline</code> e <code>__aside</code>: frases nos cantos, só no <code>--poster</code>.'],
  ['Moldura', '<code>__frame</code>: o cartão do <code>--framed</code>.'],
];

export default {
  id: 'hero',
  group: 'Seções de site',
  title: 'Hero',
  keywords: 'hero banner destaque primeira dobra topo chamada principal título capa pôster poster gigante moldura cartão framed loja',
  lead: 'Em segundos: o que você faz, para quem e qual o próximo passo.',
  render: () => `
    <section class="doc-section">
      <h2>Com imagem</h2>
      <p>No celular, a imagem desce.</p>
      ${frame({ content: hero({ id: 'ill-enso-hero-page' }) })}
      <ol class="card-anatomy-list estrutura-parts">
        ${PARTS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}
      </ol>
    </section>

    <section class="doc-section">
      <h2>Editorial</h2>
      <p><code>ds-hero--editorial</code>: título gigante, texto miúdo e uma imagem que sobe além do bloco.</p>
      ${frame({ content: heroEditorial({ id: 'ill-landscape-hero-page' }) })}
      ${code(`
<section class="ds-section ds-hero ds-hero--editorial">
  <div class="ds-container ds-hero__inner">
    <div class="ds-hero__content">
      <p class="ds-hero__eyebrow">Ateliê de sumi · desde 2014</p>
      <h1 class="ds-hero__title">sumi.</h1>
      <div class="ds-hero__meta">
        <p><strong>Identidade</strong> Marcas desenhadas à mão.</p>
        <p><strong>Sites</strong> Feitos para durar.</p>
      </div>
      <div class="ds-hero__actions">…</div>
    </div>
    <div class="ds-hero__media">
      <img src="recorte.png" alt="">
      <a class="ds-hero__corner" href="/projetos" aria-label="Ver projetos"><ds-icon name="arrow-right"></ds-icon></a>
    </div>
    <p class="ds-hero__vertical">Coleção 2026</p>
  </div>
</section>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Pôster</h2>
      <p><code>ds-hero--poster</code>: o nome atravessa a seção e a imagem fica por cima, no centro.</p>
      ${frame({ content: heroPoster({ id: 'ill-enso-poster-hero-page' }) })}
      ${code(`
<section class="ds-section ds-hero ds-hero--poster">
  <div class="ds-container ds-hero__inner">
    <p class="ds-hero__tagline">Tinta que acompanha o traço.</p>
    <h1 class="ds-hero__title" style="--hero-poster-size: 30cqi"><b>sumi</b></h1>
    <div class="ds-hero__media"><img src="frasco.png" alt=""></div>
    <div class="ds-hero__actions">…</div>
    <p class="ds-hero__aside">Nova coleção 2026</p>
  </div>
</section>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Em moldura</h2>
      <p><code>ds-hero--framed</code>: o hero vira um cartão; com <code>data-mode</code>, inverte as cores.</p>
      ${frame({ content: heroFramed({ menuId: 'hero-menu-moldura', id: 'ill-landscape-framed-hero-page' }) })}
      ${code(`
<section class="ds-section ds-hero ds-hero--poster ds-hero--framed">
  <div class="ds-container">
    <div class="ds-hero__frame" data-mode="light">
      <header class="ds-navbar ds-navbar--cells">…</header>
      <div class="ds-hero__inner">
        <p class="ds-hero__tagline">Ateliê de sumi</p>
        <h1 class="ds-hero__title"><b>Tinta</b> <span>viva</span></h1>
        <div class="ds-hero__media"><img src="paisagem.jpg" alt=""></div>
        <p class="ds-hero__aside">Aqui o traço pode errar.</p>
      </div>
    </div>
  </div>
</section>`, 'html')}
    </section>

    <section class="doc-section">
      <h2>Centralizado</h2>
      <p><code>ds-hero--center</code>, quando a frase é a estrela.</p>
      ${frame({ content: hero({ center: true }) })}
      ${doDont(
        ['A promessa no título', 'Um botão principal visível'],
        ['Carrossel no lugar do hero', 'Texto sobre foto sem contraste'],
      )}
      ${code(`
<section class="ds-section ds-hero">
  <div class="ds-container ds-hero__inner">
    <div class="ds-hero__content">
      <p class="ds-hero__eyebrow">Estúdio de identidade e sites</p>
      <h1 class="ds-hero__title">Marcas desenhadas à mão</h1>
      <p class="ds-hero__lead">Identidade e site num processo só.</p>
      <div class="ds-hero__actions">
        <a class="ds-btn ds-btn--primary ds-btn--lg" href="/orcamento">Pedir orçamento</a>
        <a class="ds-btn ds-btn--ghost ds-btn--lg" href="/projetos">Ver projetos</a>
      </div>
      <p class="ds-hero__note">4,9 de média em 120 avaliações</p>
    </div>
    <div class="ds-hero__media"><img src="capa.jpg" alt=""></div>
  </div>
</section>`, 'html')}
    </section>`,
  mount: (el) => mountSiteDemos(el),
};
