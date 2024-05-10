import { addItem, getParameterByName } from "./global.js";

const data = getParameterByName('data');

console.log(data);

const v = [
    {
        name:'tulip',
        wishlist:2,
        cart:2
    }
]

const stringify = JSON.stringify(v);
const encode = btoa(stringify);

console.log("encoded: ",encode);

console.log("decoded: ", JSON.parse(atob(encode)));