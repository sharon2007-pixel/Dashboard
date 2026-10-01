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

if (total) {
    total.innerHTML = `Total Price: ${totalPrice(JSON.parse(localStorage.getItem("cart")) || [])} $`;
    
}

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


const login = document.getElementById("login-button");

if (login) {
    
    login.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(username === "sharonoren" && password === "sharonTheBest01") {
            alert("login workes succesfully!");
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            document.getElementById("error").textContent = "Username or password is incorrect";
        }
    });

    
}

const dashboard = document.getElementById("adeapy");

if (dashboard) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

const search = document.getElementById("search");
const products = document.querySelectorAll(".card-prod");
search.addEventListener("input" , function() {
    const text = search.value.toLowerCase();

    products.forEach(function(product) {
        const name = product.textContent.toLowerCase();

        if(name.includes(text)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    })
})

const like = document.querySelectorAll(".like");

        
const arr = JSON.parse(localStorage.getItem("like-prod")) || [];
like.forEach(function(button) {
    button.addEventListener("click", function() {
        if(button.textContent === "❤️") {
            button.textContent = "🤍"
            index = arr.indexOf(`${button.id}`);
            if (index !== -1) {
                arr.splice(index, 1);
                 
            }
        localStorage.setItem("like-prod", JSON.stringify(arr));
        
        } else {
        button.textContent = "❤️";
         if(button.id === "headphones") {
            arr.push("headphones");
         } else if(button.id === "keyboard") {
            arr.push("keyboard");
         } else if(button.id === "watch") {
            arr.push("watch");
         }

         localStorage.setItem("like-prod", JSON.stringify(arr));
        }
    });

    
});


const likedButton = document.getElementById("liked-products");
const popup = document.getElementById("liked-popup");
const closePopup = document.getElementById("close-popup");
const likedList = document.getElementById("liked-list");

if (likedButton && popup && closePopup && likedList) {
    likedButton.addEventListener("click", function() {
        popup.style.display = "flex";
        const liked = JSON.parse(localStorage.getItem("like-prod")) || [];
        likedList.innerHTML = "";
        liked.forEach(function(product) {
            if (product === "headphones") {
                likedList.innerHTML += 
                    `<div class="liked-item">
                        <img src="wireless headphones.jpeg">
                        <h3>Wireless Headphones</h3>
                        <p>$80</p>
                    </div>`;

            } else if (product === "keyboard") {

                likedList.innerHTML += 
                        `<div class="liked-item">
                        <img src="keyboard.jpeg">
                        <h3>Keyboard</h3>
                        <p>$60</p>
                    </div>`;

            } else if (product === "watch") {
                likedList.innerHTML += 
                    `<div class="liked-item">
                        <img src="smart watch.jpeg">
                        <h3>Smart Watch</h3>
                        <p>$120</p>
                    </div>`;
            }
        });
    });

    closePopup.addEventListener("click", function() {
        popup.style.display = "none";
    });
}