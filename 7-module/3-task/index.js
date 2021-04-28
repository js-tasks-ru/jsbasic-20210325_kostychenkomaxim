import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  config = new Object();

  constructor({ steps, value = 0 }) {
    this.initConfig({steps, value});
    this.elem = createElement(`${sliderTmpl(this.config)}`);
    this.elem.querySelector('.slider__steps span').classList.add('slider__step-active');
    this.elem.addEventListener('click', (event) =>
      this.handleClick(event));
  }

  initConfig(customConfig) {
    const {steps, value} = customConfig;
    this.config.steps = steps;
    this.config.value = value;
    this.config.currentStep = (100 / (steps - 1)) * value;
  }

  handleClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.config.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.elem.querySelector('.slider__value').innerText = value;
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelectorAll('.slider__steps span')[value].classList.add('slider__step-active');
    const customEvent = new CustomEvent('slider-change', { 
      detail: value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }  

}

const sliderTmpl = (config) => {
  return `
  <div class="slider">
    <div class="slider__thumb" style="left: ${config.currentStep}%;">
      <span class="slider__value">${config.value}</span>
    </div>
    <div class="slider__progress" style="width: ${config.currentStep}%;"></div>
    <div class="slider__steps">
      ${sliderStepsTmpl(config.steps)}
    </div>
  </div>`;
};

const sliderStepsTmpl = (stepsCount) => {
  let steps = '';
  for (let i = 0; i < stepsCount; ++i) {
    steps += '<span></span>\n';
  }
  return steps;
};
