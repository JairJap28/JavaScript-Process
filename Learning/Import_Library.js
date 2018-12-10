document.write("</br><h1>Importing Module</h1>");
            
//Importing the module library containing
//area and perimeter function.
// " ./" is used if both the files are in the same folder 
const lib = require('./library.js');

let length = 10;
let width = 5;
            
//Calling the functions
//define in the lib module
lib.area(length, width);
lib.perimeter(length, width);