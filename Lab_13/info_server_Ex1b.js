var express = require('express'); // calls for the code to look for the express file
var app = express(); // makes express into app
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); 
    next();
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));