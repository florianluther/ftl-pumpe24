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

export function initialize(): void {
    document.addEventListener("onCustomInitialize", () => {
        renderShareButton();
    });
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
    shareButton.className = "btn btn-hover";
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
