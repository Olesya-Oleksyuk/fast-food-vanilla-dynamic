'use strict';
/**
 * Product Navigation component.
 */
class ProductNavComponent {
  /**
   * @param {{categories: string[], currentCategory: string, containerElement: Node, handleProductCategoryChange: () => void, subscribeToProductCollection: (fn: Function) => void}} obj navigation data
   * @return ProductNavComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.currentCategory = obj.currentCategory;
    this.handleProductCategoryChange = obj.handleProductCategoryChange;
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
                name="category"
                value="${category}"
                ${category === this.currentCategory ? 'checked' : ''}
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
    function getCategory(key) {
      return categoriesDictionary[key];
    }

    return { getCategory };
  }

  render() {
    this.renderNavItems();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.productNavElement);
    const radios = document.querySelectorAll(
      'input[type="radio"][name="category"]'
    );

    radios.forEach((radio) =>
      radio.addEventListener('change', () =>
        this.handleProductCategoryChange(radio.value)
      )
    );
  }
}
