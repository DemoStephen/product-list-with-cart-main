const imageBorder = document.querySelectorAll("[data-imageBorder]");
const cartQuantity = document.querySelectorAll("[data-cartQuantity]");
const addToCart = document.querySelectorAll("[data-addToCart]");
const quantities = document.querySelectorAll("[data-quantity]");
const decrementQuantity = document.querySelectorAll("[data-decrementQuantity]");
const incrementQuantity = document.querySelectorAll("[data-incrementQuantity]");

addToCart.forEach((cart, index) => {
  cart.addEventListener("click", (event) => {
    let value = +quantities[index].innerText;
    event.preventDefault();
    cart.classList.add("d-none");
    cartQuantity[index].classList.remove("d-none");
    imageBorder[index].classList.add("border");
    cartUpdate();
  });
});

decrementQuantity.forEach((decrease, index) => {
  let value = +quantities[index].innerText;
  decrease.addEventListener("click", (event) => {
    event.preventDefault();
    if (value < 2) {
      addToCart[index].classList.remove("d-none");
      cartQuantity[index].classList.add("d-none");
      imageBorder[index].classList.remove("border");
      return (value = 1);
    }
    value--;
    quantities[index].innerText = value;
  });
});

incrementQuantity.forEach((increase, index) => {
  let value = +quantities[index].innerText;
  increase.addEventListener("click", (event) => {
    event.preventDefault();
    value++;
    quantities[index].innerText = value;
  });
});

const totalPicks = document.querySelector("[data-totalPicks]");
const cartUpdate = () => {};
