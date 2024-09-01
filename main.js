main();

async function main() {
  const products = await getData();
  const mainTag = document.querySelector("[data-main]");
  for (const product of products) {
    mainTag.innerHTML += `<section id = product${product.id}>
      <picture>
        <source srcset=${product.image.desktop} media="(min-width: 1024px)">
        <source srcset=${product.image.tablet} media="(min-width: 870px)">
        <img data-imageBorder="imageBorder" src=${product.image.mobile}
          alt=${product.name}>
      </picture>
      <button value=${product.id}>
        <span data-addToCart="addToCart" class="Btn">
          <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart icon">
          Add to Cart
        </span>
        <span data-cartQuantity="cartQuantity" class="secondBtn Btn d-none">
          <img data-decrementQuantity="decrementQuantity" src="./assets/images/icon-decrement-quantity.svg"
            alt="decrement">
          <strong data-quantity="quantity">1</strong>
          <img data-incrementQuantity="incrementQuantity" src="./assets/images/icon-increment-quantity.svg"
            alt="increment">
        </span>
      </button>
      <p>${product.category}</p>
      <h4>${product.name}
        <br><span>$${product.price}</span>
      </h4>
    </section>`;
  }
}
async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}
