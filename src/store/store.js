export default class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState || this.reducer();
    this.listeners = [];
    this.valueListeners = [];
  }

  getState() {
    return this.state;
  }

  /**
   * Adds a listener to the subscribers list. Listener to any store changes
   *
   * @param {function} listener - The listener function to be added.
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Adds a value and a listener to the list of value listeners.
   * Listener to the specific value change and when it has been changed =>
   * pass in the new value as an argument to the listener function
   *
   * @param {any} value - The value to be added.
   * @param {function} listener - The listener to be added.
   */
  subscribeValue(value, listener) {
    this.valueListeners.push({ value, listener });
  }

  /**
   *  @typedef {{ type: string; payload: string; }} Action
   */

  /**
   * Dispatches an action to update the state of the object.
   * And triggers the listeners
   *
   * @param {Action} action - the action to be dispatched
   */
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
    this.valueListeners.forEach(({ value, listener }) =>
      listener(this.state[value] || null)
    );
  }
}
