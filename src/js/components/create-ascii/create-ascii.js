import { template } from './create-ascii-template.js'

customElements.define('create-ascii',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {

      /**
     * @private
     * @type {HTMLInputElement}
     * Reference to the nickname form element.
     */
      #name
    
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#name = this.shadowRoot.querySelector('name-form')
    }
        
    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#name.addEventListener('nameSubmitted', this.updatePage.bind(this))

    }
    
    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#name.removeEventListener('nameSubmitted', this.updatePage.bind(this))
    }

    updatePage(event) {
      console.log(event.detail.name)
    }
  })