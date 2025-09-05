import { template } from './create-ascii-template.js'
import figlet from 'figlet'
import standard from "figlet/importable-fonts/Standard.js";

customElements.define('create-ascii',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {

    /**
     * @private
     * @type {HTMLInputElement}
     * Reference to the name form element.
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
      this.div = this.shadowRoot.querySelector('#message')
      
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
      figlet.parseFont("Standard", standard);

      figlet.text(
        event.detail.name,
        function (err, data) {
          const div = document.createElement('div')
          const h1 = document.createElement('h1')
          const pre = document.createElement('pre')

          h1.textContent = 'Hello'
          pre.textContent = data

          document.body.appendChild(div)
          div.appendChild(h1)
          div.appendChild(pre)
        }
      );
    }
  })