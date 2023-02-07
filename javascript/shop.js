const AIRTABLE_API_KEY = "patRgUH9Rcn6kS52E.bbed58defa5c76d075bc6052ebb1dc7389fff8f290360716d868ae1fd1c53d4b";

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appgzJKZmNGJoa4IH',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
  }
});

{/* <div class="text-center">
            <div class="spinner-border" role="status">
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_XgfqoVFulv.json"  background="transparent"  speed="1"  style="width: 600px; height: 600px;
            justify-content:center; align-items:center; display:flex;"  loop  autoplay></lottie-player>
            
            </div>
        </div> */}

$(document).ready(function () {
    function getItem(){
        // loading screen
        $("#product-list").html(`
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_XgfqoVFulv.json"  background="transparent"  speed="1" style="width: 600px; height: 600px; margin-left: 430px;" loop autoplay></lottie-player>
                </div>
            </div>
        `);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const searchKeyword = urlParams.get('searchKeyword');

        console.log("current search keywords", searchKeyword)

        const query = searchKeyword ? `?filterByFormula=SEARCH('${searchKeyword}'%2C+%7Bname%7D)` : "";

        console.log("calling air table")
        axiosInstance.get(`/products${query}`).then((response) => {
            console.log("response from airtable", response);
            const items = response.data.records;

            let formattedItems = "";

            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                console.log(item)
        
                formattedItems += `
                    <div class="product text-center col-lg-3 col-md-4 col-12">
                        <div class="imageZ">
                        <img class="img-fluid mb-3" src="${item.fields.Image[0].url}" alt="image" class="image">
                        </div>
                        <h5 class="p-name">${item.fields.Name}</h5>
                        <h4 class="p-price">$${item.fields.Price.toFixed(2)}</h4>
                        <button 
                            class="add-btn" 
                            data-id="${item.id}"
                            data-price="${item.fields.Price}"
                            data-name="${item.fields.Name}"
                            data-thumbnail="${item.fields.Image[0].url}"
                        ><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                    </div>
                `
            }
            //display after the loading screen
            $("#product-list").html(formattedItems);
        });
    }

    getItem();

    function addItemToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemInCart = cart.find(i => i.id === item.id);

        if (itemInCart) {
            itemInCart.quantity++;
            alert("Item quantity updated!");
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
            alert("Item added to cart!");
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    }

    $("#product-list").on("click", ".add-btn", function (event) {
        event.preventDefault();

        const itemId = $(this).data("id");
        const price = $(this).data("price");
        const name = $(this).data("name");
        const thumbnail = $(this).data("thumbnail");

        const item = {
            id: itemId,
            price: price,
            name: name,
            thumbnail: thumbnail
        };

        addItemToCart(item);
    });
});