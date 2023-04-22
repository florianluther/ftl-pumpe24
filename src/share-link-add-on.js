// ==UserScript==
// @name         Copy the share link on all pages.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  This script loads a URL of the current shopping cart and displays it to the user.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    setTimeout(renderShareButton, 200);
})();

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
