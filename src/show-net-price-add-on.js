"use strict";

const VAT = 19;

function initialize() {
    const elements = document.getElementsByTagName("script");
    const scripts = Array.from(elements);
    const filteredScripts = scripts.filter(
        (s) => s.type === "application/ld+json"
    );

    const contentScript = filteredScripts[1];

    if (!contentScript) {
        console.log(`No prices found.`);
        return;
    }

    const content = JSON.parse(contentScript.firstChild.textContent.trim());

    if (!content) {
        console.log(`No prices found.`);
        return;
    }

    let netPriceFormatted;
    if (Array.isArray(content.offers)) {
        netPriceFormatted = getMultiNetPrice(
            content.offers.map((o) => o.price)
        );
        console.log(`Prices for this product: ${content.offers.length}`);
    } else {
        netPriceFormatted = getSingleNetPrice(content.offers.price);
        console.log(`Price for this product: ${content.offers.price}`);
    }

    const priceBoxes = document.getElementsByClassName(
        "price-box price-final_price"
    );
    const priceBox = priceBoxes[0];

    const newContainer = document.createElement("div");
    newContainer.style.textAlign = "right";
    newContainer.style.fontSize = "2rem";
    newContainer.style.marginTop = "12px";
    newContainer.style.color = "#777";

    const netPrice = document.createElement("span");
    netPrice.innerText = netPriceFormatted;
    netPrice.style.fontWeight = "bold";

    newContainer.appendChild(netPrice);
    priceBox.appendChild(newContainer);
}

function getSingleNetPrice(price) {
    const vatFactor = 1 + VAT / 100;
    let netPrice = price / vatFactor;

    const netPriceFormatted = new Intl.NumberFormat(`de-DE`, {
        currency: `EUR`,
        style: "currency",
    }).format(netPrice);

    return netPriceFormatted;
}

function getMultiNetPrice(prices) {
    const netPricesFormatted = [];
    const sortedPrices = prices.sort(function (a, b) {
        return a - b;
    });

    for (const price of sortedPrices) {
        const netPriceFormatted = getSingleNetPrice(price);
        netPricesFormatted.push(netPriceFormatted);
    }

    return netPricesFormatted.join(` / `);
}
