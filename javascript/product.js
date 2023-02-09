$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const itemId = urlParams.get('itemId');

    // will always redirect user to index.html if no itemId is supplied
    if (!itemId) {
        window.location.href = "index.html";
    }

    // get product details from database
    axiosInstance.get('/products/' + itemId).then(function(response) {
        console.log(response.data);
        var item = response.data;

        $("#productCategory").html(item.fields.Category);
        $("#productName").html(item.fields.Name);
        $("#productPrice").html(`$${item.fields.Price}`);
        $("#productDescription").html(item.fields.Description);
        $("#addProductButton").attr("data-id", item.id);
        $("#addProductButton").attr("data-price", item.fields.Price);
        $("#addProductButton").attr("data-name", item.fields.Name);
        $("#addProductButton").attr("data-thumbnail", item.fields.Image[0].url);
        $("#MainImg").attr("src", item.fields.Image[0].url);

        let smallImgHtml = "";

        for (let i = 0; i < item.fields.Image.length; i++) {
            smallImgHtml += `
                <div class="small-img-col">
                    <img src="${item.fields.Image[i].url}" width="100%" class="small-img" alt="">
                </div>
            `;
        }

        $(".small-img-group").html(smallImgHtml);
    
        $("#loadingSpinner").hide();
        $(".sproduct").show();
    });

    $(".small-img-group").on("click", ".small-img", function(e) {
        e.preventDefault();
        $("#MainImg").attr("src", $(this).attr("src"));
    });

    $("#addProductButton").click(function(e) {
        e.preventDefault();

        console.log("add product button clicked");

        if(!userIsLoggedIn()) {
            alert("Please login to add item to cart!");
            return;
        }


        const quantity = Number($("#productToBeAdded").val());

        console.log(quantity);

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

        addItemToCart(item, quantity);
    });
});