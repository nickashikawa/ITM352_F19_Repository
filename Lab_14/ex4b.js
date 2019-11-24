var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');
app.use(myParser.urlencoded({ extended: true }));

var filename = "user_data.json";

// Only open the file if it exists
if (fs.existsSync(filename)) {
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);
}
else {
    console.log('File ' + filename + " doesnt exist!");
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" name="submit">
</form>
</body>
    `;
    response.send(str);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    let POST = request.body;
    console.log("Got registration request");

    // process a simple register form
    username = POST.username;
    users_reg_data[username] = {};
    users_reg_data[username].name = username;
    users_reg_data[username].password = POST.password;
    users_reg_data[username].email = POST.email;

    output_data = JSON.stringify(users_reg_data); 
    fs.writeFileSync(filename, output_data, 'utf-8');
    response.send ("Added user " + username);
 });

app.post("/login", function (request, response) {
    let POST = request.body;

        // User submitted a userid and password. Test them for validity.
        if (users_reg_data[POST.username] != undefined)
        {
            if (POST.password == users_reg_data[POST.username].password)
            {
                response.send("Got a good password");
            }
            else {
                response.send("Try again!");
            }
        }
        else {
            console.log ("User " + POST.username + " not found");
        }
});

app.listen(8080, () => console.log(`listening on port 8080`));