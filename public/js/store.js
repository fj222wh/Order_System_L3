/**
 * The script for the store.
 *
 * @author Filippa Johansson
 */

const productsContainer = document.querySelector('#productsContainer')
const orderContainer = document.querySelector('#orderContainer')

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

loadProducts()
