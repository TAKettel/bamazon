DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL DEFAULT 0.50,
    stock_quantity DECIMAL(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("LEGO Architecture Robie House 21010", "Toys", 620.89, 1),
("Char-Broil Classic 360 3-Burner Liquid Propane Gas Grill", "Appliances", 129.99, 45),
("Marvel’s Spider-Man - PlayStation 4", "Video Games", 29.99, 109),
("Bananarama, Banana Candy 2 Pounds", "Food", 11.24, 94),
("Nest (T3007ES) Learning Thermostat", "Programmable Thermostats", 208, 20),
("Game of Thrones: The Complete Seasons 1-7 (BD + Digital)", "TV", 112.59, 14),
("XiaoTianXin-men clothes XTX Mens Long Sleeve Crewneck", "Pullovers", 6.92, 72),
("Peeps Grow-a-PEEP (Green)", "Baby Accessories", 11.34, 1),
("Funko Pop! Disney: Gargoyles - Lexington Collectible Figure, Multicolor", "Action Figures", 7.86, 39),
("Spider-Man: Into the Spider-Verse", "Movies", 14.99, 27)