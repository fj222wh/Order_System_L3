/**
 * @description The webcomponent for presenting the quiz questions.
 * @module my-nickname
 * @author Filippa Johansson <fj222wh@student.lnu.se>
 */

import { cssTemplate } from './my-order-item.css.js'
import { htmlTemplate } from './my-order-item.html.js'

// Register using a lowercase, hyphenated name so it matches HTML parsing
customElements.define('my-order-item',
  /**
   *
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {object}
     * The abort controller object.
     */
    #abortController
    /**
     * Creates the custom element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#abortController = new AbortController()
    }

    /**
     * When the element is added to the DOM.
     */
    connectedCallback () {

    }

    /**
     * Remove eventlisteners when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  }
)
