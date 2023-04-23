"use strict";
const Translations = {
    "de-DE": {
        articleNumber: "Artikel Nr.",
        editShoppingCart: "Warenkorb bearbeiten",
    },
};
function initialize() {
    addActionButtonStyle();
    renderEditButton();
    document.addEventListener("onCustomInitialize", () => {
        renderArticleNumbers();
    });
}
function addActionButtonStyle() {
    const css =
        ".btn-action { background-color: #95C31D; } .btn-action:hover { background-color: #7EA21F; }";
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
}
function renderEditButton() {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
    }
    const a = document.createElement("a");
    a.href = "https://www.pumpe24.de/checkout/cart/";
    a.className = "btn btn-action";
    a.style.display = "inline-flex";
    a.style.margin = "6px";
    const span = document.createElement("span");
    span.innerText = Translations["de-DE"].editShoppingCart;
    a.appendChild(span);
    footer.appendChild(a);
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
        const item = htmlCartItems[i];
        if (!item) {
            continue;
        }
        item.childNodes[3].childNodes[1].appendChild(span);
    }
}
