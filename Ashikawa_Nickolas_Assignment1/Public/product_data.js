var products = 
[
        //Products 1
            products1 = {
            "brand1" : "Apple Macbook",
            "price1" : 1200.00,
            "image1" : "/Users/nickolasashikawa/Documents/GitHub/ITM352_F19_Repository/Ashikawa_Nickolas_Assignment1/Public/images/Apple_Macbook.jpeg",
        },

        //Products 2
            products2 = {
            "brand2" : "Windows Surface Pro",
            "price2" : 900.00,
            "image2" : "./Windows_Surface_Pro.jpeg",
        },

        //Products 3
            products3 = {
            "brand3" : "Windows Dell",
            "price3" : 1000.00,
            "image3" : "./Windows_Dell.jpeg",
        },

        //Products 4
            products4 = {
            "brand4" : "Windows Surface Laptop",
            "price4" : 950.00,
            "image4" : "./Windows_Surface_Laptop.jpeg",
        },
];
if(typeof module != 'undefined') {
    module.exports.products = products;
  }