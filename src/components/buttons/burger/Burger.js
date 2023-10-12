import { composeClassList, html } from "../../../utils/utils";
import "./style.css";

/**
 * Button Burger component. Uses positioning and modifier classes to adjust its view.
 */
export default class ButtonBurgerComponent {
  /**
   * Renders the object as a button element with the specified icon, disabled state, positioning class, and modifiers.
   *
   * @param {Object} obj - The object containing the properties for rendering the button.
   * @param {boolean} [obj.isDisabled=false] - Indicates whether the button is disabled.
   * @param {string} [obj.classPositioning=''] - The positioning class for the button.
   * @param {Array<string>} [obj.classModifiers=[]] - The list of class modifiers for the button.
   * @return {HTMLElement} - The rendered button element.
   */
  static render(obj) {
    const { classPositioning = "", classModifiers = [] } = obj;

    const fullClassSelectorsString = composeClassList({
      classBlockName: "burger-button",
      classModifiers,
      classPositioning,
    });

    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", fullClassSelectorsString);

    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("burger-button__wrapper");

    wrapperElement.innerHTML = html`
      <div>
        <span class="burger-button__line"></span>
        <span class="burger-button__line"></span>
        <span class="burger-button__line"></span>
        <span class="burger-button__line"></span>
      </div>
    `;

    buttonElement.appendChild(wrapperElement);
    return buttonElement;
  }
}
