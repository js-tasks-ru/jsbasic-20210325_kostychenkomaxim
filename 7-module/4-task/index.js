import createElement from '../../assets/lib/create-element.js';

const sliderTemplate = config => {
  return `
  <div class="slider">
    <div class="slider__thumb" style="left: ${config.currentStep}%;">
      <span class="slider__value">${config.value}</span>
    </div>
    <div class="slider__progress" style="width: ${config.currentStep}%;"></div>
    <div class="slider__steps">
      ${sliderStepsTemplate(config.steps)}
    </div>
  </div>`;
};

const sliderStepsTemplate = stepsCount => {
  let steps = '';
  for (let i = 0; i < stepsCount; ++i) {
    steps += '<span></span>\n';
  }
  return steps;
};

export default class StepSlider {
  config = {};

  constructor({ steps, value = 0 }) {
    this.initConfig({steps, value});
    this.render();  
  }

  initConfig(configValues) {
    const {steps, value} = configValues;
    this.config.steps = steps;
    this.config.value = value;
    this.config.currentStep = (100 / (steps - 1)) * value;
  }

  dragStart = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.config.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    this.thumb.style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    this.elem.querySelector('.slider__value').innerText = value;
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelectorAll('.slider__steps span')[value].classList.add('slider__step-active');
    const customEvent = new CustomEvent('slider-change', { 
      detail: value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
  
  dragging = () => {
    this.thumb.style.position = 'absolute';

    const handleMove = (event) => {
  
      this.elem.classList.add('slider_dragging');
  
      this.thumb.style.left = `${event.pageX}px`;
  
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }
      let leftPercents = leftRelative * 100;
      this.thumb.style.left = `${leftPercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;
  
      let segments = this.config.steps - 1;
      let approximateValue = leftRelative * segments;
      this.config.value = Math.round(approximateValue);
      this.elem.querySelector('.slider__value').innerText = this.config.value;
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
      this.elem.querySelectorAll('.slider__steps span')[this.config.value].classList.add('slider__step-active');
    };  
  
    document.addEventListener('pointermove', handleMove);

    document.addEventListener('pointerup', () => {

      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', handleMove);

      const customEvent = new CustomEvent('slider-change', { 
        detail: this.config.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    }, { once: true });
  }

  render = () => {
    this.elem = createElement(`${sliderTemplate(this.config)}`);
    this.elem.querySelector('.slider__steps span').classList.add('slider__step-active');
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;

    this.elem.addEventListener('click', (event) =>
      this.dragStart(event));

    this.thumb.addEventListener('pointerdown', (event) => this.dragging(event));
  }

}