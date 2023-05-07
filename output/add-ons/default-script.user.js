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
"use strict";
function init() {
    const label = getLabel();
    const name = getName();
    console.log(`${label} ${name}.`);
}
function getName() {
    return `RawUserScript`;
}
function getLabel() {
    return `Hello from`;
}
init();
