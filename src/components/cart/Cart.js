'use strict';

import { html } from '../../utils/utils';
import './style.css';
import BackgroundPlate from '/src/public/i/others/cart-logo.png';
 
/**
 * Cart component.
 */
export default class CartComponent {
  /**
   * @param {{
   *  containerElement: Node }} obj cart data
   * @return CartComponent
   */
  constructor(obj) {
    
    this.containerElement = obj.containerElement;
    this.buildDOMElements();
    this.render();
  }

  buildDOMElements() {
    this.cartElement = document.createElement('div');
    this.cartElement.classList.add('cart');
  }


  renderCartBody() {
    if (!this.cartElement) return;
    this.cartElement.innerHTML = html`
      <h2 class="cart__title">
        <span class="cart-logo">
          <img src="${BackgroundPlate}" alt="Корзина" />
        </span>
        <span class="cart-title__text">Корзина</span>
      </h2>
      <div class="cart__content">
        <table class="cart-table">
          <tr class="cart-table__header">
            <th class="cart-table__name">Название</th>
            <th class="cart-table__count">Количество</th>
          </tr>
        </table>
        <span class="cart-table__cart-overall">
          Итого:&nbsp;<b class="cart-overall__price">0</b>&nbsp;руб.
        </span>
        <button
          type="submit"
          class="cart__checkout-button button-primary button-primary--grey"
        >
          Оформить заказ
        </button>
      </div>
    `;
  }

  render() {
    this.renderCartBody();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.cartElement);
  }
}
