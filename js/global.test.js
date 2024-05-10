function addItem({img,name,price}){
    const temp = `
<div class="box">
    <a href="" class="fas fa-eye"></a>
    <div class="price">$${price}</div>
    <img src="${img}" class="image">
    <div class="name">${name}</div>
    <input type="number" name="product_quantity" value="1" min="0" class="qty">
    <input type="submit" value="add to wishlist" name="add_to_wishlist" class="option-btn">
    <input type="submit" value="add to cart" name="add_to_cart" class="btn">
</div>
`

    document.getElementById('item-container').innerHTML += temp;
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export { addItem, getParameterByName };