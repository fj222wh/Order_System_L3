# Test cases

Manual tests has been done during the development of this application to test the use cases. 
You can find the status of the testing [here](./test-report.md).

## How to test:
The test can only be ran if products data exist, at least 2 different products from two different categories needs to be created.

## TC1. Categories
###  1.1 Starting the app
**Description:** When the user starts the app the data should be rendered correctly

1. Start the application

**Expected output:**
- The categories should be shown on the left. 
- The first category's element background should have a darker color to show that it's the current selected category.
- The background of the category element should show a different color when hovering over the categories.

// TODO: Add pictures as examples

### 1.2 Select a category
**Description:** The user clicks and selects a category when using the system

1. Start the application
2. Select any category on the left side and click on it.

**Expected output:**
- The selected category's element should have a different background color to show that it's the selected category
- Only products belonging to this chosen category should be shown
- // TODO: Add pictures as examples

## 1.3 Create a new category
**Description:** The admin creates a new category of the products 

1. Start the application
2. Notice which are the current categories
3. Edit the file `productsData.js` and add a new product with a category that doesn't exist yet.
4. Save the file and restart the application.

**Expected output:**
- Expect the same output as the output from 1.1 and 1.2 but the new category should also be shown on the left. 
- When clicking on this new category, only the product you just created should be shown here.
 
## TC2. Products
### 2.1 Render products
**Description:** Check if the products are rendered with the correct information

1. Start the application 

**Expected output:**
- The products from the first category should be rendered (not the rest of the products, unless you click and select a category)
- Each product should include the name of the product, and price.
- When hovering of the product the backgroundcolor of the element should be darker
// TODO: Add pictures as examples

### 2.2 Create and add a new product
**Description:** Create a new product in the backend, check if it's rendered correctly on the front end

1. Go to the backend to the file `productData.js` and add a new product:
```js
{
name: 'Classic Milk Tea',
price: 4.5,
description: 'Traditional black tea with creamy milk and tapioca pearls',
category: 'drink'
},
```
2. Save the changes
3. Restart the application
4. Select the category `drink`

**Expected output:**
- The product you just created should be displayed with correct name and price.

## TC3. Order
### 3.1 View
**Description:** Check the UI of the order display
1. Start the application

**Expected output:**
- The order number should be shown
- A button for emptying the order should exist
- Total price should be shown in the bottom along with the buttons for paying and creating an invoice

### 3.2 Add a product to the order
**Description:** Add a product to the order

1. Start the application
2. Go the the category `drinks` and click on any product
3. Select another category and add another product

**Expected output:**
- The products you chose should be shown in the order summery, the price, quantity and name of the product should be shown
- The totalprice in the bottom of the order display should calculate and show the correct price.


// TODO: Add pictures as examples


### 3.3 Add multiple items of the same product
**Description:** Add two items of the same product to the order

1. Start the application
2. Go the the category `drinks` and click on any product
3. Click on the same product again

**Expected output:**
- The products you chose should be shown in the order summery, the price, quantity and name of the product should be shown
- The quantity should be `2x`
- The totalprice in the bottom of the order display should calculate and show the correct price.


// TODO: Add pictures as examples


### 3.4 Remove an order item
**Description:** Remove an item from the order

1. Start the application
2. Select the category `drinks`
3. Add any product, click on it
4. Look at the order display, click on symbol for "options"
5. Click on the delete button

**Expected output:**
- The order item should disappear from the view and the totalprice should be reduced to 0.

  // TODO: Add pictures as examples

### 3.4 Empty everything in the order
**Description:** Empty everything in the order

1. Start the application
2. Select the category `drinks`
3. Add several products of your choice by clicking on them
4. Notice how the order display looks before deleting anything
5. In the right corner of the order display, click on the delete button

**Expected output:**
- All order items should be removed
- The order number should be the same as it was before
- The total price should be reduced to 0

## TC4. Pay
**Description:** Paying for an order 

1. Start the application
2. Select the category `drinks`
3. Add several products of your choice by clicking on them
4. Click on the pay button

**Expected output:**
- Be able to pay for the order
- After paying the order number should increase and everything in the cart order display should be empty
  
## TC5. Create an invoice
**Description:** Create an invoice of an order

1. Start the application
2. Select the category `drinks`
3. Add several products of your choice by clicking on them
4. Click on the create invoice button
5. A form should be displayed
6. Fill out the fields:
	Full name: `Alice Andersson`
	 Email: `alice@lnu.se`
	
7. Click on the submit button

**Expected output:**
- You should be asked where to save the document. Save it
- Open the htm file
	- The name `Alice Andersson` and the email `alice@lnu.se` should be shown.
	- All of the products in the order should be shown with its price, quanity and name.
	- In the bottom, the total price should be visible