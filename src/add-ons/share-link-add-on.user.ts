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

const Translations = {
    "de-DE": {
        shareShoppingCart: "Warenkorb empfehlen",
    },
};

type Storage = {
    cart: Cart;
};

type Cart = {
    items: Item[];
};

type Item = {
    item_id: string;
    product_sku: string;
};

const blue = "#004893";
const darkblue = "#003166";

export function initialize(): void {
    addButtonStyle();

    document.addEventListener("onCustomInitialize", () => {
        renderShareButton();
    });
}

function addButtonStyle(): void {
    const css = `.button-blue { background-color: ${blue}; line-height: 3rem; } .button-blue:hover { background-color: ${darkblue}; }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));

    document.getElementsByTagName("head")[0].appendChild(style);
}

function renderShareButton(): void {
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
    shareButton.className = "btn button-blue";
    shareButton.style.display = "inline";
    shareButton.style.margin = "6px";

    footer.appendChild(shareButton);
}

function getShareUrl(): void {
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

function getCartItemIds(): string[] {
    const storageAsText = localStorage.getItem("mage-cache-storage");

    if (!storageAsText) {
        return [];
    }

    const storage: Storage = JSON.parse(storageAsText);
    const cartItems = storage.cart.items;

    const ids = cartItems.map((c) => c.item_id);

    return ids;
}

initialize();
