import { html } from "../../utils/utils";
import CartLogo from "../../public/i/others/cart-logo.png";
import ButtonPrimary from "../buttons/primary/Primary";
import { PRODUCT_CATEGORIES } from "../../store/constants";
import { categoriesDictionary } from "../productNav/constants";
import Store from "../../store/store";
import "./style.css";

/**
 * Cart component.
 */
export default class CartComponent {
  static composeProductName(name, category) {
    switch (category) {
      case PRODUCT_CATEGORIES.SANDWICHES:
        return `${name} (${
          categoriesDictionary[PRODUCT_CATEGORIES.SANDWICHES]
        })`;
      default:
        return `${name}`;
    }
  }

  /**
   * @param {{
   *  containerElement: Node,
   *  store: Store,
   *  }} obj cart data
   * @return CartComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.store = obj.store;

    this.buildDOMElements();
    this.render();
    this.store.subscribeValue("cart", () => {
      this.render();
    });

    this.addEventListeners();
  }

  buildDOMElements() {
    this.cartElement = document.createElement("div");
    this.cartElement.classList.add("cart");
    this.buildHeader();
    this.buildContent();
    this.buildOverallElement();
    this.buildToCheckoutButton();
    this.containerElement.appendChild(this.cartElement);
  }

  buildHeader() {
    this.header = document.createElement("h2");
    this.header.classList.add("cart__header");

    // prettier-ignore
    this.header.innerHTML = html`
      <span class="cart-logo">
        <img src=${CartLogo} alt="Корзина" />
      </span>
      <span class="cart-header__text">Корзина</span>`;

    this.cartElement.appendChild(this.header);
  }

  buildContent() {
    this.content = document.createElement("div");
    this.content.classList.add("cart__content");

    this.buildTable();
    this.cartElement.appendChild(this.content);
  }

  buildTable() {
    if (!this.content) return;
    const table = document.createElement("table");
    table.classList.add("cart-table");

    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    tableHeader.classList.add("cart-table__header");
    // prettier-ignore
    tableHeaderRow.innerHTML = html`
      <th class="cart-table__name">Название</th>
      <th class="cart-table__count">Количество</th>`;
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");
    tableBody.classList.add("cart-table__body");
    table.appendChild(tableBody);

    this.content.appendChild(table);
  }

  buildOverallElement() {
    if (!this.content) return;
    const overallElement = document.createElement("span");
    overallElement.classList.add("cart-table__cart-overall");

    // prettier-ignore
    overallElement.innerHTML = html`
      Итого:&nbsp;<b class="cart-overall__price">0</b>&nbsp;руб.`;
    this.content.appendChild(overallElement);
  }

  buildToCheckoutButton() {
    if (!this.content) return;

    const toCheckoutButtonMarkup = ButtonPrimary.render(
      "Оформить заказ",
      "cart__checkout-button",
      ["blue"],
      "cart__to-checkout",
    );

    this.content.insertAdjacentHTML("beforeend", toCheckoutButtonMarkup);
  }

  renderTable() {
    const tableBody = this.content.querySelector(".cart-table__body");
    tableBody.innerHTML = "";

    const { cartItems } = this.store.getState().cart;
    cartItems.forEach((product) => {
      const productRow = document.createElement("tr");
      productRow.classList.add("cart-table__product-row");
      // prettier-ignore
      productRow.innerHTML = html`
      <td class="cart-table__name">${CartComponent.composeProductName(product.name, product.category)}</td>
      <td class="cart-table__count">${product.count}</td>`;
      tableBody.appendChild(productRow);
    });
  }

  renderOverallElement() {
    const { totalPrice } = this.store.getState().cart;
    const overallNumber = this.content.querySelector(".cart-overall__price");
    overallNumber.innerText = "";
    overallNumber.innerText = totalPrice;
  }

  renderButton() {
    const { cartItems } = this.store.getState().cart;
    const toCheckoutButton =
      this.cartElement.querySelector("#cart__to-checkout");

    toCheckoutButton.disabled = !cartItems.length;
  }

  addEventListeners() {
    const toCheckoutButton =
      this.cartElement.querySelector("#cart__to-checkout");

    if (toCheckoutButton) {
      toCheckoutButton.addEventListener("click", () => {
        const orderData = this.store.getState().cart;
        console.log("Order data", orderData);
      });
    }
  }

  render() {
    this.renderOverallElement();
    this.renderTable();
    this.renderButton();
  }
}
