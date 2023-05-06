// ==UserScript==
// @name         Add action footer bar.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  This script adds the action footer bar.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==
"use strict";
function initialize() {
    addFooterStyle();
    addFooterActionBar();
}
function addFooterStyle() {
    const css = `.sticky-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: whitesmoke;
        background-color: #0168b3;
        z-index: 1000;
        text-align: center;

        -webkit-box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.75);
    }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
}
function addFooterActionBar() {
    const footer = document.createElement("div");
    footer.className = "sticky-footer";
    document.getElementsByTagName("body")[0].appendChild(footer);
}
