import createElement from '../../assets/lib/create-element.js';

const arrowTmpl = arrowClass => {
  return `<button class="ribbon__arrow ${arrowClass}">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>`;
};

const categoryTmpl = categories => {
  return `
  <nav class="ribbon__inner">
    ${categories.map(category => categoryLinkTmpl(category)).join('\n')}
  </nav>`;
};

const categoryLinkTmpl = category => {
  return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
};


export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.step = 350;
    
    this.elem = createElement(
      `<div class="ribbon">
      ${arrowTmpl('ribbon__arrow_left')}
      ${categoryTmpl(this.categories)}
      ${arrowTmpl('ribbon__arrow_right')}
      </div>`
    );
    this.rightBtnRef = this.elem.querySelector('.ribbon__arrow_right');
    this.leftBtnRef = this.elem.querySelector('.ribbon__arrow_left');
    this.wrapperRef = this.elem.querySelector('.ribbon__inner');
    this.initMenu();
    this.handleClick();
    
  }
  initMenu = () => {
    this.rightBtnRef.classList.add('ribbon__arrow_visible');
    this.wrapperRef.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  
    this.rightBtnRef.addEventListener('click', () => {
      this.wrapperRef.scrollBy(this.step, 0);
    });
  
    this.leftBtnRef.addEventListener('click', () => {
      this.wrapperRef.scrollBy(-this.step, 0);
    });

    this.wrapperRef.addEventListener('scroll', () => {
      this.isRightBtnShow();
      this.isLeftBtnShow();
    });
  }
  
  isRightBtnShow = () => {
    const scrollLeft = this.wrapperRef.scrollLeft;
    return (scrollLeft !== 0) ? 
      this.leftBtnRef.classList.add('ribbon__arrow_visible') :
      this.leftBtnRef.classList.remove('ribbon__arrow_visible');
  }

  isLeftBtnShow = () => {
    const scrollWidth = this.wrapperRef.scrollWidth;
    const scrollLeft = this.wrapperRef.scrollLeft;
    const clientWidth = this.wrapperRef.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    return scrollRight <= 1 ? 
      this.rightBtnRef.classList.remove('ribbon__arrow_visible') : 
      this.rightBtnRef.classList.add('ribbon__arrow_visible');
  }

  clickOnLink = (item) => {
    this.wrapperRef.querySelector('.ribbon__item_active')
        .classList.remove('ribbon__item_active');
    item.classList.add('ribbon__item_active');
    const event = new CustomEvent("ribbon-select", { 
      detail: item.dataset.id, bubbles: true });
    this.elem.dispatchEvent(event);
  }  

  handleClick = () => {
    this.elem.querySelectorAll('.ribbon__item').forEach(item => 
    { item.addEventListener('click', (event) => {
      event.preventDefault();
      this.clickOnLink(item);
    });
    });
  }
}
