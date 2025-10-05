/**
 * The script for the store.
 *
 * @author Filippa Johansson
 */

// TODO: Organize the functions
// TODO: Create classes. SOC

const productsContainer = document.querySelector('#productsContainer')
const orderContainer = document.querySelector('#orderContainer')
const orderDisplay = document.querySelector('#orderDisplay')
const orderTotalPriceDisplay = document.querySelector('#orderTotalPrice')

// console.log('Hi from the store.script')

/**
 * Fetches data from the backend.
 */
async function start () {
  const res = await fetch('/api/products')
  const data = await res.json()
  console.log(data)
  renderProducts(data.products)

  console.log(data.orderNumber)
  updateOrderNumber(data.orderNumber)
}

/**
 * Renders the products.
 *
 * @param {object}products The products
 */
function renderProducts (products) {
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
 *
 * @param data
 * @param orderItems
 */
function updateCart (orderItems) {
  clearOrderDisplay()
  console.log(orderItems)

  orderItems.forEach(orderItem => {
    const orderItemElement = document.createElement('div')
    orderItemElement.classList.add('orderItem')
    const productName = document.createElement('p')
    productName.textContent = orderItem.name
    const productPrice = document.createElement('p')
    productPrice.textContent = orderItem.price
    const productQuantity = document.createElement('p')
    productQuantity.textContent = orderItem.quantity

    orderItemElement.appendChild(productName)
    orderItemElement.appendChild(productPrice)
    orderItemElement.appendChild(productQuantity)
    orderDisplay.appendChild(orderItemElement)
  })
}

/**
 *
 * @param orderNumber
 */
function updateOrderNumber (orderNumber) {
  const orderNumber = document.querySelector('#orderNumber')
orderNumber.textContent = orderNumber
}

/**
 *
 */
function clearOrderDisplay () {
  const parent = document.getElementById('orderDisplay')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 *
 * @param id
 * @param product
 */
async function addProductToOrder (product) {
  const res = await fetch('/api/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })

  const data = await res.json()
  console.log('addProductToOrder response from the server:', data)
  updateCart(data.orderItems)
  updateTotalPrice(data.orderTotalPrice)
}

/**
 *
 * @param productElement
 */
function createProductObject (productElement) {
  return {
    id: productElement.getAttribute('data-id'),
    name: productElement.getAttribute('data-name'),
    price: Number(productElement.getAttribute('data-price'))
  }
}

/**
 *
 * @param newPrice
 */
function updateTotalPrice (newPrice) {
  console.log('setting new price')
  orderTotalPriceDisplay.textContent = newPrice
}

start()

productsContainer.addEventListener('click', (e) => {
  const productElement = e.target.closest('.product')
  if (productElement) {
    console.log(productElement)

    // Fix the object, send it to the add product order
    const product = createProductObject(productElement)
    addProductToOrder(product)
  }
})
