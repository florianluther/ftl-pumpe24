"use strict";

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
    const newContainer = document.createElement("div");

    const skuLabel = document.createElement("span");
    skuLabel.innerText = "SKU: ";
    skuLabel.style.fontWeight = "bold";

    const skuValue = document.createElement("span");
    skuValue.innerText = sku;
    skuValue.style.fontWeight = "normal";

    const copyButton = document.createElement("button");
    copyButton.onclick = function () {
        navigator.clipboard.writeText(sku);
    };
    copyButton.innerText = "Copy";
    copyButton.className = "btn btn-hover";
    copyButton.style.display = "inline";
    copyButton.style.margin = "6px";

    newContainer.appendChild(skuLabel);
    newContainer.appendChild(skuValue);
    newContainer.appendChild(copyButton);
    productInfoBlock.prepend(newContainer);
}
