/**
 * The script for the store.
 *
 * @author Filippa Johansson
 */

// TODO: Organize the functions
// TODO: Create classes. SOC
// TODO: I should only be able to update if the order has any orderitems, children in orderDisplay else should it not send a req to the server.

const productsContainer = document.querySelector('#productsContainer')
// const orderContainer = document.querySelector('#orderContainer')
const orderDisplay = document.querySelector('#orderDisplay')
const orderTotalPriceDisplay = document.querySelector('#orderTotalPrice')
const orderNumber = document.querySelector('#orderNumber')
const resetOrderBtn = document.querySelector('#resetButton')
const createInvoiceBtn = document.querySelector('#createInvoiceBtn')
const payBtn = document.querySelector('#payBtn')
const categoryList = document.querySelector('#categoryList')

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
 * Returns the data for all products, categories etc.
 */
async function getCurrentData () {
  const res = await fetch('/api/products')
  const data = await res.json()
  return await data
}
/**
 *
 * @param categories
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
 * Updates background color of
 *
 * @param activeCategoryElement
 */
function updateCategoryStatus (activeCategoryElement) {
  const categoryButtons = document.querySelectorAll('.categoryBtn')
  categoryButtons.forEach(btn => btn.classList.remove('selectedCategory'))
  activeCategoryElement.classList.add('selectedCategory')
}

/**
 *
 * @param category
 */
async function selectCategory (category) {
  const res = await fetch(`/api/products/${encodeURIComponent(category)}`)
  const data = await res.json()
  console.log('THIS IS THE DATA FROM SELECTED CATEGORY_ ' + category)
  console.log(data)
  console.log('DET ÄR EN ARRAY?')
  console.log(Array.isArray(data))
  // TODO: MAKEA FETCH TO THE SERVER ASK FOR PRODUCTS FROM A CHOSE CATEGORY
  clearDisplayedProducts()
  renderProducts(data)
}

/**
 *
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
 *
 */
function displayEditOptions () {
  // TODO: Display the dit box
}

/**
 *
 */
function deleteOrderItem () {
  // TODO: Delete a specific orderItem
}

/**
 *
 */
function updateQuantity () {
  // TODO: Update the quantity
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
 *
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
  // console.log('addProductToOrder response from the server:', data)
  updateCart(data.orderItems)
  updateTotalPrice(data.orderTotalPrice.toFixed(2))
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
  orderTotalPriceDisplay.textContent = newPrice
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
  alert('create invoice')

  // Skicka get hämta invoice?
  // Skapa så den kan laddas ner av användare
  // Rensa order, skapa en ny order
})
payBtn.addEventListener('click', async (e) => {
  pay()
})

/**
 *
 */
function pay () {
  if (cartIsEmpty() === true) {
    console.log('Failed to pay due to empty cart ')
  } else {
    alert('SIMULATE PAYING')
    createNewOrder()
  }
}

/**
 *
 */
async function createNewOrder () {
  // alert('REAL METHOD FOR PAYING IS MISSING - THIS IS ONLY A SIMULATION ')
  const res = await fetch('/api/order/create')
  const data = await res.json()
  console.log(data)
  reset(data)
}

/**
 *
 */
function cartIsEmpty () {
  if (orderDisplay.children.length === 0) {
    return true
  } else {
    return false
  }
}

/**
 *
 * @param data
 */
function reset (data) {
  updateTotalPrice(0)
  updateOrderNumber(data.orderNumber)
  updateCart()
}

start()
