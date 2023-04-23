"use strict";
const Translations = {
    "de-DE": {
        shareShoppingCart: "Warenkorb empfehlen",
    },
};
function initialize() {
    document.addEventListener("onCustomInitialize", () => {
        renderShareButton();
    });
}
function renderShareButton() {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
        return;
    }
    const shareButton = document.createElement("button");
    shareButton.onclick = () => {
        getShareUrl();
    };
    shareButton.innerText = Translations["de-DE"].shareShoppingCart;
    shareButton.className = "btn btn-hover";
    shareButton.style.display = "inline";
    shareButton.style.margin = "6px";
    footer.appendChild(shareButton);
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
