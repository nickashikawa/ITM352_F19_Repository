var products = [
{    
        //Products 1 
            "product" : "Apple Macbook",
            "price" : 1200.00,
            "image": "./Apple_Macbook.png" 
},
{
        //Products 2 
            "product" : "Windows Surface Pro",
            "price" : 900.00,
            "image" : "./Windows_Surface_Pro.png"
},
{
        //Products 3 
            "product" : "Windows Dell",
            "price" : 1000.00,
            "image" : "./Windows_Dell.png"
}, 
{
        //Products 4 
            "product" : "Microsoft Surface Laptop",
            "price" : 950.00,
            "image" : "./Microsoft_Surface_Laptop.jpeg"
},

];
//Referred from Lab 13
if(typeof module != 'undefined') {
    module.exports.products = products;
  }