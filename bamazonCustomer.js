var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

const keys = require('./keys.js');

//dotenv package is hide the credential
require('dotenv').config()

//Establishing connections
var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

function viewProducts() {

    //Display all of data from products table in SQL
    connection.query('SELECT item_id AS ID, product_name AS Product, department_name AS Department, price AS Price, stock_quantity AS Quantity FROM products', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
        askProductId();
    });
}

function askProductId() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'number',
                message: 'Please input the product ID would you like to buy?'
            }
        ])
        .then(answers => {
            var numID = parseInt(answers.id)

            //check item_id on Database 
            if (numID == 1001 ||
                numID == 2002 ||
                numID == 3003 ||
                numID == 4004 ||
                numID == 5005 ||
                numID == 6006 ||
                numID == 7007 ||
                numID == 8008 ||
                numID == 9009 ||
                numID == 1111) {

                askQty(numID);

            } else {
                console.log('Please input correct Product ID, try again!!');
                askProductId();
            }
        });
}

function askQty(num) {
    inquirer
        .prompt([
            {
                name: 'qty',
                type: 'number',
                message: 'How many quantities would you like to buy?'
            }
        ])
        .then(answers => {
            var qty = parseInt(answers.qty);

            //using ? to avoid a SQL injection attack
            connection.query('SELECT * FROM products WHERE item_id = ?', [num], function (error, results, fields) {

                if (error) throw error;

                var dbQty = results[0].stock_quantity;
                var priceNum = parseFloat(results[0].price);

                if (qty > dbQty) {
                    console.log('----------------------------');
                    console.log('Insufficient quantity!');

                    //if insufficient quantity, it will show the product_name and stock_quantity that you have in stock
                    connection.query('SELECT product_name AS Product, stock_quantity AS Quantity FROM products WHERE item_id = ?', [num], function (error, results, fields) {
                        console.table(results);
                        console.log(`Total stock that we have: ${dbQty}`);
                        console.log('---------------------------------------')
                        askProductId();
                    })

                } else {

                    //Calculating total price from quantity
                    var totalPrice = priceNum * qty;
                    console.log('\n');
                    console.log('----------------------------')
                    console.log(`${qty} items have been ordered.`)
                    console.log(`${results[0].product_name} at $${results[0].price}`)
                    console.log('----------------------------')
                    console.log(`Total amount: $ ${totalPrice}`)
                    console.log('============================')
                    console.log('---Thank you for shopping at Bamazon ---')
                    console.log('\n');

                    //Updating the products' quantity in Inventory
                    var updateQty = results[0].stock_quantity - qty
                    updateInventory(updateQty, results[0].item_id);

                    viewProducts();
                }

            });
        });

}

function updateInventory(num, cid) {

    //Display updates product quantity
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [num, cid], function (error, results) {
        if (error) throw error;
        console.table(results);
    });
}

viewProducts();

//Closing the connection
// connection.end();