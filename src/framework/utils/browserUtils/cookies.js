const Logger = require('../logger/logger');

class Cookies {
    static async get(names){
        Logger.info('Get cookies');
        await browser.getCookies(names);
    }

    static async set(params) {
        Logger.info('Set cookies');
        await browser.setCookies(params);
    }

    static async delete(names) {
        Logger.info('Delete cookies');
        await browser.deleteCookies(names);
    }
}

module.exports = Cookies;
