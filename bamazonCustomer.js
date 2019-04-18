var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "**********",
    database: "bamazon_db"
  });

//   Build the table of items
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log results of the SELECT statement
    // Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
        // Need to update the table to ONLY display the IDs, names, and prices. Make it pretty.
        console.log("-----------------------")
    for (var i = 0; i < res.length; i++) {
        console.log("Item: " + res[i].item_id,
        "\n" + res[i].product_name,
        "\nPrice per Item: " + res[i].price,
        "\n-----------------------")
    }


    let questions = [
    {
        type: 'input',
        name: 'item',
    // * The first prompt should ask them the ID of the product they would like to buy.
        message: 'Which item would you like to purchase? \nPlease enter Item ID number.\n',
        validate: function(value) {
            var pass = value.match(parseFloat(value));
            // Also making sure it's an item on the list of products.
            if (pass >= res.length + 1) {
                return valid || 'Please enter a valid item number'}
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a valid item number';
          },
    },
    {
        type: 'input',
        name: 'qty',
    // * The second prompt should ask how many units of the product they would like to buy.
        message: 'How many would you like?\n',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
    }];

    inquirer.prompt(questions).then(answers => {
        const itemReq = parseInt(answers.item);
    // I'll be looking to use answers.item and answers.qty to verify.
        if ((res[itemReq - 1].stock_quantity) <= answers.qty) {   
            console.log("Unfortunately, our stock is a bit low at the moment, please come again later!");
            connection.end();
            return;
        }

//     7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        const updateQty = parseInt((res[itemReq - 1].stock_quantity) - answers.qty);
//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
        console.log(updateQty);
        // TAKE (res[itemReq - 1].stock_quantity) MINUS answers.qty), post it BACK to the table.
        connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {stock_quantity: updateQty},
            {item_id: itemReq}
        ], function(err, res) {
            if (err) {
                var x = 0;
                throw err;
            }
            // Should I be putting this inside a function and calling it outside of that?

            console.log(res.affectedRows + " products updated!\n")
        }
        
        )
// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
        const customerTotal = (res[itemReq - 1].price * answers.qty)
        // TAKE (res[itemReq - 1].price TIMES answers.qty), LOG it as the customer total.
        console.log("Thank you for your purchase. You will be billed $" + customerTotal + ".")
//    * Once the update goes through, show the customer the total cost of their purchase.
        connection.end();
    });
})
