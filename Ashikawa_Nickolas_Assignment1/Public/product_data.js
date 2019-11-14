var products = [
{    
        //Products 1 
            "product" : "Apple Macbook",
            "price" : 1200.00,
            "image": 
},
{
        //Products 2 
            "product" : "Windows Surface Pro",
            "price" : 900.00,
            "image" : "./Windows_Surface_Pro.jpeg",
},
{
        //Products 3 
            "product" : "Windows Dell",
            "price" : 1000.00,
            "image" : "./Windows_Dell.jpeg",
},
{
        //Products 4 
            "product" : "Windows Surface Laptop",
            "price" : 950.00,
            "image" : "./Windows_Surface_Laptop.jpeg",
},
];
//Referred from Lab 13
if(typeof module != 'undefined') {
    module.exports.products = products;
  }