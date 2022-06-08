const Winston = require('winston');
const loggerConf = require('../../configData/logger.conf')

const winstonLogger = Winston.createLogger(loggerConf.config);

class Logger {
    static info(message) {
        winstonLogger.info(message);
    }

    static error(message) {
        winstonLogger.error(message);
    }

    static warn(message) {
        winstonLogger.warn(message);
    }
}

module.exports = Logger;
