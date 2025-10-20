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
const sendInvoiceToServerBtn = document.querySelector('#createInvoicePostBtn')

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
  if (cartIsEmpty()) {
    return
  }

  orderButtonsContainer.classList.add('hidden')
  console.log(orderButtonsContainer)
  invoiceForm.classList.toggle('hidden')
})

payBtn.addEventListener('click', async (e) => {
  if (cartIsEmpty()) {
    return
  }

  const event = new CustomEvent('paid')
  document.dispatchEvent(event)
  alert('SIMULATE PAYING')
})

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
  invoiceForm.classList.add('hidden')
  orderButtonsContainer.classList.remove('hidden')
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

sendInvoiceToServerBtn.addEventListener('click', async (e) => {
  // TODO: Send data with information about the customer to the server
  const fullname = document.querySelector('#createInvoiceFullname').value
  const email = document.querySelector('#createInvoiceEmail').value

  if (!fullname.trim() || !email.trim()) {
    return
  }

  const data = {
    fullname, email
  }

  const res = await fetch('/api/order/invoice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const content = await res.json()
  const encoded = encodeURIComponent(content)

  const linkToDownload = document.createElement('a')
  linkToDownload.href = 'data:text/html;charset=utf-8,' + encoded
  linkToDownload.download = 'invoice.html'
  linkToDownload.click()

  const event = new CustomEvent('paid')
  document.dispatchEvent(event)
})

document.addEventListener('paid', async (e) => {
  setTimeout(async () => {
    const data = await getCurrentData()
    createNewOrder()
    resetStateOfSystem(data)
  }, 100)
})
