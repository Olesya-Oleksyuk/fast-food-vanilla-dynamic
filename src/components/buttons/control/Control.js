'use strict';

import { html } from '../../../utils/utils';
import './style.css';

/**
 * Button Control component. Uses positioning and modifier classes to adjust its view.
 */
export default class ButtonControl {
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
   * @return Element
   */
  static render(
    icon,
    classPositioning = '',
    classModifiers = []
  ) {
    const mainClassName = 'product-count-button';

    const classModifiersList = classModifiers
      .map((modifier) =>
        !classModifiers.length ? '' : `${mainClassName}--${modifier}`
      )
      .join(' ');

    const fullClassName =
      `${classPositioning} ${mainClassName} ${classModifiersList}`.trim();

    this.buttonElement = document.createElement('button');
    this.buttonElement.classList.add(fullClassName);

    this.buttonElement.innerHTML = this.#getIcon(icon);

    return this.buttonElement;
  }
}
