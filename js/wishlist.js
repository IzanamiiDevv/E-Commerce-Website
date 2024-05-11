import { addToWishlist, getURI, updateLinks } from "./global.js";

let data = getURI('v');
updateLinks(data);
let paresed = JSON.parse(atob(data));

addToWishlist();