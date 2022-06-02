
const Logger = require("../utils/logger/logger");
const Browser = require('../browser/browser');
const Label = require("../elements/label");

class BaseForm {
    #uniqElem;
    #name;
    
    constructor(locator, name) {
        this.#uniqElem = new Label(locator, name);
        this.#name = name;
    }

    async open(path) {
        Logger.info(`'${this.#name}': Open`);
        await Browser.open(path);
    }

    async isPageOpen() {
        Logger.info(`'${this.#name}': Check opening`);
        return this.#uniqElem.isElementPresent();
    }

}

module.exports = BaseForm;
