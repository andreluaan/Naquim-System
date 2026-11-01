# Sumi System

Sumi (墨) é a tinta da pintura japonesa; o projeto se chamava Nanquim até a v0.14.

Minha caixa de peças de front-end: tokens (cores, tipografia, espaço, cantos, elevação, movimento),
temas de marca trocáveis e, aos poucos, componentes. Funciona em qualquer stack (CSS puro + Web Components).

Documentação ao vivo: https://andreluaan.github.io/Nanquim-System/ · Evolução do projeto em fotos: [diario/EVOLUCAO.md](diario/EVOLUCAO.md)

## Rodar a documentação

```bash
npm install
npm run dev
```

## Usar em um projeto

```html
<link rel="stylesheet" href="caminho/design-system/src/index.css">
<html data-theme="sumi" data-font="sumi" data-radius="suave" data-mode="dark">

<!-- componentes interativos, como <ds-icon> -->
<script type="module" src="caminho/design-system/src/index.js"></script>
```

```css
.card { background: var(--ds-color-surface); padding: var(--ds-space-6); border-radius: var(--ds-radius-lg); }
```

## Nova marca de cliente

Copie `src/themes/_marca-exemplo.css` → `src/themes/<cliente>.css`, ajuste a matiz/croma (https://oklch.com)
e use `data-theme="<cliente>"`.

## Estrutura

```
src/
  tokens/primitives.css   camada 1: valores crus
  tokens/semantic.css     camada 2: nomes por função
  themes/                 camada 3: paletas da casa + marcas
  base.css                reset opcional
  index.css               ponto de entrada
docs/                     site de documentação (Vite)
```
