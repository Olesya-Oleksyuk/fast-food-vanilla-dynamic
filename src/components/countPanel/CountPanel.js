import "./style.css";
import { composeClassList, html } from "../../utils/utils";
import ButtonControl from "../buttons/control/Control";

/**
 * Count Panel component.
 */
export default class CountPanelComponent {
  /**
   * Renders the object as a button element with the specified icon, disabled state, positioning class, and modifiers.
   *
   * @param {Object} obj - Count Panel Component data
   * @param {Element} obj.containerElement
   * @param {number} obj.count
   * @param {Function} obj.onIncrement
   * @param {Function} obj.onDecrement
   * @param {string} [obj.classBlockName='product-card-info__count']
   * @param {string} [obj.classPositioning='']
   * @param {Array<string>} [obj.classModifiers=[]]
   * @return CountPanelComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.count = obj.count;
    this.onIncrement = obj.onIncrement;
    this.onDecrement = obj.onDecrement;

    this.fullContainerClass = composeClassList({
      classBlockName: obj.classBlockName || "product-card-info__count",
      classModifiers: obj.classModifiers,
      classPositioning: obj.classPositioning,
    });
    this.buildDOMElements();

    this.render(obj.onIncrement);
  }

  buildDOMElements() {
    this.controlPanelElement = document.createElement("div");
    this.controlPanelElement.classList.add(this.fullContainerClass);
    this.containerElement.appendChild(this.controlPanelElement);
  }

  renderPanel() {
    this.controlPanelElement.innerHTML = "";
    const isDecrementDisabled = this.count <= 1;
    const countButtonClass = "product-count-button";

    const incrementButton = ButtonControl.render({
      icon: "plus",
      classBlockName: countButtonClass,
    });

    const decrementButton = ButtonControl.render({
      icon: "minus",
      classBlockName: countButtonClass,
      isDisabled: isDecrementDisabled,
    });

    const panelMarkup = html`
      <label for="product-count" class="product-card-info__count-label"
        >Количество
      </label>
      <div class="count-control">
        <div class="count-control__decrement">${decrementButton.outerHTML}</div>
        <input
          placeholder="1"
          type="text"
          id="product-count"
          name="product-count"
          class="product-count-input"
          readonly
          value=${this.count}
        />
        <div class="count-control__increment">${incrementButton.outerHTML}</div>
      </div>
    `;
    this.controlPanelElement.innerHTML = panelMarkup;
  }

  addListeners() {
    this.containerElement
      .querySelector(".count-control__decrement")
      .addEventListener("click", () => {
        this.onDecrement();
      });
    this.containerElement
      .querySelector(".count-control__increment")
      .addEventListener("click", () => {
        this.onIncrement();
      });
  }

  render() {
    this.renderPanel();
    this.addListeners();
  }
}
