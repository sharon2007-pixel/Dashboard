const darkButton = document.getElementById("dark");
if (darkButton) {
    darkButton.addEventListener("click", function() {
        document.body.classList.toggle("dark");
    });
}

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let carti = JSON.parse(localStorage.getItem("cart")) || [];
        carti.push(button.id);
        localStorage.setItem("cart", JSON.stringify(carti));
        window.location.href = "cart.html";

    });

});
const cart = document.getElementById("cart");

if (cart) {

    const products = JSON.parse(localStorage.getItem("cart")) || [];  
    const uniqueProducts = new Set(products);
    uniqueProducts.forEach(function(prod) {

        const quantity = howMany(products, prod);

        if (prod === "wireless-headphones") {
            cart.innerHTML += `
                <div class="cart-item">
                    <img src="wireless headphones.jpeg">
                    <div class="txt">
                        <h2>Wireless Headphones</h2>
                        <p>Price: $80</p>
                        <p>Quantity: ${quantity}</p>
                        <button class="plus" id="headphones1">+</button>
                        <button class="minus" id="headphones">-</button>
                        
                    </div>
                </div>`;


        
        } else if (prod === "keyboard") {
            cart.innerHTML += `
                <div class="cart-item">
                    <img src="keyboard.jpeg">
                    <div class="txt">
                        <h2>Keyboard</h2>
                        <p>Price: $60</p>
                        <p>Quantity: ${quantity}</p>
                        <button class="plus" id="keyboard1">+</button>
                        <button class="minus" id="keyboard">-</button>
                        
                    </div>
                </div>`;

        } else if (prod === "smart-watch") {
            cart.innerHTML += `
                <div class="cart-item">
                    <img src="smart watch.jpeg">
                    <div class="txt">
                        <h2>Smart Watch</h2>
                        <p>Price: $120</p>
                        <p>Quantity: ${quantity}</p>
                        <button class="plus" id="watch1">+</button>
                        <button class="minus" id="watch">-</button>
                        
                    </div>
                </div> `;
        }
    });


}
const total = document.getElementById("total");
total.innerHTML =  `Total Price: ${totalPrice(JSON.parse(localStorage.getItem("cart")) || [])} $`;


const del = document.getElementById("del");

if (del) {
    del.addEventListener("click", function() {
        localStorage.removeItem("cart");
        cart.innerHTML = "";
        location.reload();
    });

}

function howMany(arr, item) {
    let count = 0;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === item) {
            count++;
        }
    }
    return count;
}

function totalPrice (products) {
    const uniqueProducts = new Set(products);
    let sum = 0;
    uniqueProducts.forEach(function(prod) {
        if(prod === "wireless-headphones") {
            sum += 80 * howMany(products , "wireless-headphones");
        } else if (prod === "keyboard") {
            sum += 60 * howMany(products , "keyboard");
        } else if (prod === "smart-watch") {
            sum+= 120 * howMany(products , "smart-watch");
        }
    }); 

    return sum;
}

const minus = document.querySelectorAll(".minus");
minus.forEach(function(button) {
    button.addEventListener("click", function() {
        const arr = JSON.parse(localStorage.getItem("cart")) || [];
        let index;
        if (button.id === "headphones") {
            index = arr.indexOf("wireless-headphones");
            
        } else if (button.id === "keyboard") {
            index = arr.indexOf("keyboard");
            
        } else if (button.id === "watch") {
            index = arr.indexOf("smart-watch");
        
        }

        if (index !== -1) {
                arr.splice(index, 1);
                 
            }
        localStorage.setItem("cart", JSON.stringify(arr));
        location.reload();
    });
});

const plus = document.querySelectorAll(".plus");
plus.forEach(function(button) {
    button.addEventListener("click", function() {
        const arr = JSON.parse(localStorage.getItem("cart")) || [];
        if (button.id === "headphones1") {
                arr.push("wireless-headphones");

            
        } else if (button.id === "keyboard1") {
                arr.push("keyboard");
            
        } else if (button.id === "watch1") {
                arr.push("keyboard");
                
            
        }

        localStorage.setItem("cart", JSON.stringify(arr));
        location.reload();
    });
});
