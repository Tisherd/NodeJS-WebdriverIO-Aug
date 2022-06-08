const Logger = require('../logger/logger');
const Jimp = require("jimp");

const gm = require('gm');

const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const imageToBase64 = require('image-to-base64');
const FileUtils = require('../fileUtils/fileUtils');

class ImageUtils {
    static async isImagesEqual(imgPath1, imgPath2, accuracy = 0.1) {
        Logger.info(`Photo comparison`);
        imgFile1 = await FileUtils.readFile(imgPath1);
        imgFile2 = await FileUtils.readFile(imgPath2);
        const img1 = PNG.sync.read(imgFile1);
        const img2 = PNG.sync.read(imgFile2);
        const { width, height } = img1;
        const diff = new PNG({ width, height });
        try {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: accuracy });
            return true;
        } catch {
            Logger.warn(`Photos are not equal`);
            return false;
        }
    }

    static async imageToBase64(file) {
        Logger.info(`${file}: image to base64`);
        return imageToBase64(file);
    }

    static async pngToJpg(file, newFile = '') {
        Logger.info(`${file}: png to jpg`);
        const toFile = newFile ? newFile.replace('.png', '.jpg') : file.replace('.png', '.jpg');
        const img = await Jimp.read(file);
        img.write(toFile);
        return toFile;
    }

    static async resize(file, newFile = '', newSize = [200, 90]) {
        Logger.info(`${file}: resize to (${newSize[0]}, ${newSize[1]})`);
        const toFile = newFile ? newFile : file;
        return new Promise(function (resolve, reject) {
            gm(file)
                .resize(newSize[0], newSize[1])
                .autoOrient()
                .write(toFile, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                })
        })
    }
}

module.exports = ImageUtils;
