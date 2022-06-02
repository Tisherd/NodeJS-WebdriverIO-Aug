const Logger = require('../logger/logger');
const browser = require('../browser/browser');

class IFrames {
    static async switchToFrame(frameId) {
        Logger.info(`Switch to frame '${frameId}'`);
        return browser.switchToFrame(frameId);
    }

    static async switchToParentFrame() {
        Logger.info(`Switch to parent frame`);
        return browser.switchToParentFrame();
    }

    static async switchToDefault() {
        Logger.info(`Switch to page level`);
        return browser.switchToFrame(null);
    }
}

module.exports = IFrames;
