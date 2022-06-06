
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

    async open(domain, login, password) {
        Logger.info(`'${this.#name}': Open`);
        if (login && password) {
            await Browser.authorizedOpen(domain, login, password);
        }
        else {
            await Browser.open(domain);
        }        
    }

    async isPageOpen() {
        Logger.info(`'${this.#name}': Check opening`);
        return this.#uniqElem.isElementPresent();
    }

}

module.exports = BaseForm;
