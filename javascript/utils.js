const AIRTABLE_API_KEY = "patRgUH9Rcn6kS52E.bbed58defa5c76d075bc6052ebb1dc7389fff8f290360716d868ae1fd1c53d4b";

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appgzJKZmNGJoa4IH',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
  }
});

function userIsLoggedIn() {
    const userId = localStorage.getItem('user');
    return userId ? true : false;
}

function addItemToCart(item, qty = 1) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemInCart = cart.find(i => i.id === item.id);

    if (itemInCart) {
        itemInCart.quantity += qty;
        alert("Item quantity updated!");
    } else {
        cart.push({
            ...item,
            quantity: qty
        });
        alert("Item added to cart!");
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

$(document).ready(function() {
    $("#logoutButton").click(function(e) {
        e.preventDefault();

        console.log("Logout clicked");
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    });
   
    
    $("#profileIcon").click(function(e) {
        e.preventDefault();

        console.log("Profile clicked");
    
        if (userIsLoggedIn()) {
            window.location.href = '/profile.html';
        } else {
            window.location.href = '/login.html';
        }
    });

    $("#search").submit(function(e) {
        e.preventDefault();

        console.log("Search submitted");
        const searchValue = $("#searchValue").val();
        window.location.href = `/shop.html?searchKeyword=${searchValue}`;
    });
});

