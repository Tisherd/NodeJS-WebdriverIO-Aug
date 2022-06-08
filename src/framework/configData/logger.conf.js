const Winston = require('winston');

const myFormat = Winston.format.printf(({ level, message, label, timestamp }) => {
    return `${level}: ${message}`;
});
const ERROR_PATH = '.log/error.log';
const COMBINED_PATH = '.log/combined.log';

exports.config = {
    level: 'info',
    format: myFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({ filename: ERROR_PATH, level: 'error', options: { flags: 'w' } }),
        new Winston.transports.File({ filename: COMBINED_PATH, options: { flags: 'w' } },),
    ],
}
exports.loggerPaths = {
    errorPath: ERROR_PATH,
    combinedPath: COMBINED_PATH
}
