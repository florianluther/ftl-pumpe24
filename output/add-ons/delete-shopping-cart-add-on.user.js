"use strict";
const Translations = {
    "de-DE": {
        deleteShoppingCart: "Warenkorb leeren",
    },
};
const red = "#e52d00";
const darkred = "#a82b01";
function initialize() {
    addButtonStyle();
    document.addEventListener("onCustomInitialize", () => {
        renderDeleteButton();
    });
}
function addButtonStyle() {
    const css = `.btn-red { background-color: ${red}; line-height: 3rem; } .btn-red:hover { background-color: ${darkred}; }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
}
function renderDeleteButton() {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
        return;
    }
    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => {
        deleteCartItems();
    };
    deleteButton.innerText = Translations["de-DE"].deleteShoppingCart;
    deleteButton.className = "btn btn-red";
    deleteButton.style.display = "inline";
    deleteButton.style.margin = "6px";
    footer.appendChild(deleteButton);
}
function deleteCartItems() {
    const ids = getCartItemIds();
    for (const id of ids) {
        deleteCartItem(id);
    }
    console.log(`Removed all ${ids.length} items from the shopping cart.`);
}
function deleteCartItem(itemId) {
    const element = document.querySelector("input[name=form_key]");
    if (!element) {
        return;
    }
    const formKey = element.value;
    fetch("/checkout/sidebar/removeItem/?ajax=1", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "form_key=" + formKey + "&item_id=" + itemId,
        method: "POST",
        mode: "cors",
        credentials: "include",
    })
        .then(function (response) {
            if (response.ok) {
                toggleCart();
            }
            return response;
        })
        .then(function (response) {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            var reloadCustomerDataEvent = new CustomEvent(
                "reload-customer-section-data"
            );
            window.dispatchEvent(reloadCustomerDataEvent);
        });
}
function getCartItemIds() {
    const storageAsText = localStorage.getItem("mage-cache-storage");
    if (!storageAsText) {
        return [];
    }
    const storage = JSON.parse(storageAsText);
    const cartItems = storage.cart.items;
    const ids = cartItems.map((c) => c.item_id);
    return ids;
}
function toggleCart() {
    document
        .querySelector("body")
        .classList.remove("overflow-hidden", "md:overflow-auto");
}
