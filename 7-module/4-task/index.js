export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;

    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${this.renderSteps()}
      </div>
    `;

    this.updateSlider();
  }

  renderSteps() {
    let stepsHtml = '';
    for (let i = 0; i < this.steps; i++) {
      stepsHtml += `<span ${i === this.value ? 'class="slider__step-active"' : ''}></span>`;
    }
    return stepsHtml;
  }

  updateSlider() {
    this.elem.querySelector('.slider__value').textContent = this.value;

    const stepsElements = this.elem.querySelector('.slider__steps').children;
    for (let i = 0; i < stepsElements.length; i++) {
      stepsElements[i].classList.remove('slider__step-active');
    }
    stepsElements[this.value].classList.add('slider__step-active');

    const leftPercents = this.value / this.segments * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.onClick);

    const thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown);
  }

  onClick = (event) => {
    if (this.isDragging) {
      this.isDragging = false;
      return;
    }

    let left = event.clientX - this.elem.getBoundingClientRect().left;

    let leftRelative = left / this.elem.offsetWidth;

    let approximateValue = leftRelative * this.segments;

    let value = Math.round(approximateValue);

    this.value = value;

    this.updateSlider();

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  onPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    this.isDragging = true;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left;

    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    this.elem.querySelector('.slider__value').textContent = value;

    const stepsElements = this.elem.querySelector('.slider__steps').children;
    for (let i = 0; i < stepsElements.length; i++) {
      stepsElements[i].classList.remove('slider__step-active');
    }
    stepsElements[value].classList.add('slider__step-active');

    this.value = value;
  }

  onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));

    this.isDragging = false;
  }
}