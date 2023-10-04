import { composeClassList, html } from "../../../utils/utils";
import "./style.css";

/**
 * Button Primary component. Uses positioning and modifier classes to adjust its view.
 */
export default class ButtonPrimary {
  /**
   * @param {string} text button text
   * @param {string} classPositioning class to adjust positioning
   * @param {string[]} classModifiers modifier names to adjust button appearance
   * @return string
   */
  static render(text, classPositioning, classModifiers) {
    const classBlockName = "button-primary";

    const fullClassSelectorsString = composeClassList({
      classBlockName,
      classModifiers,
      classPositioning,
    });

    return html`
      <button class="${fullClassSelectorsString}" type="submit">${text}</button>
    `;
  }
}
