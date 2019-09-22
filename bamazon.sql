DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id  INT NOT NULL,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DECIMAL (8,2), 
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES
('1001', 'UGG', 'Shoes', '119.95', '250'),
('2002', 'Levis Premium Skinny', 'Clothing', '98', '300'),
('3003', 'MICHAEL KORS', 'Bags & Handbags', '171', '150'),
('4004', 'Earring', 'Accessories', '12.95', '350'),
('5005', 'Kate Spade New York', 'Watches', '195', '150'),
('6006', 'PRADA', 'Sunglasses', '295.99', '60'),
('7007', 'NIKE Zoom Vapor Cage 3', 'New Releases', '199.99', '200'),
('8008', 'NIKE Kids Air MAx', 'Performance', '70', '200'),
('9009', 'Columbia Jacket', 'Outdoor', '299', '250'),
('1111', 'Bamazon Gift CArds', 'Gift Cards', '100', '300');
