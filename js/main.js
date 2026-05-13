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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
