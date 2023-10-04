import Store from "../../store/store";
import { capitalize } from "../../utils/utils";
import Component from "../baseComponent/baseComponent";
import ButtonControl from "../buttons/control/Control";
import ProductViewComponent from "../productView/productView";
import {
  EDITING_HEADERS_STEPS,
  EDITING_NAV_STEPS,
  EDITING_NAV_STEPS_DICTIONARY,
  radiosSteps,
} from "./constants";
import "./style.css";

/**
 * Product Modal component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
export default class ProductModalComponent extends Component {
  static createStepMapper() {
    function getStepName(key) {
      return EDITING_NAV_STEPS_DICTIONARY[key];
    }

    return { getStepName };
  }

  static buildCloseButton() {
    const crossButton = ButtonControl.render({
      icon: "x-mark",
      classBlockName: "close-button",
      classPositioning: "product-modal__close-button",
    });

    return crossButton;
  }

  static buildHeader() {
    const modalHeaderElement = document.createElement("header");
    modalHeaderElement.classList.add("product-modal__header");

    const headerTitleElement = document.createElement("h2");
    modalHeaderElement.appendChild(headerTitleElement);
    modalHeaderElement.appendChild(ProductModalComponent.buildCloseButton());
    return modalHeaderElement;
  }

  static buildFooter() {
    const modalFooterElement = document.createElement("footer");
    modalFooterElement.classList.add("product-modal__footer");

    return modalFooterElement;
  }

  static buildOptionCard(inputValue, inputName, product, type = "radio") {
    const labelElement = document.createElement("label");

    const inputElement = document.createElement("input");
    inputElement.type = type;
    inputElement.value = inputValue;

    inputElement.name = inputName;
    inputElement.classList.add("option-card-input--hidden");

    labelElement.appendChild(inputElement);

    const cardInput = document.createElement("div");

    cardInput.classList.add("options-fieldset__item");

    new ProductViewComponent({
      containerElement: cardInput,
      product,
      variant: "short",
    });

    labelElement.appendChild(cardInput);
    return labelElement;
  }

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

    this.store.subscribeValue("modal", (modal) => {
      const currProductInModal = this.store.getState().currentProductInModal;
      const productInModalInfo = modal[currProductInModal];
      if (!productInModalInfo) return;

      this.renderFooter(productInModalInfo.price);
    });

    this.onCloseModal = obj.onCloseModal;
    this.productSupplements = this.store.getState().productSupplements;
    this.useInternalState();
    this.stepMapper = ProductModalComponent.createStepMapper();

    this.buildDOMElements();

    this.render();
    this.addEventListeners();
  }

  useInternalState() {
    const [getStep, setStep] = this.useState(Object.keys(EDITING_NAV_STEPS)[0]);
    this.getStep = getStep;
    this.setStep = setStep;
  }

  buildDOMElements() {
    this.modalContainerElement = document.createElement("div");
    this.modalContainerElement.classList.add("product-modal__container");
    this.containerElement.appendChild(this.modalContainerElement);
    this.modalContainerElement.appendChild(ProductModalComponent.buildHeader());
    this.modalContainerElement.appendChild(this.buildContent());
    this.modalContainerElement.appendChild(ProductModalComponent.buildFooter());
  }

  addEventListeners() {
    this.closeModalButton = this.containerElement.querySelector(
      ".product-modal__close-button",
    );

    this.closeModalButton.addEventListener("click", () => {
      this.onCloseModal();
    });
  }

  buildContent() {
    this.modalContentElement = document.createElement("div");
    this.modalContentElement.classList.add("product-modal__content");
    this.buildNavigationPanel();

    this.modalContentElement.appendChild(this.navStepElement);

    this.modalOptionsSection = document.createElement("form");
    this.modalOptionsSection.classList.add("product-modal-options");

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(EDITING_NAV_STEPS)) {
      const inputsType = radiosSteps.includes(key) ? "radio" : "checkbox";
      const currentStepName = value;
      const activeStep = this.getStep();

      const modalFieldset = document.createElement("fieldset");
      modalFieldset.classList.add("options-fieldset");

      modalFieldset.setAttribute("id", key);

      if (key === activeStep) {
        modalFieldset.classList.add("options-fieldset--active");
      }

      const optionList = document.createElement("div");
      optionList.classList.add("options-fieldset__list");

      const isLastStep = key === Object.keys(EDITING_NAV_STEPS).pop();
      if (!isLastStep) {
        Object.entries(this.productSupplements[value]).forEach(
          ([item, supplement]) => {
            const optionCard = ProductModalComponent.buildOptionCard(
              item,
              currentStepName,
              supplement,
              inputsType,
            );
            optionList.appendChild(optionCard);
          },
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

    this.navStepElement = document.createElement("nav");
    const navStepListElement = document.createElement("ul");
    navStepListElement.classList.add("product-modal-nav__list");

    const stepIds = Object.keys(EDITING_NAV_STEPS);

    stepIds.forEach((id, index) => {
      const isFirstStep = index === 0;
      navStepListElement.appendChild(
        this.buildNavigationStep(
          id,
          this.stepMapper.getStepName(EDITING_NAV_STEPS[id]),
          isFirstStep,
        ),
      );
    });

    this.modalContentElement.innerHTML = "";
    this.navStepElement.appendChild(navStepListElement);
    // eslint-disable-next-line consistent-return
    return this.navStepElement;
  }

  buildNavigationStep(id, name, isActive = false) {
    const activeItemClass = "product-modal-nav__item--active";

    const itemElement = document.createElement("li");
    itemElement.classList.add("product-modal-nav__item");
    if (isActive) {
      itemElement.classList.add(activeItemClass);
    }
    itemElement.innerText = name;
    itemElement.addEventListener("click", (event) => {
      const isSameSelected =
        // @ts-ignore
        event.currentTarget.classList.contains(activeItemClass);
      if (isSameSelected) return;
      const prevSelectedItem = this.navStepElement.querySelector(
        `.${activeItemClass}`,
      );

      prevSelectedItem.classList.remove(activeItemClass);
      itemElement.classList.add(activeItemClass);

      this.modalOptionsSection
        .querySelector(".options-fieldset--active")
        .classList.remove("options-fieldset--active");

      this.setStep(id);
    });

    return itemElement;
  }

  renderHeader() {
    const modalHeaderElement = this.modalContainerElement.querySelector(
      ".product-modal__header",
    );

    const headerTitle = modalHeaderElement.querySelector("h2");
    headerTitle.innerText = "";
    headerTitle.innerText = capitalize(EDITING_HEADERS_STEPS[this.getStep()]);
  }

  /**
   * Renders the footer of the modal with the given price.
   *
   * @param {number} price - The price to be displayed in the footer
   */
  renderFooter(price) {
    const modalFooterElement = this.modalContainerElement.querySelector(
      ".product-modal__footer",
    );

    modalFooterElement.innerText = "";
    modalFooterElement.innerText = `Итого: ${price} руб.`;
  }

  render() {
    document
      .getElementById(this.getStep())
      .classList.add("options-fieldset--active");

    this.renderHeader();
  }
}
