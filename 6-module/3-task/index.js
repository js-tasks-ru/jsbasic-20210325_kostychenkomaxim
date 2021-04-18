import createElement from '../../assets/lib/create-element.js';

const rightSliderBtn = () => { return `<div class="carousel__arrow carousel__arrow_right">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>`; };


const leftSliderBtn = () => { return `<div class="carousel__arrow carousel__arrow_left">
  <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>`; };

const slideTemplate = slide => {
  return `<div class="carousel__slide" data-id="${slide.id}">
  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${slide.price.toFixed(2)}</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`;
};

const sliderTmpl = (slides) => {
  return `
  <div class="carousel__inner">
    ${slides.map(slide => slideTemplate(slide)).join('\n')}
  </div>`;
};

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slidesCount = this.slides.length;
    this.elem = createElement(
      `<div class="carousel">
      ${rightSliderBtn}
      ${leftSliderBtn}
      ${sliderTmpl(this.slides)}
      </div>`
    );
    this.initCarousel();
    this.elem.querySelectorAll('.carousel__button')
              .forEach(button => { 
                button.addEventListener('click', (event) =>
                  this.onButtonClick(button.closest('.carousel__slide').dataset.id));});  
  }

  onButtonClick = (slideId) => {
    const event = new CustomEvent("product-add", { 
      detail: slideId, bubbles: true });
    this.elem.dispatchEvent(event);
  }  

  initCarousel() {
    const rightBtnRef = this.elem.querySelector('.carousel__arrow_right');
    const leftBtnRef = this.elem.querySelector('.carousel__arrow_left');
    const carouselInner = this.elem.querySelector('.carousel__inner');

    let currentSlide = 0;
    leftBtnRef.style.display = 'none';
  
    rightBtnRef.addEventListener('click', () => {
      const innerWidth = carouselInner.offsetWidth;
      carouselInner.style.transform = this.next(innerWidth, ++currentSlide);
      this.update(currentSlide, rightBtnRef, leftBtnRef);
    });
  
    leftBtnRef.addEventListener('click', () => {
      const innerWidth = carouselInner.offsetWidth;
      carouselInner.style.transform = this.next(innerWidth, --currentSlide);
      this.update(currentSlide, rightBtnRef, leftBtnRef);
    });
  }

  next(innerWidth, currentSlide) {
    return `translateX(-${innerWidth * currentSlide}px)`;
  }

  update(currentSlide, rightButton, leftButton) {
    if (currentSlide === this.slidesCount - 1) {
      rightButton.style.display = 'none';
    } else if (currentSlide === 0) {
      leftButton.style.display = 'none';
    } else {
      rightButton.style.display = '';
      leftButton.style.display = '';
    }
  }
}
  