//Creating a server via express//
const querystring = require('querystring');
const product_data = require("./Public/product_data.js"); //get the data from product_data.js
var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));

var filename = 'user_data.json'

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.soze + 'characters');
    data = fs.readFileSync(filename, 'UTF-8');
    users_reg_data = JSON.parse(data);
} else { 
    console.log(filename + 'does not exist!');
}
//Sourced from Mark Chou//
//Go to invoice if quantity values are good, if not, redirect back to order page//

app.post("/login.html", function (req, res) {
    var LogError = [];
    console.log(req.body);
    the_username = req.body.username.toLowerCase();
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == req.body.password) {
            req.query.username = the_username;
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/Invoice.html?' + querystring.stringify(req.query));
            return;
            //Redirect them to invoice here if they logged in correctly
        } else {
            LogError.push = ('Invalid Password');
      console.log(LogError);
      req.query.username= the_username;
      req.query.password=req.body.password;
      req.query.LogError=LogError.join(';');
        }
    }
    else {
        LogError.push = ('Invalid Username');
        console.log(LogError);
        req.query.username= the_username;
        req.query.password=req.body.password;
        req.query.LogError=LogError.join(';');
    }
    res.redirect('/login.html?' + querystring.stringify(req.query));
});

app.post("/registration.html", function (req, res) {
    qstr = req.body
    console.log(qstr);
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)) {
    }
    else {
      errors.push('Use Letters Only for Full Name')
    }
    // validating name
    if (req.body.name == "") {
      errors.push('Invalid Full Name');
    }
    // length of full name is less than 30
    if ((req.body.name.length > 30)) {
      errors.push('Full Name Too Long')
    }

    var reguser = req.body.username.toLowerCase(); 
    if (typeof users_reg_data[reguser] != 'undefined') { 
      errors.push('Username taken')
    }

    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
      errors.push('Letters And Numbers Only for Username')
    }
  
    //password is min 6 characters long 
    if ((req.body.password.length < 6)) {
      errors.push('Password Too Short')
    }
    // check to see if passwords match
    if (req.body.password !== req.body.confirmpsw) { 
      errors.push('Password Not a Match')
    }
    if (errors.length == 0) {
       console.log('none');
       req.query.username = reguser;
       req.query.name = req.body.name;
       res.redirect('./Invoice.html?' + querystring.stringify(req.query))
    }
    if (errors.length > 0) {
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.confirmpsw = req.body.confirmpsw;
        req.query.email = req.body.email;

        req.query.errors = errors.join(';');
        res.redirect('registration.html?' + querystring.stringify(req.query))
    }
});

app.get("/purchase", function (req, res, next) {
    console.log(Date.now() + ': Purchase made from ip' + req.ip + 'data:' + JSON.stringify(req.query));
    //check for valid quantities//
    let GET = req.query;
    console.log(GET);
    var hasValidQuantities = true;
    var hasPurchases = false;
    for (i = 0; i < products_data.length; i++) {
        q = GET['quantity_textbox' + i];
        if (isNonNegInt(q) == false) {
            hasValidQuantities = false;
        }
    if (q>0) {
        hasPurchases = true;
    }
    console.log(hasValidQuantities, hasPurchases);
}
qString = querystring.stringify(GET); //stringing the query together
  if (hasValidQuantities == true && hasPurchases == true) { // if both hasValidQuantities and hasPurchases are true
    res.redirect('./login.html?' + querystring.stringify(req.query)); // redirect to the invoice page with the query entered in the form
  } else {    // if either hasValidQuantities or hasPurchases is false
    req.query["hasValidQuantities"] = hasValidQuantities; // request the query for hasValidQuantities
    req.query["hasPurchases"] = hasPurchases; // request the query for hasPurchases
    console.log(req.query); // log the query into the console
    res.redirect('./form.html?' + querystring.stringify(req.query)); // redirect to the form again, keeping the query that they wrote
  }


});

app.use(express.static('./Public')); //Creates a static server using express from the public folder

var listener = app.listen(8080, () => {console.log(`listening on port ` + listener.address().port) });

function checkQuantityTextbox() { 
    errs_array = isNonNegInt(quantity_textbox.value, true); 
      qty_textbox_message.innerHTML = errs_array.join(','); 
  }

function isNonNegInt(q, returnErrors = false) { 
    errors = [];
    if (q == '') q = 0; 
    if (Number(q) != q) errors.push('Not a number!'); 
    if (q < 0) errors.push('Negative value!'); 
    if (parseInt(q) != q) errors.push('Not an integer!'); 
    return returnErrors ? errors : (errors.length == 0); 
  }


function process_form(GET, response) { 
    if (typeof GET['purchase'] != 'undefined') { 
      for (i in products) { 
        let q = GET[`quantity_textbox${i}`]; 
        if (isNonNegInt(q)) { 
          receipt += eval('`' + contents + '`'); 
        } else { 
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`; //tell the user it is not a valid quantity
        }
      }
      response.send(receipt); 
      response.end(); 
    }
  }