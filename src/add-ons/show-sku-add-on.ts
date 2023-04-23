const Translations = {
    "de-DE": {
        copy: "Kopieren",
        sku: "Art.-Nr.",
    },
};

type ReviewData = {
    productSku: string;
    formId: string;
    ratingIds: string[];
};

export function initialize(): void {
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
        const reviewData: ReviewData = eval(data);

        console.log(`Product SKU found: ${reviewData.productSku}`);
        renderProductSku(reviewData.productSku);
    }
}

function renderProductSku(sku: string): void {
    const productInfoBlock = document.getElementById("product-info-block");
    if (!productInfoBlock) {
        return;
    }

    const newContainer = document.createElement("div");

    const skuLabel = document.createElement("span");
    skuLabel.innerText = `${Translations["de-DE"].sku}: `;
    skuLabel.style.fontWeight = "bold";

    const skuValue = document.createElement("span");
    skuValue.innerText = sku;
    skuValue.style.fontWeight = "normal";

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
