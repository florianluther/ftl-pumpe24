// ==UserScript==
// @name         Inject action footer bar.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  This script injects the action footer bar.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    injectFooterStyle();
    injectActionButtonStyle();

    addActionBarFooter();
    addActionAnchor();

    setTimeout(renderArticleNumbers, 500);
})();

function injectFooterStyle() {
    var css = `.sticky-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: whitesmoke;
        background-color: #0168b3;
        z-index: 1000;
        text-align: center;

        -webkit-box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
    }`;

    var style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}

function injectActionButtonStyle() {
    var css =
        ".btn-action { background-color: #95C31D; } .btn-action:hover { background-color: #7EA21F; }";
    var style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}

function addActionBarFooter() {
    const footer = document.createElement("div");
    footer.className = "sticky-footer";

    document.getElementsByTagName("body")[0].appendChild(footer);
}

function addActionAnchor() {
    const footer = document.getElementsByClassName("sticky-footer")[0];

    const a = document.createElement("a");
    a.href = "https://www.pumpe24.de/checkout/cart/";
    a.className = "btn btn-action";
    a.style.display = "inline";
    a.style.margin = "6px";
    a.style.padding = "0.4rem 1rem";

    const span = document.createElement("span");
    span.innerText = "Warenkorb bearbeiten";

    a.appendChild(span);
    footer.appendChild(a);
}

function addActionButton(caption, className, onClick) {
    const footer = document.getElementsByClassName("sticky-footer")[0];

    const button = document.createElement("button");
    button.onclick = onClick;
    button.innerText = caption;
    button.className = className;
    button.style.display = "inline";
    button.style.margin = "6px";

    footer.appendChild(button);
}

function renderArticleNumbers() {
    const storageAsText = localStorage.getItem("mage-cache-storage");
    const storage = JSON.parse(storageAsText);
    const items = storage.cart.items;

    for (const item of items) {
        const sku = item.product_sku;
    }

    const htmlCartItems = document.getElementsByClassName("cart-items");

    for (let i = 0; i < items.length; i++) {
        const element = items[i];

        const span = document.createElement("span");
        span.innerText = `Artikel Nr.: ${element.product_sku}`;
        span.style.color = "red";

        htmlCartItems[i].childNodes[3].childNodes[1].appendChild(span);
    }
}
