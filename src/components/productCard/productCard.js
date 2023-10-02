'use strict';

import Store from '../../store/store';
import { Component, html } from '../../utils/utils';
import ButtonControl from '../buttons/control/Control';
import ButtonPrimary from '../buttons/primary/Primary';
import './style.css';

/**
 * Product Card component
 */
export default class ProductCardComponent extends Component {
  /**
   * @param {{
   * product: import('../../jsdocs/typedef').Product
   * containerElement: Element,
   * store: Store,
   * }} obj product catalog data
   * @return ProductCatalogComponent
   */
  constructor(obj) {
    super();
    this.containerElement = obj.containerElement;
    this.store = obj.store;
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
    this.containerElement.appendChild(this.productElement);
    this.addListeners();
  }

  addListeners() {
    const decrementButtonElement = this.productElement.querySelector(
      '.count-control__decrement'
    );

    const incrementButtonElement = this.productElement.querySelector(
      '.count-control__increment'
    );

    this.countInputElement = this.productElement.querySelector(
      '.product-count-input'
    );

    const incrementProductCount = () => {
      this.setProductCount(this.getProductCount() + 1);
    };

    const decrementProductCount = () => {
      this.setProductCount(this.getProductCount() - 1);
    };

    decrementButtonElement.addEventListener('click', decrementProductCount);
    incrementButtonElement.addEventListener('click', incrementProductCount);
  }

  /**
   * Update component state & subscribe to store updates
   * @return void
   */
  updateProperties(obj) {
    const [getProduct, setProduct] = this.useState(obj.product);
    this.getProduct = getProduct;
    this.setProduct = setProduct;

    const [getProductCount, setProductCount] = this.useState(1);
    this.getProductCount = getProductCount;
    this.setProductCount = setProductCount;

    this.markets = this.store.getState().markets;
  }

  buildDOMElements() {
    this.productElement = document.createElement('li');
    this.productElement.classList.add('product-card');
  }

  renderProductCard() {
    if (!this.productElement) return;
    this.productElement.innerHTML = this.renderProductCardBody();
  }

  renderProductCardBody() {
    const product = this.getProduct();
    this.productMarketMarkup = this.renderProductMarket(product.market);
    this.productPhotoMarkup = this.renderProductPhoto(
      product.image,
      product.name
    );
    this.productNameMarkup = this.renderProductName(product.name);
    this.productInfoMarkup = this.renderProductCardInfo(
      product.description,
      product.price
    );

    this.productToCartButtonMarkup = ButtonPrimary.render(
      'В корзину',
      'product-card-info__to-cart-button',
      ['yellow']
    );

    return (
      this.productMarketMarkup +
      this.productPhotoMarkup +
      this.productNameMarkup +
      this.productInfoMarkup +
      this.productToCartButtonMarkup
    );
  }

  /**
   * @param {string} market
   * @return string
   */
  renderProductMarket(market) {
    if (!market) return '';
    const productMarket = document.createElement('span');
    productMarket.classList.add('product-card__market');
    const productImgSrc = this.markets.getMarketLogo(market);

    productMarket.innerHTML = html`
      <img src="${productImgSrc}" alt="${market} лого" />
    `;
    return productMarket.outerHTML;
  }

  /**
   * @param {string} imageSrc
   * @param {string} name
   * @return string
   */
  renderProductPhoto(imageSrc, name) {
    const productPhoto = document.createElement('div');
    productPhoto.classList.add('product-card__photo');
    const productPhotoContent = document.createElement('div');
    productPhotoContent.classList.add('product-card__photo-inner');

    productPhotoContent.innerHTML = html`
      <img
        src="${imageSrc}"
        alt="${name}
      фото"
      />
    `;

    productPhoto.appendChild(productPhotoContent);
    return productPhoto.outerHTML;
  }

  /**
   * @param {string} name
   * @return string
   */
  renderProductName(name) {
    return html`
      <h3 class="product-card__title">
        <span class="product-card__name">${name}</span>
      </h3>
    `;
  }

  /**
   * @param {string} description
   * @param {number} price
   * @return string
   */
  renderProductCardInfo(description, price) {
    const productDescription = this.renderProductDescription(description);
    const productPrice = this.renderProductPrice(price);
    const productCount = this.renderProductCountPanel();

    return productDescription + productPrice + productCount;
  }

  /**
   * @param {string} description
   * @return string
   */
  renderProductDescription(description) {
    return html`
      <p class="product-card-info__ingredients">
        <span class="product-ingredient"> ${description} </span>
      </p>
    `;
  }

  /**
   * @param {number} price
   * @return string
   */
  renderProductPrice(price) {
    return html`
      <span class="product-card-info__price">
        Цена:
        <b>${price} руб.</b>
      </span>
    `;
  }

  /**
   * @return string
   */
  renderProductCountPanel() {
    const isDecrementDisabled = this.getProductCount() <= 1;
    const incrementButton = ButtonControl.render({
      icon: 'plus',
    });
    const decrementButton = ButtonControl.render({
      icon: 'minus',
      isDisabled: isDecrementDisabled,
    });

    return html`
      <div class="product-card-info__count">
        <label for="product-count" class="product-card-info__count-label"
          >Количество
        </label>
        <div class="count-control">
          <div class="count-control__decrement">
            ${decrementButton.outerHTML}
          </div>
          <input
            placeholder="1"
            type="text"
            id="product-count"
            name="product-count"
            class="product-count-input"
            readonly
            value=${this.getProductCount()}
          />
          <div class="count-control__increment">
            ${incrementButton.outerHTML}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.renderProductCard();
    this.addListeners();
  }
}
