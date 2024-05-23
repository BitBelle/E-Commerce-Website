// document.addEventListener('DOMContentLoaded', function () {
//     const apiUrl = 'http://localhost:3000'; // Your JSON server URL
//     let products = [];
//     let cart = [];

//     const cartItemsList = document.getElementById('cart-items');
//     const cartModal = document.getElementById('cart-modal');
//     const cartCount = document.getElementById('cart-count');
//     const checkoutButton = document.getElementById('checkout');
//     const closeModalButton = document.querySelector('.close');
//     const cartMessage = document.getElementById('cart-message');

//     // Fetch products from JSON server
//     async function fetchProducts() {
//         try {
//             const response = await fetch(`${apiUrl}/products`);
//             products = await response.json();
//             console.log('Fetched products:', products); // Debugging statement
//             renderProducts();
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     }

//     // Render products
//     function renderProducts() {
//         console.log('Rendering products...');
//         const productGrid = document.querySelector('.grid');
//         productGrid.innerHTML = ''; // Ensure the grid is empty before rendering
//         products.forEach(product => {
//             const productItem = document.createElement('div');
//             productItem.classList.add('product-item');
//             productItem.dataset.id = product.id;
//             productItem.innerHTML = `
//                 <img src="${product.img}" alt="${product.name}">
//                 <p>${product.name}</p>
//                 <div class="price-tag">
//                     <p>$${product.price.toFixed(2)}</p>
//                 </div>
//                 <button class="add-to-cart">Add to Cart</button>
//             `;
//             productGrid.appendChild(productItem);
//         });

//         // Re-attach event listeners for "Add to Cart" buttons
//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             button.addEventListener('click', () => {
//                 const productId = parseInt(button.closest('.product-item').dataset.id);
//                 addToCart(productId);
//             });
//         });
//     }

//     // Add product to cart
//     async function addToCart(productId) {
//         const product = products.find(p => p.id === productId);
//         if (product) {
//             const cartItem = cart.find(item => item.id === productId);
//             if (cartItem) {
//                 cartMessage.textContent = `${product.name} is already in the cart.`;
//             } else {
//                 const response = await fetch(`${apiUrl}/cart`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ ...product, quantity: 1 }),
//                 });
//                 if (response.ok) {
//                     const newCartItem = await response.json();
//                     cart.push(newCartItem);
//                     cartMessage.textContent = ''; // Clear any previous messages
//                     renderCart();
//                     updateCartCount();
//                 } else {
//                     const errorMsg = await response.text();
//                     cartMessage.textContent = `Failed to add item to cart: ${errorMsg}`;
//                 }
//             }
//         }
//     }

//     // Fetching cart from JSON server
//     async function fetchCart() {
//         try {
//             const response = await fetch(`${apiUrl}/cart`);
//             cart = await response.json();
//             console.log('Fetched cart:', cart); // Debugging statement
//             renderCart();
//             updateCartCount();
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//         }
//     }

//     // Render cart
//     function renderCart() {
//         cartItemsList.innerHTML = '';
//         let total = 0;
//         cart.forEach((item, index) => {
//             total += item.price * item.quantity;
//             const cartItem = document.createElement('div');
//             cartItem.innerHTML = `
//                 <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
//                 <button class="decrease-quantity" data-index="${index}">-</button>
//                 <button class="increase-quantity" data-index="${index}">+</button>
//                 <button class="remove-from-cart" data-index="${index}">Remove</button></p>
//             `;
//             cartItemsList.appendChild(cartItem);
//         });
//         document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
//     }

//     // Update cart count
//     function updateCartCount() {
//         const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartCount.textContent = totalCount;
//     }

//     // Increase quantity
//     async function increaseQuantity(index) {
//         const cartItem = cart[index];
//         cartItem.quantity += 1;
//         const response = await fetch(`${apiUrl}/cart/${cartItem.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ quantity: cartItem.quantity }),
//         });
//         if (response.ok) {
//             renderCart();
//             updateCartCount();
//         } else {
//             cartMessage.textContent = 'Failed to update quantity.';
//         }
//     }

//     // Decrease quantity
//     async function decreaseQuantity(index) {
//         const cartItem = cart[index];
//         if (cartItem.quantity > 1) {
//             cartItem.quantity -= 1;
//             const response = await fetch(`${apiUrl}/cart/${cartItem.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ quantity: cartItem.quantity }),
//             });
//             if (response.ok) {
//                 renderCart();
//                 updateCartCount();
//             } else {
//                 cartMessage.textContent = 'Failed to update quantity.';
//             }
//         } else {
//             removeFromCart(index);
//         }
//     }

    
//     // Remove item from cart
// async function removeFromCart(index) {
//     try {
//         const cartItem = cart[index];
//         console.log('Removing cart item:', cartItem); // myDebuging log
//         const response = await fetch(`${apiUrl}/cart/${cartItem.id}`, {
//             method: 'DELETE',
//         });
//         if (response.ok) {
//             cart.splice(index, 1);
//             renderCart();
//         } else {
//             const errorMsg = await response.text();
//             cartMessage.textContent = `Failed to remove item from cart: ${errorMsg}`;
//         }
//     } catch (error) {
//         console.error('Error removing from cart:', error);
//     }
// }

//     document.getElementById('view-cart').addEventListener('click', () => {
//         renderCart();
//         cartModal.style.display = 'block';
//     });

//     closeModalButton.addEventListener('click', () => {
//         cartModal.style.display = 'none';
//     });

//     window.onclick = function (event) {
//         if (event.target === cartModal) {
//             cartModal.style.display = 'none';
//         }
//     };

//     cartItemsList.addEventListener('click', (event) => {
//         const target = event.target;
//         const index = parseInt(event.target.dataset.index);
//         if (event.target.classList.contains('increase-quantity')) {
//             increaseQuantity(index);
//         } else if (event.target.classList.contains('decrease-quantity')) {
//             decreaseQuantity(index);
//         } else if (event.target.classList.contains('remove-from-cart')) {
//             removeFromCart(index);
//         }
//     });

//     checkoutButton.addEventListener('click', () => {
//         alert('Checkout logic here!');
//     });

//     // Initial fetch of products and cart
//     fetchProducts();
//     fetchCart();
// });
