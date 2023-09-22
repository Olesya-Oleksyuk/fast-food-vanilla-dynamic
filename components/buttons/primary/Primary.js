'use strict';
/**
 * Button Primary component. Uses positioning and modifier classes to adjust its view.
 */
class ButtonPrimary {
  /**
   * @param {string} text button text
   * @param {string} classPositioning class to adjust positioning
   * @param {string[]} classModifiers modifier names to adjust button appearance
   * @return string
   */
  static render(text, classPositioning, classModifiers) {
    const className = 'button-primary';
    const classModifiersList = classModifiers
      .map((modifier) => `${className}--${modifier}`)
      .join(' ');

    return html`
      <button
        class="${classPositioning} ${className} ${classModifiersList}"
        type="submit"
      >
        ${text}
      </button>
    `;
  }
}
