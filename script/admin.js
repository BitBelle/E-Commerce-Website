const addProductForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('name').value;
    const productPrice = document.getElementById('price').value;
    const productImage = document.getElementById('image').value;

    // Send request to server to add new product
    fetch('/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: productName, price: productPrice, image: productImage })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // Update product list
        fetchProducts();
    })
    .catch((error) => console.error(error));
});

function fetchProducts() {
    fetch('/products.json')
    .then((response) => response.json())
    .then((products) => {
        productList.innerHTML = '';
        products.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(listItem);
        });
    })
    .catch((error) => console.error(error));
}

fetchProducts();

fetch('/products.json')
.then((response) => response.json())
.then((products) => {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <div class="price-tag">
                <p>$${product.price}</p>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(productItem);
    });
})
.catch