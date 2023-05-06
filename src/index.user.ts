// ==UserScript==
// @name         Initialize the Add-ons.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  This script will initialize the Add-ons.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

export function initialize(enableLogging: boolean): void {
    const onCustomInitialize = function () {
        if (enableLogging) {
            console.log(`Dispatch custom event 'onCustomInitialize'`);
        }

        const event = new Event("onCustomInitialize");
        document.dispatchEvent(event);
    };

    setTimeout(onCustomInitialize, 500);
}

initialize(true);
