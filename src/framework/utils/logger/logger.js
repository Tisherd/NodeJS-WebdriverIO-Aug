const clog = require('c-log');

class Logger {
    static info(message) {
        clog.info(message);
    }

    static error(message) {
        clog.error(message);
    }

    static warn(message) {
        clog.warn(message);
    }
}

module.exports = Logger;
