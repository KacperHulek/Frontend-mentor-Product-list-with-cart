fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const dessertsList = document.querySelector(".desserts-list");
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-order-total");
    const cartCountElement = document.querySelector("h2");
    let cartItems = [];

    // Clear existing content
    dessertsList.innerHTML = "";

    // Function to update cart display
    function updateCartDisplay() {
      cartItemsList.innerHTML = "";
      let total = 0;
      cartItems.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
          <p>${item.name} x${item.quantity}</p>
          <p>$${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsList.appendChild(cartItemElement);
        total += item.price * item.quantity;
      });
      cartTotalElement.innerHTML = `<p>Order total</p><p>$${total.toFixed(
        2
      )}</p>`;

      let cartTotalCount = 0;
      for (const element of cartItems) {
        cartTotalCount += element.quantity;
      }

      cartCountElement.textContent = `Your Cart (${cartTotalCount})`;
    }

    // Loop through each dessert item
    data.forEach((dessert) => {
      // Create a new list item
      const listItem = document.createElement("li");
      // Create the dessert card HTML
      listItem.innerHTML = `
        <div class="dessert-card-container">
              <div class="dessert-image-container">
                <img src="${dessert.image.desktop}" alt="${dessert.name}" />
                <div class="cart-control">
                    <button class="add-to-cart-btn">Add to Cart</button>
                    <div class="quantity-control" style="display: none;">
                        <button class="quantity-btn minus"><span>-</span></button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus"><span>+</span></button>
                    </div>
                </div>
               </div>
         
          <div class="dessert-card-description">
            <p class="dessert-type">${dessert.category}</p>
            <p class="dessert-name">${dessert.name}</p>
            <p class="dessert-price">$${dessert.price.toFixed(2)}</p>
          </div>
        </div>
      `;
      // Append the new item to the list
      dessertsList.appendChild(listItem);

      const control = listItem.querySelector(".cart-control");
      const addToCartBtn = control.querySelector(".add-to-cart-btn");
      const quantityControl = control.querySelector(".quantity-control");
      const quantitySpan = control.querySelector(".quantity");
      const minusBtn = control.querySelector(".minus");
      const plusBtn = control.querySelector(".plus");
      let quantity = 0;

      addToCartBtn.addEventListener("click", () => {
        addToCartBtn.style.display = "none";
        quantityControl.style.display = "flex";
        quantity = 1;
        cartItems.push({ ...dessert, quantity: 1 });
        updateCartDisplay();
      });

      minusBtn.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
          const cartItem = cartItems.find((item) => item.name === dessert.name);
          if (cartItem) {
            cartItem.quantity--;
          }
        } else {
          quantity = 0;
          quantityControl.style.display = "none";
          addToCartBtn.style.display = "block";
          cartItems = cartItems.filter((item) => item.name !== dessert.name);
        }
        updateCartDisplay();
      });

      plusBtn.addEventListener("click", () => {
        quantity++;
        quantitySpan.textContent = quantity;
        const cartItem = cartItems.find((item) => item.name === dessert.name);
        if (cartItem) {
          cartItem.quantity++;
        }
        updateCartDisplay();
      });
    });
  })
  .catch((error) => console.error("Error fetching desserts:", error));
