import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import mySlider from './components/sliders/setSliders';
import setScrollbar from './components/setScrollbar';
import toggleMenu from './components/toggleMenu';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  mySlider.init();
  setScrollbar();
  toggleMenu();
});
