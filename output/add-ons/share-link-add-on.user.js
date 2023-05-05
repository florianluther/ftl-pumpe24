"use strict";
const Translations = {
    "de-DE": {
        shareShoppingCart: "Warenkorb empfehlen",
    },
};
const blue = "#004893";
const darkblue = "#003166";
function initialize() {
    addButtonStyle();
    document.addEventListener("onCustomInitialize", () => {
        renderShareButton();
    });
}
function addButtonStyle() {
    const css = `.btn-blue { background-color: ${blue}; line-height: 3rem; } .btn-blue:hover { background-color: ${darkblue}; }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
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
    shareButton.className = "btn btn-blue";
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
