const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const closeMenu = () => {
  toggle?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
};
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); toggle?.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.querySelector('[data-copy-iban]')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  const iban = document.querySelector('#iban');
  try {
    await navigator.clipboard.writeText(iban.dataset.iban);
    status.textContent = 'IBAN copiato. Puoi incollarlo nella tua app bancaria.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(iban);
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = 'Seleziona e copia l’IBAN con il menu del tuo dispositivo.';
  }
});
const form = document.querySelector('#contact-form');
if (form) {
  const next = form.querySelector('[name="_next"]');
  next.value = new URL('../grazie/', window.location.href).href;
  const topics = {giovani:'Giovani e adolescenti',donne:'Incontri al femminile',bethel:'Aiuti alle famiglie e Bethel Italia'};
  const topic = topics[new URLSearchParams(window.location.search).get('argomento')];
  if (topic) {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = 'argomento'; input.value = topic;
    form.append(input);
    document.querySelector('#message').placeholder = `Vorrei informazioni su: ${topic.toLowerCase()}…`;
  }
  // La validazione HTML avviene prima dell’evento submit. Il provider gestisce
  // CAPTCHA, invio e conferma: nessun falso messaggio di successo locale.
}
