const Logger = require("../utils/logger/logger");
const waitsConfig = require("../configData/configData").waits;

class BaseElement {
    #locator;
    #name;

    constructor(locator, name) {
        this.#locator = locator;
        this.#name = name;
    }

    async getElementInstances() {
        Logger.info(`'${this.#name}': Get list of element instances`);
        const elems = await this.getElements();
        const listOfElements = [];
        for (const [key, elem] of elems.entries()) {
            listOfElements.push(new this.constructor(elem, `'${this.#name}'-${key} elem`));
        }
        return listOfElements;
    }

    async getElement() {
        Logger.info(`'${this.#name}': Get element`);
        if (typeof this.#locator === "string") {
            const elem = await $(this.#locator);
            return elem;
        } else {
            return this.#locator;
        }
    }

    async nextElement() {
        Logger.info(`'${this.#name}': Get next element`);
        const elem = await this.getElement();
        return new this.constructor(await elem.nextElement(), `Next ${this.#name} elem`);
    }

    async getElements() {
        Logger.info(`'${this.#name}': Get elements`);
        const elems = await $$(this.#locator);
        return elems;
    }

    async click() {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Click`);
        await elem.waitForClickable();
        return elem.click();
    }

    async getText() {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Get text`);
        await elem.waitForDisplayed();
        return elem.getText();
    }

    async dragAndDrop(target, duration) {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Drag and drop`);
        return elem.dragAndDrop(target, duration)
    }

    async isElementPresent(timeout) {
        Logger.info(`'${this.#name}': Check element present`);
        try {
            await this.waitForDisplayed({timeout:timeout});
            return true;
        } catch {
            Logger.warn(`'${this.#name}': Element is missing`)
            return false;
        }
    }

    async isElementDisappeared(timeout) {
        Logger.info(`'${this.#name}': Check element disappeared`);
        const reverse = true;
        try {
            await this.waitForDisplayed({timeout:timeout}, reverse);
            return true;
        } catch {
            Logger.warn(`'${this.#name}': Element is present`)
            return false;
        }
    }

    async isPartInAttribute(partName, nameAttribute) {
        Logger.info(`'${this.#name}': Check '${partName}' in attribute :'${nameAttribute}'`);
        const attribute = await this.getAttribute(nameAttribute);
        return attribute.includes(partName);
    }

    async getAttribute(attribute) {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Get attribute - '${attribute}'`);
        return elem.getAttribute(attribute);
    }

    async getCSSProperty(property) {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Get CSSProperty - '${property}'`);
        return elem.getCSSProperty(property);
    }

    async waitForDisplayed(params = {}, reverse = false) {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': Wait for displayed`);
        return elem.waitForDisplayed({
            timeout: params.timeout || waitsConfig.timeout,
            reverse: reverse
        });
    }

    async saveScreenshot(path) {
        const elem = await this.getElement();
        Logger.info(`'${this.#name}': save screenshot to ${path}`);
        return elem.saveScreenshot(path);
    }

    getName(){
        return this.#name;
    }
}

module.exports = BaseElement;
