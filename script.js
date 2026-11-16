"use strict";

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu(returnFocus = false) {
  if (!toggle || !nav) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const navLinks = document.querySelectorAll('.nav a');
const observedSections = document.querySelectorAll('main section[id], footer[id]');
if ('IntersectionObserver' in window && navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (!activeLink) return;
      navLinks.forEach(link => link.removeAttribute('aria-current'));
      activeLink.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  observedSections.forEach(section => observer.observe(section));
}
