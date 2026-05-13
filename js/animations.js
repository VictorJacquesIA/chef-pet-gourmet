import { $$, onScroll, prefersReducedMotion } from './utils.js';

export function initIconRain() {
  const icons = document.querySelectorAll('.hero__rain .ri');
  icons.forEach(el => {
    const type = [...el.classList].find(c => c.startsWith('ri--') && !c.startsWith('ri--red') && !c.startsWith('ri--blue') && !c.startsWith('ri--green') && !c.startsWith('ri--yellow'));
    if (!type) return;
    const id = type.replace('ri--', 'ri-');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', id === 'ri-balloon' ? '0 0 24 28' : '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#${id}`);
    svg.appendChild(use);
    el.appendChild(svg);
  });
}

export function initScrollReveal() {
  if (prefersReducedMotion()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach(el => observer.observe(el));
}

export function initStaggerReveal() {
  if (prefersReducedMotion()) return;

  const groups = $$('[data-stagger]');
  groups.forEach(group => {
    const children = [...group.children];
    children.forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  initScrollReveal();
}

export function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  onScroll(y => {
    header.classList.toggle('header--scrolled', y > 60);
  });
}

export function initConfetti() {
  const container = document.querySelector('.hero__confetti');
  if (!container || prefersReducedMotion()) return;

  const colors = ['#E8456A', '#FFD700', '#FF8C42', '#4CAF50', '#4A90D9', '#FF6B8A'];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.classList.add('hero__confetti-piece');
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 40}%;
      background-color: ${colors[i % colors.length]};
      width: ${6 + Math.random() * 6}px;
      height: ${6 + Math.random() * 6}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation: confettiFall${i % 5} ${3 + Math.random() * 4}s ease-in infinite;
      animation-delay: ${Math.random() * 3}s;
      opacity: 0;
    `;
    container.appendChild(piece);
  }
}

export function initCyclingTitle() {
  const el = document.querySelector('.solucao__cycling');
  if (!el || prefersReducedMotion()) return;

  const words  = ['artesanais', 'naturais', 'personalizados', 'feitos com amor'];
  const colors = ['#7C3AED',   '#3DAA50',  '#EA580C',        '#3B82F6'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const TYPE_SPEED = 80;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 300;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        el.style.color = colors[wordIndex];
        el.style.borderColor = colors[wordIndex];
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  el.textContent = '';
  el.style.color = colors[0];
  el.style.borderColor = colors[0];
  setTimeout(tick, 500);
}

export function initFaq() {
  const items = document.querySelectorAll('.faq-item__trigger');

  items.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

export function initMobileMenu() {
  const toggle = document.querySelector('.header__mobile-toggle');
  const menu = document.querySelector('.header__mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('is-open');
    menu.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
