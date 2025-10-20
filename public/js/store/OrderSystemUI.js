/**
 * The class handling the UI of the Order System
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class OrderSystemUI {
  #productsContainer = document.querySelector('#productsContainer')
  #orderDisplay = document.querySelector('#orderDisplay')
  #TotalPriceDisplay = document.querySelector('#orderTotalPrice')
  #orderNumber = document.querySelector('#orderNumber')
  #resetOrderBtn = document.querySelector('#resetButton')
  #createInvoiceBtn = document.querySelector('#createInvoiceBtn')
  #payBtn = document.querySelector('#payBtn')
  #categoryList = document.querySelector('#categoryList')
  #invoiceForm = document.querySelector('#createInvoice')
  #orderButtonsContainer = document.querySelector('#orderButtons')
  #sendInvoiceToServerBtn = document.querySelector('#createInvoicePostBtn')

  #currency
  /**
   * The constructor.
   *
   * @param {string} currency The currency
   */
  constructor (currency) {
    this.setCurrency(currency)
  }

  /**
   * Sets the currency.
   *
   * @param {string} currency The currency
   */
  setCurrency (currency) {
    if (typeof currency !== 'string') {
      throw new Error('The currency has to be a string')
    }

    this.#currency = currency
  }

  /**
   * Renders the products.
   *
   * @param {Array} products The products
   * @param {HTMLElement} productsContainer The HTML element containing all of the product
   */
  renderProducts (products) {
    products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.setAttribute('data-id', product.id)
      productDiv.setAttribute('data-name', product.name)
      productDiv.setAttribute('data-price', product.price.toFixed(2))
      productDiv.classList.add('product')
      const name = document.createElement('p')
      name.textContent = product.name
      const price = document.createElement('p')
      price.textContent = product.price.toFixed(2) + this.#currency
      productDiv.appendChild(name)
      productDiv.appendChild(price)
      this.#productsContainer.appendChild(productDiv)

      productDiv.addEventListener('click', (e) => {
        const productElement = e.target.closest('.product')

        if (productElement) {
          const event = new CustomEvent('productSelected', {
            detail: {
              selectedProduct: productElement
            }
          })
          document.dispatchEvent(event)
        }
      })
    })
  }

  /**
   * Creates and renders the HTML element for each category.
   *
   * @param {object} categories The categories and it's products within each category.
   * @param {HTMLElement} categoryContainer The container for the categories
   */
  renderCategories (categories) {
    categories.forEach((category, index) => {
      const categoryElement = this.#createCategoryElement(category)
      this.#categoryList.appendChild(categoryElement)

      if (index === 0) {
        categoryElement.classList.add('selectedCategory')
      }
    })
  }

  /**
   * Creates the category HTML element.
   *
   * @param {string} category The category
   * @returns {HTMLElement} Returns the category.
   */
  #createCategoryElement (category) {
    const categoryElement = document.createElement('button')
    categoryElement.textContent = category.charAt(0).toUpperCase() + category.split('').slice(1).join('')
    categoryElement.setAttribute('data-category', category)
    categoryElement.classList.add('categoryBtn')

    categoryElement.addEventListener('click', (e) => {
      console.log('Yoou chose this category: ' + e.target.getAttribute('data-category'))

      const event = new CustomEvent('categorySelected', {
        detail: {
          selectCategory: e.target.getAttribute('data-category')
        }
      })
      document.dispatchEvent(event)
    })

    return categoryElement
  }

  /**
   * Updates the new price.
   *
   * @param {HTMLElement} totalPriceDisplayElement - The element for displaying the total price.
   * @param {number} newPrice - The new price
   */
  updateTotalPrice (newPrice) {
    this.#TotalPriceDisplay.textContent = newPrice.toFixed(2)
  }

  /**
   *
   * @param number
   */
  updateOrderNumber (number) {
    this.#orderNumber.textContent = 'Order number: #' + number
  }

  /**
   * Updates background color of the category element to simulate it being the active category.
   *
   * @param {HTMLElement} activeCategoryElement The HTML element for the category
   */
  updateCategoryStatus (activeCategoryElement) {
    const categoryButtons = document.querySelectorAll('.categoryBtn')
    categoryButtons.forEach(btn => btn.classList.remove('selectedCategory'))
    activeCategoryElement.classList.add('selectedCategory')
  }

  /**
   * Clear the displayed products.
   *
   */
  #clearDisplayedProducts () {
    while (this.#productsContainer.firstChild) {
      this.#productsContainer.removeChild(this.#productsContainer.firstChild)
    }
  }

  /**
   * Clear the order display.
   */
  clearOrderDisplay () {
    const parent = document.querySelector('#orderDisplay')
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  /**
   * Updates the displayed orderItems in cart.
   *
   * @param {Array} orderItems An array containing all order items.
   */
  updateCart (orderItems) {
    this.clearOrderDisplay()

    orderItems.forEach(orderItem => {
      const orderItemElement = this.#createOrderItem(orderItem)
      this.#orderDisplay.appendChild(orderItemElement)
      this.#orderDisplay.scrollTop = this.#orderDisplay.scrollHeight
    })
  }

  /**
   * Creates the order item HTML-element.
   *
   * @param {object } orderItem Information about the order item
   * @returns {HTMLElement} Returns the HTML-element for the orderItem
   */
  #createOrderItem (orderItem) {
    const orderItemContainerElement = document.createElement('div')
    orderItemContainerElement.setAttribute('data-name', orderItem.name)
    orderItemContainerElement.setAttribute('data-id', orderItem.id)
    orderItemContainerElement.setAttribute('data-price', orderItem.price.toFixed(2))
    orderItemContainerElement.setAttribute('data-quantity', orderItem.quantity)

    orderItemContainerElement.classList.add('orderItem')

    const orderItemProductElement = document.createElement('div')
    orderItemProductElement.classList.add('orderItem-product')

    const productName = document.createElement('p')
    productName.classList.add('orderItem-product-name')
    productName.textContent = orderItem.name
    const productPrice = document.createElement('p')
    productPrice.classList.add('orderItem-product-price')
    productPrice.textContent = orderItem.price.toFixed(2) + `${this.#currency}`
    const productQuantity = document.createElement('p')
    productQuantity.classList.add('orderItem-product-quantity')
    productQuantity.textContent = 'x' + orderItem.quantity
    const optionBtn = document.createElement('img')
    optionBtn.setAttribute('alt', 'Edit icon')
    optionBtn.setAttribute('src', '/assets/order_icons/orderItem-options.png')
    optionBtn.classList.add('orderItem-edit-icon')

    orderItemProductElement.appendChild(productName)
    orderItemProductElement.appendChild(productPrice)
    orderItemProductElement.appendChild(productQuantity)
    orderItemProductElement.appendChild(optionBtn)

    const optionsDiv = this.#createOrderItemOptionsDiv()

    orderItemContainerElement.appendChild(orderItemProductElement)
    orderItemContainerElement.appendChild(optionsDiv)

    optionBtn.addEventListener('click', (e) => {
      optionsDiv.classList.toggle('hidden')
    })

    return orderItemContainerElement
  }

  /**
   * Creates the option for the orderItem.
   *
   * @returns {HTMLElement} Returns the options for the order item.
   */
  #createOrderItemOptionsDiv () {
    const options = document.createElement('div')
    options.classList.add('hidden')
    options.classList.add('orderItem-options')
    // const increaseBtn = document.createElement('button')
    // increaseBtn.textContent = '+'
    // const decreaseBtn = document.createElement('button')
    // decreaseBtn.textContent = '-'
    const deleteBtn = document.createElement('button')
    const deleteIcon = document.createElement('img')
    deleteIcon.setAttribute('src', './assets/order_icons/delete.png')
    deleteBtn.classList.add('orderItem-options-delete-btn')
    deleteIcon.classList.add('orderItem-options-delete-icon')
    deleteBtn.appendChild(deleteIcon)

    deleteBtn.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.orderItem-options-delete-btn')

      if (deleteBtn) {
        const orderItemToRemove = deleteBtn.parentElement.parentElement
        const delteOrderItemEvent = new CustomEvent('deleteOrderItem', {
          detail: {
            id: orderItemToRemove.getAttribute('data-id')
          }
        })
        document.dispatchEvent(delteOrderItemEvent)
        orderItemToRemove.remove()
      }
    })

    // options.appendChild(increaseBtn)
    // options.appendChild(decreaseBtn)
    options.appendChild(deleteBtn)

    return options
  }

  /**
   * Adds the event listeners for dispatching custom events.
   */
  dispatchCustomEvents () {
    this.#resetOrderBtn.addEventListener('click', (e) => {
      const emptyOrderEvent = new CustomEvent('emptyOrder')
      document.dispatchEvent(emptyOrderEvent)
    })

    this.#payBtn.addEventListener('click', (e) => {
      if (this.#cartIsEmpty() === true) {
        return
      }

      const payEvent = new CustomEvent('payOrder')
      document.dispatchEvent(payEvent)
    })

    this.#createInvoiceBtn.addEventListener('click', (event) => {
      if (this.#cartIsEmpty()) {
        return
      }

      this.#invoiceForm.classList.remove('hidden')
      this.#orderButtonsContainer.classList.add('hidden')
    })

    this.#sendInvoiceToServerBtn.addEventListener('click', (e) => {
      this.#orderButtonsContainer.classList.remove('hidden')
      this.#invoiceForm.classList.add('hidden')

      const invoiceEvent = new CustomEvent('createInvoice', {
        details: { e }
      })
      document.dispatchEvent(invoiceEvent)
    })
  }

  /**
   * Checks if the cart is empty.
   *
   * @returns {boolean} Returns a boolean weather the order display is empty or not.
   */
  #cartIsEmpty () {
    if (this.#orderDisplay.children.length === 0) {
      return true
    } else {
      return false
    }
  }
}
