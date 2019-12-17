var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
const querystring = require('querystring');

app.use(myParser.urlencoded({ extended: true }));
var filename = 'user_data.json';

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + ' characters');

    data = fs.readFileSync(filename, 'utf-8');

    users_reg_data = JSON.parse(data);

} else {
    console.log(filename + ' does not exist!');
}


app.post("login", function (request, response) {
    // Give a simple login form
    str = `
    <body>
    <style>
html{
    text-align: center;
    background-image:url("Tetris_Background_Image.jpeg"); /*Background Image*/
    
}
body{
    height:50%;
    display:table; 
    width:50%;
}
#login{
  
 
    vertical-align:middle;
    background-color: beige;	
    
	
}
</style>
<div id= login>
    <h1>Tetris Login</h1> 
    <p>To play you must be a member<br> Login or Register as Player 1</p> <!--Login for player 1-->
    <form name="login for player 1" method="POST">
    
        <input type="text" name="username" id="username" size="40" placeholder="Enter Username" required><br />
        <input type="password" name="password" size="40" placeholder="Enter Password" onkeyup="" required><br />
        <input type="submit" value="Login" name="login"><br />
        
</form>
<script>
login.action = "login" + document.location.search;
</script>
    </form>
    
    
    <h2>Register Here!</h2> <!--If not login information user will go to registration page-->  
    <input type="button" name="newuser" value="New User" 
        onclick="window.location='register.html' + document.location.search;">
   <h2>Play as a Guest Without Login!</h2> <!--Allows user to go straight to the game without login-->
    <input type="button" name="Guest" value="Play as Guest"
    onclick="window.location='play_button.html' + document.location.search;">
  </div>
</body>
    `;
    response.send(str);
});

app.post("/logUserin", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    //Diagnostic
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == request.body.password) {
            response.redirect('play_button.html');
            //Redirect them to play button here if they logged in correctly
        } else {
            response.redirect('server.js');
        }

    }
});



app.get("/registerUser", function (request, response) {
    // Give a simple register form
    str = `
    <body>
    <div>
        <form method="POST" action="" name="Register">
            <input type="text" name="fullname" size="40" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+"
                placeholder="Enter First & Last Name"><br />
            <input type="text" name="username" size="40" pattern=".[a-z0-9]{3,10}" required
                title="Minimum 4 Characters, Maximum 10 Characters, Numbers/Letters Only"
                placeholder="Enter Username"><br />
            <input type="email" name="email" size="40" placeholder="Enter Email"
                pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]{3,}$" required title="Please enter valid email."><br />
            <input type="password" id="password" name="password" size="40" pattern=".{8,}" required
                title="8 Characters Minimum" placeholder="Enter Password"><br />
            <input type="password" id="repeat_password" name="repeat_password" size="40" pattern=".{8,}" required
                title="8 Characters Minimum" placeholder="Repeat Password"><br />
            <input type="submit" value="Register" id="submit">
        </form>
    </div>
</body>
    `;
    response.send(str);
});



app.post("/registerMember", function (request, response) {
    console.log(querystring);


    var errors = []; //assume no errors at first,

    //name contains only letters 
    if (/^[A-Za-z" "]+$/.test(request.body.name)) {
    }
    else {
        errors.push('Invalid character, only use letters for name!')
    }

    // length of full name is between 0 and 25 
    if ((request.body.name.length > 25 && request.body.name.length < 0)) {
        errors.push('Full Name Too Long')
    }



    //checks to see if username already exists

    var reguser = request.body.username.toLowerCase();
    if (typeof users_reg_data[reguser] != 'undefined') {
        errors.push('Username taken')
    }
    //validating username 
    //Check letters and numbers only

    if (/^[0-9a-zA-Z]+$/.test(request.body.username)) {
    }
    else {
        errors.push('Please only use letters and numbers for username')
    }
    if ((request.body.username.length < 5 && request.body.username.length > 20)) {
        errors.push('username must be between 5 and 20 characters')
    }
    //validating password 
    //password is min 6 characters long 
    if ((request.body.password.length < 5)) {
        errors.push('Password must be longer than 5 characters')
    }
    // check to see if passwords match
    if (request.body.password !== request.body.passConfirm) {
        errors.push('Passwords do not match!')
    }




    // if there are no errors, save the json data and send user to the invoice

    if (errors.length == 0) {
        console.log('none!');
        request.query.username = reguser;
        request.query.name = request.body.name;
        response.redirect('./play_button.html?' + querystring.stringify(request.query))

        user_data_JSON = fs.readFileSync(filename, 'utf-8');
        user_data = JSON.parse(user_data_JSON);
        fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    }
    if (errors.length > 0) {
        console.log(errors)
        request.query.name = request.body.name;
        request.query.username = request.body.username;
        request.query.password = request.body.password;
        request.query.confirmpsw = request.body.confirmpsw;
        request.query.email = request.body.email;

        request.query.errors = errors.join(';');
        response.redirect('./register.html?' + querystring.stringify(request.query)) //trying to add query from registration page and invoice back to register page on reload
    }

    //add errors to querystring

}
);

app.use(express.static('./Public'));
app.listen(8080, () => console.log(`listening on port 8080`));