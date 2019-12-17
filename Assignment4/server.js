var fs = require('fs');
const querystring = require('querystring');
var express = require('express');
var app = express();
var myParser = require("body-parser");

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


app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
    <body>
    <style>
html{
    text-align: center;
    background-image:url("./Public/Tetris_Background_Image.jpeg"); /*Background Image*/
    
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
       
    </form>
    
    
    <h2>Register Here!</h2> <!--If not login information user will go to registration page-->  
    <input type="button" name="newuser" value="New User" 
        onclick="window.location='./Public/register.html' + document.location.search;">
   <h2>Play as a Guest Without Login!</h2> <!--Allows user to go straight to the game without login-->
    <input type="button" name="Guest" value="Play as Guest"
    onclick="window.location='./Public/playbutton.html' + document.location.search;">
  </div>
</body>
    `;
    response.send(str);
});

app.

app.post("/login", function (request, response) {
    var LogError = [];
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    //Diagnostic
    the_username = request.body.username.toLowerCase();
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == request.body.password) {
            request.query.username = the_username;
            console.log(users_reg_data[request.query.username].name);
            request.query.name = users_reg_data[request.query.username].name
            response.redirect('./Public/playbutton.html');
            //Redirect them to play button here if they logged in correctly
        } else {
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username = the_username;
            req.query.password = req.body.password;
            req.query.LogError = LogError.join(';');
        }
    } else {
        LogError.push = ('Invalid Username');
        console.log(LogError);
        req.query.username = the_username;
        req.query.LogError = LogError.join(';');
    }
    response.redirect('./server')
});



app.get("/register", function (request, response) {
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
        <script>
            Register.action = "./register.html" + document.location.search;
        </script>
    </div>
</body>
    `;
    response.send(str);
});



app.post("/register", function (request, response) {
    // process a simple register form

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

        response.redirect("/login");
    } else {
        response.redirect("/register");
    }

});

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));