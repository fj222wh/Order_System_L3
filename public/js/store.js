/**
 * The script for the store.
 *
 * @author Filippa Johansson
 */

const productsContainer = document.querySelector('#productsContainer')
const orderContainer = document.querySelector('#orderContainer')
const orderDisplay = document.querySelector('#orderDisplay')
const orderTotalPriceDisplay = document.querySelector('#orderTotalPrice')

console.log('Hi from the store.script')

/**
 * Fetches data from the backend.
 */
async function loadProducts () {
  const res = await fetch('/api/products')
  const data = await res.json()
  console.log(data)
  renderProducts(data)
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
 */
function updateCart (data) {
  const orderItem = document.createElement('div')
  orderItem.classList.add('orderItem')
  orderDisplay.appendChild(orderItem)
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
  updateCart(data)
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

loadProducts()

productsContainer.addEventListener('click', (e) => {
  const productElement = e.target.closest('.product')
  if (productElement) {
    console.log(productElement)

    // Fix the object, send it to the add product order
    const product = createProductObject(productElement)
    addProductToOrder(product)
  }
})
