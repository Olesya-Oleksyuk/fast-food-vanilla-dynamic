import Store from '../../store/store';
import { Component, html } from '../../utils/utils';

/**
 * Product Modal component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
export default class ProductModalComponent extends Component {
  /**
   * @param {{
   * containerElement: Element,
   * store: Store
   * }} obj product modal data
   * @return ProductModalComponent
   */
  constructor(obj) {
    super();
    this.containerElement = obj.containerElement;
    this.store = obj.store;

    this.buildDOMElements();
    this.render();
  }

  buildDOMElements() {
    this.modalContainerElement = document.createElement('div');
    this.modalContainerElement.classList.add('product-modal__container');
    this.containerElement.appendChild(this.modalContainerElement);
    this.modalContainerElement.appendChild(this.buildHeader());
    this.modalContainerElement.appendChild(this.buildContent());
    this.modalContainerElement.appendChild(this.buildFooter());
  }

  buildHeader() {
    const modalHeaderElement = document.createElement('header');
    modalHeaderElement.classList.add('product-modal__header');
    modalHeaderElement.innerHTML = html`
      <h2>Хедер</h2>
      <button type="button" class="product-modal__close-button">Close</button>
    `;

    return modalHeaderElement;
  }

  buildFooter() {
    const modalFooterElement = document.createElement('footer');
    modalFooterElement.classList.add('product-modal__footer');
    modalFooterElement.innerHTML = html`<span>в корзину</span>`;

    return modalFooterElement;
  }

  buildContent() {
    const modalContentElement = document.createElement('div');
    modalContentElement.classList.add('product-modal__content');

    return modalContentElement;
  }

  renderContent() {
    const modalContentElement = document.querySelector(
      'product-modal__content'
    );

    modalContentElement.innerHTML = html`
      <ul class="product-modal-nav__list">
        <li
          class="product-modal-nav__item product-modal-nav__item--active"
          id="edit-nav-step-1"
        >
          Размер
        </li>
        <li class="product-modal-nav__item" id="edit-nav-step-2">Хлеб</li>
        <li class="product-modal-nav__item" id="edit-nav-step-3">Овощи</li>
        <li class="product-modal-nav__item" id="edit-nav-step-4">Соусы</li>
        <li class="product-modal-nav__item" id="edit-nav-step-5">Начинка</li>
        <li class="product-modal-nav__item" id="edit-nav-step-6">Готово!</li>
      </ul>
    `;

    // this.containerElement.innerHTML = '';
    // this.containerElement.appendChild(this.productListElement);
  }

  render() {
    this.renderContent();
    // this.containerElement.innerHTML = '';
    // this.containerElement.appendChild(this.productListElement);
  }
}
