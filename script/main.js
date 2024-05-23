document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cart-items'); // Use id selector
  const checkoutButton = document.getElementById('checkout'); // Use id selector

        /****-- PRODUCT MODAL --**/ 

    document.getElementById('add-product-btn').addEventListener('click', function () {
        document.getElementById('add-product-modal').style.display = 'block';
    });

    // Close the modal when the close button is clicked
    document.querySelectorAll('.close').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
            this.parentElement.parentElement.style.display = 'none';
        });
    });

    // Handle form submission for adding products
    document.getElementById('add-product-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        // Get product details from the form
        var productName = document.getElementById('product-name').value;
        var productImage = document.getElementById('product-image').value;
        var productPrice = document.getElementById('product-price').value;

        // Create a new product item
        var newProduct = document.createElement('div');
        newProduct.classList.add('product-item');
        newProduct.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <p>${productName}</p>
            <div class="price-tag">
                <p>$${productPrice}</p>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Append the new product to the grid
        document.querySelector('.grid').appendChild(newProduct);

        // Clear the form fields
        document.getElementById('product-name').value = '';
        document.getElementById('product-image').value = '';
        document.getElementById('product-price').value = '';

        // Close the modal
        document.getElementById('add-product-modal').style.display = 'none';
    });


         /******Handling the added Products*******/

        let addedProducts = []; // Array to store added products
    
        // Function to display added products
        function displayAddedProducts() {
            let addedProductsGrid = document.getElementById('added-products-grid');
            addedProductsGrid.innerHTML = ''; // Clear the grid
            addedProducts.forEach(function (product) {
                let productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <div class="price-tag">
                        <p>$${product.price}</p>
                    </div>
                    <button class="delete-product" data-id="${product.id}">Delete</button>
                    <button class="edit-product" data-id="${product.id}">Edit</button>
                `;
                addedProductsGrid.appendChild(productItem);
            });
        }
    
        // Code for adding products
        document.getElementById('add-product-btn').addEventListener('click', function () {
            document.getElementById('add-product-modal').style.display = 'block';
        });
    
        // Handle form submission for adding products
        document.getElementById('add-product-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
            // Get product details from the form
            let productName = document.getElementById('product-name').value;
            let productImage = document.getElementById('product-image').value;
            let productPrice = document.getElementById('product-price').value;
    
            // Create a unique ID for the product
            let productId = 'product_' + Date.now();
    
            // Add the product to the array
            addedProducts.push({
                id: productId,
                name: productName,
                image: productImage,
                price: productPrice
            });
    
            // Display the added products
            displayAddedProducts();
    
            // Clear the form fields
            document.getElementById('product-name').value = '';
            document.getElementById('product-image').value = '';
            document.getElementById('product-price').value = '';
    
            // Close the modal
            document.getElementById('add-product-modal').style.display = 'none';
        });
    
        // Event delegation for delete and edit buttons
        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('delete-product')) {
                let productId = event.target.dataset.id;
                // Find and remove the product from the array
                addedProducts = addedProducts.filter(function (product) {
                    return product.id !== productId;
                });
                // Update the displayed products
                displayAddedProducts();
            } else if (event.target.classList.contains('edit-product')) {
                let productId = event.target.dataset.id;
                // Find the product in the array
                let product = addedProducts.find(function (product) {
                    return product.id === productId;
                });
                if (product) {
                    // Prefill the form with product details
                    document.getElementById('product-name').value = product.name;
                    document.getElementById('product-image').value = product.image;
                    document.getElementById('product-price').value = product.price;
                    // Display the modal for editing
                    document.getElementById('add-product-modal').style.display = 'block';
                }
            }
        });

    









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
      });
  });

  // Render cart items
  function renderCartItems() {
      cartItemsList.innerHTML = '';
      cartItems.forEach(item => {
          const div = document.createElement('div');
          div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          cartItemsList.appendChild(div);
      });
  }

  // Checkout button event listener
  checkoutButton.addEventListener('click', function() {
      // Implement your checkout logic here
      alert('Implement checkout logic here!');
  });
});

// products
const products = [
  { id: 1, name: 'Wrist Watch', price: 120.00, img: '/img/watch.jpg' },
  { id: 2, name: 'Polaroid Camera', price: 120.00, img: '/img/camera.jpg' },
  { id: 3, name: 'Facial Makeup Cream', price: 120.00, img: '/img/facialcream.jpg' },
  { id: 4, name: 'Ladies Perfume', price: 120.00, img: '/img/ladyperfume2.jpg' },
  { id: 5, name: 'Facial Cream', price: 120.00, img: '/img/facialcream.jpg' },
  { id: 6, name: 'Makeup Brush', price: 120.00, img: '/img/makeupbrush.jpg' },
  { id: 7, name: "Men's Perfume", price: 120.00, img: '/img/menperfume.jpg' },
  { id: 8, name: 'Ladies Deospray', price: 120.00, img: '/img/dedorant.jpg' }
];

let cart = [];

// Function to add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      updateCartCount();
      console.log(`Added to cart: ${product.name}`);
  }
}

// Function to update cart count
function updateCartCount() {
  let totalCount = 0;
  let totalPrice = 0;
  cart.forEach(item => {
      totalCount += item.quantity;
      totalPrice += item.price * item.quantity;
  });
  document.getElementById('cart-count').textContent = totalCount;
  document.getElementById('cart-total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to render cart items
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.innerHTML = `
          <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
          <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
  });
}


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (event) => {
          const productItem = event.target.closest('.product-item');
          const productIndex = Array.from(productItem.parentNode.children).indexOf(productItem);
          const productId = products[productIndex].id;
          addToCart(productId);
      });
  });

  document.getElementById('view-cart').addEventListener('click', () => {
      renderCart();
      document.getElementById('cart-modal').style.display = 'block';
  });

  document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'none';
  });
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == document.getElementById('cart-modal')) {
      document.getElementById('cart-modal').style.display = 'none';
  }
}


