//Creating the array of products
//Took from SmartPhoneProducts3

var products = [
{    
        //Products 1 
            "product" : "Apple Macbook",
            "price" : 1200.00,
            "image": "./Images/Apple_Macbook.png" 
},
{
        //Products 2 
            "product" : "Windows Surface Pro",
            "price" : 900.00,
            "image" : "./Images/Windows_Surface_Pro.png"
},
{
        //Products 3 
            "product" : "Windows Dell",
            "price" : 1000.00,
            "image" : "./Images/Windows_Dell.png"
}, 
{
        //Products 4 
            "product" : "Microsoft Surface Laptop",
            "price" : 950.00,
            "image" : "./Images/Microsoft_Surface_Laptop.jpeg"
},

];

//If the module is not undefined, have the module export the data from the product_data array
//From Assignment1_Design_Examples > Asssignment1_2file > product_data.js 
if(typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products = products; //export the product_data
  }