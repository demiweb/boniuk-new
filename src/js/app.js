import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';
import Stickyfill from 'stickyfilljs';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import mySlider from './components/sliders/setSliders';
// import setScrollbar from './components/setScrollbar';
import toggleMenu from './components/toggleMenu';
import setAccordion from './components/setAccordion';
import setPopups from './components/setPopups';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  const stickyEls = document.querySelectorAll('.js-sticky-polyfill');
  Stickyfill.add(stickyEls);

  mySlider.init();
  // setScrollbar();
  toggleMenu();
  setAccordion();
  setPopups();
});
