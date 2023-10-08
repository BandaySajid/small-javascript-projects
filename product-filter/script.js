const priceRangeLabel = document.querySelector('.price-range-label');
const priceRangeInput = document.querySelector('#price-range');
const products_container = document.querySelector('.products-container');
const searchInput = document.querySelector('.search-input');
const categoryELements = document.querySelectorAll('.category');

const categories = {
    mobile: [
        { title: "iPhone 13 Pro", price: 999.99 },
        { title: "Samsung Galaxy S22 Ultra", price: 1199.99 },
    ],

    computer: [
        { title: "MacBook Air", price: 1299.99 },
        { title: "Dell XPS 13", price: 899.99 },
        { title: "Sony 65-inch 4K Smart TV", price: 899.99 },
    ],

    watch: [
        { title: "Fitbit Versa 3 Smartwatch", price: 229.99 },
    ],

    headphone: [
        { title: "Apple AirPods Pro", price: 249.99 },
        { title: "Amazon Echo Dot (3rd Gen)", price: 39.992 },
        { title: "Bose QuietComfort 35 II Headphones", price: 299.99 },
    ],

    other: [
        { title: "Canon EOS Rebel T7i DSLR Camera", price: 649.99 },
        { title: "PlayStation 5", price: 499.99 },
        { title: "Nintendo Switch", price: 299.990 },
        { title: "Xbox Series X", price: 499.99 },
        { title: "Google Nest Thermostat", price: 199.99 },
        { title: "Keurig K-Elite Coffee Maker", price: 149.99 },
    ]
};

const render_products = (products) => {
    products_container.innerHTML = '';
    for (const product of products) {
        const product_div = document.createElement('div');
        product_div.classList.add('product');
        const product_title = document.createElement('p');
        product_title.classList.add('product-title');
        product_title.textContent = product.title;
        const product_price = document.createElement('p');
        product_price.classList.add('product-price');
        product_price.textContent = '$' + product.price;
        const productImage = document.createElement('img');
        productImage.src = 'https://source.unsplash.com/random/250x250?sig=product';
        product_div.appendChild(productImage);
        product_div.appendChild(product_title);
        product_div.appendChild(product_price);
        products_container.appendChild(product_div)
    };
};

const sortProducts = (category) => {
    const search = searchInput.value;
    const price_range = priceRangeInput.value;

    let sorted_products = [];

    if (category && category !== 'all') {
        sorted_products = categories[category].filter((product) => {
            return product.price <= price_range && product.title.toLowerCase().includes(search.toLowerCase());
        });
    }else{
        Object.keys(categories).map((cat)=>{
            const prods = categories[cat].filter((product)=>{
                return product.price <= price_range && product.title.toLowerCase().includes(search.toLowerCase());
            });
            sorted_products = sorted_products.concat(prods);
        });
    }
    render_products(sorted_products)
};


categoryELements.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        console.log(event.target.id)
        sortProducts(event.target.id);
    });
})

priceRangeInput.addEventListener('input', (event) => {
    priceRangeLabel.textContent = "$" + event.target.value;
    sortProducts()
});
searchInput.addEventListener('input', () => {
    sortProducts()
});

sortProducts();