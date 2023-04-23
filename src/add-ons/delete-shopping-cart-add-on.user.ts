const Translations = {
    "de-DE": {
        deleteShoppingCart: "Warenkorb leeren",
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
    addButtonStyle();

    document.addEventListener("onCustomInitialize", () => {
        renderDeleteButton();
    });
}

function addButtonStyle(): void {
    const css =
        ".btn-warn { background-color: #e52d00; } .btn-warn:hover { background-color: #a82b01; }";
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));

    document.getElementsByTagName("head")[0].appendChild(style);
}

function renderDeleteButton(): void {
    const footer = document.getElementsByClassName("sticky-footer")[0];
    if (!footer) {
        console.log(`There was no footer installed.`);
        return;
    }

    const deleteButton = document.createElement("button");
    deleteButton.onclick = () => {
        deleteCartItems();
    };
    deleteButton.innerText = Translations["de-DE"].deleteShoppingCart;
    deleteButton.className = "btn btn-warn";
    deleteButton.style.display = "inline";
    deleteButton.style.margin = "6px";

    footer.appendChild(deleteButton);
}

function deleteCartItems(): void {
    const ids = getCartItemIds();

    for (const id of ids) {
        deleteCartItem(id);
    }

    console.log(`Removed all ${ids.length} items from the shopping cart.`);
}

function deleteCartItem(itemId: string): void {
    const element = document.querySelector(
        "input[name=form_key]"
    ) as HTMLInputElement;

    if (!element) {
        return;
    }

    const formKey = element.value;

    fetch("/checkout/sidebar/removeItem/?ajax=1", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "form_key=" + formKey + "&item_id=" + itemId,
        method: "POST",
        mode: "cors",
        credentials: "include",
    })
        .then(function (response) {
            if (response.ok) {
                toggleCart();
            }

            return response;
        })
        .then(function (response) {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            var reloadCustomerDataEvent = new CustomEvent(
                "reload-customer-section-data"
            );
            window.dispatchEvent(reloadCustomerDataEvent);
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

function toggleCart(): void {
    document
        .querySelector("body")!
        .classList.remove("overflow-hidden", "md:overflow-auto");
}
