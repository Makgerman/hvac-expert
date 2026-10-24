(() => {
  const toggle = document.querySelector('.menu-button');
  const mobile = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    if (!toggle || !mobile) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobile.hidden = true;
    document.body.classList.remove('menu-open');
  };
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
      mobile.hidden = !opening;
      document.body.classList.toggle('menu-open', opening);
    });
    mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
