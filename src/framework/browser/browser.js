const Logger = require('../utils/logger/logger');
const browserConfig = require('../configData/configData').browser;

class Browser {
    static async open(path) {
        Logger.info(`Browser: open '${path}'`);
        await browser.url(path);
    }

    static async authorizedOpen(domain, login, password) {
        const url = `http://${login}:${password}@${domain}`
        await browser.url(url);
    }

    static async setTimeout(timeouts = {}) {
        Logger.info(`Browser: set timeouts`);
        await browser.setTimeout({
            'implicit': timeouts.implicit || browserConfig.timeouts.implicit,
            'pageLoad': timeouts.pageLoad || browserConfig.timeouts.pageLoad,
            'script': timeouts.script || browserConfig.timeouts.script
        });
    }

    static async maximize() {
        Logger.info(`Browser: maximize`);
        await browser.maximizeWindow();
    }

    static async close() {
        Logger.info(`Browser: close window`);
        await browser.closeWindow();
    }

    static async saveScreenshot(path) {
        Logger.info(`Browser: save screenshot`);
        await browser.saveScreenshot(path);
    }

    static async refresh() {
        Logger.info(`Browser: refresh`);
        await browser.refresh();
    }
}

module.exports = Browser;
