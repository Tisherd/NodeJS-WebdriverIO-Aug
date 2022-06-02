const BaseElement = require("./baseElement");
const Logger = require("../utils/logger/logger");

class Textarea extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }

    async setValue(text) {        
        const elem = await this.getElement();
        Logger.info(`'${this.name}': Send '${text}'`);
        await elem.waitForDisplayed();
        return elem.setValue(text);
    }

    async clear() {        
        const elem = await this.getElement();
        Logger.info(`'${this.name}': Clear value`);
        await elem.waitForDisplayed();
        return elem.clearValue();
    }

}

module.exports = Textarea;
