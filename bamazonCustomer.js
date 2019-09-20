var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");

const keys = require('./keys.js');

//dotenv package is hide the credential
require('dotenv').config()

//hiding the credential
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
    
});





// connection.end();