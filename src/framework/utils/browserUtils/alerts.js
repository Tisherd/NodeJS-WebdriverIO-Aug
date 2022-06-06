const Logger = require('../logger/logger');

class Alerts {
    static async getText() {
        Logger.info(`Get alert text`);
        return browser.getAlertText();
    }

    static async sendText(text) {
        Logger.info(`Send text '${text}' to alert`);
        return browser.sendAlertText(text);
    }

    static async accept() {
        Logger.info(`Accept alert`);
        return browser.acceptAlert();
    }

    static async dismiss() {
        Logger.info(`Dismiss alert`);
        return browser.dismissAlert();
    }

    static async isOpen() {
        Logger.info(`Check alert`);
        try {
            await Alerts.getText();
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = Alerts;
