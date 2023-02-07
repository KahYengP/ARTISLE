$(document).ready(function () {
    //loading screen
  $("#summary-products").html("loading...");

  //get item from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    $("#summary-products").html("No items in cart");
  } else {
    $("#summary-products").html("");
    cart.forEach((item) => {
      $("#summary-products").append(`
        <div class="product-card">
          <div class="card">
            <div class="img-box">
              <img src="${item.thumbnail}" alt="Green tomatoes" width="80px" class="product-img">
            </div>
            <div class="detail">
              <h4 class="product-name">${item.name}</h4>
              <div class="wrapper">
                <div class="product-qty">
                  <button id="decrement" data-id="${item.id}">
                    <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <span id="quantity">${item.quantity}</span>
                  <button id="increment" data-id="${item.id}">
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </div>
                <div class="price">
                  $<span id="price">${item.price}</span>
                </div>
              </div>
            </div>
            <button class="product-close-btn" data-id="${item.id}">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </div>
      `);
    });
  }

   // function: for calculating total amount of product price
   function totalCalc() {
    // declare all initial variable
    const tax = 0.05;
    let subtotal = 0;
    let totalTax = 0;
    let total = 0;
  
    // loop: for calculating `subtotal` value from every single product
    for (let i = 0; i < cart.length; i++) {
      subtotal += Number(cart[i].quantity) * Number(cart[i].price);
    }
  
    // show the `subtotal` variable value on `subtotalElem` element
    $("#subtotal").text(subtotal.toFixed(2));
  
    // calculating the `totalTax`
    totalTax = subtotal * tax;
  
    // show the `totalTax` on `taxElem` element
    $("#tax").text(totalTax.toFixed(2));
  
    // calcualting the `total`
    total = subtotal + totalTax;
  
    // show the `total` variable value on `totalElem` & `payAmountBtn` element
    $("#total").text(total.toFixed(2));
    $("#total-in-button").text(`$${total.toFixed(2)}`);
  }

  totalCalc();

  $("#summary-products").on("click", ".product-close-btn", function () {
    const id = $(this).data("id");
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
  });

  $("#summary-products").on("click", "#increment", function () {
    const id = $(this).data("id");
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
  });

  $("#summary-products").on("click", "#decrement", function () {

    const id = $(this).data("id");
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity--;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
  });

  $("#checkout-btn").click(function () {
    alert("Thank you for your purchase!");
    // API to save cart to airtable to do
    localStorage.removeItem("cart");
    location.reload();
  });
});

