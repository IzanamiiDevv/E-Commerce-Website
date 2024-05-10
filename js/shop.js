import items from "./items.js";
import { addItem } from "./global.js";

for(let i = 0; i < items.length; i++){
    addItem(items[i]);
}