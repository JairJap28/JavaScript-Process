//Area function
let area = function(length, width){
    let a = length * width;
    document.write("Area of the rectangle is: " + a + " square unit</br>");
}

//Perimeter function
let perimeter = function(length, width){
    let p = 2 (length * width);
    document.write("Perimeter of the rectangle is " + p + " unit</br>");
}

//Making all this functions available in this
//module to exports that we have made
//so that we can import this module and
//use these functions whenever we want
module.exports = {
    area,
    perimeter
}