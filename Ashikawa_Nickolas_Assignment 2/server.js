//Creating a server via express//
var data = require('./Public/product_data.js'); //get the data from product_data.js
var products = data.products;

var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
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

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./Public')); //Creates a static server using express from the public folder

// Login server code from Lab 14//

var filemame = 'user_data.json'
if (false.existsSync(filename)) {
    stats = fs.statSync(filemame);
    console.log(filemame + 'has' + stats.size + 'characters');
    data = fs.readFileSync(filemame, 'utf-8')
    users_reg_data = JSON.parse(data);
} else {
    console.log(filemame + 'does not exist!');
}

app.post("./Login_Form.html", function (req, res) {
    var LogError = [];
    console.log(req.body);
    console.log(request.body);
    //Diagnostic
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == request.body.password) {
            response.send(the_username + " Logged In!");
            //Redirect them to invoice here if they logged in correctly
        } else {
            response.redirect('./registration.html');
        }
        //See's if password matches what was typed
    }

    //To make username case sensitive//
    //https://www.w3schools.com/jsref/jsref_tolowercase.asp//
    the_username = req.body.username.toLowerCase();
    if (typeof users_reg_data[the_username] != 'undefined') { //checks with JSON data to see if username already exists//
        if (users_reg_data[the_username].password == req.body.password) { //make sure that password matches exactly//
            req.query.username = the_username;
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/invoive.html?' + querystring.stringify(req.query));
            return;
        } else {
            LogError.push = ('Invalid Password')
            console.log(LogError);
            req.query.username = the_username;
            req.query.password = req.body.password;
            req.query.LogError = LogError.join(';');
        }
        res.redirect('./Login_Form.html?' + querystring.stringify(req.query));

    }
});

app.post("/register.html", function (req, res) {
    qstr = req.body
    console.log(qstr);

    //username should have a minimum of 4 characters and maximum of 10//



    //Checking for name to have only letters to be valid//
    //https://www.w3resource.com/javascript/form/all-letters-field.php//
    if (/^[A-Az-z]+$/.test(req.body.name)) {

    }
    else {
        nameerrors.push('Letters Only')
    }

    //check if username exists// //Taken from Lab 14 ex4c.js//
    //Validate: User must not exist already, case sensitive,password certain length with certain characters, email is email

    //Save new user to file name (users_reg_data)
    username = request.body.username;

    //Checks to see if username already exists
    errors = [];
    //If array stays empty move on
    if (typeof users_reg_data[username] != 'undefined') {
        errors.push("Username is Taken");
    }
    console.log(errors, users_reg_data);
    if (errors.length == 0) {
        users_reg_data[username] = {};
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;

        fs.writeFileSync(filename, JSON.stringify(users_reg_data));

        response.redirect("./Login_Form.html");
    } else {
        response.redirect("./registration.html");
    }
});
//check if password is valid//
//check if confirmed password is valid with the first password//
//check if email is valid//


//If valid send to invoice, if not send back to form//
function process_quantity_form(POST, response) {
    if (typeof POST['login_submit'] != 'undefined') {
        //Checks if username exists
        var qString = querystring.stringify(POST);
        the_username = POST.username;
        if (typeof reg_user_data[the_username] != 'undefined') {
            if (reg_user_data[the_username].password == POST.password) {
                response.redirect('Invoice.html?' + qString);
            } else {
                response.redirect('Login_Form.html');
            }
        }
    }
}

app.listen(8080, () => console.log(`listen on port 8080`))
