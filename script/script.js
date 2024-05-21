document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const totalPriceSpan = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout');

    let cartItems = [];

    // Add event listener for each add to cart button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productItem = event.target.closest('.product-item');
            const productName = productItem.querySelector('p').textContent;
            const productPrice = parseFloat(productItem.querySelector('.price-tag p').textContent.slice(1));

            // Add item to cart array
            cartItems.push({ name: productName, price: productPrice });

            // Update cart UI
            renderCartItems();
            updateTotalPrice();
        });
    });

    // Render cart items
    function renderCartItems() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
        });
    }

    // Update total price
    function updateTotalPrice() {
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    // Checkout button event listener
    checkoutButton.addEventListener('click', function() {
        // Implement your checkout logic here
        alert('Implement checkout logic here!');
    });
});
