import { getTotal } from "./cartTotal.js";

const productEl = document.querySelector(".single-product");
const productId = productEl.dataset.id;
const cartCount = document.querySelector('.cart-count');
const overlay = document.querySelector('.overlay');
const overlayBtn = document.querySelector('.overlay-btn');
class Storage {
  static addProductsToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static addCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCartFromLocalStorage() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
  static getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("products"));
  }
}

let cart = Storage.getCartFromLocalStorage();
/* ==================FUNCTIONS====================== */


const addToCart = (e, productDetails) => {
  // get the value of the number input of the buttons page;
  const inputValue = e.currentTarget.previousElementSibling.value;
  const allDetails = {amount:parseInt(inputValue), ...productDetails};
  cart.push(allDetails);
  Storage.addCartToLocalStorage(cart);
};


const getButton = ()=>{
  const button = document.querySelector('.row button.btn');
  const id = button.dataset.id;
  // check if the button is in the cart
  const inCart = cart.find(item=>item.id == id);
  if(inCart){
    button.disabled = true;
    button.textContent = 'In Cart';
    button.classList.add('button-disabled');
  }else{
    button.addEventListener('click', (e)=>{
      button.disabled = true;
      button.textContent = 'In Cart';
      button.classList.add('button-disabled');
      overlay.classList.add('show-overlay');
      const products = Storage.getProductsFromLocalStorage();
      // find the product from the above array and push it to cart
      const currentProduct = products.find(item=>item.id == id);
      addToCart(e, currentProduct)
      const {totalItems} = getTotal(cart);
      cartCount.textContent = cart.length;
    })
  }
}
const displayProducts = (data) => {
  // create the element and append it to the productEl
  const productElement = document.createElement("div");
  productElement.classList.add("row");
  productElement.innerHTML = `
    <div class="col-2">
        <img src=${data["main_image"]} width="100%" id="productImg">
        <div class="small-img-row">
            <div class="small-img-col">
                <img src=${data["main_image"]} width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src=${data["other_images"][0]} width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src=${data["other_images"][1]} width="100%" class="small-img">
            </div>
            <div class="small-img-col">
                <img src=${data["other_images"][2]} width="100%" class="small-img">
            </div>
        </div>
    </div>
    <div class="col-2">
        <p>Home / ${data.category}</p>
        <h2>${data.name}</h2>
        <h4>$${data.price}</h4>
        <select>
            <option selected>Select Size</option>
            <option>XXL</option>
            <option>XL</option>
            <option>Large</option>
            <option>Small</option>
        </select>
        <input type="number" value="1" min="1">
        <button class="btn" data-id=${data.id} >Add To Cart</button>
        <!---Product Details-->
        <h3>Product Details <i class="fa fa-indent"></i></h3>
        <p class="product-details-p">${data.description}</p>
    </div>
    `;
  productEl.appendChild(productElement);
  // add click functionality of the other small Images
  const mainImageEl = document.querySelector("#productImg");
  const otherImages = document.querySelectorAll(".small-img");
  otherImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      mainImageEl.src = e.currentTarget.src;
    });
  });
};


const getProducts = async () => {
  try {
    const response = await fetch("../../js/products.json");
    const data = await response.json();
    // get element details based on its id;
    const productDetails = data.find((item) => item.id == productId);
    displayProducts(productDetails);
    Storage.addProductsToLocalStorage(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('DOMContentLoaded', ()=>{
  getProducts().then(data=>{
    getButton();
  });
  overlayBtn.addEventListener('click', ()=>{
    overlay.classList.remove('show-overlay');
  });
  window.addEventListener('keyup', (e)=>{
    if(e.keyCode == 13 && overlay.classList.contains('show-overlay')){
      overlay.classList.remove('show-overlay');
    }
  })
})
