import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';

    const ribbonInner = document.createElement('div');
    ribbonInner.className = 'ribbon__inner';
    this.ribbonInner = ribbonInner;

    const arrowLeft = document.createElement('button');
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    this.arrowLeft = arrowLeft;

    const arrowRight = document.createElement('button');
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    this.arrowRight = arrowRight;

    for (const category of this.categories) {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'ribbon__item';
      if (category.id === '' && this.categories.indexOf(category) === 0) {
        item.classList.add('ribbon__item_active');
      }
      item.dataset.id = category.id;
      item.textContent = category.name;
      ribbonInner.append(item);
    }

    this.elem.append(arrowLeft);
    this.elem.append(ribbonInner);
    this.elem.append(arrowRight);
  }

  addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.updateArrows();
    });

    this.ribbonInner.addEventListener('click', (event) => {
      const ribbonItem = event.target.closest('.ribbon__item');

      if (ribbonItem) {
        event.preventDefault();

        const activeItem = this.elem.querySelector('.ribbon__item_active');
        if (activeItem) {
          activeItem.classList.remove('ribbon__item_active');
        }

        ribbonItem.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: ribbonItem.dataset.id,
          bubbles: true
        }));
      }
    });
  }

  updateArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}