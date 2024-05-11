function addItem({img, name, price}) {
    const temp = `
        <div class="box">
            <a href="" class="fas fa-eye"></a>
            <div class="price">$${price}</div>
            <img src="${img}" class="image">
            <div class="name">${name}</div>
            <input type="number" name="product_quantity" value="1" min="0" class="qty">
            <input type="submit" value="add to wishlist" name="add_to_wishlist" class="option-btn add-to-wishlist">
            <input type="submit" value="add to cart" name="add_to_cart" class="btn add-to-cart">
        </div>
    `;

    const itemContainer = document.getElementById('item-container');
    itemContainer.innerHTML += temp;

    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const quantity = button.parentElement.querySelector('.qty').value - 0;
            const name = button.parentElement.querySelector('.name').innerHTML;
            updateQuantity(name, 'wishlist', quantity);
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantity = button.parentElement.querySelector('.qty').value - 0;
            const name = button.parentElement.querySelector('.name').innerHTML;
            updateQuantity(name, 'cart', quantity);
        });
    });
}

function addToWishlist({img, name, price}, count){
    const temp = `
    <form class="box">
        <a href="" class="fas fa-times" onclick=""></a>
        <a href="" class="fas fa-eye"></a>
        <img src="${img}" class="image">
        <div class="name">${name} x ${count}</div>
        <div class="price">$${price} > $${getTotal(price, count)}</div>
        <input type="submit" value="add to cart" name="add_to_cart" class="btn"> 
    </form>
    `;

    const itemContainer = document.getElementById('item-container');
    itemContainer.innerHTML += temp;


}

function getTotal(price, count){
    return price * count;
}

let data = [];

try {
    data = JSON.parse(atob(getURI('v')))
} catch (error) {
    data = [];
}

function updateQuantity(itemName, type, quantity) {
    const existingItem = data.find(item => item.name === itemName);

    if (existingItem) {
        if(type == 'cart'){
            existingItem.cart = quantity;
        }else {
            existingItem.wishlist = quantity;
        }
    } else {
        if(type == 'cart'){
            data.push({
                name: itemName,
                wishlist: 0,
                cart: quantity
            });
        }else {
            data.push({
                name: itemName,
                wishlist: quantity,
                cart: 0
            });
        }
    }

    console.log(data);
    const hashed = btoa(JSON.stringify(data));
    console.log(hashed);
    updateLinks(hashed);
}

function updateLinks(data){
    const pageUrls = [
        'home.html',
        'about.html',
        'wishlist.html',
        'cart.html',
        'shop.html',
        'search_page.html'
    ];

    pageUrls.forEach(url => {
        const links = document.querySelectorAll(`a[href*="${url}"]`);
        links.forEach(link => {
            let clear = "";

            const index = link.href.indexOf('?');
            if (index !== -1) {
                clear = link.href.substring(0, index);
            } else {
                clear = link.href;
            }

            const query = `${clear}?v=${data}`;
            link.setAttribute('href', query);
        });
    });
}



function getURI(name='v', url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export { addToWishlist, addItem, getURI, updateLinks };