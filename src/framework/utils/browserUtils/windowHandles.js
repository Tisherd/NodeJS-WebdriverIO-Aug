const Logger = require('../logger/logger');

class WindowHandles {
    static async getCurrent() {
        Logger.info('Get current window handle');
        return browser.getWindowHandle();
    }

    static async getAll() {
        Logger.info('Get all window handles');
        return browser.getWindowHandles();
    }

    static async switchTo(matcher) {
        Logger.info(`Switch to ${matcher} window handle`);
        return browser.switchToWindow(matcher);
    }

    static async switchToNew() {
        const newHandle = await WindowHandles.getNewHandle();
        return WindowHandles.switchTo(newHandle);
    }

    static async getNewHandle() {
        Logger.info('Get new window handle');
        const currentWindowHandle = await WindowHandles.getCurrent();
        const allWindowHandles = await WindowHandles.getAll();
        for (const windowHandle of allWindowHandles) {
            if (windowHandle != currentWindowHandle) {
                return windowHandle;
            }
        }
    }

    static async isWindowOpen(requiredWindowHandle) {
        const allWindowHandles = await WindowHandles.getAll();
        for (const windowHandle of allWindowHandles) {
            if (requiredWindowHandle === windowHandle) {
                return true;
            }
        }
        return false;
    }
}

module.exports = WindowHandles;
