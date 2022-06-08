const Logger = require('../logger/logger');
const jsScripts = require('../../configData/jsScripts.conf')

class JsScripts {
    static async closeWindow() {
        Logger.info('Script execution: closeWindow')
        return browser.executeAsync(jsScripts.closeWindow);
    }
}

module.exports = JsScripts;
