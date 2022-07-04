const MenuItems = document.getElementById("MenuItems");
const menuIcon = document.querySelector(".menu-icon");
MenuItems.style.maxHeight = "0px";

menuIcon.addEventListener("click", menutoggle);
function menutoggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "250px";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}

// login transform effect
const register = () => {
  RegForm.style.transform = "translateX(0px)";
  LoginForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
  Indicator.style.width = "90px";
};
const login = () => {
  RegForm.style.transform = "translateX(320px)";
  LoginForm.style.transform = "translateX(320px)";
  Indicator.style.transform = "translateX(20px)";
  Indicator.style.width = "75px";
};
const LoginForm = document.getElementById("loginform");
const RegForm = document.getElementById("Regform");
const Indicator = document.getElementById("formline");
const loginBtn = document.querySelector(".login-btn");
const registerBtn = document.querySelector(".register-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", login);
  registerBtn.addEventListener("click", register);
}

// product details javascript
const productImg = document.getElementById("productImg");
const smallImg = document.querySelectorAll(".small-img");
if (smallImg.length > 0) {
  smallImg.forEach((element) => {
    element.addEventListener("click", (e) => {
      productImg.src = e.currentTarget.src;
    });
  });
};


// cart count
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const cartCount = document.querySelector('.cart-count');
cartCount.textContent = cart.length;


// sort functionality

const selectEl = document.querySelector('.filter-selections');
const productsContainer = document.querySelector('.products-container');
const products = Array.from(document.querySelectorAll('.products-container .col-4'));
if(selectEl){
  selectEl.addEventListener('change', ()=>{
    // get the value of the selected option
    const filterParameter = selectEl.options[selectEl.selectedIndex].value;
    
    const element = products.sort((productA, productB)=>{
      return (parseInt(productA.dataset[filterParameter]) - parseInt(productB.dataset[filterParameter]));
    });
    productsContainer.innerHTML = '';
    setTimeout(()=>{
      productsContainer.innerHTML = element.map(item=>{
        // clone the item element and create another parent for it, return the innerHTML of the parent which represents the clone of item
        const itemClone = document.createElement('div');
        itemClone.classList.add('col-4');
        itemClone.dataset.popularity = item.dataset.popularity;
        itemClone.dataset.rating = item.dataset.rating;
        itemClone.dataset.price = item.dataset.price;
        itemClone.innerHTML = item.innerHTML;
        const parentEl = document.createElement('div');
        parentEl.appendChild(itemClone);
        return parentEl.innerHTML;
      } ).join('');
    }, 1000)
  })
};
