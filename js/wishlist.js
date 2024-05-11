import items from "./items.js";
import { addToWishlist, getURI, updateLinks } from "./global.js";

let rawData = getURI('v');
updateLinks(rawData);
let data = JSON.parse(atob(rawData));

console.log(data);

for(let i = 0; i < items.length; i++){
    for(let j = 0; j < data.length; j++){
        if(items[i].name == data[j].name && data[j].wishlist != 0){
            addToWishlist(items[i],data[j].wishlist);
        }
    }
}