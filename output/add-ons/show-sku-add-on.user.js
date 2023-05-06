// ==UserScript==
// @name         Show the SKU on the detail page.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  This script determines the SKU of the currently loaded product and displays it to the user.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==
"use strict";
const Translations = {
    "de-DE": {
        copy: "Kopieren",
        sku: "Art.-Nr.",
    },
};
function initialize() {
    const elements = document.getElementsByTagName("script");
    const scripts = Array.from(elements);
    const filteredScripts = scripts.filter((s) =>
        s.innerText.includes("p24ReviewData")
    );
    if (!filteredScripts.length) {
        console.log("No product SKU found.");
    } else {
        let data = filteredScripts[0].innerText.trim();
        data = `${data}; function exec() { return p24ReviewData; } exec();`;
        const reviewData = eval(data);
        console.log(`Product SKU found: ${reviewData.productSku}`);
        renderProductSku(reviewData.productSku);
    }
}
function renderProductSku(sku) {
    const productInfoBlock = document.getElementById("product-info-block");
    if (!productInfoBlock) {
        return;
    }
    const newContainer = document.createElement("div");
    const skuLabel = document.createElement("span");
    skuLabel.innerText = `${Translations["de-DE"].sku}: `;
    skuLabel.style.fontWeight = "bold";
    skuLabel.style.fontSize = "1.5rem";
    const skuValue = document.createElement("span");
    skuValue.innerText = sku;
    skuValue.style.fontWeight = "normal";
    skuValue.style.fontSize = "1.5rem";
    const copyButton = document.createElement("button");
    copyButton.onclick = () => {
        navigator.clipboard.writeText(sku);
    };
    copyButton.innerText = Translations["de-DE"].copy;
    copyButton.className = "btn btn-hover";
    copyButton.style.display = "inline";
    copyButton.style.margin = "6px";
    newContainer.appendChild(skuLabel);
    newContainer.appendChild(skuValue);
    newContainer.appendChild(copyButton);
    productInfoBlock.prepend(newContainer);
}
initialize();
