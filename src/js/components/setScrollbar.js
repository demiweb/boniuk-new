import baron from 'baron';
import { debounce } from 'throttle-debounce';
import { isWebkit } from '../helpers';

class Scrollbar {
  constructor(container) {
    this.container = container;
  }

  init() {
    if (this.container.classList.contains(Scrollbar.classNames.IS_INIT)) return;

    this.createElements();
    this.initPlugin();
  }

  destroy() {
    if (!this.container.classList.contains(Scrollbar.classNames.IS_INIT) || !this.plugin) return;
    this.plugin.dispose();
    this.removeElements();
  }

  createElements() {
    this.inner = document.createElement('div');
    this.track = document.createElement('div');
    this.bar = document.createElement('div');

    const { maxHeight } = window.getComputedStyle(this.container);
    const content = this.container.innerHTML;
    this.container.innerHTML = '';

    this.inner.className = Scrollbar.classNames.inner;
    this.inner.innerHTML = content;
    this.inner.style.maxHeight = maxHeight;
    this.track.className = Scrollbar.classNames.track;
    this.bar.className = Scrollbar.classNames.bar;

    this.track.appendChild(this.bar);
    this.container.appendChild(this.inner);
    this.container.appendChild(this.track);
  }

  removeElements() {
    if (!this.inner) return;
    const content = this.inner.innerHTML;

    this.container.innerHTML = content;
  }

  initPlugin() {
    this.plugin = baron({
      root: this.container,
      scroller: this.inner,
      bar: this.bar,
      barOnCls: Scrollbar.classNames.IS_INIT,
    });
  }
}

Scrollbar.classNames = {
  inner: 'scrollbar__inner',
  track: 'scrollbar__track',
  bar: 'scrollbar__bar',
  IS_INIT: 'is-init',
};

export default function setScrollbar() {
  if (isWebkit) return;
  const containers = [...document.querySelectorAll('.js-scrollbar')];

  if (!containers.length) return;

  let scrollbar;

  function initScroll() {
    containers.forEach((container) => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        scrollbar = new Scrollbar(container);
        scrollbar.init();
      } else {
        if (!scrollbar) return;
        scrollbar.destroy();
      }
    });
  }

  initScroll();

  const onResize = debounce(200, initScroll);
  window.addEventListener('resize', onResize);
}
