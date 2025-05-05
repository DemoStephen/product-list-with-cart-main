main();

async function main() {
  // Store product data stored in the json file to a const variabled called productData
  const productsData = await getData();
  // I selected the main tag that stored all product in my HTML
  const mainTag = document.querySelector("[data-main]");

  // Updating the DOM here by mapping through all products data
  productsData.map((product) => {
    let price = product.price.toFixed(2);
    // I updated the InnerHTML of the main tag by providing all products data
    mainTag.innerHTML += `
      <article data-eachProduct="${product.name}">
        <picture>
          <source srcset="${product.image.tablet}" media="(min-width: 1024px)">
          <source srcset="${product.image.mobile}" media="(min-width: 870px)">
          <img data-image-border src="${product.image.desktop}" alt="${product.desktop}" data-thumbnail="${product.image.thumbnail}">
        </picture>
        <button>
          <span data-add-productBtn='${product.name}' class="Btn" data-value=${product.id}>
            <img src="assets/images/icon-add-to-cart.svg" alt="add to cart icon ${product.id}">
            Add to Cart
          </span>
          <span data-product-quantityBtn class="secondBtn Btn d-none">
            <img data-decrease-quantity data-decrease-name="${product.name}" src="assets/images/icon-decrement-quantity.svg" alt="decrement icon">
            <strong data-product-quantity>1</strong>
            <img data-increase-quantity src="assets/images/icon-increment-quantity.svg" alt="increment icon">
          </span>
        </button>
        <p>${product.category}</p>
        <h4 data-name="${product.name}">${product.name}
          <br><span data-price=${price}>$${price}</span>
        </h4>
      </article>
      `;
  });

  const products = document.querySelectorAll("[data-eachProduct]");
  const totalPicks = document.querySelector("[data-totalPicks]");
  const emptyCartState = document.querySelector("[data-emptyCart]");
  const productsInCartState = document.querySelector("[data-productSelected]");
  const cartItems = document.querySelector("[data-cartItems]");
  const priceTotal = document.querySelector("[data-priceTotal]");
  const confirmOrder = document.querySelector("[data-confirmOrder]");

  const modal = document.querySelector("[data-modal]");
  const receipt = document.querySelector("[data-receipt]");
  const total = document.querySelector("[data-total]");
  const reset = document.querySelector("[data-reset]");

  // orders array would contains object/objects in this format [{name, price, quantity, thumbnail}]
  let orders = [];

  // Update Cart when a product is being selected
  for (const product of products) {
    const addToCart = product.querySelector("[data-add-productBtn]");
    const toggleQuantity = product.querySelector("[data-product-quantityBtn]");
    const ProductQuantity = product.querySelector("[data-product-quantity]");
    const quantityIncrease = product.querySelector("[data-increase-quantity]");
    const quantityDecrease = product.querySelector("[data-decrease-quantity]");
    const imgBorder = product.querySelector("[data-image-border]");

    const name = product.querySelector("[data-name]");
    const price = product.querySelector("[data-price]");
    const thumbnail = product.querySelector("[data-thumbnail]");

    // Add to Cart Function
    function changeButtonState() {
      addToCart.classList.add("d-none");
      toggleQuantity.classList.remove("d-none");
      imgBorder.classList.add("border");
      const order = {
        name: name.dataset.name.trim(),
        price: +price.dataset.price.trim(),
        quantity: +ProductQuantity.innerText.trim(),
        thumbnail: thumbnail.dataset.thumbnail.trim(),
      };

      orders.push(order);
      updateCart();
    }
    addToCart.addEventListener("click", changeButtonState);

    // Toggle Increment Quantity Function
    function increaseQuantity() {
      ProductQuantity.innerText = +ProductQuantity.innerText + 1;
      let productName = name.dataset.name.trim();
      // Get Index of the product whose quantity is being Increased
      const index = orders.findIndex(({ name }) => name === productName);
      orders[index] = {
        ...orders[index],
        quantity: orders[index].quantity + 1,
      };
      // Update cart when product quantity is being Increased
      updateCart();
    }
    quantityIncrease.addEventListener("click", increaseQuantity);

    // Toggle Decrement Quantity Function
    function decreaseQuantity() {
      let productName = name.dataset.name.trim();
      // Get Index of the product whose quantity is being Decreased
      const index = orders.findIndex(({ name }) => name === productName);

      // Remove product from cart if quantity is 1
      if (ProductQuantity.innerText.trim() === "1") {
        addToCart.classList.remove("d-none");
        toggleQuantity.classList.add("d-none");
        imgBorder.classList.remove("border");

        const decreaseName = product.querySelector("[data-decrease-name]");
        const name = decreaseName.dataset.decreaseName;
        deleteItemInCart(name);
        return;
      }
      // Decrease Product Quantity
      ProductQuantity.innerText = +ProductQuantity.innerText - 1;
      orders[index] = {
        ...orders[index],
        quantity: orders[index].quantity - 1,
      };
      // Update Product Quantity in the cart when product quantity is being Decreased
      updateCart();
    }
    quantityDecrease.addEventListener("click", decreaseQuantity);

    // Update Cart Function
    function updateCart() {
      // If orders is empty do this
      // Show empty cart state and hide products in cart state
      if (orders.length <= 0) {
        emptyCartState.classList.remove("d-none");
        productsInCartState.classList.add("d-none");
        cartItems.innerHTML = "";
        totalPicks.innerText = "0";
        priceTotal.innerText = "$00.00";
        return;
      }
      emptyCartState.classList.add("d-none");
      productsInCartState.classList.remove("d-none");

      let sum = 0;
      let costTotal = 0;

      cartItems.innerHTML = "";
      // If items selected is greater than zero do this
      /**
       * Update cart section
       * Update total price for Items selected
       * Update quantity of price selected
       */
      for (const order of orders) {
        sum = sum + order.quantity;
        costTotal = costTotal + order.quantity * order.price;

        let item = document.createElement("div");
        item.setAttribute("class", "productInCart d-flex");
        item.innerHTML = `
          <div>
            <h4>${order.name}</h4>
            <p class="d-flex">
              <span data-cartQuantity=cartQuantity>${order.quantity}x</span>
              <span>@$${order.price.toFixed(2)}</span>
              <strong>$${(order.quantity * order.price).toFixed(2)}</strong>
            </p>
          </div>
          <img data-delete="${
            order.name
          } " src="assets/images/icon-remove-item.svg" alt="remove ${
          order.name
        }">
        `;
        cartItems.prepend(item);
      }
      totalPicks.innerText = `${sum}`;
      priceTotal.innerText = `$${costTotal.toFixed(2)}`;
      const deleteItems = document.querySelectorAll("[data-delete]");
      // Add Event Listener to each delete item in the cart
      // Loop through each delete item and add event listener to it
      deleteItems.forEach((item, index) => {
        const name = item.dataset.delete.trim();
        item.addEventListener("click", () => deleteItemInCart(name));
      });
    }

    // Delete Item in Cart Function
    // This function deletes the item in the cart when the delete icon is clicked
    function deleteItemInCart(name) {
      const newOrders = orders.filter(
        ({ name: orderName }) => orderName !== name
      );
      orders = [...newOrders];
      updateCart();

      products.forEach((product) => {
        const addToCartBtn = product.querySelector("[data-add-productBtn]");
        const toggleBtn = product.querySelector("[data-product-quantityBtn]");
        const productName = product.querySelector("[data-name]").dataset.name;
        const imgBorder = product.querySelector("[data-image-border]");

        if (name === productName) {
          addToCartBtn.classList.remove("d-none");
          toggleBtn.classList.add("d-none");
          product.querySelector("[data-product-quantity]").innerText = "1";
          imgBorder.classList.remove("border");
        }
      });
    }

    // Confirm Order Function
    // This function confirms the order when the confirm order button is clicked
    function confirmOrders() {
      let sum = 0;
      receipt.innerHTML = "";
      for (const order of orders) {
        sum = sum + order.quantity * order.price;
        const item = document.createElement("div");
        const hr = document.createElement("hr");
        item.classList.add("eachProduct");
        item.classList.add("d-flex");
        item.innerHTML = `
        <div class="d-flex eachProductDetail">
          <img src="${order.thumbnail}" alt="${order.name}">
          <div>
            <h4>${order.name}</h4>
            <p>
              <span>${order.quantity}x</span>
              <strong>@$${order.price.toFixed(2)}</strong>
            </p>
          </div>
        </div>
        <h3>$${(order.price * order.quantity).toFixed(2)}</h3>
        `;
        receipt.prepend(hr);
        receipt.prepend(item);
      }
      total.innerText = `$${sum.toFixed(2)}`;
      modal.showModal();
    }
    confirmOrder.addEventListener("click", confirmOrders);

    // Reset Cart Function
    // This function resets the cart when the reset button is clicked
    function resetCart() {
      for (const product of products) {
        const addToCart = product.querySelector("[data-add-productBtn]");
        const toggleQuantity = product.querySelector(
          "[data-product-quantityBtn]"
        );
        const ProductQuantity = product.querySelector(
          "[data-product-quantity]"
        );
        const imgBorder = product.querySelector("[data-image-border]");

        toggleQuantity.classList.add("d-none");
        if (addToCart.classList.contains("d-none")) {
          addToCart.classList.remove("d-none");
          imgBorder.classList.remove("border");
        }
        ProductQuantity.innerText = 1;
      }
      orders = [];
      updateCart();
      modal.close();
    }
    reset.addEventListener("click", resetCart);
    modal.addEventListener("close", resetCart);
  }
}

// Fetch Data from JSON file
// This function fetches data from the JSON file and returns it as a promise
async function getData() {
  const res = await fetch("/data.json");
  const data = await res.json();
  return data;
}
