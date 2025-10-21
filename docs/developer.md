# Developer
This project is under the MIT license. Anyone is welcome to contribute to this application.

⚠️ **To have in mind:** This project has only been created as a part of an assigment for a school project and is therefore not reliable to be used in production.

## Status
This ordersystem has implemented the basic functionality:
- Display products in the order system based on data in the backend
- Filter products based on category
- Add products to the order
- Remove order items from the order
- Calculate total price of the order
- Simulate paying for an order
- Genereate an invoice of the order in HTML

## Known bugs and improvements
The version of the current implementation of the code is incomplete and unstable. The code quality has to be checked.

- Create web components for e.g orderItem, product, parts of the UI in the ordersystem to make it more scalable and seperated
- Store the data perstent in a database, right now are models created but the products are hard coded


## Future features
- Generate the invoice in pdf format
- Implement a real payment method e.g (Stripe, Apple Pay, Swish, PayPal, Card Credentials etc...)
- Increase/Decrease the quantity of a product in the cart
- An admin page where the admin can handle the product catalog
    - Create new products
    - Update product information for existing products
    - Delete a product
- Admin page with statistics of sales

## Workflow & Branches
Only push changes to the main branch once a feature or method is fully completed and tested. The main branch must always represent the stable, production-ready version of the module.

Example:
When working on a specific bug or feature, create a new branch for the specific feature/task and name your branche e.g `feature-<NAME>` or `bugfix-<NAME>`, and exchange `<NAME>` with the name of the feature/bug you are working on.

Commit frequently and in small increments to make the workflow easier to follow and track. Testing should be integrated throughout the development process when implementing new features. Every public method must have corresponding automated tests to ensure reliability and maintain code quality. Once all the tests for the feature has passed make a push to main.


## Testing
During the work process the testing of the test cases has been made simultaneously. All test cases can be found [here](tests.md)

When adding more functionality, implement new test cases as well

### Test status
Test status can be found [here](test-report.md)



