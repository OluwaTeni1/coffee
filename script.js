// // Menu toggle functionality
// var open = document.getElementById("menu-icon-open");
// var close = document.getElementById("menu-icon-close");
// var navLinks = document.querySelector(".nav-links");

// if (open && close && navLinks) {
//   open.addEventListener("click", function () {
//     navLinks.classList.add("active");
//   });

//   close.addEventListener("click", function () {
//     navLinks.classList.remove("active");
//   });
// }

// // Set current year in footer
// document.getElementById("year").textContent = new Date().getFullYear();

// // Load cart from localStorage or initialize empty array
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // Select elements
// const productsSel = document.querySelector(".product-box");
// const totalItemsInCartEl = document.getElementById("cart-quantity");
// const cartItemsEl = document.querySelector(".cart-itmes"); // Fixed selector - was ".cart-items"

// // Fix product data issue (product id 4 has empty name)
// if (products[4] && !products[4].name) {
//   products[4].name = "Cappuccino";
// }

// // Render products on index page
// function renderProducts() {
//   if (!productsSel) return;

//   productsSel.innerHTML = "";
//   products.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.className = "product-card";
//     productCard.innerHTML = `
//       <div class="product-image">
//         <img src="${product.imgSrc}" alt="${product.name}">
//       </div>
//       <div class="product-content">
//         <h2 class="product-title">${product.name}</h2>
//         <p class="product-details">${product.details}...</p>
//         <div class="product-price-pay">
//           <p class="product-price">$${product.price.toFixed(2)}</p>
//           <button class="btn add-to-cart" onclick="addToCart(${
//             product.id
//           })">Add to Cart</button>
//         </div>
//       </div>
//     `;
//     productsSel.appendChild(productCard);
//   });
// }

// // Initialize cart on page load
// function updateCart() {
//   updateCartDisplay();
// }

// // Add to Cart function - FIXED
// function addToCart(id) {
//   const product = products.find((product) => product.id === id);

//   if (!product) {
//     console.error("Product not found with id:", id);
//     return;
//   }

//   // Check if item already exists in cart
//   const existingItemIndex = cart.findIndex((item) => item.id === id);

//   if (existingItemIndex > -1) {
//     // Increase quantity if already in cart
//     cart[existingItemIndex].numberOfUnits += 1;
//   } else {
//     // Add new item to cart
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       details: product.details,
//       imgSrc: product.imgSrc,
//       numberOfUnits: 1,
//     });
//   }

//   // Save to localStorage
//   saveCartToStorage();

//   // Update cart display
//   updateCartDisplay();

//   // Show notification
//   showNotification(`${product.name} added to cart`);
// }

// // Remove item from cart
// function removeItem(id) {
//   // Find item to get name for notification
//   const itemToRemove = cart.find((item) => item.id === id);

//   if (itemToRemove) {
//     // Remove from cart
//     cart = cart.filter((item) => item.id !== id);

//     // Save to localStorage
//     saveCartToStorage();

//     // Update cart display
//     updateCartDisplay();

//     // Show removal notification
//     showNotification(`${itemToRemove.name} removed from cart`);
//   }
// }

// // Update item quantity
// function updateQuantity(id, change) {
//   const itemIndex = cart.findIndex((item) => item.id === id);

//   if (itemIndex > -1) {
//     const newQuantity = cart[itemIndex].numberOfUnits + change;

//     if (newQuantity <= 0) {
//       removeItem(id);
//       return;
//     }

//     cart[itemIndex].numberOfUnits = newQuantity;
//     saveCartToStorage();
//     updateCartDisplay();

//     // Re-render cart items if on cart page
//     if (cartItemsEl) {
//       renderCartItems();
//       updateCartSummary();
//     }
//   }
// }

// // Save cart to localStorage
// function saveCartToStorage() {
//   localStorage.setItem("cart", JSON.stringify(cart));

//   // Dispatch event for other pages to update
//   window.dispatchEvent(new Event("cartUpdated"));
// }

// // Update cart display (cart count, etc.)
// function updateCartDisplay() {
//   // Update cart quantity in header
//   if (totalItemsInCartEl) {
//     const totalItems = cart.reduce((sum, item) => sum + item.numberOfUnits, 0);
//     totalItemsInCartEl.textContent = totalItems;
//     totalItemsInCartEl.style.display = totalItems > 0 ? "inline" : "none";
//   }

//   // Update cart page if we're on it
//   if (cartItemsEl) {
//     renderCartItems();
//     updateCartSummary();
//   }
// }

// // Show notification
// function showNotification(message) {
//   // Create notification element
//   const notification = document.createElement("div");
//   notification.className = "cart-notification";
//   notification.innerHTML = `
//     <span>${message}</span>
//     <a href="cart.html" style="color: #fff; text-decoration: underline;">View Cart</a>
//   `;

//   // Add styles
//   notification.style.cssText = `
//     position: fixed;
//     top: 80px;
//     right: 20px;
//     background: #4b3832;
//     color: white;
//     padding: 12px 18px;
//     border-radius: 8px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//     z-index: 1000;
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     animation: slideIn 0.3s ease;
//     font-size: 0.9rem;
//   `;

//   // Add animation styles
//   if (!document.querySelector("#notification-styles")) {
//     const style = document.createElement("style");
//     style.id = "notification-styles";
//     style.textContent = `
//       @keyframes slideIn {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//       }
//       @keyframes slideOut {
//         from { transform: translateX(0); opacity: 1; }
//         to { transform: translateX(100%); opacity: 0; }
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   // Remove existing notification
//   const existingNotification = document.querySelector(".cart-notification");
//   if (existingNotification) {
//     existingNotification.remove();
//   }

//   document.body.appendChild(notification);

//   // Remove after 3 seconds
//   setTimeout(() => {
//     notification.style.animation = "slideOut 0.3s ease";
//     setTimeout(() => {
//       if (notification.parentNode) {
//         notification.remove();
//       }
//     }, 300);
//   }, 3000);
// }

// // Render cart items on cart page
// function renderCartItems() {
//   if (!cartItemsEl) return;

//   cartItemsEl.innerHTML = "";

//   if (cart.length === 0) {
//     cartItemsEl.innerHTML = `
//       <div class="empty-cart-message" style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: #777;">
//         <p style="font-size: 1.2rem; margin-bottom: 15px; color: #4b3832;">Your cart is empty</p>
//         <a href="index.html" class="btn" style="
//           display: inline-block;
//           padding: 10px 25px;
//           background: linear-gradient(145deg, #4b3832 0%, #7b5e57 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 30px;
//           font-weight: 600;
//           transition: 0.3s ease;
//         ">
//           Browse Products
//         </a>
//       </div>
//     `;
//     return;
//   }

//   cart.forEach((item) => {
//     const cartItem = document.createElement("div");
//     cartItem.className = "items";
//     cartItem.dataset.id = item.id;
//     cartItem.innerHTML = `
//       <div class="product-data">
//         <div class="product-img">
//           <img src="${item.imgSrc}" alt="${item.name}">
//         </div>
//         <div class="product-name-description">
//           <h4 class="product-name">${item.name}</h4>

//         </div>
//       </div>
//       <div class="quantity">
//         <div class="quantity-controls" style="display: flex; align-items: center; gap: 10px; justify-content: center;">
//           <button class="quantity-btn decrease" onclick="updateQuantity(${
//             item.id
//           }, -1)" style="
//             background: #f5f5f5;
//             border: 1px solid #ddd;
//             width: 30px;
//             height: 30px;
//             border-radius: 50%;
//             cursor: pointer;
//             font-weight: bold;
//             color: #4b3832;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: 0.2s ease;
//           ">-</button>
//           <span style="
//             min-width: 30px;
//             text-align: center;
//             font-weight: 600;
//             color: #4b3832;
//           ">${item.numberOfUnits}</span>
//           <button class="quantity-btn increase" onclick="updateQuantity(${
//             item.id
//           }, 1)" style="
//             background: #f5f5f5;
//             border: 1px solid #ddd;
//             width: 30px;
//             height: 30px;
//             border-radius: 50%;
//             cursor: pointer;
//             font-weight: bold;
//             color: #4b3832;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: 0.2s ease;
//           ">+</button>
//         </div>
//       </div>
//       <div class="price">$${(item.price * item.numberOfUnits).toFixed(2)}</div>
//       <div class="delete" onclick="removeItem(${item.id})">
//         <i class="fa-solid fa-trash-can"></i>
//       </div>
//     `;

//     // Add hover effects
//     const decreaseBtn = cartItem.querySelector(".decrease");
//     const increaseBtn = cartItem.querySelector(".increase");
//     const deleteBtn = cartItem.querySelector(".delete");

//     if (decreaseBtn && increaseBtn) {
//       decreaseBtn.addEventListener("mouseenter", () => {
//         decreaseBtn.style.background = "#e74c3c";
//         decreaseBtn.style.color = "white";
//         decreaseBtn.style.borderColor = "#e74c3c";
//       });
//       decreaseBtn.addEventListener("mouseleave", () => {
//         decreaseBtn.style.background = "#f5f5f5";
//         decreaseBtn.style.color = "#4b3832";
//         decreaseBtn.style.borderColor = "#ddd";
//       });

//       increaseBtn.addEventListener("mouseenter", () => {
//         increaseBtn.style.background = "#27ae60";
//         increaseBtn.style.color = "white";
//         increaseBtn.style.borderColor = "#27ae60";
//       });
//       increaseBtn.addEventListener("mouseleave", () => {
//         increaseBtn.style.background = "#f5f5f5";
//         increaseBtn.style.color = "#4b3832";
//         increaseBtn.style.borderColor = "#ddd";
//       });
//     }

//     if (deleteBtn) {
//       deleteBtn.addEventListener("mouseenter", () => {
//         deleteBtn.style.color = "#e74c3c";
//       });
//       deleteBtn.addEventListener("mouseleave", () => {
//         deleteBtn.style.color = "#ff4d4d";
//       });
//     }

//     cartItemsEl.appendChild(cartItem);
//   });
// }

// // Update cart summary on cart page
// function updateCartSummary() {
//   const cartValueEl = document.getElementById("cart-value");
//   const subTotalEl = document.getElementById("sub-total");
//   const taxEl = document.getElementById("tax");
//   const totalEl = document.getElementById("total");

//   if (!cartValueEl || !subTotalEl || !taxEl || !totalEl) return;

//   const totalItems = cart.reduce((sum, item) => sum + item.numberOfUnits, 0);
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.numberOfUnits,
//     0
//   );
//   const tax = subtotal * 0.08; // 8% tax
//   const total = subtotal + tax;

//   cartValueEl.textContent = `${totalItems} Item${totalItems !== 1 ? "s" : ""}`;
//   subTotalEl.textContent = `$${subtotal.toFixed(2)}`;
//   taxEl.textContent = `$${tax.toFixed(2)}`;
//   totalEl.textContent = `$${total.toFixed(2)}`;
// }

// // Clear entire cart
// function clearCart() {
//   if (cart.length === 0) {
//     alert("Your cart is already empty!");
//     return;
//   }

//   if (confirm("Are you sure you want to clear your cart?")) {
//     cart = [];
//     saveCartToStorage();
//     updateCartDisplay();
//     showNotification("Cart cleared");
//   }
// }

// // Initialize everything when page loads
// document.addEventListener("DOMContentLoaded", function () {
//   // Render products if on index page
//   renderProducts();

//   // Initial cart update
//   updateCart();

//   // Listen for cart updates from other tabs
//   window.addEventListener("storage", function (e) {
//     if (e.key === "cart") {
//       cart = JSON.parse(e.newValue) || [];
//       updateCartDisplay();
//     }
//   });

//   // Listen for custom cart update events
//   window.addEventListener("cartUpdated", function () {
//     cart = JSON.parse(localStorage.getItem("cart")) || [];
//     updateCartDisplay();
//   });

//   // Add event listener to checkout button
//   const checkoutBtn = document.querySelector(".checkout-btn");
//   if (checkoutBtn) {
//     checkoutBtn.addEventListener("click", function (e) {
//       e.preventDefault();

//       if (cart.length === 0) {
//         showNotification("Your cart is empty! Add some items before checkout.");
//         return;
//       }

//       const totalAmount = cart
//         .reduce((sum, item) => sum + item.price * item.numberOfUnits * 1.08, 0)
//         .toFixed(2);

//       showNotification(`Order placed! Total: $${totalAmount}`);

//       // Clear cart after checkout
//       setTimeout(() => {
//         cart = [];
//         saveCartToStorage();
//         updateCartDisplay();
//       }, 2000);
//     });
//   }

//   // Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       const href = this.getAttribute("href");
//       if (href === "#" || href === "#!") return;

//       const targetElement = document.querySelector(href);
//       if (targetElement) {
//         e.preventDefault();
//         targetElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//     });
//   });

//   // Close mobile menu when clicking on a link
//   if (navLinks) {
//     navLinks.querySelectorAll("a").forEach((link) => {
//       link.addEventListener("click", () => {
//         navLinks.classList.remove("active");
//       });
//     });
//   }
// });

// // DEBUG: Check if products array is loaded correctly
// console.log("Products array loaded:", products);
// console.log("Products length:", products.length);

// // Check each product
// products.forEach((product, index) => {
//   console.log(`Product ${index}:`, {
//     id: product.id,
//     name: product.name,
//     hasName: !!product.name,
//     hasDetails: !!product.details,
//     price: product.price,
//   });
// });

// // DEBUG: Check if script.js is loaded after products.js
// console.log("Script.js loaded - Cart initialized:", cart);

// Menu toggle functionality
var open = document.getElementById("menu-icon-open");
var close = document.getElementById("menu-icon-close");
var navLinks = document.querySelector(".nav-links");

if (open && close && navLinks) {
  open.addEventListener("click", function () {
    navLinks.classList.add("active");
  });

  close.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
}

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Select elements
const productsSel = document.querySelector(".product-box");
const totalItemsInCartEl = document.getElementById("cart-quantity");
const cartItemsEl = document.querySelector(".cart-itmes");

// Fix product data issues
function fixProductData() {
  products.forEach((product, index) => {
    // Fix product with id 4 that has empty name
    if (product.id === 4 && !product.name) {
      product.name = "Cappuccino";
    }

    // Ensure all products have required properties
    if (!product.name) product.name = `Coffee ${index + 1}`;
    if (!product.details) product.details = "Delicious coffee selection";
    if (!product.price) product.price = 12.99;
  });
}

// Call this function to fix product data
fixProductData();

// Render products on index page
function renderProducts() {
  if (!productsSel) return;

  productsSel.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.imgSrc}" alt="${product.name}">
      </div>
      <div class="product-content">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-details">${product.details.substring(0, 100)}...</p>
        <div class="product-price-pay">
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn add-to-cart" onclick="addToCart(${
            product.id
          })">Add to Cart</button>
        </div>
      </div>
    `;
    productsSel.appendChild(productCard);
  });
}

// Initialize cart on page load
function updateCart() {
  updateCartDisplay();
}

// Add to Cart function
function addToCart(id) {
  const product = products.find((product) => product.id === id);

  if (!product) {
    // console.error("Product not found with id:", id);
    showNotification("Product not found");
    return;
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === id);

  if (existingItemIndex > -1) {
    // Increase quantity if already in cart
    cart[existingItemIndex].numberOfUnits += 1;
  } else {
    // Add new item to cart - ensure all properties exist
    cart.push({
      id: product.id,
      name: product.name || `Coffee ${id}`,
      price: product.price || 12.99,
      details: product.details || "Delicious coffee selection",
      imgSrc: product.imgSrc,
      numberOfUnits: 1,
    });
  }

  // Save to localStorage
  saveCartToStorage();

  // Update cart display
  updateCartDisplay();

  // Show notification
  showNotification(`${product.name || "Item"} added to cart`);
}

// Remove item from cart
function removeItem(id) {
  // console.log("Removing item with id:", id);
  // console.log("Current cart before removal:", cart);

  // Find item to get name for notification
  const itemToRemove = cart.find((item) => item.id === id);

  if (itemToRemove) {
    // Remove from cart
    cart = cart.filter((item) => item.id !== id);
    // console.log("Cart after removal:", cart);

    // Save to localStorage
    saveCartToStorage();

    // Update cart display
    updateCartDisplay();

    // Show removal notification
    showNotification(`${itemToRemove.name || "Item"} removed from cart`);
  } else {
    // console.error("Item not found in cart:", id);
  }
}

// Update item quantity
function updateQuantity(id, change) {
  // console.log("Updating quantity for id:", id, "change:", change);

  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex > -1) {
    const newQuantity = cart[itemIndex].numberOfUnits + change;

    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    cart[itemIndex].numberOfUnits = newQuantity;
    saveCartToStorage();
    updateCartDisplay();

    // Re-render cart items if on cart page
    if (cartItemsEl) {
      renderCartItems();
      updateCartSummary();
    }
  } else {
    // console.error("Item not found for quantity update:", id);
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  // console.log("Cart saved to localStorage:", cart);

  // Dispatch event for other pages to update
  window.dispatchEvent(new Event("cartUpdated"));
}

// Update cart display (cart count, etc.)
function updateCartDisplay() {
  // console.log("Updating cart display. Cart:", cart);

  // Update cart quantity in header
  if (totalItemsInCartEl) {
    const totalItems = cart.reduce((sum, item) => {
      if (item && item.numberOfUnits) {
        return sum + item.numberOfUnits;
      }
      return sum;
    }, 0);

    // console.log("Total items in cart:", totalItems);
    totalItemsInCartEl.textContent = totalItems;
    totalItemsInCartEl.style.display = totalItems > 0 ? "inline" : "none";
  }

  // Update cart page if we're on it
  if (cartItemsEl) {
    // console.log("Rendering cart items...");
    renderCartItems();
    updateCartSummary();
  }
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = `
    <span>${message}</span>
    <a href="cart.html" style="color: #fff; text-decoration: underline;">View Cart</a>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #4b3832;
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 15px;
    animation: slideIn 0.3s ease;
    font-size: 0.9rem;
  `;

  // Add animation styles
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove existing notification
  const existingNotification = document.querySelector(".cart-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Render cart items on cart page
function renderCartItems() {
  if (!cartItemsEl) return;

  // console.log("Rendering cart items. Cart length:", cart.length);
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart-message" style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: #777;">
        <p style="font-size: 1.2rem; margin-bottom: 15px; color: #4b3832;">Your cart is empty</p>
        <a href="index.html" class="btn" style="
          display: inline-block;
          padding: 10px 25px;
          background: linear-gradient(145deg, #4b3832 0%, #7b5e57 100%);
          color: white;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          transition: 0.3s ease;
        ">
          Browse Products
        </a>
      </div>
    `;
    return;
  }

  cart.forEach((item) => {
    if (!item) {
      // console.error("Found undefined item in cart");
      return;
    }

    const itemName = item.name || `Coffee Item ${item.id}`;
    const itemDetails = item.details || "Delicious coffee selection";
    const itemPrice = item.price || 0;
    const itemQuantity = item.numberOfUnits || 1;
    const itemTotal = (itemPrice * itemQuantity).toFixed(2);
    const itemImg =
      item.imgSrc ||
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1171&auto=format&fit=crop";

    const cartItem = document.createElement("div");
    cartItem.className = "items";
    cartItem.dataset.id = item.id;
    cartItem.innerHTML = `
      <div class="product-data">
        <div class="product-img">
          <img src="${itemImg}" alt="${itemName}" onerror="this.src='https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1171&auto=format&fit=crop'">
        </div>
        <div class="product-name-description">
          <h4 class="product-name">${itemName}</h4>
          
        </div>
      </div>
      <div class="quantity">
        <div class="quantity-controls" style="display: flex; align-items: center; gap: 10px; justify-content: center;">
          <button class="quantity-btn decrease" onclick="updateQuantity(${item.id}, -1)" style="
            background: #f5f5f5;
            border: 1px solid #ddd;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            color: #4b3832;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s ease;
          ">-</button>
          <span style="
            min-width: 30px;
            text-align: center;
            font-weight: 600;
            color: #4b3832;
          ">${itemQuantity}</span>
          <button class="quantity-btn increase" onclick="updateQuantity(${item.id}, 1)" style="
            background: #f5f5f5;
            border: 1px solid #ddd;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            color: #4b3832;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s ease;
          ">+</button>
        </div>
      </div>
      <div class="price">$${itemTotal}</div>
      <div class="delete" onclick="removeItem(${item.id})" style="cursor: pointer; color: #ff4d4d; font-size: 1.2rem;">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    `;

    cartItemsEl.appendChild(cartItem);
  });
}

// Update cart summary on cart page
function updateCartSummary() {
  const cartValueEl = document.getElementById("cart-value");
  const subTotalEl = document.getElementById("sub-total");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  // console.log("Updating cart summary. Elements found:", {
  //   cartValueEl: !!cartValueEl,
  //   subTotalEl: !!subTotalEl,
  //   taxEl: !!taxEl,
  //   totalEl: !!totalEl,
  // });

  if (!cartValueEl || !subTotalEl || !taxEl || !totalEl) {
    // console.error("Some summary elements not found!");
    return;
  }

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => {
    if (item && item.numberOfUnits) {
      return sum + item.numberOfUnits;
    }
    return sum;
  }, 0);

  const subtotal = cart.reduce((sum, item) => {
    if (item && item.price && item.numberOfUnits) {
      return sum + item.price * item.numberOfUnits;
    }
    return sum;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // console.log("Cart summary calculations:", {
  //   totalItems,
  //   subtotal,
  //   tax,
  //   total,
  // });

  // Update the DOM elements
  cartValueEl.textContent = `${totalItems} Item${totalItems !== 1 ? "s" : ""}`;
  subTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Clear entire cart (for debugging)
function clearCart() {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();
    showNotification("Cart cleared");
  }
}

// Debug function to fix localStorage
function fixLocalStorage() {
  // console.log("Fixing localStorage...");

  // Get current cart
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log("Current cart in localStorage:", currentCart);

  // Filter out any invalid items
  const filteredCart = currentCart.filter((item) => {
    const isValid =
      item &&
      typeof item.id === "number" &&
      item.name &&
      typeof item.price === "number";

    if (!isValid) {
      // console.log("Removing invalid item:", item);
    }

    return isValid;
  });

  // Save filtered cart back
  localStorage.setItem("cart", JSON.stringify(filteredCart));
  cart = filteredCart;

  // console.log("Fixed cart:", cart);
  updateCartDisplay();
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  // console.log("DOM fully loaded and parsed");

  // First, fix any localStorage issues
  fixLocalStorage();

  // Render products if on index page
  renderProducts();

  // Initial cart update
  updateCart();

  // Add event listener to checkout button
  const checkoutBtn = document.getElementById("checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (cart.length === 0) {
        showNotification("Your cart is empty! Add some items before checkout.");
        return;
      }

      const totalAmount = cart
        .reduce((sum, item) => sum + item.price * item.numberOfUnits * 1.08, 0)
        .toFixed(2);

      alert(
        `Order placed successfully!\n\nTotal: $${totalAmount}\n\nThank you for your order!`
      );

      // Clear cart after checkout
      cart = [];
      saveCartToStorage();
      updateCartDisplay();
    });
  }

  // Add debug button (remove in production)
  //const debugBtn = document.createElement("button");
  debugBtn.textContent = "Debug Cart";
  debugBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
  `;
  debugBtn.onclick = function () {
    alert("Check console for debug info");
  };
  document.body.appendChild(debugBtn);

  // Add clear cart button (remove in production)
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear Cart";
  clearBtn.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    padding: 10px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
  `;
  clearBtn.onclick = clearCart;
  document.body.appendChild(clearBtn);
});

// Export functions to global scope for HTML onclick
window.addToCart = addToCart;
window.removeItem = removeItem;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.fixLocalStorage = fixLocalStorage;
