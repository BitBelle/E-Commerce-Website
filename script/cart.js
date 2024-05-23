// document.addEventListener('DOMContentLoaded', function () {
//     let cart = [];

//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     const cartItemsList = document.getElementById('cart-items');
//     const cartModal = document.getElementById('cart-modal');
//     const cartCount = document.getElementById('cart-count');
//     const closeModalButton = document.querySelector('.close');
//     const cartMessage = document.getElementById('cart-message');
//     const apiUrl = 'http://localhost:3000';

//     // Fetch cart from JSON Server
//     async function fetchCart() {
//         try {
//             const response = await fetch(`${apiUrl}/cart`);
//             cart = await response.json();
//             console.log('Fetched cart:', cart);
//             renderCart();
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
//                 <button class="remove-from-cart" data-index="${index}">Remove</button></p>
//             `;
//             cartItemsList.appendChild(cartItem);
//         });
//         document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
//         updateCartCount();
//     }

//     // Update cart count
//     function updateCartCount() {
//         const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartCount.textContent = totalCount;
//     }

//     // Add product to cart
//     async function addToCart(productId) {
//         try {
//             const product = await getProduct(productId);
//             if (product) {
//                 const cartItem = cart.find(item => item.id === productId);
//                 if (cartItem) {
//                     cartMessage.textContent = `${product.name} is already in the cart.`;
//                 } else {
//                     const response = await fetch(`${apiUrl}/cart`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ ...product, quantity: 1 }),
//                     });
//                     if (response.ok) {
//                         const newCartItem = await response.json();
//                         cart.push(newCartItem);
//                         cartMessage.textContent = ''; 
//                         renderCart();
//                     } else {
//                         const errorMsg = await response.text();
//                         cartMessage.textContent = `Failed to add item to cart: ${errorMsg}`;
//                     }
//                 }
//             } else {
//                 cartMessage.textContent = '';
//             }
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             cartMessage.textContent = 'Error adding item to cart.';
//         }
//     }

//     // Remove item from cart
//     async function removeFromCart(index) {
//         try {
//             const cartItem = cart[index];
//             const response = await fetch(`${apiUrl}/cart/${cartItem.id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 cart.splice(index, 1);
//                 cartMessage.textContent = '';
//                 updateCartCount();
//                 renderCart();
//             } else {
//                 const errorMsg = await response.text();
//                 cartMessage.textContent = `Failed to remove item from cart: ${errorMsg}`;
//             }
//         } catch (error) {
//             console.error('Error removing from cart:', error);
//         }
//     }

//     // Fetch product by ID
//     async function getProduct(productId) {
//         try {
//             const response = await fetch(`${apiUrl}/products/${productId}`);
//             if (response.ok) {
//                 return await response.json();
//             } else {
//                 return null;
//             }
//         } catch (error) {
//             console.error('Error fetching product:', error);
//             return null;
//         }
//     }

//     // Initialize by fetching cart
//     fetchCart();

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const productId = parseInt(button.closest('.product-item').dataset.id);
//             addToCart(productId);
//         });
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
//         const index = parseInt(event.target.dataset.index);
//         if (event.target.classList.contains('remove-from-cart')) {
//             removeFromCart(index);
//         }
//     });
// });
