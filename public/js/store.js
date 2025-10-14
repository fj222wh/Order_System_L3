/**
 * The script for the store.
 *
 * @author Filippa Johansson
 */

const productsContainer = document.querySelector('#productsContainer')
const orderDisplay = document.querySelector('#orderDisplay')
const orderTotalPriceDisplay = document.querySelector('#orderTotalPrice')
const orderNumber = document.querySelector('#orderNumber')
const resetOrderBtn = document.querySelector('#resetButton')
const createInvoiceBtn = document.querySelector('#createInvoiceBtn')
const payBtn = document.querySelector('#payBtn')
const categoryList = document.querySelector('#categoryList')
const invoiceForm = document.querySelector('#createInvoice')
const orderButtonsContainer = document.querySelector('#orderButtons')

// TODO: Custom events?
// TODO: Clean up the code, SOC...seperate

/**
 * Fetches data from the backend.
 */
async function start () {
  const data = await getCurrentData()
  renderProducts(data.products)
  updateCart(data.orderItems)
  updateOrderNumber(data.orderNumber)
  updateTotalPrice(data.orderTotalPrice)
  createAndRenderCateories(data.categories)
}

/**
 * Returns the data for all products, categories, products in cart etc.
 *
 * @returns {object} Returns the data about the current state and data of the store.
 */
async function getCurrentData () {
  const res = await fetch('/api/products')
  const data = await res.json()
  return await data
}
/**
 * Creates and renders the HTML element for each category.
 *
 * @param {object} categories The categories and it's products within each category.
 */
function createAndRenderCateories (categories) {
  categories.forEach((category, index) => {
    const categoryBtn = document.createElement('button')
    categoryBtn.textContent = category.charAt(0).toUpperCase() + category.split('').slice(1).join('')
    categoryBtn.setAttribute('data-category', category)
    categoryBtn.classList.add('categoryBtn')

    categoryBtn.addEventListener('click', (e) => {
      console.log('Yoou chose this category: ' + e.target.getAttribute('data-category'))
      updateCategoryStatus(e.target)
      selectCategory(category)
    })

    categoryList.appendChild(categoryBtn)

    if (index === 0) {
      categoryBtn.classList.add('selectedCategory')
    }
  })
}

/**
 * Updates background color of the category element to simulate it being the active category.
 *
 * @param {HTMLElement} activeCategoryElement The HTML element for the category
 */
function updateCategoryStatus (activeCategoryElement) {
  const categoryButtons = document.querySelectorAll('.categoryBtn')
  categoryButtons.forEach(btn => btn.classList.remove('selectedCategory'))
  activeCategoryElement.classList.add('selectedCategory')
}

/**
 * Select a category, fetch data to get only the products from the chosen category.
 *
 * @param {string} category The name of the category
 */
async function selectCategory (category) {
  const res = await fetch(`/api/products/${encodeURIComponent(category)}`)
  const data = await res.json()
  clearDisplayedProducts()
  renderProducts(data)
}

/**
 * Clear the displayed products.
 */
function clearDisplayedProducts () {
  while (productsContainer.firstChild) {
    productsContainer.removeChild(productsContainer.firstChild)
  }
}
/**
 * Renders the products.
 *
 * @param {object}products The products
 */
function renderProducts (products) {
  console.log('THIS ARE PRODUCTS WE GOT IN RENDER PRODUCTS')
  console.log(products)
  products.forEach(product => {
    const productDiv = document.createElement('div')
    productDiv.setAttribute('data-id', product.id)
    productDiv.setAttribute('data-name', product.name)
    productDiv.setAttribute('data-price', product.price)
    productDiv.classList.add('product')
    const name = document.createElement('p')
    name.textContent = product.name
    const price = document.createElement('p')
    price.textContent = product.price + '€'
    productDiv.appendChild(name)
    productDiv.appendChild(price)
    productsContainer.appendChild(productDiv)
  })
}

/**
 * Updates the displayed orderItems in cart.
 *
 * @param {Array} orderItems An array containing all order items.
 */
function updateCart (orderItems) {
  clearOrderDisplay()
  console.log(orderItems)

  orderItems.forEach(orderItem => {
    const orderItemElement = createOrderItem(orderItem)
    orderDisplay.appendChild(orderItemElement)
    orderDisplay.scrollTop = orderDisplay.scrollHeight
    orderItemElement.addEventListener('click', (e) => {
      // TODO: Kontrollera om det är edit knappen...,
      // om dedt är delete/uppdatera antal
    })
  })
}

/**
 * Delete an order item.
 *
 * @param {HTMLElement} orderItemToDelete The
 */
async function deleteOrderItem (orderItemToDelete) {
  orderItemToDelete.remove()
  const id = orderItemToDelete.getAttribute('data-id')
  const res = await fetch(`/api/order/remove/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  updateTotalPrice(data.totalPrice)
}

/**
 * Creates the order item HTML-element.
 *
 * @param {object } orderItem Information about the order item
 * @returns {HTMLElement} Returns the HTML-element for the orderItem
 */
function createOrderItem (orderItem) {
  const orderItemContainerElement = document.createElement('div')
  orderItemContainerElement.setAttribute('data-name', orderItem.name)
  orderItemContainerElement.setAttribute('data-id', orderItem.id)
  orderItemContainerElement.setAttribute('data-price', orderItem.price)
  orderItemContainerElement.setAttribute('data-quantity', orderItem.quantity)

  orderItemContainerElement.classList.add('orderItem')

  const orderItemProductElement = document.createElement('div')
  orderItemProductElement.classList.add('orderItem-product')

  const productName = document.createElement('p')
  productName.classList.add('orderItem-product-name')
  productName.textContent = orderItem.name
  const productPrice = document.createElement('p')
  productPrice.classList.add('orderItem-product-price')
  productPrice.textContent = orderItem.price + '€'
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

  const optionsDiv = createOrderItemOptionsDiv()

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
function createOrderItemOptionsDiv () {
  const options = document.createElement('div')
  options.classList.add('hidden')
  options.classList.add('orderItem-options')
  const increaseBtn = document.createElement('button')
  increaseBtn.textContent = '+'
  const decreaseBtn = document.createElement('button')
  decreaseBtn.textContent = '-'
  const deleteBtn = document.createElement('button')
  const deleteIcon = document.createElement('img')
  deleteIcon.setAttribute('src', './assets/order_icons/delete.png')
  deleteBtn.classList.add('orderItem-options-delete-btn')
  deleteIcon.classList.add('orderItem-options-delete-icon')
  deleteBtn.appendChild(deleteIcon)

  options.appendChild(increaseBtn)
  options.appendChild(decreaseBtn)
  options.appendChild(deleteBtn)

  return options
}

/**
 * Updates the order number.
 *
 * @param {number} number The order number.
 */
function updateOrderNumber (number) {
  orderNumber.textContent = 'Order number: #' + number
}

/**
 * Clear the order display.
 */
function clearOrderDisplay () {
  const parent = document.querySelector('#orderDisplay')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 * Adds product to order.
 *
 * @param {object} product The product and its information
 */
async function addProductToOrder (product) {
  const res = await fetch('/api/order/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })

  const data = await res.json()
  updateCart(data.orderItems)
  updateTotalPrice(data.orderTotalPrice)
}

/**
 * Creates the object.
 *
 * @param {HTMLElement } productElement The element for the product
 * @returns {object} Returns an object with information about the product
 */
function createProductObject (productElement) {
  return {
    id: productElement.getAttribute('data-id'),
    name: productElement.getAttribute('data-name'),
    price: Number(productElement.getAttribute('data-price'))
  }
}

/**
 * Updates the new price.
 *
 * @param {number} newPrice - New Price
 */
function updateTotalPrice (newPrice) {
  orderTotalPriceDisplay.textContent = newPrice.toFixed(2)
}

/**
 * Empties the cart.
 */
async function emptyCart () {
  const res = await fetch('/api/order/empty', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'empty cart' })
  })

  const data = await res.json()
  console.log(data) // CONTROLL LINE
}

// EVENT LISTENERS

productsContainer.addEventListener('click', (e) => {
  const productElement = e.target.closest('.product')
  if (productElement) {
    console.log(productElement)

    const product = createProductObject(productElement)
    addProductToOrder(product)
  }
})

resetOrderBtn.addEventListener('click', () => {
  console.log(orderDisplay.children)
  if (orderDisplay.children.length === 0) {
    console.log(orderDisplay.children + 'NOLL')
    return
  }

  emptyCart()
  clearOrderDisplay()
  updateTotalPrice(0)
})

createInvoiceBtn.addEventListener('click', (e) => {
  // Skicka get hämta invoice?
  // Skapa så den kan laddas ner av användare
  // Rensa order, skapa en ny order

  orderButtonsContainer.classList.add('hidden')
  console.log(orderButtonsContainer)
  invoiceForm.classList.toggle('hidden')
})

payBtn.addEventListener('click', async (e) => {
  pay()
  createNewOrder()
})

/**
 * Payment method. Only simulating payment.
 */
function pay () {
  if (cartIsEmpty() === true) {
    console.log('Failed to pay due to empty cart ')
  } else {
    alert('SIMULATE PAYING')
  }
}

/**
 * Creates a new order.
 */
async function createNewOrder () {
  const res = await fetch('/api/order/create', {
    method: 'POST'
  })
  const data = await res.json()

  resetStateOfSystem(data)
}

/**
 * Checks if the cart if empty.
 *
 * @returns {boolean} Returns true if the cart is empty, false if the cart is not empty.
 */
function cartIsEmpty () {
  if (orderDisplay.children.length === 0) {
    return true
  } else {
    return false
  }
}

/**
 * Rests the state of the ordersystem as it was reseted.
 *
 * @param {object} data The current data
 */
function resetStateOfSystem (data) {
  updateTotalPrice(0)
  updateOrderNumber(data.orderNumber)
  updateCart()
}

orderDisplay.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.orderItem-options-delete-btn')

  if (deleteBtn) {
    const orderItemToRemove = deleteBtn.parentElement.parentElement
    deleteOrderItem(orderItemToRemove)
  }
})

start()
