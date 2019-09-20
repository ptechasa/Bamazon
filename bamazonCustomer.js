var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

const keys = require('./keys.js');

//dotenv package is hide the credential
require('dotenv').config()


var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

//Establishing connections
connection.query('SELECT item_id, product_name, department_name, price FROM products', function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    askId();
});

function askId() {
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

            if (numID === 1001 || 2002 || 3003 || 4004
                || 5005 || 6006 || 7007 || 8008 || 9009 || 1111) {
                // var id = answers.id
                // console.log(id)
                askQty(numID);

            } else {
                console.log('Please select correct ID #')
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

            connection.query('SELECT * FROM products WHERE item_id = ?', [num], function (error, results, fields) {
                if (error) throw error;
                var dbQty = results[0].stock_quantity;
                var priceNum = parseInt(results[0].price)

                if (qty > dbQty) {
                    console.log('Insufficient quantity!')

                    //if insufficient quantity, it will show the product_name and stock_quantity that you have in stock
                    connection.query('SELECT product_name, stock_quantity FROM products WHERE item_id = ?', [num], function (error, results, fields) {
                        console.table(results);
                    })

                } else {
                    var totalPrice = qty * priceNum
                    console.log(`${qty} items have been ordered.`)
                    console.log(`${results[0].product_name} at $${results[0].price}`)
                    console.log(`Total amount: $${totalPrice}`)
                }
                // console.log(results[0].stock_quantity);
                // askId();

            });
        });
}


//Closing the connection
// connection.end();