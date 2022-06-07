const clog = require('c-log');
const Winston = require('winston');

const myFormat = Winston.format.printf(({ level, message, label, timestamp }) => {
    return `${level}: ${message}`;
  });

const winstonLogger = Winston.createLogger({
    level: 'info',
    format: myFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        new Winston.transports.Console(),
        //new transports.Console(),
        new Winston.transports.File({ filename: 'error.log', level: 'error' }),
        new Winston.transports.File({ filename: 'combined.log', options: { flags: 'w' }}, ),
    ],
});

class Logger {
    static info(message) {
        winstonLogger.info(message);
        //clog.info(message);
    }

    static error(message) {
        winstonLogger.error(message);
        //clog.error(message);
    }

    static warn(message) {
        winstonLogger.warn(message);
        //clog.warn(message);
    }
}

module.exports = Logger;
