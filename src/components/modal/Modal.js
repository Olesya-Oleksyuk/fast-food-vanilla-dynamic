import {
  setProductCountInModal,
  updateProductInModal,
} from "../../store/actions";
import Store from "../../store/store";
import {
  capitalize,
  getElementBySelector,
  getObjectFromFormData,
  html,
} from "../../utils/utils";
import Component from "../baseComponent/baseComponent";
import ButtonControl from "../buttons/control/Control";
import ButtonPrimary from "../buttons/primary/Primary";
import ProductViewComponent from "../productView/productView";
import {
  EDITING_HEADERS_STEPS,
  EDITING_NAV_STEPS,
  EDITING_NAV_STEPS_DICTIONARY,
  radiosSteps,
} from "./constants";
import "./style.css";
import CountPanelComponent from "../countPanel/CountPanel";

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
      if (key === "ready") {
        return `${EDITING_NAV_STEPS_DICTIONARY[key]}!`;
      }
      return EDITING_NAV_STEPS_DICTIONARY[key];
    }

    return { getStepName };
  }

  static createSupplementMapper() {
    function getSupplementName(supplementType, supplementValue) {
      return this.productSupplements[supplementType][supplementValue].name;
    }

    return { getSupplementName };
  }

  static buildCloseButton() {
    const crossButton = ButtonControl.render({
      icon: "x-mark",
      classBlockName: "close-button",
      classPositioning: "product-modal__close-button",
    });

    return crossButton;
  }

  /**
   * @typedef {"back" | "forward"} NavButtonType
   */
  /**
   * @param {NavButtonType} type
   * @param {Boolean} isSingle
   * @returns {null|string}
   */
  // type = 'forward' | 'plus'
  static buildNavigationButton(type, isSingle = true) {
    const getModifiers = (buttonType) => {
      const modifiers = ["orange"];
      if (isSingle) {
        modifiers.push(`single-${buttonType}`);
        return modifiers;
      }
      return modifiers;
    };

    if (type === "back") {
      return ButtonPrimary.render(
        "< Назад",
        "product-modal__back-button",
        getModifiers(type),
      );
    }
    if (type === "forward") {
      return ButtonPrimary.render(
        "Вперед >",
        "product-modal__forward-button",
        getModifiers(type),
      );
    }
    return null;
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

  static buildOptionCard(inputValue, inputName, supplement, type = "radio") {
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
      product: supplement,
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
    console.log(this.store);
    this.onCloseModal = obj.onCloseModal;
    this.productSupplements = this.store.getState().productSupplements;
    this.currProductInModal = this.store.getState().currentProductInModal;
    this.useInternalState();

    this.store.subscribeValue("modal", () => {
      this.renderFooter();
    });

    this.stepMapper = ProductModalComponent.createStepMapper();
    this.supplementMapper =
      ProductModalComponent.createSupplementMapper().getSupplementName;
    this.buildDOMElements();
    this.render();
  }

  getStepNumber() {
    return Number(this.getStep().slice(-1)) - 1;
  }

  /**
   * @param {Object} components - selected components per product
   */
  calculateComponentsCost(components) {
    const productComponentsPrice = Object.entries(components).reduce(
      (overallAcc, curr) => {
        const [component, componentTypeValue] = curr;
        if (Array.isArray(componentTypeValue)) {
          const componentsPrice = componentTypeValue.reduce(
            (acc, componentType) => {
              const currentComponentTypePrice =
                this.productSupplements[component][componentType].price;
              return currentComponentTypePrice + acc;
            },
            0,
          );
          return componentsPrice + overallAcc;
        }
        const currentComponentTypePrice =
          this.productSupplements[component][componentTypeValue].price;
        return currentComponentTypePrice + overallAcc;
      },
      0,
    );

    return productComponentsPrice;
  }

  useInternalState() {
    const [getStep, setStep] = this.useState(Object.keys(EDITING_NAV_STEPS)[0]);
    this.getStep = getStep;
    this.setStep = setStep;

    const [getProductCount, setProductCount] = this.useState(
      this.store.getState().modal[this.currProductInModal].count,
    );
    this.getProductCount = getProductCount;
    this.setProductCount = setProductCount;
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
    const productModalForm = this.containerElement.querySelector(
      ".product-modal-options",
    );

    productModalForm.addEventListener("change", () => {
      const newFormData = getObjectFromFormData(productModalForm);
      const currProductInModal = this.store.getState().currentProductInModal;
      this.store.dispatch(
        updateProductInModal({
          productName: currProductInModal,
          productData: newFormData,
        }),
      );
    });

    const closeModalButton = this.containerElement.querySelector(
      ".product-modal__close-button",
    );

    closeModalButton.addEventListener("click", () => {
      this.onCloseModal(this.modalContainerElement);
    });

    const forwardStepButton = this.containerElement.querySelector(
      ".product-modal__forward-button",
    );

    if (forwardStepButton) {
      forwardStepButton.addEventListener("click", () => {
        const nextStepNumber = Number(this.getStep().slice(-1)) + 1;
        if (nextStepNumber > Object.keys(EDITING_NAV_STEPS).length) return;
        this.modalOptionsSection
          .querySelector(".options-fieldset--active")
          .classList.remove("options-fieldset--active");
        this.setStep(`edit-nav-step-${nextStepNumber}`);
      });
    }

    const backStepButton = this.containerElement.querySelector(
      ".product-modal__back-button",
    );

    if (backStepButton) {
      backStepButton.addEventListener("click", () => {
        const nextStepNumber = Number(this.getStep().slice(-1)) - 1;
        if (nextStepNumber < 1) return;
        this.modalOptionsSection
          .querySelector(".options-fieldset--active")
          .classList.remove("options-fieldset--active");
        this.setStep(`edit-nav-step-${nextStepNumber}`);
      });
    }
  }

  buildContent() {
    this.modalContentElement = document.createElement("div");
    this.modalContentElement.classList.add("product-modal__content");
    this.buildNavigationPanel();

    this.modalContentElement.appendChild(this.navStepElement);

    this.modalOptionsSection = document.createElement("form");
    this.modalOptionsSection.classList.add("product-modal-options");

    Object.entries(EDITING_NAV_STEPS).forEach(([key, value]) => {
      const inputType = radiosSteps.includes(key) ? "radio" : "checkbox";
      const currentStepName = value;
      const activeStep = this.getStep();

      const modalFieldset = document.createElement("fieldset");
      modalFieldset.classList.add("options-fieldset");

      modalFieldset.setAttribute("id", key);

      if (key === activeStep) {
        modalFieldset.classList.add("options-fieldset--active");
      }

      const isLastStep = key === Object.keys(EDITING_NAV_STEPS).pop();
      if (!isLastStep) {
        const optionList = this.renderComponentOptionsList(
          currentStepName,
          inputType,
        );
        modalFieldset.appendChild(optionList);
      }
      this.modalOptionsSection.appendChild(modalFieldset);
    });

    this.modalContentElement.appendChild(this.modalOptionsSection);
    return this.modalContentElement;
  }

  buildNavigationPanel() {
    if (!this.modalContentElement) return;

    this.navStepElement = document.createElement("nav");
    this.navStepElement.classList.add("product-modal-nav");
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

    this.modalBackForwardNav = document.createElement("div");
    this.modalBackForwardNav.classList.add("product-modal-nav__back-forward");
    this.navStepElement.appendChild(this.modalBackForwardNav);
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

  renderFinalProductResult() {
    const renderPhoto = () => {
      const product = this.store.getState().modal[this.currProductInModal];
      const resultPhoto = document.createElement("div");
      resultPhoto.classList.add("result__photo");

      new ProductViewComponent({
        containerElement: resultPhoto,
        product,
        variant: "photo-only",
      });
      return resultPhoto;
    };

    const renderInfo = () => {
      const getSupplementsString = (product, supplementType) => {
        const getSupplementsList = (type, supplementValue) => {
          if (Array.isArray(supplementValue)) {
            return supplementValue
              .map((value) => capitalize(this.supplementMapper(type, value)))
              .join(", ");
          }
          return capitalize(this.supplementMapper(type, supplementValue));
        };

        const supplementValue = product.components[supplementType];
        return supplementValue
          ? getSupplementsList(supplementType, supplementValue)
          : "Нет";
      };

      const product = this.store.getState().modal[this.currProductInModal];
      const resultInfo = document.createElement("div");
      resultInfo.classList.add("result__info");

      const infoMarkup = html`
        <p class="result__info-header">Ваш сендвич готов!</p>
        <div class="result__info-supplements">
          ${Object.keys(EDITING_NAV_STEPS_DICTIONARY)
            .slice(0, -1)
            .map((supplementType) => {
              return html`
                <p class="result__info-supplement-item">
                  ${capitalize(EDITING_NAV_STEPS_DICTIONARY[supplementType])}:
                  ${getSupplementsString(product, supplementType)}
                </p>
              `;
            })
            .join("")}
        </div>
        <p class="result__info-name">${product.name}</p>
      `;
      resultInfo.innerHTML = infoMarkup;
      return resultInfo;
    };
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("options-fieldset__result");
    resultContainer.appendChild(renderPhoto());
    resultContainer.appendChild(renderInfo());

    return resultContainer;
  }

  renderComponentOptionsList(productSupplementType, inputType) {
    const optionList = document.createElement("div");
    optionList.classList.add("options-fieldset__list");

    Object.entries(this.productSupplements[productSupplementType]).forEach(
      ([item, supplement]) => {
        const optionCard = ProductModalComponent.buildOptionCard(
          item,
          productSupplementType,
          supplement,
          inputType,
        );
        optionList.appendChild(optionCard);
      },
    );

    return optionList;
  }

  renderHeader() {
    const modalHeaderElement = this.modalContainerElement.querySelector(
      ".product-modal__header",
    );

    const headerTitle = modalHeaderElement.querySelector("h2");
    headerTitle.innerText = "";
    headerTitle.innerText = capitalize(EDITING_HEADERS_STEPS[this.getStep()]);
  }

  renderBackForwardNav() {
    const modalHeaderElement = this.modalContainerElement.querySelector(
      ".product-modal-nav__back-forward",
    );

    modalHeaderElement.innerHTML = "";

    if (this.getStep() === "edit-nav-step-1") {
      modalHeaderElement.innerHTML =
        ProductModalComponent.buildNavigationButton("forward", true);
      return;
    }

    if (this.getStep() === "edit-nav-step-6") {
      modalHeaderElement.innerHTML =
        ProductModalComponent.buildNavigationButton("back", true);
      return;
    }

    modalHeaderElement.innerHTML =
      ProductModalComponent.buildNavigationButton("back", false) +
      ProductModalComponent.buildNavigationButton("forward", false);
  }

  renderFooter() {
    const { modal } = this.store.getState();
    this.currProductInModal = this.store.getState().currentProductInModal;
    const productInModalInfo = modal[this.currProductInModal];
    if (!productInModalInfo) return;

    const componentsCost = this.calculateComponentsCost(
      productInModalInfo.components,
    );

    this.renderFooterInfo(
      productInModalInfo.price * productInModalInfo.count + componentsCost,
    );
  }

  /**
   * Renders the footer of the modal with the given price.
   *
   * @param {number} price - The price to be displayed in the footer
   */
  renderFooterInfo(price) {
    const overallElement = (isResultStep) => {
      const totalPriceElement = document.createElement("span");
      totalPriceElement.classList.add("product-modal__overall");
      totalPriceElement.innerText = `${
        isResultStep ? "Цена:" : "Итого:"
      } ${price} руб.`;
      return totalPriceElement;
    };

    const modalFooterElement = this.modalContainerElement.querySelector(
      ".product-modal__footer",
    );

    modalFooterElement.innerHTML = "";

    const footerWrapper = document.createElement("div");
    footerWrapper.classList.add("product-modal__footer-wrapper");

    const isResultStep = this.getStep() === "edit-nav-step-6";

    if (isResultStep) {
      const incrementProductCount = () => {
        this.store.dispatch(
          setProductCountInModal({
            productName: this.currProductInModal,
            count: this.getProductCount() + 1,
          }),
        );
        this.setProductCount(this.getProductCount() + 1);
      };

      const decrementProductCount = () => {
        this.store.dispatch(
          setProductCountInModal({
            productName: this.currProductInModal,
            count: this.getProductCount() - 1,
          }),
        );
        this.setProductCount(this.getProductCount() - 1);
      };

      new CountPanelComponent({
        containerElement: modalFooterElement,
        count: this.getProductCount(),
        onIncrement: incrementProductCount,
        onDecrement: decrementProductCount,
      });

      const productToCartButtonMarkup = ButtonPrimary.render(
        "В корзину",
        "product-card-info__to-cart-button",
        ["yellow"],
      );

      footerWrapper.insertAdjacentHTML("beforeend", productToCartButtonMarkup);
    }

    footerWrapper.prepend(overallElement(isResultStep));
    modalFooterElement.appendChild(footerWrapper);
  }

  /**
   * Renders the navigation list
   *
   */
  renderNavigationList() {
    const activeItemSelector = "product-modal-nav__item--active";
    const navItemsNodeList = this.modalContainerElement.querySelectorAll(
      ".product-modal-nav__item",
    );

    const { element: prevSelectedNavItem } = getElementBySelector(
      navItemsNodeList,
      activeItemSelector,
    );
    prevSelectedNavItem.classList.remove(activeItemSelector);
    const currentSelectedNavItem = navItemsNodeList[this.getStepNumber()];
    currentSelectedNavItem.classList.add(activeItemSelector);
  }

  renderResultStep() {
    const resultFieldset = this.modalOptionsSection.querySelector(
      "#edit-nav-step-6.options-fieldset",
    );
    if (resultFieldset) {
      resultFieldset.innerHTML = "";
    }
    const resultContainer = this.renderFinalProductResult();
    resultFieldset.appendChild(resultContainer);
  }

  render() {
    document
      .getElementById(this.getStep())
      .classList.add("options-fieldset--active");

    this.renderHeader();
    this.renderFooter();
    this.renderBackForwardNav();
    this.renderNavigationList();
    this.renderResultStep();
    this.addEventListeners();
  }
}
