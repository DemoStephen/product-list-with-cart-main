main();
async function main() {
  const products = await getData();
  const mainTag = document.querySelector("[data-main]");
  for (const product of products) {
    let price = product.price.toFixed(2);
    mainTag.innerHTML += `
    <section data-eachProduct=eachProduct>
      <picture>
        <source srcset=${product.image.desktop} media="(min-width: 1024px)">
        <source srcset=${product.image.tablet} media="(min-width: 870px)">
        <img data-imageBorder="imageBorder" src=${product.image.mobile}
          alt=${product.name}>
      </picture>
      <button>
        <span data-addToCart="addToCart" class="Btn" data-value=${product.id}>
          <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon">
          Add to Cart
        </span>
        <span data-toggleQuantity="toggleQuantity" class="secondBtn Btn d-none">
          <img data-decreaseQuantity="decreaseQuantity" src="./assets/images/icon-decrement-quantity.svg"
            alt="decrement">
          <strong data-quantity="quantity">0</strong>
          <img data-increaseQuantity="increaseQuantity" src="./assets/images/icon-increment-quantity.svg"
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
}
async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}
