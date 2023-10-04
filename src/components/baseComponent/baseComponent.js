export default class Component {
  /**
   * @callback getValue
   * @return {any} value
   */
  /**
   * @callback setValue
   * @param {any} newValue - The new value to set the state to
   */
  /**
   * useState
   *
   * @param {any} defaultValue - The default value for the state
   * @return {[getValue, setValue]} - An array containing the getter and setter functions for the state
   */
  useState(defaultValue) {
    let value = defaultValue;

    const getValue = () => value;

    const setValue = (newValue) => {
      if (value === newValue) return;
      value = newValue;
      this.render();
    };
    return [getValue, setValue];
  }

  render() {}
}
