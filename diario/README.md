# Diário do projeto

Registro da evolução do Nanquim System: o que foi feito, **por quê**, que decisões foram tomadas
e como estava visualmente em cada etapa. Serve como memória do projeto e como matéria-prima
para posts (LinkedIn, portfólio).

## Como registrar uma etapa

1. Com a documentação rodando (`npm run dev`), tire os prints:
   ```bash
   npm run prints -- nome-da-etapa
   ```
   Saem em `diario/prints/AAAA-MM-DD_nome-da-etapa/`.
2. Crie `diario/NNN-nome-da-etapa.md` a partir de [_modelo.md](_modelo.md).
3. Adicione a linha na linha do tempo abaixo.

**Evolução em fotos, versão a versão:** [EVOLUCAO.md](EVOLUCAO.md)

## Linha do tempo

| # | Data | Etapa | Destaque |
|---|------|-------|----------|
| 001 | 2026-10-20 | [Fundações e Laboratório de identidade](001-fundacoes.md) | Tokens em 3 camadas, 4 propostas de paleta, documentação interativa |
| 002 | 2026-10-22 | [Botões, o primeiro componente](002-botoes.md) | 7 estilos, playground com código ao vivo, contraste testado em 70 combinações |
| 003 | 2026-10-22 | [Paleta Neutra](003-paleta-neutra.md) | Opção só em preto, branco e cinzas; destaque que inverte com o modo |
| 004 | 2026-10-22 | [Tema Nanquim e apresentação](004-tema-nanquim.md) | Identidade tinta e papel como padrão; página de conceito com ilustrações em SVG |
| 005 | 2026-10-22 | [Profundidade e modo claro](005-profundidade-modo-claro.md) | Neutros com mais cor no claro, sidebar como camada, sombras mais presentes |
| 006 | 2026-10-22 | [Ícones e o primeiro Web Component](006-icones.md) | 53 ícones com traço de pena, `<ds-icon>` com tamanhos e espessuras, busca em português |
| 007 | 2026-10-22 | [Badges e cards](007-badges-cards.md) | 6 tons × 3 aparências de badge; card com anatomia, 4 variantes e 5 exemplos reais |
| 008 | 2026-10-23 | [Formulários](008-formularios.md) | Campos nativos estilizados, checkbox/radio/switch, formulário de contato com validação acessível |
| 009 | 2026-10-23 | [Carrossel e slides](009-carrossel.md) | `<ds-carousel>` com arraste, setas, indicadores, teclado e autoplay que pausa; banner, cards, depoimentos e galeria |
| 010 | 2026-10-23 | [Modal, gaveta e tooltip](010-modal-gaveta-tooltip.md) | `<dialog>` nativo vestido com os tokens, gaveta em 3 lados, `<ds-tooltip>` que abre pelo teclado e vira de lado |
| 011 | 2026-10-23 | [Seções de site](011-secoes-de-site.md) | Navbar, hero, recursos, preços, depoimentos, chamada e rodapé; landing de exemplo que troca de marca; container queries |
| 012 | 2026-10-23 | [Seções separadas e visualizador](012-secoes-separadas-visualizador.md) | Grupo próprio no menu com uma página por seção, perguntas frequentes e visualizador que gera o tema da marca |
| 013 | 2026-10-23 | [Textos enxutos e cópia de valores](013-textos-enxutos.md) | Documentação com metade do texto e letra menor; tokens copiados como nome ou como valor pronto |
| 014 | 2026-10-23 | [Modelo editorial e tela cheia](014-modelo-editorial.md) | Landing editorial com peças novas (manifesto, lista numerada, projetos, números), painel simplificado e gaveta de edição na tela cheia |
| 015 | 2026-10-23 | [Aguada, laboratório de paletas, Vitrine e Grade](015-aguada-vitrine-grade.md) | Paletas derivadas do nanquim por pigmento e água, laboratório de paletas e dois modelos extraídos de referências |
| 016 | 2026-10-23 | [Vitrine padrão e painel em grade](016-painel-vitrine.md) | Vitrine como modelo padrão, painel sem elemento solto e fontes escritas na própria letra |
| 017 | 2026-10-28 | [Site completo organizado por modelo](017-site-completo-modelos.md) | Modelos em cartões, índice de seções preso no topo e acessibilidade em 100 |
