const Logger = require('../logger/logger');

class StringUtils {
    static removeCharsExceptNum(str) {
        Logger.info(`Remove chars no num from ${str}`);
        return str.replace(/\D/g, '');
    }
}

module.exports = StringUtils;
