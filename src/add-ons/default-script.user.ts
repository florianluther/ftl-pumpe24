// ==UserScript==
// @name         Default user script.
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  The description of the default user script.
// @author       Florian Luther
// @match        https://www.pumpe24.de/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pumpe24.de
// @grant        none
// ==/UserScript==

export function init(): void {
    const label = getLabel();
    const name = getName();
    console.log(`${label} ${name}.`);

    const defaultClass: DefaultClass = new DefaultClass();
    console.log(`CS: ${defaultClass.label} ${name}.`);
}

function getName(): string {
    return `RawUserScript`;
}

function getLabel(): string {
    return `Hello from`;
}

export class DefaultClass {
    constructor() {
        this._label = "DefaultUserScript";
    }

    private _label: string;
    get label(): string {
        return this._label;
    }
}

init();
