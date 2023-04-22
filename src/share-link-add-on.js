"use strict";

function initialize() {
    document.addEventListener("onCustomInitialize", function () {
        renderShareButton();
    });
}

function renderShareButton() {
    const shareButton = document.createElement("button");
    shareButton.onclick = function () {
        getShareUrl();
    };
    shareButton.innerText = "Warenkorb empfehlen";
    shareButton.className = "btn btn-hover";
    shareButton.style.display = "inline";
    shareButton.style.margin = "6px";

    const footer = document.getElementsByClassName("sticky-footer")[0];
    footer.appendChild(shareButton);
}

function getCartItemIds() {
    const storageAsText = localStorage.getItem("mage-cache-storage");
    const storageObject = JSON.parse(storageAsText);
    const cartItems = storageObject.cart.items;

    const ids = cartItems.map((c) => c.item_id);

    return ids;
}

function getShareUrl() {
    const hasCartItems = getCartItemIds().length;

    if (!hasCartItems) {
        console.log("No cart items to share.");
        return;
    }

    fetch("/wk/create?ajax", { method: "GET" })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            navigator.clipboard.writeText(data.url);
        });
}
