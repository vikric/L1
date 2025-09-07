import { template } from './name-form-template.js'

customElements.define('name-form',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLFormElement}
     * A reference to the form element in the shadow DOM.
     */
    #form

    /**
     * @private
     * @type {HTMLInputElement}
     * A reference to the input element for the nickname.
     */
    #name

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#form = this.shadowRoot.querySelector('form')
      this.#name = this.shadowRoot.querySelector('#name')
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#form.addEventListener('submit', (event) => this.handleSubmit(event))
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', this.handleSubmit)
    }

    /**
     * Handles the form submission event, prevents default behavior, dispatches a custom event with the entered name, and resets the form.
     *
     * @param {Event} event - The submit event triggered by the form.
     */
    handleSubmit (event) {
      event.preventDefault()
      const name = this.#name.value
      this.dispatchEvent(new CustomEvent('nameSubmitted', {
        detail: { name }
      }))
      this.#form.reset()
    }
  })
