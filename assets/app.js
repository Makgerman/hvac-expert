(() => {
  'use strict';
  const translations = window.HVAC_TRANSLATIONS || {};
  const supported = ['en', 'ru', 'sr'];
  const images = window.HVAC_IMAGES || {};
  const params = new URLSearchParams(window.location.search);
  let storedLanguage = null;
  try { storedLanguage = window.localStorage.getItem('hvac-language'); } catch (_) {}
  const fromUrl = params.get('lang');
  const browserLanguage = (navigator.language || 'en').toLowerCase().split('-')[0];
  const initialLanguage = [fromUrl, storedLanguage, browserLanguage, 'en'].find(x => supported.includes(x)) || 'en';

  document.querySelectorAll('[data-image]').forEach(image => {
    const source = images[image.dataset.image];
    if (source && image.getAttribute('src') !== source) image.setAttribute('src', source);
  });

  function translate(language) {
    const t = translations[language];
    if (!t) return;
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t.pageDescription;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = t.pageTitle;
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = t.pageDescription;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = t[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const value = t[element.dataset.i18nAlt];
      if (typeof value === 'string') element.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = t[element.dataset.i18nAria];
      if (typeof value === 'string') element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const button = document.querySelector('.menu-button');
    if (button) button.setAttribute('aria-label', button.getAttribute('aria-expanded') === 'true' ? t.menuClose : t.menuOpen);
    try { window.localStorage.setItem('hvac-language', language); } catch (_) {}
  }

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => translate(button.dataset.lang));
  });

  const toggle = document.querySelector('.menu-button');
  const mobile = document.querySelector('.mobile-menu');
  function closeMenu() {
    if (!toggle || !mobile) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', translations[document.documentElement.lang]?.menuOpen || 'Open menu');
    mobile.hidden = true;
    document.body.classList.remove('menu-open');
  }
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      mobile.hidden = !open;
      toggle.setAttribute('aria-label', translations[document.documentElement.lang]?.[open ? 'menuClose' : 'menuOpen'] || 'Menu');
      document.body.classList.toggle('menu-open', open);
    });
    mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  const track = document.getElementById('gallery-track');
  const previous = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const current = document.getElementById('gallery-current');
  const total = document.getElementById('gallery-total');
  const progress = document.getElementById('gallery-progress');
  if (track && previous && next && current && total && progress) {
    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollUnit = () => {
      const slide = slides[0];
      if (!slide) return 0;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return slide.getBoundingClientRect().width + gap;
    };
    const updateGallery = () => {
      const unit = scrollUnit();
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const start = unit ? Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / unit))) : 0;
      const visible = unit ? track.clientWidth / unit : 1;
      current.textContent = String(start + 1).padStart(2, '0');
      total.textContent = String(slides.length).padStart(2, '0');
      previous.disabled = track.scrollLeft <= 3;
      next.disabled = track.scrollLeft >= maxScroll - 3;
      const fraction = Math.min(1, Math.max(0.1, (start + visible) / slides.length));
      progress.style.transform = `scaleX(${fraction})`;
    };
    const moveGallery = direction => {
      const unit = scrollUnit();
      const destination = Math.min(Math.max(track.scrollLeft + direction * unit, 0), track.scrollWidth - track.clientWidth);
      track.scrollTo({left: destination, behavior: motionOK ? 'smooth' : 'instant'});
    };
    previous.addEventListener('click', () => moveGallery(-1));
    next.addEventListener('click', () => moveGallery(1));
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        moveGallery(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    let raf = 0;
    track.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {raf = 0;updateGallery();});
    }, {passive: true});
    window.addEventListener('resize', updateGallery);
    updateGallery();
  }
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
  translate(initialLanguage);
})();
