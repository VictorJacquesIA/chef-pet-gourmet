import {
  initScrollReveal,
  initStaggerReveal,
  initHeaderScroll,
  initConfetti,
  initCyclingTitle,
  initFaq,
  initMobileMenu,
  initIconRain
} from './animations.js';
import { initTracking } from './tracking.js';
import { initForms } from './forms.js';

function initReelsDots() {
  const track = document.getElementById('solucaoReels');
  const dots = document.querySelectorAll('#solucaoDots .solucao__dot');
  if (!track || !dots.length) return;

  const cards = [...track.querySelectorAll('.feature-card')];
  let current = 0;
  let autoTimer = null;
  let userScrolling = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let scrollDir = null;

  function getActiveIndex() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let idx = 0;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      if (Math.abs(cardCenter - center) < Math.abs(cards[idx].offsetLeft + cards[idx].offsetWidth / 2 - center)) {
        idx = i;
      }
    });
    return idx;
  }

  function updateDots(index) {
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    updateDots(current);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!userScrolling) goTo(current + 1);
    }, 5000);
  }

  track.addEventListener('scroll', () => {
    current = getActiveIndex();
    updateDots(current);
  }, { passive: true });

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    scrollDir = null;
    userScrolling = true;
    clearInterval(autoTimer);
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!scrollDir) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > 6 || dy > 6) {
        scrollDir = dx >= dy ? 'x' : 'y';
      }
    }
    if (scrollDir === 'x') {
      e.preventDefault();
    }
  }, { passive: false });

  track.addEventListener('touchend', () => {
    userScrolling = false;
    scrollDir = null;
    current = getActiveIndex();
    startAuto();
  }, { passive: true });

  startAuto();
}

function init() {
  initHeaderScroll();
  initMobileMenu();
  initStaggerReveal();
  initScrollReveal();
  initConfetti();
  initCyclingTitle();
  initFaq();
  initTracking();
  initForms();
  initReelsDots();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
