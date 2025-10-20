// sendInvoiceToServerBtn.addEventListener('click', async (e) => {
//   // TODO: Send data with information about the customer to the server
//   const fullname = document.querySelector('#createInvoiceFullname').value
//   const email = document.querySelector('#createInvoiceEmail').value

//   if (!fullname.trim() || !email.trim()) {
//     return
//   }

//   const data = {
//     fullname, email
//   }

//   const res = await fetch('/api/order/invoice', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })

//   const content = await res.json()
//   const encoded = encodeURIComponent(content)

//   const linkToDownload = document.createElement('a')
//   linkToDownload.href = 'data:text/html;charset=utf-8,' + encoded
//   linkToDownload.download = 'invoice.html'
//   linkToDownload.click()

//   const event = new CustomEvent('paid')
//   document.dispatchEvent(event)
// })

// document.addEventListener('paid', async (e) => {
//   setTimeout(async () => {
//     const data = await getCurrentData()
//     createNewOrder()
//     resetStateOfSystem(data)
//   }, 100)
// })
