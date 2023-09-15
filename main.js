document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById("cart-icon");
  const basketOverlay = document.getElementById("basket-overlay");
  const basketList = document.getElementById("basket-list");
  const basketTotal = document.getElementById("basket-total");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#cart-close");
  const buyButton = document.querySelector(".btn-buy");
  const cartContent = document.querySelector(".cart-content");
  const cartTotal = document.querySelector("#cart-total");

  const cartItems = [];

  function updateBasket() {
    const products = document.querySelectorAll(".product-box");
    let totalPrice = 0;

    basketList.innerHTML = "";
    products.forEach((product, index) => {
      const productName = product.querySelector(".product-title").textContent;
      const productPrice = parseFloat(product.querySelector(".price").textContent.replace("₼", ""));

      const cartItem = document.createElement("li");
      cartItem.textContent = `${productName} - ${productPrice.toFixed(2)}₼`;
      basketList.appendChild(cartItem);

      totalPrice += productPrice;
    });

    basketTotal.textContent = totalPrice.toFixed(2) + "₼";
  }

  cartIcon.addEventListener("click", function () {
    basketOverlay.classList.toggle("show");
    updateBasket();
  });

  window.addEventListener("click", function (event) {
    if (event.target === basketOverlay) {
      basketOverlay.classList.remove("show");
    }
  });

  function handleMonthButtonClick(event) {
    const selectedButton = event.target;
    const months = selectedButton.getAttribute("data-months");
    const productBox = selectedButton.closest(".product-box");

    const buttons = productBox.querySelectorAll(".month-button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    const originalPrice = parseFloat(productBox.querySelector(".price").textContent.replace("₼", ""));
    const dividedPrice = (originalPrice / months).toFixed(2); //bunu yazana qeder o biri dunyani gordum geldim ona gore qiymet yazin pls

    productBox.querySelector('.selected-months').textContent = months + " ay";
    productBox.querySelector('.divided-price').textContent = dividedPrice;
  }

  const monthButtons = document.querySelectorAll(".month-button");
  monthButtons.forEach((button) => {
    button.addEventListener("click", handleMonthButtonClick);
  });

  // muellim normal heyatda aglimi bu qeder isletse idim indiye master oxuyurdum

  cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    updateCartTotal();

    closeCart.addEventListener("click", () => {
      cart.classList.remove("active");
    });

    buyButton.addEventListener("click", () => {
      if (cartItems.length === 0) {
        alert("Your cart is empty. Add items to the cart before buying.");
      } else {
        cartItems.length = 0;
        cartContent.innerHTML = "";
        updateCartTotal();
      }
    });

    function addItemToCart(title, price, imgSrc) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-box");
      cartItem.innerHTML = `
          <img src="${imgSrc}" alt="${title}" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">$${price.toFixed(2)}</div>
              <input type="number" value="1" class="cart-quantity">
          </div>
          <i class="bx bxs-trash-alt cart-remove" onclick="removeCartItem(this)"></i>
      `;
      cartContent.appendChild(cartItem);

      cartItems.push({
        title: title,
        price: price,
        imgSrc: imgSrc
      });

      updateCartTotal();
    }

    function updateCartTotal() {
      let total = 0;
      cartItems.forEach((item) => {
          total += item.price;
      });
      cartTotal.textContent = `$${total.toFixed(2)}`; //muellim burda quantitye gore price elemeye calismisdim amma 
                                                      //alinmadi commente yazin da nece edim
  }


    window.removeCartItem = function (element) {
      const itemIndex = Array.from(cartContent.children).indexOf(element.parentElement);
      if (itemIndex !== -1) {
        cartContent.removeChild(cartContent.children[itemIndex]);
        cartItems.splice(itemIndex, 1);
        updateCartTotal();
      }
    }

    const addToCartButtons = document.querySelectorAll(".buy-now");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", handleAddToCart);
    });

    function handleAddToCart() {
      const productBox = this.closest(".product-box");
      const productName = productBox.querySelector(".product-title").textContent;
      const productPrice = parseFloat(productBox.querySelector(".price").textContent.replace("₼", ""));
      const productImgSrc = productBox.querySelector(".product-img").src;

      addItemToCart(productName, productPrice, productImgSrc);
    }

  })

});

//saat 7-ye qalib 15 deqiqe falan men indiye gucle catdirdim gorun de muellim :/