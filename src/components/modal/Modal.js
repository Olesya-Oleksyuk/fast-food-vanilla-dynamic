import Store from '../../store/store';
import { capitalize, html } from '../../utils/utils';
import { Component } from '../baseComponent/baseComponent';
import ButtonControl from '../buttons/control/Control';
import ProductViewComponent from '../productView/productView';
import {
  EDITING_HEADERS_STEPS,
  EDITING_NAV_STEPS,
  EDITING_NAV_STEPS_DICTIONARY,
} from './constants';
import './style.css';

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
   * store: Store,
   * onCloseModal: Function
   * }} obj product modal data
   * @return ProductModalComponent
   */
  constructor(obj) {
    super();
    this.containerElement = obj.containerElement;
    this.store = obj.store;
    this.onCloseModal = obj.onCloseModal;
    this.productSupplements = this.store.getState().productSupplements;
    this.useInternalState();
    this.stepMapper = this.createStepMapper();

    this.buildDOMElements();

    this.render();
    this.addEventListeners();
  }

  useInternalState() {
    const [getStep, setStep] = this.useState(Object.keys(EDITING_NAV_STEPS)[0]);
    this.getStep = getStep;
    this.setStep = setStep;

    const [getIsClosed, setIsClosed] = this.useState(false);
    this.getIsClosed = getIsClosed;
    this.setIsClosed = setIsClosed;
  }

  createStepMapper() {
    function getStepName(key) {
      return EDITING_NAV_STEPS_DICTIONARY[key];
    }

    return { getStepName };
  }

  buildDOMElements() {
    this.modalContainerElement = document.createElement('div');
    this.modalContainerElement.classList.add('product-modal__container');
    this.containerElement.appendChild(this.modalContainerElement);
    this.modalContainerElement.appendChild(this.buildHeader());
    this.modalContainerElement.appendChild(this.buildContent());
    this.modalContainerElement.appendChild(this.buildFooter());
  }

  addEventListeners() {
    this.closeModalButton = this.containerElement.querySelector(
      '.product-modal__close-button'
    );

    this.closeModalButton.addEventListener('click', () => {
      this.onCloseModal();
    });
  }

  buildHeader() {
    const modalHeaderElement = document.createElement('header');
    modalHeaderElement.classList.add('product-modal__header');

    const headerTitleElement = document.createElement('h2');
    modalHeaderElement.appendChild(headerTitleElement);
    modalHeaderElement.appendChild(this.buildCloseButton());
    return modalHeaderElement;
  }

  renderHeader() {
    const modalHeaderElement = this.modalContainerElement.querySelector(
      '.product-modal__header'
    );

    const headerTitle = modalHeaderElement.querySelector('h2');
    headerTitle.innerText = '';
    headerTitle.innerText = capitalize(EDITING_HEADERS_STEPS[this.getStep()]);

    // modalHeaderElement.appendChild(headerTitle);
    // modalHeaderElement.innerHTML = '';
    // modalHeaderElement.innerHTML = html`
    //   <h2>${capitalize(EDITING_HEADERS_STEPS[this.getStep()])}</h2>
    //   <button type="button" class="product-modal__close-button">Close</button>
    // `;
  }

  buildCloseButton() {
    // const closeModalButton = document.createElement('button');
    // closeModalButton.classList.add('product-modal__close-button');

    const crossButton = ButtonControl.render({
      icon: 'x-mark',
      classBlockName: 'close-button',
      classPositioning: 'product-modal__close-button',
    });

    // closeModalButton.innerText = 'Close';
    return crossButton;
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

    this.modalContentElement.appendChild(this.navStepElement);

    this.modalOptionsSection = document.createElement('form');
    this.modalOptionsSection.classList.add('product-modal-options');

    for (let [key, value] of Object.entries(EDITING_NAV_STEPS)) {
      const modalFieldset = document.createElement('fieldset');
      modalFieldset.classList.add('options-fieldset');

      modalFieldset.setAttribute('name', value);
      if (key === this.getStep()) {
        modalFieldset.classList.add('options-fieldset--active');
      }

      const optionList = document.createElement('ul');
      optionList.classList.add('options-fieldset__list');

      const isLastStep = key === Object.keys(EDITING_NAV_STEPS).pop();
      if (!isLastStep) {
        Object.entries(this.productSupplements[value]).forEach(
          ([item, value]) => {
            const optionElement = document.createElement('li');
            optionElement.classList.add('options-fieldset__item');
            new ProductViewComponent({
              containerElement: optionElement,
              product: value,
              variant: 'short',
            });

            optionList.appendChild(optionElement);
          }
        );
      }

      modalFieldset.appendChild(optionList);
      this.modalOptionsSection.appendChild(modalFieldset);
    }

    this.modalContentElement.appendChild(this.modalOptionsSection);
    return this.modalContentElement;
  }

  buildNavigationPanel() {
    if (!this.modalContentElement) return;

    this.navStepElement = document.createElement('nav');
    const navStepListElement = document.createElement('ul');
    navStepListElement.classList.add('product-modal-nav__list');

    const stepIds = Object.keys(EDITING_NAV_STEPS);

    stepIds.forEach((id, index) => {
      const isFirstStep = index === 0;
      navStepListElement.appendChild(
        this.buildNavigationStep(
          id,
          this.stepMapper.getStepName(EDITING_NAV_STEPS[id]),
          isFirstStep
        )
      );
    });

    this.modalContentElement.innerHTML = '';
    this.navStepElement.appendChild(navStepListElement);
    return this.navStepElement;
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
      const isSameSelected =
        event.currentTarget.classList.contains(activeItemClass);
      if (isSameSelected) return;
      const prevSelectedItem = this.navStepElement.querySelector(
        `.${activeItemClass}`
      );

      prevSelectedItem.classList.remove(activeItemClass);
      itemElement.classList.add(activeItemClass);
      this.setStep(id);
    });

    return itemElement;
  }

  renderOptionsScreen() {
    if (!this.modalContentElement) return;

    // this.navStepListElement = document.createElement('section');
    // this.navStepListElement.classList.add('product-modal-options');

    for (const [id, name] of Object.entries(EDITING_NAV_STEPS)) {
      this.navStepElement.appendChild(
        this.buildNavigationStep(id, name, this.getStep() === id)
      );
    }

    // this.modalContentElement.innerHTML = '';
    this.modalContentElement.appendChild(this.navStepListElement);
  }

  render() {
    // this.renderOptionsScreen();
    // this.containerElement.innerHTML = '';
    this.modalOptionsSection
      .querySelector('.options-fieldset--active')
      .classList.remove('options-fieldset--active');

    this.modalOptionsSection[EDITING_NAV_STEPS[this.getStep()]].classList.add(
      'options-fieldset--active'
    );

    this.renderHeader();
  }
}
