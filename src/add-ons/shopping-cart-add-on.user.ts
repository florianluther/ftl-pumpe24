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

const green = "#95C31D";
const darkgreen = "#658514";

export function initialize(): void {
    addActionButtonStyle();
    renderEditButton();

    document.addEventListener("onCustomInitialize", () => {
        renderArticleNumbers();
    });
}

function addActionButtonStyle(): void {
    const css = `.btn-green { background-color: ${green}; line-height: 3rem; } .btn-green:hover { background-color: ${darkgreen}; }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));

    document.getElementsByTagName("head")[0].appendChild(style);
}

function renderEditButton(): void {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
    }

    const a = document.createElement("a");
    a.href = "https://www.pumpe24.de/checkout/cart/";
    a.className = "btn btn-green";
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
        span.style.fontWeight = "bold";

        const item = htmlCartItems[i];

        if (!item) {
            continue;
        }

        item.childNodes[3].childNodes[1].appendChild(span);
    }
}
