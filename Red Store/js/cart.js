import { getTotal } from "./cartTotal.js";


let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];


const cartContainer = document.querySelector(".cart table");
const cartTotal = document.querySelector(".cart-total");
const cartMainSubTotal = document.querySelector(".cart-subtotal");
const cartTax = document.querySelector(".cart-tax");
const cartCount = document.querySelector(".cart-count");

// display the total;
const displayTotal = (total, cart) => {
  cartTotal.textContent = "$" + total.totalPrice;
  cartMainSubTotal.textContent = "$" + total.subtotal;
  cartTax.textContent = "$" + total.tax;
  cartCount.textContent = cart.length;
};

const removeCartItem = (e) => {
  const id = e.currentTarget.dataset.id;
  const cartItem =
    e.currentTarget.parentElement.parentElement.parentElement.parentElement;
  // remove child from teh cartContainer
  cartContainer.removeChild(cartItem);
  // remover from array and calculate total
  cart = cart.filter((item) => item.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  const total = getTotal(cart);
  displayTotal(total, cart);
};



// get Items from Cart array and display them in cartContainer
const displayCartItems = (cart) => {
  cart.forEach((item) => {
    const cartItem = document.createElement("tr");
    cartItem.innerHTML = `
        <td>
            <div class="cart-info">
                <img src=${item["main_image"]}>
                <div class="cart-details">
                    <p>${item.name}</p>
                    <small>Price: $${item.price}</small>
                    <p class="remove-btn" data-id=${item.id}>Remove</p>
                </div>
            </div>
        </td>
        <td><input type="number" value=${item.amount} min="1" class="item-amount" data-id=${item.id}></td>
        <td class="price">$${item.amount * item.price}</td>
        `;

    cartContainer.appendChild(cartItem);
  });
  const itemAmountInput = document.querySelectorAll(".item-amount");
  itemAmountInput.forEach((item) => {
    item.addEventListener("change", (e) => {
      const value = e.currentTarget.value;
      const id = e.currentTarget.dataset.id;
      // find array with the id and edit the values on change
      cart = cart.map((cartItem) => {
        if (cartItem.id == id) {
          cartItem.amount = parseInt(value);
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      const total = getTotal(cart);
      displayTotal(total, cart);
      // look for the item details in the array
      const itemInArray = cart.find((data) => data.id == id);
      const itemSubtotal = e.currentTarget.parentElement.nextElementSibling;
      itemSubtotal.textContent = `$${itemInArray.price * itemInArray.amount}`;
    });
  });
  const removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", removeCartItem);
  });
  const total = getTotal(cart);
  displayTotal(total, cart);
};

window.addEventListener("DOMContentLoaded", () => {
  displayCartItems(cart);
  const total = getTotal(cart);
  displayTotal(total, cart);
});
