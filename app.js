fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const dessertsList = document.querySelector(".desserts-list");

    // Clear existing content
    dessertsList.innerHTML = "";

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

      document.querySelectorAll(".cart-control").forEach((control) => {
        const addToCartBtn = control.querySelector(".add-to-cart-btn");
        const quantityControl = control.querySelector(".quantity-control");
        const quantitySpan = control.querySelector(".quantity");
        const minusBtn = control.querySelector(".minus");
        const plusBtn = control.querySelector(".plus");

        let quantity = 1;

        addToCartBtn.addEventListener("click", () => {
          addToCartBtn.style.display = "none";
          quantityControl.style.display = "flex";
        });

        minusBtn.addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
          } else {
            quantity = 0;
            quantityControl.style.display = "none";
            addToCartBtn.style.display = "block";
          }
        });

        plusBtn.addEventListener("click", () => {
          quantity++;
          quantitySpan.textContent = quantity;
        });
      });
    });
  })
  .catch((error) => console.error("Error fetching desserts:", error));
