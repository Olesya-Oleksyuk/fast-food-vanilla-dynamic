import Store from "../../store/store";
import { html } from "../../utils/utils";
import Component from "../baseComponent/baseComponent";
import ButtonPrimary from "../buttons/primary/Primary";
import ProductViewComponent from "../productView/productView";
import CountPanelComponent from "../countPanel/CountPanel";
import "./style.css";

/**
 * Product Card component
 */
export default class ProductCardComponent extends Component {
  /**
   * @param {Object} obj - The object containing the properties for rendering the Product Card Component.
   * @param {Element} obj.containerElement
   * @param {import('../../jsdocs/typedef').Product} obj.product
   * @param {Store} obj.store
   * @param {Function} obj.onCartButtonClick
   * @return {HTMLElement} - The rendered button element.
   */
  constructor(obj) {
    super();
    this.containerElement = obj.containerElement;
    this.store = obj.store;
    this.onCartButtonClick = obj.onCartButtonClick;
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
    this.containerElement.appendChild(this.productElement);
  }

  addListeners() {
    const cartButton = this.productElement.querySelector(
      ".product-info__to-cart-button",
    );

    cartButton.addEventListener("click", () => {
      this.onCartButtonClick({
        ...this.getProduct(),
        count: this.getProductCount(),
      });
    });
  }

  /**
   * Update component state & subscribe to store updates
   * @return void
   */
  updateProperties(obj) {
    const [getProduct] = this.useState(obj.product);
    this.getProduct = getProduct;

    const [getProductCount, setProductCount] = this.useState(1);
    this.getProductCount = getProductCount;
    this.setProductCount = setProductCount;

    this.markets = this.store.getState().markets;
  }

  buildDOMElements() {
    this.productElement = document.createElement("li");
    this.productElement.classList.add("product-card");
  }

  renderProductCard() {
    if (!this.productElement) return;
    const product = this.getProduct();
    this.productMarketMarkup = this.renderProductMarket(product.market);

    this.productElement.innerHTML = this.productMarketMarkup;

    new ProductViewComponent({
      containerElement: this.productElement,
      variant: "with-description",
      product,
    });

    const incrementProductCount = () => {
      this.setProductCount(this.getProductCount() + 1);
    };

    const decrementProductCount = () => {
      this.setProductCount(this.getProductCount() - 1);
    };

    new CountPanelComponent({
      containerElement: this.productElement,
      count: this.getProductCount(),
      onIncrement: incrementProductCount.bind(this),
      onDecrement: decrementProductCount.bind(this),
    });

    this.productToCartButtonMarkup = ButtonPrimary.render(
      "В корзину",
      "product-info__to-cart-button",
      ["yellow"],
    );

    this.productElement.insertAdjacentHTML(
      "beforeend",
      this.productToCartButtonMarkup,
    );
  }

  /**
   * @param {string} market
   * @return string
   */
  renderProductMarket(market) {
    if (!market) return "";
    const productMarket = document.createElement("span");
    productMarket.classList.add("product-card__market");
    const productImgSrc = this.markets.getMarketLogo(market);

    productMarket.innerHTML = html`
      <img src="${productImgSrc}" alt="${market} лого" />
    `;
    return productMarket.outerHTML;
  }

  render() {
    this.renderProductCard();
    this.addListeners();
  }
}
