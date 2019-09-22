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
                console.log('Please input correct Product ID, try again!!')
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
            var qty = parseInt(answers.qty)

            //using ? to avoid a SQL injection attack
            connection.query('SELECT * FROM products WHERE item_id = ?', [num], function (error, results, fields) {

                if (error) throw error;

                var dbQty = results[0].stock_quantity;
                var priceNum = parseInt(results[0].price)

                if (qty > dbQty) {
                    console.log('----------------------------')
                    console.log('Insufficient quantity!')

                    //if insufficient quantity, it will show the product_name and stock_quantity that you have in stock
                    connection.query('SELECT product_name AS Product, stock_quantity AS Quantity FROM products WHERE item_id = ?', [num], function (error, results, fields) {
                        console.table(results);
                        console.log(`Total stock that we have: ${dbQty}`)
                        askProductId();
                    })

                } else {
                    var totalPrice = qty * priceNum
                    console.log('----------------------------')
                    console.log(`${qty} items have been ordered.`)
                    console.log(`${results[0].product_name} at $${results[0].price}`)
                    console.log('----------------------------')
                    console.log(`Total amount: $${totalPrice}`)
                    console.log('============================')
                    // console.log('---Thank you for shopping at Bamazon ---')
                    askProductId();
                }
                // console.log(results[0].stock_quantity);


            });
        });
}

function updateInventory(num) {
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [num], function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}

viewProducts();

//Closing the connection
// connection.end();