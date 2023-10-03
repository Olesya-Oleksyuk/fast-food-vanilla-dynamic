'use strict';

import { composeClassList, html } from '../../utils/utils';

/**
 * Cart component.
 */
export default class ProductViewComponent {
  /**
   * @typedef {"short" | "with-description" | "photo-only"} Variant
   */

  /**
   * Renders the object as a button element with the specified icon, disabled state, positioning class, and modifiers.
   *
   * @param {Object} obj - Product view data
   * @param {Element} obj.containerElement
   * @param {Variant} obj.variant
   * @param {import('../../jsdocs/typedef').ProductView} obj.product
   * @return ProductViewComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.variant = obj.variant;
    this.image = obj.product.image;

    if (this.variant === 'short' || this.variant === 'with-description') {
      this.name = obj.product.name;
      this.price = obj.product.price;
    }

    if (this.variant === 'with-description') {
      this.description = obj.product.description;
    }
    this.render();
  }


  buildPhoto(image, name) {
    const productPhoto = document.createElement('div');
    productPhoto.classList.add('product-card__photo');
    productPhoto.classList.add(`product-card__photo--${this.variant}`);
    const productPhotoContent = document.createElement('div');
    productPhotoContent.classList.add(`product-card__photo-inner`);
    productPhotoContent.classList.add(
      `product-card__photo-inner--${this.variant}`
    );

    const photoElement = document.createElement('img');
    photoElement.src = image;
    photoElement.alt = `Фото ${name}`;

    productPhotoContent.appendChild(photoElement);
    productPhoto.appendChild(productPhotoContent);
    return productPhoto;
  }

  buildName(name) {
    const classBlockName = 'product-card__name';

    const productHeader = document.createElement('h3');
    productHeader.classList.add('product-card__title');
    productHeader.classList.add(`product-card__title--${this.variant}`);

    const headerText = document.createElement('span');
    headerText.setAttribute(
      'class',
      composeClassList({
        classBlockName,
        classModifiers: [this.variant],
      })
    );
    headerText.innerText = name;
    productHeader.appendChild(headerText);
    return productHeader;
  }

  buildDescription(description) {
    const productDesription = document.createElement('p');
    productDesription.classList.add('product-card-info__ingredients');
    productDesription.innerHTML = html`<span class="product-ingredient">
      ${description}
    </span>`;

    return productDesription;
  }

  buildPrice(price) {
    const classBlockName = 'product-card-info__price';
    const priceElement = document.createElement('span');
    priceElement.setAttribute(
      'class',
      composeClassList({
        classBlockName,
        classModifiers: [this.variant],
      })
    );
    priceElement.innerText = `Цена: ${price} руб`;
    return priceElement;
  }
  buildDivider() {
    const divider = document.createElement('hr');
    divider.classList.add('product-card-info__divider');
    return divider;
  }

  render() {
    this.containerElement.appendChild(this.buildPhoto(this.image, this.name));
    if (this.variant === 'short') {
      this.containerElement.appendChild(this.buildName(this.name));

      const infoWrapper = document.createElement('div');
      infoWrapper.classList.add('product-card-info__wrapper');
      infoWrapper.appendChild(this.buildDivider());
      infoWrapper.appendChild(this.buildPrice(this.price));
      this.containerElement.appendChild(infoWrapper);
    }
    if (this.variant === 'with-description') {
      this.containerElement.appendChild(this.buildName(this.name));
      this.containerElement.appendChild(
        this.buildDescription(this.description)
      );
      this.containerElement.appendChild(this.buildPrice(this.price));
    }
  }
}
