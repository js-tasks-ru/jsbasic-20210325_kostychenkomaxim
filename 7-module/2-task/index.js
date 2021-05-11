import createElement from '../../assets/lib/create-element.js';

function modalTmpl() {
  return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>`;
}

export default class Modal {
  constructor() {
    this.elem = createElement(modalTmpl());
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.bodyRef = document.body;
    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.hide();
    });
    document.addEventListener('keydown', (event) => this.escapeBtn(event));
  }
  
  setTitle = (title) => {
    this.modalTitle.innerText = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.insertAdjacentElement('afterbegin', node);
  }

  open() {
    this.bodyRef.insertAdjacentElement('afterbegin', this.elem);
    this.bodyRef.classList.add('is-modal-open');
  }

  close() {
    this.hide();
  }

  hide() {
    this.bodyRef.classList.remove('is-modal-open');
    this.elem.remove();
    document.removeEventListener('keydown', this.escapeBtn);
  }

  escapeBtn = (event) => {
    if (event.code === 'Escape') {
      this.hide();
    }
  }

}
