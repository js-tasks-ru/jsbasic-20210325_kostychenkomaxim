export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }
    cartItem.count += amount;

    if (cartItem.count === 0) {
      const newList = [];
      this.cartItems.forEach((item) => {
        if (item !== cartItem) {
          newList.push(item);
        }
      });
      this.cartItems = newList;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    return [...this.cartItems].reduce((accumulator, current) => {     
      return current.count + accumulator; }
    , 0);
  }

  getTotalPrice() {
    // ваш код
    return [...this.cartItems].reduce((accumulator, current) => {     
      return current.product.price * current.count + accumulator; }
    , 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

