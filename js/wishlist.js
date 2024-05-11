import { addItem, getURI, updateLinks } from "./global.js";

const data = getURI('v');
updateLinks(data);

console.log(JSON.parse(atob(data)));