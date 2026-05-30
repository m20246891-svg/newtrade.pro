/**
 * NewTrade.pro — Main Script
 * Lightweight vanilla JS for navigation, animations, and interactivity.
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initScrollAnimations();
  initActiveNav();
});

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Scroll-triggered fade-in animations using IntersectionObserver
 */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-in');

  if (!elements.length) return;
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) { observer.observe(el); });
}

/**
 * Highlight current page in navigation
 */
function initActiveNav() {
  var currentPath = window.location.pathname.replace(/\/$/, '');
  var navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    var linkPath = link.getAttribute('href').replace(/\/$/, '');

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else if (currentPath === '' && linkPath === '/') {
      link.classList.add('active');
    }
  });
}
