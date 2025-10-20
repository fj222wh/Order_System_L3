/**
 * The class handling the UI of the Order System
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */
export class OrderSystemUI {
  /**
   * Renders the products.
   *
   * @param {Array} products The products
   * @param {HTMLElement} productsContainer The HTML element containing all of the product
   */
  renderProducts (products, productsContainer) {
    products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.setAttribute('data-id', product.id)
      productDiv.setAttribute('data-name', product.name)
      productDiv.setAttribute('data-price', product.price.toFixed(2))
      productDiv.classList.add('product')
      const name = document.createElement('p')
      name.textContent = product.name
      const price = document.createElement('p')
      price.textContent = product.price.toFixed(2) + '€'
      productDiv.appendChild(name)
      productDiv.appendChild(price)
      productsContainer.appendChild(productDiv)

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
  renderCategories (categories, categoryContainer) {
    categories.forEach((category, index) => {
      const categoryElement = this.#createCategoryElement(category)
      categoryContainer.appendChild(categoryElement)

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
  updateTotalPrice (totalPriceDisplayElement, newPrice) {
    totalPriceDisplayElement.textContent = newPrice.toFixed(2)
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
   * @param {HTMLElement }productsContainer The container for the products.
   */
  clearDisplayedProducts (productsContainer) {
    while (productsContainer.firstChild) {
      productsContainer.removeChild(productsContainer.firstChild)
    }
  }

  /**
   * Creates the order item HTML-element.
   *
   * @param {object } orderItem Information about the order item
   * @returns {HTMLElement} Returns the HTML-element for the orderItem
   */
  createOrderItem (orderItem) {
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
    productPrice.textContent = orderItem.price.toFixed(2) + ' €'
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

    // options.appendChild(increaseBtn)
    // options.appendChild(decreaseBtn)
    options.appendChild(deleteBtn)

    return options
  }
}
