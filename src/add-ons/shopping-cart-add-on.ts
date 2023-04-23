const Translations = {
    "de-DE": {
        articleNumber: "Artikel Nr.",
        editShoppingCart: "Warenkorb bearbeiten",
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

export function initialize(): void {
    renderEditButton();

    document.addEventListener("onCustomInitialize", () => {
        renderArticleNumbers();
    });
}

function renderEditButton(): void {
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

function renderArticleNumbers(): void {
    const storageAsText = localStorage.getItem("mage-cache-storage");

    if (!storageAsText) {
        return;
    }

    const storage: Storage = JSON.parse(storageAsText);
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
