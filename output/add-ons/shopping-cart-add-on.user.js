// ==UserScript==
// @name         Open shopping cart and show SKU.
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  This script renders a button to open the shopping cart and show all items with its SKU.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==
"use strict";
const Translations = {
    "de-DE": {
        articleNumber: "Artikel Nr.",
        editShoppingCart: "Warenkorb bearbeiten",
    },
};
const green = "#95C31D";
const darkgreen = "#658514";
function initialize() {
    addActionButtonStyle();
    document.addEventListener("onCustomInitialize", () => {
        renderEditButton();
        renderArticleNumbers();
    });
}
function addActionButtonStyle() {
    const css = `.button-green { background-color: ${green}; line-height: 3rem; } .button-green:hover { background-color: ${darkgreen}; }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
}
function renderEditButton() {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
        return;
    }
    const editButton = document.createElement("button");
    editButton.onclick = () => {
        location.href = "https://www.pumpe24.de/checkout/cart/";
    };
    editButton.innerText = Translations["de-DE"].editShoppingCart;
    editButton.className = "btn button-green";
    editButton.style.display = "inline";
    editButton.style.margin = "6px";
    footer.appendChild(editButton);
}
function renderArticleNumbers() {
    const storageAsText = localStorage.getItem("mage-cache-storage");
    if (!storageAsText) {
        return;
    }
    const storage = JSON.parse(storageAsText);
    const items = storage.cart.items;
    const htmlCartItems = document.getElementsByClassName("cart-items");
    if (!htmlCartItems || !htmlCartItems.length) {
        return;
    }
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        const span = document.createElement("span");
        span.innerText = `${Translations["de-DE"].articleNumber}: ${element.product_sku}`;
        span.style.color = "red";
        span.style.fontWeight = "bold";
        const item = htmlCartItems[i];
        if (!item) {
            continue;
        }
        item.childNodes[3].childNodes[1].appendChild(span);
    }
}
initialize();
