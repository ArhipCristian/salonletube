(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var yearEl = document.getElementById('year');

  function initNav() {
    navToggle = document.querySelector('.nav-toggle');
    mainNav = document.querySelector('.main-nav');

    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      var openLabel = window.SalonI18n ? SalonI18n.t('nav.menu.open') : 'Open menu';
      var closeLabel = window.SalonI18n ? SalonI18n.t('nav.menu.close') : 'Close menu';
      navToggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function initLangToggle() {
    if (!window.SalonI18n) return;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        SalonI18n.apply(btn.dataset.lang);
      });
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('image-lightbox-img');
    var lastFocus = null;

    function closeLightbox() {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lightboxImg) {
        lightboxImg.removeAttribute('src');
      }
      if (lastFocus) {
        lastFocus.focus();
      }
    }

    function openLightbox(img) {
      if (!lightboxImg) return;
      lastFocus = document.activeElement;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.image-lightbox-close').focus();
    }

    document.querySelectorAll('.product-gallery img').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');

      img.addEventListener('click', function () {
        openLightbox(img);
      });

      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img);
        }
      });
    });

    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  function injectFooter(html) {
    var placeholder = document.getElementById('site-footer');
    if (!placeholder || !html) return;
    placeholder.outerHTML = html;
  }

  function loadFooter() {
    var placeholder = document.getElementById('site-footer');
    if (!placeholder) return Promise.resolve();

    var fallback = window.SalonFooterHTML || '';
    var url = placeholder.getAttribute('data-partial') || 'partials/footer.html';

    if (window.location.protocol === 'file:') {
      injectFooter(fallback);
      return Promise.resolve();
    }

    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Footer load failed');
        return res.text();
      })
      .then(function (html) {
        injectFooter(html);
      })
      .catch(function () {
        injectFooter(fallback);
      });
  }

  function boot() {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    document.body.classList.add('page-enter');

    if (window.SalonI18n) {
      SalonI18n.apply(SalonI18n.getLang());
    }

    initNav();
    initLangToggle();
    initLightbox();
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  loadFooter().then(boot);
})();
