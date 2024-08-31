const data = [
  {
    image: "./assets/images/image-waffle-thumbnail.jpg",
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: "./assets/images/image-creme-brulee-thumbnail.jpg",
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: "./assets/images/image-macaron-thumbnail.jpg",
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: "./assets/images/image-tiramisu-thumbnail.jpg",
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: "./assets/images/image-baklava-thumbnail.jpg",
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: "./assets/images/image-meringue-thumbnail.jpg",

    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: "./assets/images/image-cake-thumbnail.jpg",
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: "./assets/images/image-brownie-thumbnail.jpg",
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: "./assets/images/image-panna-cotta-thumbnail.jpg",
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];
const imageBorder = document.querySelectorAll("[data-imageBorder]");
const cartQuantity = document.querySelectorAll("[data-cartQuantity]");
const addToCart = document.querySelectorAll("[data-addToCart]");
const quantities = document.querySelectorAll("[data-quantity]");
const decrementQuantity = document.querySelectorAll("[data-decrementQuantity]");
const incrementQuantity = document.querySelectorAll("[data-incrementQuantity]");

const emptyCart = document.querySelector("[data-emptyCart]");
const totalPicks = document.querySelector("[data-totalPicks]");
const productSelected = document.querySelector("[data-productSelected]");
/**
 * This function changes the border of Product selected
 * It changes the add to cart button to quantity increment button
 */
addToCart.forEach((cart, index) => {
  cart.addEventListener("click", (event) => {
    let value = +quantities[index].innerText;
    event.preventDefault();
    cart.classList.add("d-none");
    cartQuantity[index].classList.remove("d-none");
    imageBorder[index].classList.add("border");
    totalPicks.innerText = value;
  });
});

/**
 * This function Increases/Decreases the quantity of any product selected
 */
const setQuantity = () => {
  incrementQuantity.forEach((increase, index) => {
    increase.addEventListener("click", (event) => {
      let value = +quantities[index].innerText;
      event.preventDefault();
      value++;
      quantities[index].innerText = value;
      totalPicks.innerText = value;
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
      totalPicks.innerText = value;
    });
  });
};
setQuantity();

/**
 * This function updates my cart if a new product is selected
 */

// const cartUpdate = () => {
//   let value = +totalPicks.innerText;
//   if (value === 0) {
//     emptyCart.classList.add("d-none");
//   }
//   console.log(value);
// };
// cartUpdate();

const priceUpdate = () => {};
