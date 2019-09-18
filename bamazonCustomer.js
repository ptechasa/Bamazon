var inquire = require('inquire');
const keys = require("./keys.js");
var mysql = require('mysql');
var connection = mysql.createConnection(keys.data);

 
connection.connect();
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();