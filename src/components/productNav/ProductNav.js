import { setProductCategoryFilter } from "../../store/actions";
import Store from "../../store/store";
import { html, sortAndFilterDuplicates } from "../../utils/utils";
import Component from "../baseComponent/baseComponent";
import { categoriesDictionary, correctlyOrderedCategories } from "./constants";
import "./style.css";

/**
 * Product Navigation component.
 */
export default class ProductNavComponent extends Component {
  static createProductCategoryMapper() {
    function getCategory(key) {
      return categoriesDictionary[key];
    }

    return { getCategory };
  }

  /**
   * @param {{
   *  containerElement: Element,
   *  store: Store
   * }} obj navigation data
   * @return ProductNavComponent
   */
  constructor(obj) {
    super();
    this.store = obj.store;
    this.containerElement = obj.containerElement;
    this.categoryNameMapper = ProductNavComponent.createProductCategoryMapper();

    this.updateProperties();
    this.buildDOMElements();
    this.render();
  }

  handleProductCategoryChange(category) {
    this.store.dispatch(setProductCategoryFilter(category));
  }

  /**
   * Get properly ordered product category list
   * @return void
   */
  static getCategoryList(products) {
    const allProductCategories = products.reduce((categories, product) => {
      const currCategory = product.category;
      if (!categories.includes(currCategory)) {
        categories.push(currCategory);
      }
      return categories;
    }, []);

    const orderedCategories = sortAndFilterDuplicates(
      allProductCategories,
      correctlyOrderedCategories,
    );

    return orderedCategories;
  }

  /**
   * Update component state & subscribe to store updates
   * @return void
   */
  updateProperties() {
    const [getCategoryFilter] = this.useState(
      this.store.getState().categoryFilter,
    );

    this.currentCategory = getCategoryFilter();

    const [getCategoryList] = this.useState(
      ProductNavComponent.getCategoryList(this.store.getState().products),
    );

    this.categories = getCategoryList();

    this.store.subscribeValue("categoryFilter", (category) => {
      this.currentCategory = category;
      ProductNavComponent.getCategoryList(this.store.getState().products);
      this.buildDOMElements();
      this.render();
    });

    this.store.subscribeValue("products", () => {
      ProductNavComponent.getCategoryList(this.store.getState().products);
      this.buildDOMElements();
      this.render();
    });
  }

  buildDOMElements() {
    this.productNavElement = document.createElement("nav");
    this.productNavElement.classList.add("home-page__nav");
    const navListElement = document.createElement("ul");
    navListElement.classList.add("category-nav");
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
                ${category === this.currentCategory ? "checked" : ""}
              />
              <label for="${category}"
                >${this.categoryNameMapper.getCategory(category)}</label
              >
            </li>
          `,
        )
        .join("")}
		`;
  }

  render() {
    this.renderNavItems();
    this.containerElement.innerHTML = "";
    this.containerElement.appendChild(this.productNavElement);
    const radios = document.querySelectorAll(
      'input[type="radio"][name="category"]',
    );

    radios.forEach((radio) =>
      radio.addEventListener("change", () =>
        this.handleProductCategoryChange(radio.value),
      ),
    );
  }
}
