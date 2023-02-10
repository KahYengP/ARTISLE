$(document).ready(function () {
    //loading screen
  $("#summary-products").html(`
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_XgfqoVFulv.json"  background="transparent"  speed="1" style="width: 600px; height: 600px; margin-left: 440px" loop autoplay></lottie-player>
  </div>
</div>
`);

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
              <img src="${item.thumbnail}" alt="image" width="80px" class="product-img">
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

  //remove items from the shopping cart
  $("#summary-products").on("click", ".product-close-btn", function () {
    const id = $(this).data("id");
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
  });


  //increase quantity
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

  //decrease quantity 
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
    if (cart.length === 0) {
      alert("Please add some items to cart");
      return;
    }

    const userId = localStorage.getItem("user");

    axiosInstance.get(`/users/${userId}`).then((res) => {
      const userData = res.data;
      console.log(userData);

      const prevOrders = JSON.parse(userData.fields.orders || "[]");

      const newOrders = [
        ...prevOrders,
        {
          checkoutDate: new Date().toISOString(),
          cart,
          total: Number($("#total").text()),
          pointsAccumulated: Math.ceil(Number($("#total").text()) * 0.1),
        },
      ];
      
      const points = newOrders.reduce((acc, order) => {
        return acc + order.pointsAccumulated;
      }, 0);

      axiosInstance.patch("/users", {
        records: [
          {
            id: userData.id,
            fields: {
              orders: JSON.stringify(newOrders),
              points,
            },
          },
        ]
      }).then((res) => {
        console.log(res);
      });
    });

    alert("Thank you for your purchase!, Points have been updated");
    // API to save cart to airtable to do
    localStorage.removeItem("cart");
    location.reload();
  });
});

