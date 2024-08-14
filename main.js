const addToCart = document.querySelector("[data-addToCart]");
const quantities = document.querySelector("[data-quantity]");
const increaseQuantity = document.querySelector("[data-increaseQuantity]");

addToCart.addEventListener("click", (event) => {
  event.preventDefault();
  changeBtn();
});
const changeBtn = () => {
  if (quantity === 1) {
    addToCart.classList.remove("d-none");
    increaseQuantity.classList.add("d-none");
  } else {
    addToCart.classList.add("d-none");
    increaseQuantity.classList.remove("d-none");
  }
};
