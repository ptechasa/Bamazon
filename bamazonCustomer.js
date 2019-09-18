var mysql = require('mysql');
const keys = require('./keys.js');
var stuff = require('dotenv').config()
var connection = mysql.createConnection(stuff.parsed);
console.log(stuff.parsed);

connection.connect();

connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();