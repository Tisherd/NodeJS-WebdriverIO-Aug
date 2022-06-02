const BaseElement = require("./baseElement");
const Logger = require("../utils/logger/logger");

class Label extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = Label;
