import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredCards = this.products;
    this.filters = {};
    this.elem = null;

    this.renderTmpl();
  }

  renderTmpl() {
    let layout = `
    <div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>
    `;

    this.elem = createElement(layout);
    this.productsList = this.elem.querySelector(".products-grid__inner");

    this.renderCards();
  }

  renderCards() {
    this.filteredCards.forEach((card) => {
      const el = new ProductCard(card).elem;
      this.productsList.append(el);
    });

  }

  updateFilter(filter) {
    this.filters = Object.assign({}, this.filters, filter);
    this.filteredCards = this.products

      .filter((product) => {

        return this.selectNoNuts(product);
      })
      .filter((product) => {

        return this.selectOnlyVegeterian(product);
      })
      .filter((product) => {

        return this. selectSpiciness(product);
      })

      .filter((product) => {

        return this.selectCategory(product);
      });

    this.productsList.innerHTML = null;
    this.renderCards();
  }

  selectCategory(product) {
    if (this.filters["category"]) {

      if (
        this.filters["category"] === product["category"] ||
        this.filters["category"] === ""
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  selectSpiciness(product) {
    if (this.filters["maxSpiciness"]) {

      if (product["spiciness"] <= this.filters["maxSpiciness"]) {
        return true;
      }
      return false;
    }
    return true;
  }

  selectNoNuts(product) {
    if (this.filters["noNuts"]) {

      if (product["nuts"] === false || product["nuts"] === undefined)
      {
        return true;
      }

      return false;
    }
    return true;
  }

  selectOnlyVegeterian(product) {
    if (this.filters["vegeterianOnly"]) {

      if (product["vegeterian"] === true)
      {
        return true;
      }
      return false;
    }
    return true;
  }
}