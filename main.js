main();
async function main() {
  const productsData = await getData();
  const mainTag = document.querySelector("[data-main]");
  for (const product of productsData) {
    let price = product.price.toFixed(2);
    mainTag.innerHTML += `
    <section data-eachProduct=${product.id}>
      <picture>
        <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
        <source srcset="${product.image.tablet}" media="(min-width: 870px)">
        <img data-imageBorder="imageBorder-${product.id}" src="${product.image.mobile}"
          alt="${product.name}">
      </picture>
      <button>
        <span data-add-productBtn='${product.name}' class="Btn" data-value=${product.id}>
          <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon ${product.id}">
          Add to Cart
        </span>
        <span data-product-quantityBtn class="secondBtn Btn d-none">
          <img data-decrease-quantity src="./assets/images/icon-decrement-quantity.svg"
            alt="decrement">
          <strong data-product-quantity>1</strong>
          <img data-increase-quantity src="./assets/images/icon-increment-quantity.svg"
            alt="increment">
        </span>
      </button>
      <p>${product.category}</p>
      <h4>${product.name}
        <br><span>$${price}</span>
      </h4>
    </section>
    `;
  }
  const products = document.querySelectorAll("[data-eachProduct]");
  let carts = [];
  for (const product of products) {
    const addToCart = product.querySelector("[data-add-productBtn]");
    const toggleQuantity = product.querySelector("[data-product-quantityBtn]");
    const ProductQuantity = product.querySelector("[data-product-quantity]");
    const quantityIncrease = product.querySelector("[data-increase-quantity]");
    const quantityDecrease = product.querySelector("[data-decrease-quantity]");

    addToCart.addEventListener("click", (event) => {
      event.preventDefault();

      addToCart.classList.add("d-none");
      toggleQuantity.classList.remove("d-none");
    });

    quantityDecrease.addEventListener("click", () => decreaseQuantity());
    quantityIncrease.addEventListener("click", () => increaseQuantity());

    const increaseQuantity = () => {
      ProductQuantity.innerText = +ProductQuantity.innerText + 1;
    };
    const decreaseQuantity = () => {
      if (+ProductQuantity.innerText === 1) {
        addToCart.classList.remove("d-none");
        toggleQuantity.classList.add("d-none");
        ProductQuantity.innerText = "1";
        return;
      }
      ProductQuantity.innerText = +ProductQuantity.innerText - 1;
    };
  }
  /*
  const addToCart = document.querySelectorAll("[data-addToCart]");
  const toggleQuantity = document.querySelectorAll("[data-toggleQuantity]");
  let quantity = document.querySelectorAll("[data-quantity]");
  const decreaseQuantity = document.querySelectorAll("[data-decreaseQuantity]");
  const increaseQuantity = document.querySelectorAll("[data-increaseQuantity]");
  const eachProduct = document.querySelectorAll("[data-eachProduct]");
  const eachProductId = document.querySelectorAll("[data-value]");
  const productSelected = document.querySelector("[data-productSelected]");
  const emptyCart = document.querySelector("[data-emptyCart]");
  quantity.forEach((value, index) => {
    decreaseQuantity[index].addEventListener("click", (event) => {
      let output = +value.innerText;
      if (output < 2) {
        toggleQuantity[index].classList.add("d-none");
        addToCart[index].classList.remove("d-none");
        return (output = 1);
      }
      output--;
      value.innerText = output;
    });
    increaseQuantity[index].addEventListener("click", (event) => {
      let output = +value.innerText;
      output++;
      value.innerText = output;
    });
  });

  addToCart.forEach((product, index) => {
    product.addEventListener("click", (event) => {
      event.preventDefault();
      quantity[index].innerText = 1;
      product.classList.add("d-none");
      // let selectedProduct = eachProductId[index].getAttribute("data-value");
      let divElement = document.createElement("div");
      divElement.setAttribute("data-productInCart", "productInCart");
      divElement.setAttribute("class", "productInCart d-flex");

      divElement.innerHTML = ` 
      <div>                       
        <h4>${products[index].name}</h4>
        <p class="d-flex">
          <span data-cartQuantity=cartQuantity>1x</span>
          <span>@$${products[index].price.toFixed(2)}</span>
          <strong>$5.50</strong>
        </p>
      </div>
      <img src="./assets/images/icon-remove-item.svg" alt="remove items">
      `;
      emptyCart.classList.add("d-none");
      productSelected.classList.remove("d-none");
      productSelected.prepend(divElement);
      toggleQuantity[index].classList.remove("d-none");
      updateCart();
    });
  });
  function updateCart(result) {
    const productInCart = document.querySelectorAll("[data-productInCart]");
    const totalPicks = document.querySelector("[data-totalPicks]");

    totalPicks.innerText = productInCart.length;
  }
    */
}
async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}
