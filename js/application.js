('use strict');
const html = String.raw;

/**
 * Markets model
 */
class Markets {
  /**
   * @param {[{name: String, image: String}]} obj market data list
   * @return MarketsModel
   */
  constructor(obj) {
    this.list = obj;
    this.marketNames = Object.keys(obj);
  }

  /**
   * @return string[] market name list
   */
  getMarketNames() {
    return this.marketNames;
  }

  /**
   * @return string market logo source url
   */
  getMarketLogo(marketName) {
    return this.list[marketName].image;
  }
}

/**
 * Button Primary component. Uses positioning and modifier classes to adjust its view.
 */
class ButtonPrimary {
  /**
   * @param {string} text button text
   * @param {string} classPositioning class to adjust positioning
   * @param {string[]} classModifiers modifier names to adjust button appearance
   * @return string
   */
  static render(text, classPositioning, classModifiers) {
    const className = 'button-primary';
    const classModifiersList = classModifiers
      .map((modifier) => `${className}--${modifier}`)
      .join(' ');

    return html`
      <button
        class="${classPositioning} ${className} ${classModifiersList}"
        type="submit"
      >
        ${text}
      </button>
    `;
  }
}

/**
 * Button Control component. Uses positioning and modifier classes to adjust its view.
 */
class ButtonControl {
  /**
   * @param {Icon} icon - The allowed type of the button icon
   * @return string
   */
  static #getIcon(icon) {
    if (icon === 'plus') return html`<i class="fa-solid fa-plus"></i>`;
    if (icon === 'minus') return html`<i class="fa-solid fa-minus"></i>`;
    return html`<></>`;
  }

  /**
   * @typedef {"plus" | "minus"} Icon
   */

  /**
   * @param {Icon} icon the allowed type of the button icon
   * @param {string} classPositioning class to adjust positioning
   * @param {string[]} classModifiers modifier names to adjust button appearance
   * @return string
   */
  static render(icon, classPositioning = '', classModifiers = ['']) {
    const className = 'product-count-button';

    const classModifiersList = classModifiers
      .map((modifier) =>
        !classModifiers.length ? '' : `${className}--${modifier}`
      )
      .join(' ');

    const buttonBody = html` <button
      class="${classPositioning} ${className} ${classModifiersList}"
    >
      ${this.#getIcon(icon)}
    </button>`;

    return buttonBody;
  }
}

/**
 * Product model
 */
class ProductModel {
  /**
   * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} obj product data
   * @return ProductModel
   */
  constructor(obj) {
    this.updateProperties(obj);
  }

  /**
   * Map properties to this instance
   *
   * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} obj product data
   * @return void
   */
  updateProperties(obj) {
    if (obj.name) this.name = obj.name;
    if (obj.description) this.description = obj.description;
    if (obj.image) this.image = obj.image;
    if (obj.price) this.price = obj.price;
    if (obj.market) this.market = obj.market;
    if (obj.type) this.type = obj.type;
    if (obj.weight) this.weight = obj.weight;
  }

  /**
   * Get a list of properties for this class
   *
   * @returns {string[]}
   */
  static getFields() {
    return [
      'name',
      'description',
      'image',
      'price',
      'market',
      'type',
      'weight',
    ];
  }
}

/**
 * Product Catalog component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
class ProductCatalogComponent {
  /**
   * @param {{products: ProductModel[], containerElement: Node, markets: Markets}} obj author data
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
   * @param {{products: ProductModel[], containerElement: Node}} obj author data
   * @return void
   */
  updateProperties(obj) {
    this.products = obj.products;
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
          (product) => html`
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
   * @param {string} product market
   * @return string
   */
  renderProductMarket(market) {
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
      <img src="${imageSrc}" alt="${name} фото" />
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
