var data = require('./Public/product_data.js'); //get the data from product_data.js
var products = data.products;

var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require("./Public/product_data.js");

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//to process the response from what is typed in the form
app.post("/process_form", function (request, response) {
   let POST = request.body;
   if (typeof POST['quantity_textbox'] != 'undefined') {
    displayPurchase(POST, response);
    
} 
});
app.use(express.static('./Public'));
app.listen(8080, () => console.log(`listening on port 8080`));