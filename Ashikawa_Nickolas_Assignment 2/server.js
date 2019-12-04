//Creating a server via express//
const querystring = require('querystring');
var products = require("./Public/product_data.js"); //get the data from product_data.js
var filename = 'user_data.json'
var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");
var qs = require('querystring');
var qstr = {};
var laptopquantity = {};

app.use(myParser.urlencoded({ extended: true }));

//Sourced from Mark Chou//
//Go to invoice if quantity values are good, if not, redirect back to order page//
app.get("/login.html", function (request, response) {
    //check for valid quantities//
    //look up request.query//
    laptopquantity = request.query;
    params = request.query;
    console.log(params);
    if (typeof params['purchase_submit'] != 'undefined') {
        has_errors = false;
        total_qty = 0;
        for (i = 0; i < products.length; i++) {
            if (typeof params[`quantity${i}`] != 'undefined') {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true;
                }
            }
        }
        qstr = querystring.stringify(request.query);
        if (has_errors || total_qty == 0) {
            qstr = querystring.stringify(request.query);
            response.redirect("Products_display.html?" + qstr);
        } else {
            response.redirect("login.html?" + qstr);
        }
    }
});

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}

fs = require('fs');

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file

    data = fs.readFileSync(filename, 'UTF-8');
    users_reg_data = JSON.parse(data);
}

//To login page//
app.get("/login.html", function (request, response) {
    //Request to have access to login
    str = `
     <html lang="en">
     <link href="products_style.css" rel="stylesheet">
     <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie-edge">
     <title>Login Page</title>
     
     </head>
     <body>

    <h1>Laptop Shop Login Page!</h1>
    <p>To buy my products you must<br> login or register as a member</p>
    <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="Enter Username"><br />
        <input type="password" name="password" size="40" placeholder="Enter Password"><br />
        <input type="submit" value="Submit" id="submit">
    </form>
</body>

<h2>Register Here!</h2>

<body>
    <div>
        <form action="./registration.html">
            <input type="submit" value="Register" id="Register_Here" name="Register_Here">
        </form>

    </div>

</body>
</html>
`;
    response.send(str);
});
app.post("/login.html", function (request, response) {
    console.log(laptopquantity);
    the_username = request.body.username
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == request.body.password) {
            theQuantQuerystring = qs.stringify(laptopquantity);
            response.redirect('/Invoice.html?' + theQuantQuerystring + `&username=${the_username}`);
            //Redirect them to invoice here if they logged in correctly
        } else {
            response.redirect('/login.html?');
        }
    }
});

app.get("/registration.html", function (request, response) {

    str = `
    <html lang="en">
<script>src="server.js"</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registration Page</title>
</head>

<body>

    <form action="" onsubmit=validatePassword() method="POST" name="Registration_Form">
        <table>
            <tr>
                <th colspan="2">Registration Form</th>
            </tr>
            <tr>
                <td><label for="Username">Username:</label></td>
                <td><input type="text" name="Username" value="" id="Username"></td>
            </tr>
            <tr>
                <td><label for="Name">First Name:</label></td>
                <td><input type="text" name="Name" value="" id="Name"></td>
            </tr>
            <tr>
                <td><label for="Name">Last Name:</label></td>
                <td><input type="text" name="Name" value="" id="Name"></td>
            </tr>
            <tr>
                <td><label for="Password">Password</label></td>
                <td><input type="password" name="Pass" value="" id="Password"></td>
            </tr>
            <tr>
                <td><label for="ConfirmPass">Confirm Password:</label></td>
                <td><input type="password" name="ConfirmPass" value="" id="ConfirmPass"></td>
            </tr>
            <tr>
                <td><label for="Email">Email:</label></td>
                <td><input type="text" name="Email" value="" id="Email"></td>
            </tr>
            <tr>
                <td colspan="2" id="submit_reg"><input type="submit" name="submit" value="Register"></td>
            </tr>

        </table>

    </form>
</body>

</html>`;
    response.send(str);
});

app.post("/registration.html", function (request, response) {
    console.log(laptopquantity);
    the_username = request.body.username;
    username = request.body.username;
    errors = [];

    if (typeof users_reg_data[username] != 'undefined') {
        errors.push("Username is already taken");
    }

    console.log(errors, users_reg_data);

    if (errors.length == 0) {
        users_reg_data[username] = {};
        users_reg_data[username].username = request.body.username
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;
        users_reg_data[username].fullname = request.body.fullname;

        fs.writeFileSync(filemame, JSON.stringify(users_reg_data));
        theQuantQuerystring = qs.stringify(laptopquantity);
        response.redirect("/Invoice.html?" + theQuantQuerystring + `&username=${the_username}`);
    } else {
        response.redirect('/registration.html?' + 'try again'); //if there are errors, send back to registration page to retype
    }
});

app.all("*", function(request, response, next) {
    console.log(request.method, request.path)
    next();
});

app.use(express.static('./Public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listening on port 8080`))

