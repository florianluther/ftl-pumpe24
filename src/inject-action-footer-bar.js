// ==UserScript==
// @name         Inject action footer bar.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  This script injects the action footer bar.
// @author       Florian Luther
// @match        https://www.pumpe24.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    injectFooterStyle();
    injectActionButtonStyle();

    addActionBarFooter();
    addActionButton("Test Button", "btn btn-action", function () {
        alert("test button clicked");
    });
})();

function injectFooterStyle() {
    var css = `.sticky-footer {
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

    var style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}

function injectActionButtonStyle() {
    var css =
        ".btn-action { background-color: #95C31D; } .btn-action:hover { background-color: #7EA21F; }";
    var style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}

function addActionBarFooter() {
    const footer = document.createElement("div");
    footer.className = "sticky-footer";

    document.getElementsByTagName("body")[0].appendChild(footer);
}

function addActionButton(caption, className, onClick) {
    const footer = document.getElementsByClassName("sticky-footer")[0];

    const button = document.createElement("button");
    button.onclick = onClick;
    button.innerText = caption;
    button.className = className;
    button.style.display = "inline";
    button.style.margin = "6px";

    footer.appendChild(button);
}
