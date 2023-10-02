import Store from '../../store/store';
import { Component, html } from '../../utils/utils';
import { EDITING_NAV_STEPS } from './constants';

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
    this.useInternalState();

    this.buildDOMElements();

    this.render();
  }

  useInternalState() {
    const [getStep, setStep] = this.useState(Object.keys(EDITING_NAV_STEPS)[0]);
    this.getStep = getStep;
    this.setStep = setStep;
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
    this.modalContentElement = document.createElement('div');
    this.modalContentElement.classList.add('product-modal__content');
    this.buildNavigationPanel();

    return this.modalContentElement;
  }

  buildNavigationPanel() {
    if (!this.modalContentElement) return;

    this.navStepListElement = document.createElement('ul');
    this.navStepListElement.classList.add('product-modal-nav__list');

    const stepIds = Object.keys(EDITING_NAV_STEPS);

    stepIds.forEach((id, index) => {
      const isFirstStep = index === 0;
      this.navStepListElement.appendChild(
        this.buildNavigationStep(id, EDITING_NAV_STEPS[id], isFirstStep)
      );
    });

    this.modalContentElement.innerHTML = '';
    this.modalContentElement.appendChild(this.navStepListElement);
  }

  buildNavigationStep(id, name, isActive = false) {
    const activeItemClass = 'product-modal-nav__item--active';

    const itemElement = document.createElement('li');
    itemElement.classList.add('product-modal-nav__item');
    if (isActive) {
      itemElement.classList.add(activeItemClass);
    }
    itemElement.innerText = name;
    itemElement.setAttribute('id', id);
    itemElement.addEventListener('click', (event) => {
      const isSameSelected = event.currentTarget.classList.contains(activeItemClass);
      if (isSameSelected) return;
      const prevSelectedItem = this.navStepListElement.querySelector(
        `.${activeItemClass}`
      );

      prevSelectedItem.classList.remove(activeItemClass);
      itemElement.classList.add(activeItemClass);
      this.setStep(id);
    });

    return itemElement;
  }

  render() {
    // this.renderContent();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.modalContainerElement);
  }
}
