const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const Logger = require('../logger/logger')

class ImageUtils {
    static isImagesEqual(imgPath1, imgPath2, accuracy = 0.1) {
        Logger.info(`Photo comparison`)
        const img1 = PNG.sync.read(fs.readFileSync(imgPath1));
        const img2 = PNG.sync.read(fs.readFileSync(imgPath2));
        const { width, height } = img1;
        const diff = new PNG({ width, height });
        try {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: accuracy });
            return true;
        } catch {
            Logger.warn(`Photos are not equal`)
            return false;
        }
    }
}

module.exports = ImageUtils;
