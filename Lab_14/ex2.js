fs = require('fs');

var filename = 'user_data.json';

//Checks to see if the file exists
if (fs.existsSync(filename)) { 
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + ' characters ');    

    data = fs.readFileSync(filename, 'utf-8')

    users_reg_data = JSON.parse(data);

    console.log(users_reg_data.itm352.password);
} else {
    console.log(filename + 'does not exist');
}