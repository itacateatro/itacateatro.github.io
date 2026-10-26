document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  const mobile = window.matchMedia('(max-width: 900px)');
  const submenuButtons = [...document.querySelectorAll('.submenu-toggle')];

  function setSubmenu(toggle, open) {
    const group = toggle.closest('.nav-group');
    const submenu = group?.querySelector('.submenu');
    if (!group || !submenu) return;
    group.classList.toggle('submenu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    // On touchscreens, explicitly override sticky :hover / :focus-within.
    if (mobile.matches) submenu.style.setProperty('display', open ? 'block' : 'none', 'important');
    else submenu.style.removeProperty('display');
  }

  submenuButtons.forEach(toggle => {
    setSubmenu(toggle, false);
    toggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setSubmenu(toggle, toggle.getAttribute('aria-expanded') !== 'true');
    });
  });

  if (button && nav) {
    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.setAttribute('aria-label', isOpen ? 'Chiudi il menu' : 'Apri il menu');
      if (!isOpen) submenuButtons.forEach(toggle => setSubmenu(toggle, false));
    });
  }

  window.addEventListener('resize', () => {
    submenuButtons.forEach(toggle => setSubmenu(toggle, toggle.getAttribute('aria-expanded') === 'true'));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      nav?.classList.remove('open');
      button?.setAttribute('aria-expanded', 'false');
      button?.setAttribute('aria-label', 'Apri il menu');
      submenuButtons.forEach(toggle => setSubmenu(toggle, false));
    }
  });
});
