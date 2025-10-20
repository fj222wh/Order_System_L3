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
