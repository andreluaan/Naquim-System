import { code, doDont } from '../utils.js';

const STATES = [['normal', 'Normal'], ['error', 'Com erro'], ['disabled', 'Desativado'], ['readonly', 'Somente leitura']];
const SIZES = [['sm', 'Pequeno'], ['md', 'Médio'], ['lg', 'Grande']];

function fieldHtml({ state, size }) {
  const sizeClass = size === 'md' ? '' : ` ds-input--${size}`;
  const attrs = [
    `class="ds-input${sizeClass}"`,
    'id="email"',
    'type="email"',
    'placeholder="voce@email.com"',
    'aria-describedby="email-ajuda email-erro"',
  ];
  if (state === 'error') attrs.push('aria-invalid="true"', 'value="andre@"');
  if (state === 'disabled') attrs.push('disabled', 'value="andre@sumi.com"');
  if (state === 'readonly') attrs.push('readonly', 'value="andre@sumi.com"');

  return `<div class="ds-field">
  <label class="ds-field__label" for="email">E-mail<span class="ds-field__required" aria-hidden="true">*</span></label>
  <input ${attrs.join(' ')}>
  <p class="ds-field__hint" id="email-ajuda">Usamos só para responder a sua mensagem.</p>
  <p class="ds-field__error" id="email-erro">${state === 'error' ? 'Digite um e-mail completo, como nome@site.com.' : ''}</p>
</div>`;
}

function segmented(key, options, current, label) {
  return `
    <div class="btn-play-field">
      <span>${label}</span>
      <div class="doc-segmented" role="radiogroup" aria-label="${label}">
        ${options.map(([id, name]) => `<button role="radio" aria-checked="${id === current}" data-key="${key}" data-value="${id}">${name}</button>`).join('')}
      </div>
    </div>`;
}

const RULES = {
  nome: (v) => (v.trim().length >= 2 ? '' : 'Conte como podemos te chamar.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Digite um e-mail completo, como nome@site.com.'),
  assunto: (v) => (v ? '' : 'Escolha um assunto.'),
  mensagem: (v) => (v.trim().length >= 10 ? '' : 'Escreva pelo menos 10 caracteres.'),
  consentimento: (_, input) => (input.checked ? '' : 'Precisamos do seu consentimento para responder.'),
};

export default {
  id: 'formularios',
  group: 'Componentes',
  title: 'Formulários',
  keywords: 'formulário input campo texto select checkbox radio switch contato validação erro',
  lead: 'Uma conversa: o campo pergunta, ajuda e explica o erro sem culpar.',
  render: () => `
    <section class="doc-section">
      <h2>Um campo</h2>
      <p><strong>Rótulo</strong> sempre visível, <strong>dica</strong> opcional e lugar para o <strong>erro</strong>.</p>
      <div class="btn-play">
        <div class="btn-play-controls">
          ${segmented('state', STATES, 'normal', 'Estado')}
          ${segmented('size', SIZES, 'md', 'Tamanho')}
        </div>
        <div class="btn-play-preview form-play-preview" data-preview></div>
        <div class="doc-code btn-play-code">
          <div class="doc-code-head"><span>html</span>
            <button class="doc-code-copy" data-code-copy>Copiar</button>
          </div>
          <pre><code data-code></code></pre>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Tipos de campo</h2>
      <p>Uma classe, <code>ds-input</code>, para todos. Mesma altura dos botões.</p>
      <div class="doc-demo form-grid">
        <div class="ds-field">
          <label class="ds-field__label" for="demo-busca">Busca, com ícone</label>
          <div class="ds-input-icon">
            <ds-icon name="search"></ds-icon>
            <input class="ds-input" id="demo-busca" type="search" placeholder="Buscar no site…">
          </div>
        </div>
        <div class="ds-field">
          <label class="ds-field__label" for="demo-cidade">Seleção</label>
          <div class="ds-select">
            <select class="ds-input" id="demo-cidade">
              <option>Patos, PB</option>
              <option>Campina Grande, PB</option>
              <option>João Pessoa, PB</option>
            </select>
          </div>
        </div>
        <div class="ds-field form-grid-full">
          <label class="ds-field__label" for="demo-texto">Área de texto</label>
          <textarea class="ds-input" id="demo-texto" placeholder="Conte um pouco sobre o seu projeto…"></textarea>
        </div>
        <div class="form-inline form-grid-full">
          <div class="ds-input-icon">
            <ds-icon name="mail"></ds-icon>
            <input class="ds-input" type="email" placeholder="Seu melhor e-mail" aria-label="E-mail para a newsletter">
          </div>
          <button class="ds-btn ds-btn--primary">Assinar</button>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2>Escolhas</h2>
      <p><strong>Marcação</strong> para várias, <strong>opção única</strong> para uma, <strong>interruptor</strong> para ligar na hora.</p>
      <div class="doc-demo form-choices">
        <fieldset class="ds-fieldset">
          <legend>Serviços de interesse</legend>
          <label class="ds-check"><input type="checkbox" checked> Site institucional</label>
          <label class="ds-check"><input type="checkbox"> Loja virtual</label>
          <label class="ds-check"><input type="checkbox" disabled> Aplicativo (em breve)</label>
        </fieldset>
        <fieldset class="ds-fieldset">
          <legend>Melhor horário</legend>
          <label class="ds-check"><input type="radio" name="horario" checked> Manhã</label>
          <label class="ds-check"><input type="radio" name="horario"> Tarde</label>
          <label class="ds-check"><input type="radio" name="horario"> Noite</label>
        </fieldset>
        <fieldset class="ds-fieldset">
          <legend>Notificações</legend>
          <label class="ds-switch"><input type="checkbox" role="switch" checked>
            <span class="ds-check__text">Novidades por e-mail<small>Uma vez por mês, no máximo.</small></span>
          </label>
          <label class="ds-switch"><input type="checkbox" role="switch">
            <span class="ds-check__text">Avisos no WhatsApp<small>Só quando o projeto mudar de etapa.</small></span>
          </label>
        </fieldset>
      </div>
    </section>

    <section class="doc-section">
      <h2>Contato</h2>
      <p>Envie vazio. O erro aparece no campo, o foco vai até ele e some enquanto você corrige.</p>
      <form class="form-contact" data-contact novalidate>
        <div class="form-grid">
          <div class="ds-field">
            <label class="ds-field__label" for="ct-nome">Nome<span class="ds-field__required" aria-hidden="true">*</span></label>
            <input class="ds-input" id="ct-nome" name="nome" autocomplete="name" aria-describedby="ct-nome-erro" required>
            <p class="ds-field__error" id="ct-nome-erro" aria-live="polite"></p>
          </div>
          <div class="ds-field">
            <label class="ds-field__label" for="ct-email">E-mail<span class="ds-field__required" aria-hidden="true">*</span></label>
            <input class="ds-input" id="ct-email" name="email" type="email" autocomplete="email" placeholder="voce@email.com" aria-describedby="ct-email-erro" required>
            <p class="ds-field__error" id="ct-email-erro" aria-live="polite"></p>
          </div>
          <div class="ds-field">
            <label class="ds-field__label" for="ct-telefone">Telefone</label>
            <input class="ds-input" id="ct-telefone" name="telefone" type="tel" autocomplete="tel" placeholder="(83) 90000-0000" aria-describedby="ct-telefone-ajuda">
            <p class="ds-field__hint" id="ct-telefone-ajuda">Opcional. Se preferir, respondemos pelo WhatsApp.</p>
          </div>
          <div class="ds-field">
            <label class="ds-field__label" for="ct-assunto">Assunto<span class="ds-field__required" aria-hidden="true">*</span></label>
            <div class="ds-select">
              <select class="ds-input" id="ct-assunto" name="assunto" aria-describedby="ct-assunto-erro" required>
                <option value="">Escolha…</option>
                <option>Orçamento de site</option>
                <option>Manutenção</option>
                <option>Outro assunto</option>
              </select>
            </div>
            <p class="ds-field__error" id="ct-assunto-erro" aria-live="polite"></p>
          </div>
          <div class="ds-field form-grid-full">
            <label class="ds-field__label" for="ct-mensagem">Mensagem<span class="ds-field__required" aria-hidden="true">*</span></label>
            <textarea class="ds-input" id="ct-mensagem" name="mensagem" aria-describedby="ct-mensagem-erro" required></textarea>
            <p class="ds-field__error" id="ct-mensagem-erro" aria-live="polite"></p>
          </div>
          <div class="ds-field form-grid-full">
            <label class="ds-check">
              <input type="checkbox" name="consentimento" aria-describedby="ct-consentimento-erro" required>
              <span class="ds-check__text">Concordo com o uso dos meus dados para receber uma resposta.<small>Conforme a LGPD. Nada de lista de spam.</small></span>
            </label>
            <p class="ds-field__error" id="ct-consentimento-erro" aria-live="polite"></p>
          </div>
        </div>
        <div class="form-contact-footer">
          <p class="form-contact-status" data-status role="status"></p>
          <button class="ds-btn ds-btn--primary" type="submit"><ds-icon name="arrow-right"></ds-icon> Enviar mensagem</button>
        </div>
      </form>
      ${doDont(
        ['Erro que ensina a corrigir', '<code>type</code> certo para o teclado do celular'],
        ['Placeholder no lugar do rótulo', 'Consentimento já marcado'],
      )}
      ${code(`
<div class="ds-field">
  <label class="ds-field__label" for="email">E-mail</label>
  <input class="ds-input" id="email" type="email"
         aria-invalid="true" aria-describedby="email-erro">
  <p class="ds-field__error" id="email-erro">Digite um e-mail completo.</p>
</div>

<label class="ds-check"><input type="checkbox"> Site institucional</label>
<label class="ds-switch"><input type="checkbox" role="switch"> Novidades</label>`, 'html')}
    </section>`,

  mount(el) {
    const state = { state: 'normal', size: 'md' };
    const preview = el.querySelector('[data-preview]');
    const codeEl = el.querySelector('[data-code]');
    const copyBtn = el.querySelector('[data-code-copy]');

    const update = () => {
      const markup = fieldHtml(state);
      preview.innerHTML = markup;
      codeEl.textContent = markup;
      copyBtn.dataset.copy = markup;
    };

    el.querySelector('.btn-play-controls').addEventListener('click', (e) => {
      const option = e.target.closest('[data-key]');
      if (!option) return;
      state[option.dataset.key] = option.dataset.value;
      el.querySelectorAll(`[data-key="${option.dataset.key}"]`).forEach((b) => b.setAttribute('aria-checked', String(b === option)));
      update();
    });

    update();

    const form = el.querySelector('[data-contact]');
    const status = el.querySelector('[data-status]');
    let submitted = false;

    const validate = (input) => {
      const rule = RULES[input.name];
      if (!rule) return '';
      const message = rule(input.value, input);
      input.setAttribute('aria-invalid', String(Boolean(message)));
      form.querySelector(`#ct-${input.name}-erro`).textContent = message;
      return message;
    };

    form.addEventListener('input', (e) => {
      if (submitted) validate(e.target);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitted = true;
      const invalid = [...form.elements].filter((input) => validate(input));
      if (invalid.length) {
        invalid[0].focus();
        status.textContent = `${invalid.length} ${invalid.length === 1 ? 'campo precisa' : 'campos precisam'} de atenção.`;
        status.dataset.tone = 'danger';
        return;
      }
      status.textContent = `Tudo certo, ${form.elements.nome.value.trim().split(' ')[0]}! Mensagem pronta para enviar.`;
      status.dataset.tone = 'success';
    });
  },
};
