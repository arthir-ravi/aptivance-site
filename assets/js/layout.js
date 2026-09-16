(() => {
  const page = document.body.classList.contains('legal-page') ? 'legal' : 'index';

  const loadComponent = async (slot) => {
    const response = await fetch(`components/${slot.dataset.component}.html`);
    if (!response.ok) throw new Error(`Unable to load ${slot.dataset.component}`);

    const documentFragment = document.createRange().createContextualFragment(await response.text());
    const template = documentFragment.querySelector(`template[data-page="${page}"]`) || documentFragment.querySelector('template[data-page="all"]');
    const component = template.content.cloneNode(true);

    if (page === 'legal') {
      component.querySelectorAll('[data-home-anchor]').forEach((link) => {
        link.href = `./${link.dataset.homeAnchor}`;
      });
    }

    slot.replaceWith(component);
  };

  window.layoutReady = Promise.all([...document.querySelectorAll('[data-component]')].map(loadComponent));
})();
