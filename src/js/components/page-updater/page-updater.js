import { template } from './page-updater-template.js'
import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'

customElements.define('page-updater',
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
     * @private
     * @type {HTMLInputElement}
     * Reference to the pre element.
     */
    #pre

    /**
     * @private
     * @type {HTMLInputElement}
     * Reference to the h2 element.
     */
    #p

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#name = this.shadowRoot.querySelector('name-form')
      this.#pre = this.shadowRoot.querySelector('pre')
      this.#p = this.shadowRoot.querySelector('p')
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#name.addEventListener('nameSubmitted', this.createAscii.bind(this))
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#name.removeEventListener('nameSubmitted', this.createAscii.bind(this))
    }

    /**
     * Creates ascii-art from entered name.
     *
     * @param {CustomEvent} event - Event containing the name in event.detail.name
     */
    createAscii (event) {
      figlet.parseFont('Standard', standard)
      figlet.text(`Hello ${event.detail.name}`,
        (err, data) => {
          if (err) {
            console.error(err)
          }
          this.fetchQuote(data)
        }
      )
    }

    /**
     * Fetches a Ron Swanson quote from API and updates the element.
     *
     * @param {string} data - ASCII-art string to display.
     * @returns {Promise<void>}
     */
    async fetchQuote (data) {
      const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
      try {
        const request = await fetch(url)
        if (!request.ok) {
          throw new Error('Fetch failed', request.statusText)
        }
        const response = await request.json()
        this.setData(response, data)
      } catch (err) {
        throw new Error(err.message)
      }
    }

    /**
     * Sets the ASCII-art and quote in the element.
     *
     * @param {string[]} quote - Array with quote string from API.
     * @param {string} data - ASCII-art string.
     */
    setData (quote, data) {
      this.#pre.textContent = data
      this.#p.textContent = ''

      const strong = document.createElement('strong')
      strong.textContent = 'What would Ron say? '
      const textNode = document.createTextNode(quote)
      this.#p.appendChild(strong)
      this.#p.appendChild(textNode)
      this.#p.classList.remove('hidden')
    }
  }
)
