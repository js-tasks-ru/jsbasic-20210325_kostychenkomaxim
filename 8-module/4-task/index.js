import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this._modal = null;
    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(
      (item) => item.product.name === product.name
    );
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }
    cartItem.count += amount;

    if (cartItem.count === 0) {
      const newProductList = [];
      this.cartItems.forEach((item) => {
        if (item !== cartItem) {
          newProductList.push(item);
        }
      });
      this.cartItems = newProductList;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return [...this.cartItems].reduce((accumulator, current) => {     
      return current.count + accumulator; }
    , 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return [...this.cartItems].reduce((accumulator, current) => {     
      return current.product.price * current.count + accumulator; }
    , 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    let modal = new Modal();
    this._modal = modal;
    modal.setTitle("Your order");

    modal.setBody(this.cartLayout());
    modal.open();
    console.log(this._modal);

    this._modal.elem.addEventListener("click", this.clickInModal);

    const orderForm = modal.elem.querySelector(`.cart-form`);
    orderForm.addEventListener("submit", this.onSubmit, { once: true });
  }

  cartLayout() {
    const cartTmpl = createElement("<div></div>");
    this.cartItems.forEach((item) => {
      cartTmpl.append(this.renderProduct(item.product, item.count));
    });

    cartTmpl.append(this.renderOrderForm());

    return cartTmpl;
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    this.cartIcon.update(this);

    const isModalVisible = document.body.classList.contains("is-modal-open");
    if (!isModalVisible) {

      return;
    }

    const isHasItemsInCart = this.isEmpty;
    if (!isHasItemsInCart) {
      let elemForDelite = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`);
      elemForDelite.remove();

      return;
    }
    this.onProductPriceUpdate(cartItem);
  }

  onProductPriceUpdate(cartItem) {
    if (!this._modal) {return;}
    let productCount = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
    productCount.textContent = cartItem.count;

    let productPrice = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
    productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

    let infoPrice = this._modal.elem.querySelector(`.cart-buttons__info-price`);
    infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit = async (event) => {
    // ...ваш код
    event.preventDefault();
    let formOfModal = this._modal.elem.querySelector(`.cart-form`);
    let bodyOfForm = new FormData(formOfModal);

    let response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: bodyOfForm,
    });
    if (response.status == 200) {
      this._modal.elem.removeEventListener("click", this.clickInModal);
      this._modal.setTitle('Success!');
      this.cartItems = [];

      const successfulModalBody = `
    <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`;
      this._modal.setBody(createElement(successfulModalBody));
      this._modal.close();
      this._modal.open();
      this.cartIcon.update(this);
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  clickInModal = (e) => {
    const amount = e.target.closest(".cart-counter__button_plus") ? 1 : -1;

    const closestCardProduct = e.target.closest(".cart-product");
    if (!closestCardProduct) {
      return;
    }
    const productId = closestCardProduct.dataset.productId;
    this.updateProductCount(productId, amount);
    if (this.isEmpty()) {
      this._modal.close();
      this._modal.elem.removeEventListener("click", this.clickInModal);
    }
  }
}

