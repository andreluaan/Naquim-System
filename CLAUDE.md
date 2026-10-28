# Nanquim System — regras para o Claude

Nanquim System: design system pessoal do André, agnóstico de framework, usado para brandizar sites de clientes.
Processo contínuo: componentes e variantes são adicionados aos poucos, junto com o usuário.

## Arquitetura (3 camadas de tokens, prefixo `--ds-`)
1. **Primitivos** `src/tokens/primitives.css`: espaço, texto e raio multiplicados por `--ds-space-scale`, `--ds-text-scale` e `--ds-radius-factor` e recalculados em qualquer `[data-radius]`/`[data-scale]`; escalas OKLCH de 12 passos (croma dos neutros × `--ds-neutral-tint`, 1 no escuro e 1.8 no claro) (`--ds-neutral-1..12`, `--ds-accent-1..12`) geradas a partir de `--ds-neutral-hue/--ds-neutral-chroma/--ds-accent-hue/--ds-accent-chroma/--ds-accent-lightness`; espaço (`--ds-space-N`, base 4px), raio (`--ds-radius-xs..xl|full` × `--ds-radius-factor`), tipo (`--ds-text-xs..6xl`, `--ds-font-display|body|mono`), movimento (`--ds-duration-*`, `--ds-ease-*`), z-index.
2. **Semânticos** `src/tokens/semantic.css`: `--ds-color-bg|surface|surface-raised|surface-hover|surface-active`, `border-subtle|border|border-strong`, `text|text-muted|text-subtle`, `accent|accent-hover|accent-soft|accent-border|accent-text|on-accent`, `focus`, `--ds-focus-ring`, status `success|warning|danger|info` (+`-soft`, `-border`, `-text`), `--ds-shadow-sm|md|lg`.
3. **Temas** `src/themes/` (`nanquim.css` é o padrão, a tinta-mãe): selecionados por atributos no `<html>` ou em qualquer trecho: `data-theme`, `data-font` (editorial|moderno|classico|tecnico|geometrico|condensado; as duas últimas põem títulos em caixa alta via `--ds-display-transform`), `data-radius` (reto|suave|arredondado), `data-mode` (dark|light). **Aguada** (`aguada.css`): toda outra paleta é o nanquim com `--ds-pigment-hue`, `--ds-pigment` (0 a 1) e `--ds-water` (0 a 1); neutros, destaque, versão do papel e texto do botão saem da fórmula, recalculada em cada `[data-mode]` (trechos invertidos). Paletas da casa: nanquim, neutro (Carvão), vitrine, grade (Verde-água) e marca-exemplo; o Nanquim usa `@scope (...) to ([data-theme])` para valer nos trechos invertidos sem vazar para outro tema. Marca de cliente = copiar `_marca-exemplo.css` (três números, tirados do Laboratório de paletas).

## Regras de código
- **Prioridade: legibilidade.** Nomes que se explicam sozinhos, código padronizado (uma propriedade por linha em CSS, 2 espaços, aspas simples em JS), comentários só quando explicam um *porquê* não óbvio. Nada de banners ou comentários que repetem o código.
- Componentes usam **apenas tokens semânticos** (nunca primitivos, nunca hex solto, nunca px fora da escala).
- Sem framework: CSS puro + Web Components (custom elements) para o que for interativo. Classes de componente com prefixo `ds-`.
- Estilo da casa: escuro, minimalista, sóbrio. **Sem glow/neon**; profundidade vem de superfícies em camadas + `--ds-shadow-*` + bordas sutis.
- Acessibilidade: foco visível (`--ds-focus-ring`), contraste ≥ 4.5 em texto, respeitar `prefers-reduced-motion` (já zera as durações).
- Textos da documentação curtos (uma frase por parágrafo, faça/evite com 2 itens), em português, para leigos: "o que é", "quando usar", demo interativa, faça/evite, código copiável.

## Documentação (`docs/`)
- `npm run dev` (Vite). Shell em `docs/main.js`; páginas em `docs/pages/<id>.js` exportando `{ id, group, title, lead, keywords, render(), mount?(el), rerenderOnThemeChange?, wide? }`; registrar em `docs/registry.js`.
- Grupos do menu: Começo, Fundações, Componentes, Seções de site, Projeto. As páginas de "Seções de site" usam `docs/site-kit.js` (conteúdo do Ateliê Sumi, `frame()` com seletor de largura e `mountSiteDemos()`); "Site completo" é sempre a última do grupo e tem o visualizador de marca, com quatro modelos escolhidos em cartões (`fullSite(menuId, 'editorial'|'vitrine'|'grade'|'classico')`, Vitrine é o padrão, cada um com a identidade em `TEMPLATE_BRANDS` e a frase em `TEMPLATE_INFO`; em `SITES` cada modelo é uma lista `[nome, seção]` que gera o índice "Seções deste modelo" via `siteSections()` e `data-site-section`) e tela cheia em que o painel vira gaveta (`?modelo=`, `?tela-cheia`). Ilustrações que seguem o tema (cor do texto + `--ds-color-accent`): `inkLandscape()`.
- Helpers em `docs/utils.js`: `code()`, `doDont()`, `copy()`, `contrast()`; tokens copiáveis usam `data-copy-token="--ds-..."` (copia `var()` ou a declaração com o valor resolvido, conforme o seletor `copyModeSwitch()` + `mountCopyModeSwitch(el, tokenExemplo)` das páginas de Fundações); ícones via `iconSvg(nome)` de `src/icons/icons.js` (string) ou `<ds-icon>`; controle segmentado `.doc-segmented`. Qualquer elemento com `data-copy="..."` copia ao clicar.
- Para medir contraste via JS, ligar `data-print` no `<html>` antes (senão as transições distorcem as cores).
- CSS: shell em `docs/docs.css` (prefixo `doc-`/`lab-`), páginas em `docs/pages.css`. Estilos de documentação nunca podem atingir classes `ds-` (ex.: `.doc-section h3:not([class*="ds-"])`).
- Ao concluir um item, atualizar `docs/pages/roadmap.js` e este arquivo.

## Adicionando um componente (checklist)
1. `src/components/<nome>/<nome>.css` (+ `<nome>.js` se interativo), importado em `src/index.css`.
2. Variantes via modificadores (`ds-btn--ghost`) ou atributos (`variant="ghost"`), tamanhos `sm|md|lg`, estados hover/active/focus/disabled.
3. Página em `docs/pages/`, grupo "Componentes", com seção por variante.
4. Testar em todas as paletas e nos dois modos pelo Laboratório.

## Git
- Commits em português, no formato `tipo(escopo): resumo` (feat, fix, docs, refactor, style, chore), com corpo explicando o que e por quê.
- **Nunca** adicionar `Co-Authored-By` nem qualquer assinatura do Claude em commits ou PRs.

## Versões
- **Toda mudança significativa** (componente novo, nova página, mudança de identidade/tokens, correção visível) **fecha uma versão** e **entra no `diario/EVOLUCAO.md`**. Mudanças pequenas (texto, typo) não. Sempre pergunte-se: "isso aparece num antes/depois?" Se sim, é significativa.
- Fechar uma versão: semver em `package.json` + rodapé do `index.html` → commit → tag anotada `vX.Y.Z` → `npm run evolucao -- vX.Y.Z` → nova seção + linha na tabela do `EVOLUCAO.md` + `npm run evolucao:faixas` → `npm run evolucao:pdf` → commit → `git push && git push --tags`.
- Componente novo = versão minor (0.4.0); ajuste/correção = patch (0.3.2).
- **Obsidian (segundo cérebro):** ao fechar uma versão, rodar `npm run obsidian` (gera as notas de etapa em `Segundo Cérebro/3-Recursos/Meus Projetos/Nanquim System/` e copia anexos para `3-Recursos/Anexos/Nanquim System/`) e atualizar à mão a nota principal `Nanquim System.md` (frontmatter `status`, tabela "Evolução", "Próximos passos", "Números", "Mídia" com `nanquim-vX.Y.Z-abertura.png`). Tecnologias/métodos novos: criar a nota em `3-Recursos/Tecnologias` ou `Métodos` (formato `↑ [[índice]]` + "Onde usei") e listar no índice. Imagens no cofre precisam de nome único (prefixo `nanquim-`).

## Diário do processo (OBRIGATÓRIO a cada etapa concluída)
O usuário quer a evolução documentada (memória do projeto + matéria-prima para LinkedIn).
1. Com o dev server rodando: `npm run prints -- <etapa>` → `diario/prints/AAAA-MM-DD_<etapa>/`. Ao criar páginas novas, adicionar os prints delas em `SHOTS` (`scripts/prints.mjs`).
2. Criar `diario/NNN-<etapa>.md` a partir de `diario/_modelo.md`: contexto, o que foi feito, decisões com o porquê, problemas e soluções, antes/depois, aprendizados e uma "ideia de post" curta.
3. Atualizar a linha do tempo em `diario/README.md`.
- A URL aceita `?theme=&font=&radius=&mode=` (e `?lab` para abrir o Laboratório, `?print` sem animações).

## Estado atual
- Feito: fundações (cores, tipografia, espaço & cantos, elevação, movimento), Laboratório de identidade, botões (`ds-btn`), ícones (`src/icons/icons.js` + `<ds-icon>`, 53 ícones), badges (`ds-badge`), cards (`ds-card`, BEM: `__media/__content/__eyebrow/__title/__body/__footer`) e formulários (`ds-field`, `ds-input`, `ds-select`, `ds-input-icon`, `ds-check`, `ds-switch`, `ds-fieldset`; erro via `aria-invalid`) e carrossel (`<ds-carousel>` com `.ds-carousel__track`; atributos `label`, `per-view`, `loop`, `autoplay`, `variant="overlay"`; scroll-snap nativo + arraste com mouse; o fim da animação do indicador ativo é o relógio do autoplay), modal e gaveta (`<dialog class="ds-dialog">` nativo, `__header/__title/__body/__footer`, `--sm|--lg`, `--drawer` + `--start|--bottom`; abre com `data-dialog-open="id"`, fecha com `data-dialog-close`, `data-static` trava o fundo; token `--ds-color-overlay`) e tooltip (`<ds-tooltip text placement>`, vira de lado se não couber); seções de site: `ds-container`, `ds-section` (`--alt`, `--compact`, `__header/__eyebrow/__title/__lead`), `ds-grid` (`--grid-min`), `ds-navbar`, `ds-hero` (`--center`), `ds-feature`, `ds-plan` (subgrid; `--featured`), `ds-testimonial`, `ds-cta`, `ds-footer`, `ds-faq` (`<details>` nativo), `ds-statement` (manifesto; `span` em segundo plano, `em` em destaque), `ds-index` (lista numerada editorial), `ds-works`/`ds-work` (projetos em grade assimétrica), `ds-stats` (números, em `dl`); variantes editoriais `ds-hero--editorial` (`__meta`, `__corner`, `__vertical`), `ds-navbar--editorial` e `ds-footer__wordmark`; da Vitrine e da Grade: `ds-announcement`, `ds-navbar--center|--cells`, `ds-hero--poster` (`__tagline`, `__aside`, `--hero-poster-size`) e `ds-hero--framed` (`__frame`), `ds-section--grid`, `ds-section__header--split` (`__aside`), `ds-card--plain` (`__price`, `__corner`), `ds-feature--inline`, `ds-works--scatter`. Trechos com `data-invert` ficam no modo oposto ao da página no visualizador. Tipo gigante: `--ds-text-7xl..9xl`, `--ds-leading-none`, `--ds-tracking-tighter`. Seções respondem à própria largura (container queries) e aceitam `data-theme/data-font/data-radius/data-mode` só nelas; `ds-btn[aria-pressed]` para alternar.
- Componentes interativos entram por `src/index.js` (importado pela documentação em `docs/main.js`). Ícones novos: adicionar em `ICONS` e em `ICON_CATEGORIES`, com palavras-chave em `docs/pages/icones.js`.
- Documentação publicada: https://andreluaan.github.io/Nanquim-System/ (GitHub Pages, branch main).
- Identidade da casa: **tema Nanquim** (`src/themes/nanquim.css`), padrão sem `data-theme`. Escuro = tinta (neutros matiz 265, destaque marfim); claro = papel (neutros matiz 85, destaque tinta). As outras paletas em `house.css` são derivadas pela aguada; paletas sem relação com o nanquim foram retiradas.
- Página de abertura da documentação: `apresentacao` (conceito). Ilustrações em SVG em `docs/illustrations.js`.
- Próximo: pacote para usar em outros projetos (npm e CDN), depois o primeiro site de cliente.
