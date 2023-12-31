import { composeClassList, html } from "../../../utils/utils";
import "./style.css";

/**
 * Button Control component. Uses positioning and modifier classes to adjust its view.
 */
export default class ButtonControl {
  /**
   * @param {Icon} icon - The allowed type of the button icon
   * @return string
   */
  static #getIcon(icon) {
    if (icon === "plus") return html`<i class="fa-solid fa-plus"></i>`;
    if (icon === "minus") return html`<i class="fa-solid fa-minus"></i>`;
    if (icon === "x-mark") return html`<i class="fa-solid fa-xmark"></i>`;
    return html`<></>`;
  }
  /**
   * @typedef {"plus" | "minus" | "x-mark"} Icon
   */

  /**
   * Renders the object as a button element with the specified icon, disabled state, positioning class, and modifiers.
   *
   * @param {Object} obj - The object containing the properties for rendering the button.
   * @param {Icon} obj.icon - The icon to be displayed on the button.
   * @param {boolean} [obj.isDisabled=false] - Indicates whether the button is disabled.
   * @param {string} obj.classBlockName='' - The block class for the button.
   * @param {string} [obj.classPositioning=''] - The positioning class for the button.
   * @param {Array<string>} [obj.classModifiers=[]] - The list of class modifiers for the button.
   * @return {HTMLElement} - The rendered button element.
   */
  static render(obj) {
    const {
      icon,
      isDisabled = false,
      classBlockName,
      classPositioning = "",
      classModifiers = [],
    } = obj;

    const fullClassSelectorsString = composeClassList({
      classBlockName,
      classModifiers,
      classPositioning,
    });

    this.buttonElement = document.createElement("button");
    this.buttonElement.setAttribute("class", fullClassSelectorsString);

    this.buttonElement.innerHTML = this.#getIcon(icon);

    if (isDisabled) {
      this.buttonElement.setAttribute("disabled", "");
    }

    return this.buttonElement;
  }
}
