# Bamazon
Bamazon is an Amazon-like storefront with using technologies; MySQL Database, JavaScript, and Node.js. The app will take in orders from customers and deplete stock from the store's inventory.
 
 ## Customer View

1. MySQL Database called 'bamazon' and a table inside of that database called 'products'
Once you run command --> node bamazonCustomer.js, so it will first display all of the items available for sale which should have each of the following columns:

* ID (unique id for each product)
* Product (Name of product)
* Department (department_name)
* Price (cost to customer)
* Quantity (stock_quantity which show how much of the product is available in stores)

![all products sale ](https://github.com/ptechasa/Bamazon/blob/master/screenshots/DisplayAllProducts.png?raw=true)

After that, the app will prompt users with two messages.
* Please input the product ID would you like to buy?
* How many quantities would you like to buy?

Once you input the product ID and total quantities you want to buy, it will display the total items that have been ordered and the total amount of customers' purchase, following the message 'Thank you for shopping at Bamazon'

![customer purchase](https://github.com/ptechasa/Bamazon/blob/master/screenshots/customerPurchase.png?raw=true)


After that, the purchase will be proceed and the remaining quantity will be updated in the SQL database.

![after purchase](https://github.com/ptechasa/Bamazon/blob/master/screenshots/afterCustomerPurchase.png?raw=true)

Once the customer has placed the order,  this application will check if your store has enough of the product to meet the customer's request.
* If not, the app will log a phrase like Insufficient quantity!, and then prevent the order from going through.
* It will display the product name and the reamaing quantity in stock with the message 'Total stock that we have: '

![Insufficient quantitty](https://github.com/ptechasa/Bamazon/blob/master/screenshots/insufficientQuantitty.png?raw=true)


If customer input the product ID and total quantities are null or blank, it will display 'Insufficient quantity!, and show the product name and the reamaing quantity in stock with 'Total stock that we have: '

![totalquantityisnull](https://github.com/ptechasa/Bamazon/blob/master/screenshots/total-quantity-is-null.png?raw=true)
