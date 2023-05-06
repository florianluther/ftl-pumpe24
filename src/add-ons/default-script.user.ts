// ==UserScript==
// @name         Default user script.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The description of the default user script.
// @author       Florian Luther
// @match        https://www.pumpe24.de/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

export function init(): void {
    const name = getName();
    console.log(`Hello from ${name}.`);
}

function getName(): string {
    return `RawUserScript`;
}

init();
