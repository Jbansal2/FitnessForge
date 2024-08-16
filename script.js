// JavaScript to activate the toggle button and close button
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const closeBtn = document.getElementById('close-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    toggleBtn.addEventListener('click', function() {
        navMenu.classList.add('open');
    });

    closeBtn.addEventListener('click', function() {
        navMenu.classList.remove('open');
    });

    // Highlight the active link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            navMenu.classList.remove('open'); // Close the menu after clicking a link
        });
    });
});
// JavaScript to cart
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartMenu = document.getElementById('cart-menu');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.getElementById('cart-count');

    let itemCount = 0;

    // Toggle cart menu visibility
    cartIcon.addEventListener('click', function(event) {
        event.preventDefault();
        cartMenu.style.display = cartMenu.style.display === 'none' || cartMenu.style.display === '' ? 'block' : 'none';
    });

    // Close cart menu if clicked outside
    document.addEventListener('click', function(event) {
        if (!cartIcon.contains(event.target) && !cartMenu.contains(event.target)) {
            cartMenu.style.display = 'none';
        }
    });

    // Function to add item to cart
    function addItemToCart(productName, productPrice, productImage) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${productImage}" alt="${productName}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${productName}</p>
                <p class="cart-item-price">${productPrice}</p>
            </div>
            <button class="remove-item">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Attach event listener to the remove button
        cartItem.querySelector('.remove-item').addEventListener('click', function() {
            cartItem.remove();
            itemCount--;
            updateCartTotal();
            updateCartCount();
        });

        itemCount++;
        updateCartTotal();
        updateCartCount();
    }

    // Update the cart total price
    function updateCartTotal() {
        let total = 0;
        const cartItemPrices = cartItemsContainer.querySelectorAll('.cart-item-price');
        cartItemPrices.forEach(itemPrice => {
            const price = parseFloat(itemPrice.textContent.replace('$', ''));
            total += price;
        });
        const cartFooter = document.querySelector('.cart-footer p');
        cartFooter.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Update the cart count
    function updateCartCount() {
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'inline-block' : 'none';
    }

    // Add product to cart when "Add to Cart" button is clicked
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;

            addItemToCart(productName, productPrice, productImage);
        });
    });

    // Initialize cart count display
    updateCartCount();
});
// <!-- /* <--------------------check-out-section Js------------------>
document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutItemsContainer = document.querySelector('.checkout-items');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutTotal = document.querySelector('.checkout-total');

    // Function to update the checkout modal with cart items
    function updateCheckoutModal() {
        checkoutItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const itemName = item.querySelector('.cart-item-name').textContent;
            const itemPrice = item.querySelector('.cart-item-price').textContent;

            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout-item');
            checkoutItem.innerHTML = `
                <span>${itemName}</span>
                <span>${itemPrice}</span>
            `;

            checkoutItemsContainer.appendChild(checkoutItem);

            const price = parseFloat(itemPrice.replace('$', ''));
            total += price;
        });

        checkoutTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Show the checkout modal
    checkoutBtn.addEventListener('click', function () {
        updateCheckoutModal();
        checkoutModal.style.display = 'block';
    });

    // Close the checkout modal
    closeCheckout.addEventListener('click', function () {
        checkoutModal.style.display = 'none';
    });

    // Close the modal if clicked outside of the content
    window.addEventListener('click', function (event) {
        if (event.target == checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    // Place order button click
    placeOrderBtn.addEventListener('click', function () {
        alert('Order placed successfully!');
        cartItemsContainer.innerHTML = ''; // Clear the cart
        checkoutModal.style.display = 'none';
        document.getElementById('cart-count').textContent = '0';
    });
});

// <!-- /* <--------------------protein-products-section Js------------------>

document.addEventListener("DOMContentLoaded", () => {
    const cart = [];

    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            cart.push(product);
            showToast(`${product} has been added to your cart.`);
            console.log(cart); // Log the cart contents
        });
    });

    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;

        const progressBar = document.createElement('div');
        progressBar.className = 'toast-progress';

        toast.appendChild(progressBar);
        toastContainer.appendChild(toast);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
});

// <!-- /* <--------------------pricing-section Js------------------>

// Get toggle buttons
const monthlyBtn = document.getElementById('monthly-btn');
const yearlyBtn = document.getElementById('yearly-btn');

// Get all plan elements
const plans = document.querySelectorAll('.plan');

// Add event listeners to toggle buttons
monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');

    // Update prices to monthly
    plans.forEach(plan => {
        const monthlyPrice = plan.getAttribute('data-monthly');
        plan.querySelector('.price').innerText = `$${monthlyPrice}`;
    });
});

yearlyBtn.addEventListener('click', () => {
    yearlyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');

    // Update prices to yearly
    plans.forEach(plan => {
        const yearlyPrice = plan.getAttribute('data-yearly');
        plan.querySelector('.price').innerText = `$${yearlyPrice}`;
    });
});
// <!-- /* <--------------------user-login-section Js------------------>
document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const googleLoginButton = document.getElementById('google-login');
    const loginForm = document.getElementById('login-form');

    userIcon.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        loginModal.style.display = 'block';
    });

    closeLogin.addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Google login button click handler
    googleLoginButton.addEventListener('click', function () {
        // Redirect to Google login page or use Google API for login
        window.location.href = 'https://accounts.google.com/signin'; // Replace with your Google login URL or API call
    });

    // Form submit handler (for email login)
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Handle email login form submission
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Perform login operation, e.g., send credentials to server
        console.log('Logging in with', username, password);
        // For demonstration, just close the modal
        loginModal.style.display = 'none';
    });
});
