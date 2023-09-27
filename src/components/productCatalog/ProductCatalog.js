'use strict';

import Markets from "../../products/markets";
import ProductModel from "../../products/product";
import ProductCollectionModel from "../../products/productCollection";
import { html } from "../../utils/utils";
import ButtonControl from "../buttons/control/Control";
import ButtonPrimary from "../buttons/primary/Primary";
import './style.css';


// const html = String.raw;

/**
 * Product Catalog component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
export default class ProductCatalogComponent {
  /**
   * @param {{products: ProductCollectionModel, containerElement: Element, markets: Markets}} obj product catalog data
   * @return ProductCatalogComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.fields = ProductModel.getFields();
    this.markets = obj.markets;
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
  }

  /**
   * @param {{products: ProductCollectionModel, containerElement: Element}} obj author data
   * @return void
   */
  updateProperties(obj) {
    this.products = obj.products.getFilteredProducts();
    obj.products.subscribe(() => {
      this.products = obj.products.getFilteredProducts();
      this.render();
    });
  }

  buildDOMElements() {
    this.productListElement = document.createElement('ul');
    this.productListElement.classList.add('product-catalogue__list');
  }

  renderProductCards() {
    if (!this.productListElement) return;
    this.productListElement.innerHTML = `
			${this.products
        .map(
          product => html`
            <li class="product-card">${this.renderProductCardBody(product)}</li>
          `
        )
        .join('')}
		`;
  }

  /**
   * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} product data
   * @return string
   */
  renderProductCardBody(product) {
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
    return ''
    // if (!market) return '';
    // const productMarket = document.createElement('span');
    // productMarket.classList.add('product-card__market');
    // const productImgSrc = this.markets.getMarketLogo(market);

    // productMarket.innerHTML = html`
    //   <img src="${productImgSrc}" alt="${market} лого" />
    // `;
    // return productMarket.outerHTML;
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

    // А так работает:
    productPhotoContent.innerHTML = html`
      <img
        src="${require(`/src/public/i/salads/salad.png`)}"
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
    const incrementButton = ButtonControl.render('plus');
    const decrementButton = ButtonControl.render('minus');

    return html`
      <div class="product-card-info__count">
        <label for="product-count" class="product-card-info__count-label"
          >Количество
        </label>
        <div class="count-control">
          ${decrementButton}
          <input
            placeholder="1"
            type="text"
            id="product-count"
            name="product-count"
            class="product-count-input"
            readonly
          />
          ${incrementButton}
        </div>
      </div>
    `;
  }

  /**
   * @return string
   */
  renderControlButton() {
    const incrementButton = ButtonControl.render('plus');
    const decrementButton = ButtonControl.render('minus');
    return html`
      <div class="product-card-info__count">
        <label for="product-count" class="product-card-info__count-label"
          >Количество
        </label>
        <div class="count-control">
          ${decrementButton}
          <input
            placeholder="1"
            type="text"
            id="product-count"
            name="product-count"
            class="product-count-input"
            readonly
          />
          ${incrementButton}
        </div>
      </div>
    `;
  }

  render() {
    this.renderProductCards();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.productListElement);
  }
}
