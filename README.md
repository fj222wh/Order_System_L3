# Order_System_L3
This project has been created as an assigment for the course 1dv610 at LNU. Keep in mind, since it is made for an assigment the code is not fully realiable or trustworthy.

The order system is not fully implemented but the basic functionality works to provide a prototype of how and ordersystem could look like.


## Basic requirements functionality
- A basic ordersystem to display a productcatalog with producs
- Add products to the order
- Calculate the total price of the order dynamically, based on products being removed or added
- Generate an invoice based on the current order
- Filter and display products based on category

## Future features
- Connect the product data to an external data base to make the data permanent
- Update quantity in cart
- Create the invoice as a pdf instead of a html-file
- An admin page where the admin can update, create and delete products in the product catalog


## Start the application

####  ENV-Variables
You need to create a `.env`-file to start the application. Declare the following variables with your chosen values.
```js
PORT=3000 // The port the server should run on
BASE_URL='/' // The base URL of the application
NODE_ENV = 'production' // Enviroment
SESSION_NAME='session'
SESSION_SECRET='secret'
```

#### Productcatalog - Data
Before being able to use the application you need to add data  containing all products. The products should be added to the array `productData` in the file `src/data/productData.js` in the following format:

```js
  {
    name: 'Classic Milk Tea',
    price: 4.5,
    description: 'Traditional black tea with creamy milk and tapioca pearls',
    category: 'drinks'
  }
```

To run the application in development:
```bash
npm run dev
```

## License
MIT license is used for this project. More info can be found [here](/LICENSE)

## Developer
Any contributions to this project are welcome. If you are interested in becoming a developer to this project read more [here](./docs/developer.md)

## Attributions
The icons used in this project are from Flaticon.
- https://www.flaticon.com/free-icon/edit-text_10573605?term=edit&page=1&position=12&origin=search&related_id=10573605 Edit icon
- https://www.flaticon.com/free-icon/more_5718983?term=options&page=1&position=3&origin=search&related_id=5718983 Options
