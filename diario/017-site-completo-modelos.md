# 017 — Site completo organizado por modelo

**Data:** 2026-10-28 · **Versão:** 0.14.0 · **Prints:** [`prints/2026-10-28_site-completo-modelos/`](prints/2026-10-28_site-completo-modelos/)

## Contexto
Com as skills novas de acessibilidade e de UI/UX, fiz uma recapitulação do sistema e uma auditoria no Lighthouse.
Depois pedi para reorganizar a página "Site completo", que escondia o modelo, a escolha principal, num controle pequeno dentro do painel.

## O que foi feito
- **Auditoria de acessibilidade:** de 98 para 100.
  - O título do faça/evite passou de `h4` para `h3`, sem pular nível.
  - Entrou um link "Pular para o conteúdo".
  - Entrou a meta description.
- **Modelos em cartões:** os quatro modelos ficam no topo, cada um com o tipo de site para o qual serve.
- **Índice "Seções deste modelo":** mostra de quais seções cada modelo é feito, leva até cada uma e fica preso no topo enquanto o site passa.
- **Painel na ordem do impacto:** Marca, Modo, Fonte, Forma e Contraste. As ações ficam presas ao pé do painel.
- **Modelos como listas de seções com nome** em `site-kit.js`: o índice sai daí sozinho.

## Decisões (e por quê)
| Decisão | Alternativas consideradas | Motivo |
|---|---|---|
| Modelo fora do painel, em cartões | Manter o 2×2 no painel | O modelo é a primeira escolha e define o resto; precisa de destaque e de uma frase de contexto |
| Índice gerado da lista de seções | Detectar seções pelas classes no DOM | A lista com nome é explícita e uma seção nova entra no índice sem código extra |
| Na tela cheia, o modelo volta para a gaveta | Esconder a escolha de modelo | Na tela cheia os cartões somem, e trocar de modelo ali ainda faz sentido |

## Problemas encontrados
- **O índice não rolava:** fora da tela cheia, o site não rola dentro da moldura; quem rola é a página. → O índice rola a janela e desconta a altura da barra presa.
- **A seção parava 34px abaixo da barra:** eu media a barra antes de ela grudar no topo. → A conta usa a posição em que ela fica presa.
- **O link de pular trocava de página:** na documentação, o `#` da URL é a rota. → O clique só leva o foco para o conteúdo.

## Antes / depois
| Antes (v0.13.1) | Depois (v0.14.0) |
|---|---|
| ![](evolucao/v0.13.1/03i-site-completo.png) | ![](evolucao/v0.14.0/03i-site-completo.png) |

## Aprendizados
- A escolha que define as outras merece o lugar mais visível, não o primeiro item de um painel.
- Uma nota 100 no Lighthouse não é conformidade, mas os itens que ele aponta são baratos de corrigir.
- Elementos presos ao topo mudam de posição: meça onde eles ficam, não onde estão agora.

## Próximos passos
- [ ] Pacote para usar em outros projetos (npm e CDN)
- [ ] Primeiro site de cliente feito só com o Nanquim

## Ideia de post
> **"Primeiro o quê, depois o como."** No visualizador do Nanquim System, o modelo do site saiu de um botãozinho no painel e virou a primeira escolha da página.
> Também ganhou um índice que mostra as peças de cada modelo, e a documentação chegou a 100 em acessibilidade.
> Print sugerido: os quatro cartões de modelo com o índice de seções embaixo.
