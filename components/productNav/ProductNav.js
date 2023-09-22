'use strict';
/**
 * Product Navigation component.
 */
class ProductNavComponent {
  /**
   * @param {{categories: string[], containerElement: Node}} obj navigation data
   * @return ProductNavComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.categoryNameMapper = this.createProductCategoryMapper();
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
  }

  /**
   * @param {{categories: string[], containerElement: Node}} obj navigation data
   * @return void
   */
  updateProperties(obj) {
    this.categories = obj.categories;
  }

  buildDOMElements() {
    this.productNavElement = document.createElement('nav');
    this.productNavElement.classList.add('home-page__nav');
    const navListElement = document.createElement('ul');
    navListElement.classList.add('category-nav');
    this.productNavElement.appendChild(navListElement);
  }

  renderNavItems() {
    if (!this.productNavElement || !this.productNavElement.firstChild) return;
    this.productNavElement.firstChild.innerHTML = `
			${this.categories
        .map(
          (category) => html`
            <li class="category-nav__item">
              <input
                id="${category}"
                type="radio"
                name="radio"
                value="${category}"
              />
              <label for="${category}"
                >${this.categoryNameMapper.getCategory(category)}</label
              >
            </li>
          `
        )
        .join('')}
		`;
  }

  createProductCategoryMapper() {
    const dictionary = {
      sandwiches: 'сэндвичи',
      shaurma: 'шаурма',
      burgers: 'бургеры',
      chicken: 'курица & картофель',
      salads: 'тортилья & салаты',
      drinks: 'напитки & десерты',
      pizza: 'пицца',
    };

    function getCategory(key) {
      return dictionary[key];
    }

    return { getCategory };
  }

  render() {
    this.renderNavItems();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.productNavElement);
  }
}
