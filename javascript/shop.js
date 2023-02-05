const AIRTABLE_API_KEY = "patRgUH9Rcn6kS52E.bbed58defa5c76d075bc6052ebb1dc7389fff8f290360716d868ae1fd1c53d4b";

const products = axios.create({
  baseURL: 'https://api.airtable.com/v0/appgzJKZmNGJoa4IH/products/recq5mRkoc0LXGpLC',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
  }
});

function getItem(){
    $("#item-list").html(`
    <div class="spinner-border text-primary" role="status"></div>
    `);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const searchKeyword = urlParams.get('searchKeyword');

    console.log(searchKeyword)

    const query = searchKeyword ? `?filterByFormula=SEARCH('${searchKeyword}'%2C+%7Bname%7D)` : "";


    axiosInstance.get(`items${query}`).then((response) => {
        const items = response.data.records;
        console.log(items)
        let formattedItems = "";

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
    
            formattedItems += `
                <div class="product text-center col-lg-3 col-md-4 col-12">
                    <img class="img-fluid mb-3" src="products/oil3-fc-pastels.jpg" alt="">
                    <h5 class="p-name">Faber Castell Oil Pastels 12 Colours</h5>
                    <h4 class="p-price"> $4.00</h4>
                    <button class="buy-btn">Buy Now</button>
                    </div>
                </div>
            `
        }
        $("#item-list").html(formattedItems);
    });







}