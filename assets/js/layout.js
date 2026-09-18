(() => {
  const page = document.body.classList.contains('legal-page') ? 'legal' : 'index';
  const siteRoot = page === 'legal' ? '../' : './';

  const loadComponent = async (slot) => {
    const response = await fetch(`${siteRoot}components/${slot.dataset.component}.html`);
    if (!response.ok) throw new Error(`Unable to load ${slot.dataset.component}`);

    const documentFragment = document.createRange().createContextualFragment(await response.text());
    const template = documentFragment.querySelector(`template[data-page="${page}"]`) || documentFragment.querySelector('template[data-page="all"]');
    const component = template.content.cloneNode(true);

    if (page === 'legal') {
      component.querySelectorAll('[data-home-anchor]').forEach((link) => {
        link.href = `${siteRoot}${link.dataset.homeAnchor}`;
      });
      component.querySelectorAll('[data-root-link]').forEach((link) => {
        link.href = `${siteRoot}${link.dataset.rootLink}`;
      });
      component.querySelectorAll('[data-root-src]').forEach((image) => {
        image.src = `${siteRoot}${image.dataset.rootSrc}`;
      });
    }

    slot.replaceWith(component);
  };

  window.layoutReady = Promise.all([...document.querySelectorAll('[data-component]')].map(loadComponent));
})();
