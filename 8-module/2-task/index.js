import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };

    this.render();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');

    const gridInner = document.createElement('div');
    gridInner.classList.add('products-grid__inner');

    this.elem.append(gridInner);

    this.renderCards();
  }

  renderCards() {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (product.spiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        return false;
      }

      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });

    for (const product of filteredProducts) {
      const card = new ProductCard(product);
      gridInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.renderCards();
  }
}