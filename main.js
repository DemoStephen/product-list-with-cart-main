const imageBorder = document.querySelectorAll("[data-imageBorder]");
const cartQuantity = document.querySelectorAll("[data-cartQuantity]");
const addToCart = document.querySelectorAll("[data-addToCart]");
const quantities = document.querySelectorAll("[data-quantity]");
const decrementQuantity = document.querySelectorAll("[data-decrementQuantity]");
const incrementQuantity = document.querySelectorAll("[data-incrementQuantity]");
addToCart.forEach((cart, index) => {
  cart.addEventListener("click", (event) => {
    event.preventDefault();
    cart.classList.add("d-none");
    cartQuantity[index].classList.remove("d-none");
    imageBorder[index].classList.add("border");
  });
});
const setQuantity = () => {
  incrementQuantity.forEach((increase, index) => {
    increase.addEventListener("click", (event) => {
      let value = +quantities[index].innerText;
      event.preventDefault();
      value++;
      quantities[index].innerText = value;
      return;
    });
  });
  decrementQuantity.forEach((decrease, index) => {
    decrease.addEventListener("click", (event) => {
      let value = +quantities[index].innerText;
      event.preventDefault();
      if (value < 2) {
        cartQuantity[index].classList.add("d-none");
        addToCart[index].classList.remove("d-none");
        imageBorder[index].classList.remove("border");
        value = 2;
      }
      value--;
      quantities[index].innerText = value;
    });
  });
};
setQuantity();
const cartUpdate = () => {};
const priceUpdate = () => {};

const emptyCart = document.querySelector("[data-emptyCart]");
const totalPicks = document.querySelector("[data-totalPicks]");
const productSelected = document.querySelector("[data-productSelected]");
