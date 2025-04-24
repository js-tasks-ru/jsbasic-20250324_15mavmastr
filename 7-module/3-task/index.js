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
  }

  onClick = (event) => {
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
}